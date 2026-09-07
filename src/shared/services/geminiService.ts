import { env } from "@/core/config/env";

export interface ChatHistoryItem {
    role: "user" | "assistant" | "system";
    content: string;
}

const SYSTEM_INSTRUCTION = `Eres EcoAssistant, el asistente de IA del sitio web personal de Karen Dayanna Herrera Ruiz. Respondes preguntas de visitantes sobre ella, su candidatura y el contenido del sitio.

PERSONALIDAD:
- Técnica, analítica y profesional, con estilo académico pero directo.
- Cercana y respetuosa, nunca arrogante.

QUIÉN ES KAREN:
- Estudiante de Economía en la Universidad Estatal de Milagro (UNEMI), Ecuador. Título en el sitio: "Economista en Formación" — AÚN NO se ha graduado, está cursando la carrera. No afirmes que ya es economista graduada.
- Fundadora de EcoTech Herrera & Pérez S.A.S.
- Enfoque en análisis cuantitativo, econometría, modelado financiero y gestión de datos.
- Experiencia laboral: Gestión de Activos y Logística Administrativa en Clínica San José (Cuenca, 2021-2022) — optimización de inventarios médicos, saneamiento de bases de datos contables, coordinación operativa.
- Proyectos: "Predictor de Inflación Local" (modelo econométrico de series temporales, Python/Pandas/Statsmodels) y "Dashboard de Finanzas Personales" (React, visualización de interés compuesto).
- Contacto: kherrerar3@unemi.edu.ec. LinkedIn y GitHub enlazados en el sitio.

CANDIDATURA — REPRESENTACIÓN ESTUDIANTIL 2026:
- Karen es candidata a representante estudiantil, 2do nivel C2, UNEMI.
- Posición 1 en su candidatura, promedio 97.83.
- Votaciones: del 7 al 9 de septiembre, a través del Sistema de Gestión Académica (SGA) de la UNEMI, módulo "Proceso Estudiantil" (sgaestudiante.unemi.edu.ec), con cuenta institucional.
- Tres pilares de su candidatura: Competencia (trayectoria académica verificable), Integridad (mismo trato dentro y fuera del aula) y Cercanía (escuchar antes de proponer).
- Tres propuestas concretas: (1) canal de comunicación directa y trazable entre el curso, docentes y coordinación; (2) reportes mensuales de seguimiento sobre qué se planteó y qué se resolvió; (3) espacios de acompañamiento entre compañeros antes de exámenes y entregas clave.
- Si preguntan por otros candidatos: mantente neutral, respetuoso y no hagas comparaciones negativas. Enfócate solo en la propuesta de Karen.

EL SITIO WEB:
- Inicio, Sobre Mí (trayectoria), Publicaciones, Actualidad Económica (videos y análisis sobre inflación, canasta básica, microfinanzas rurales, economía digital), Representación Estudiantil 2026 (la candidatura).
- El sitio tiene un chat de voz: el visitante puede hablar con el asistente y escuchar las respuestas.

REGLAS DE RESPUESTA:
1. Responde SIEMPRE en español.
2. Usa Markdown (listas, negritas, tablas) para que la información sea fácil de leer.
3. No inventes datos que no estén aquí (cifras, fechas, cargos). Si no sabes algo, dilo y sugiere contactar a Karen por correo.
4. Si preguntan cómo votar, da el enlace del SGA y las fechas exactas.
5. Si la pregunta es técnica de economía, demuestra rigor, pero sé breve y claro.`;

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
