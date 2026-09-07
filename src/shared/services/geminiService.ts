import { env } from "@/core/config/env";

export interface ChatHistoryItem {
    role: "user" | "assistant" | "system";
    content: string;
}

const SYSTEM_INSTRUCTION = `Eres EcoAssistant, la inteligencia artificial de Karen Dayanna Herrera Ruiz (Economista UNEMI).

PERSONALIDAD:
- Técnica, analítica y profesional.
- Estilo académico pero directo.
- Experta en Economía Digital, Datos y Estrategia.

CONTEXTO DE KAREN:
- Economista graduada de la UNEMI.
- Fundadora de EcoTech Herrera & Pérez S.A.S.
- Especialista en análisis econométrico y gestión logística.

REGLAS DE RESPUESTA:
1. Responde SIEMPRE en español.
2. Usa Markdown (listas, negritas, tablas) para que la información sea fácil de leer.
3. Si la pregunta es personal, responde con respeto resaltando los valores de Karen.
4. Si la pregunta es técnica (economía), demuestra rigor científico.`;

function buildMessages(history: any[], message: string) {
    return [
        { role: "system", content: SYSTEM_INSTRUCTION },
        ...history.map(msg => ({
            role: msg.role === 'model' ? 'assistant' : 'user',
            content: msg.parts ? msg.parts[0].text : msg.content
        })),
        { role: "user", content: message }
    ];
}

/**
 * Provider cascade: Groq is the primary (fast, generous free tier) and
 * NVIDIA NIM is the fallback for when Groq's free-tier quota is
 * exhausted or it's briefly unavailable. Both expose an OpenAI-compatible
 * chat/completions endpoint, so the request/response shape is identical —
 * only the base URL, model, key, and provider-specific tuning differ.
 */
async function streamFromGroq(messages: any[]): Promise<ReadableStream> {
    const apiKey = env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY not configured");

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-20b",
            messages,
            temperature: 0.7,
            max_tokens: 1024,
            reasoning_effort: "low",
            stream: true,
        })
    });

    if (!response.ok || !response.body) {
        throw new Error(`Groq error: ${response.status}`);
    }
    return response.body;
}

async function streamFromNvidia(messages: any[]): Promise<ReadableStream> {
    const apiKey = env.NVIDIA_API_KEY;
    if (!apiKey) throw new Error("NVIDIA_API_KEY not configured");

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "nvidia/nemotron-3.5-lightning-30b-a3b",
            messages,
            temperature: 0.7,
            top_p: 0.95,
            max_tokens: 1024,
            // Extended "thinking" mode is unnecessary for a chat widget and
            // would slow responses down — keep it off, mirroring Groq's
            // reasoning_effort: "low" above.
            chat_template_kwargs: { enable_thinking: false },
            stream: true,
        })
    });

    if (!response.ok || !response.body) {
        throw new Error(`NVIDIA error: ${response.status}`);
    }
    return response.body;
}

export class GeminiService {
    static async generateStream(history: any[], message: string): Promise<ReadableStream> {
        const messages = buildMessages(history, message);

        try {
            return await streamFromGroq(messages);
        } catch (groqError) {
            console.warn("GROQ_STREAM_FAILED, falling back to NVIDIA:", groqError instanceof Error ? groqError.message : groqError);
        }

        try {
            return await streamFromNvidia(messages);
        } catch (nvidiaError) {
            console.error("NVIDIA_STREAM_FAILED (both providers exhausted):", nvidiaError instanceof Error ? nvidiaError.message : nvidiaError);
            throw new Error("Error al conectar con el servidor de IA.");
        }
    }
}
