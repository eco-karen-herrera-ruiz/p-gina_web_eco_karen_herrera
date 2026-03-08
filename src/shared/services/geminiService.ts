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

export class GeminiService {
    static async generateResponse(history: any[], message: string) {
        try {
            const apiKey = env.GROQ_API_KEY;
            const API_URL = "https://api.groq.com/openai/v1/chat/completions";

            // Formatear historial para el estándar OpenAI/Groq
            const messages = [
                { role: "system", content: SYSTEM_INSTRUCTION },
                ...history.map(msg => ({
                    role: msg.role === 'model' ? 'assistant' : 'user',
                    content: msg.parts ? msg.parts[0].text : msg.content
                })),
                { role: "user", content: message }
            ];

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant", // El modelo más rápido y estable de Groq
                    messages,
                    temperature: 0.7,
                    max_tokens: 1024
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("GROQ_API_ERROR:", errorData);
                throw new Error(errorData.error?.message || "Error al conectar con el servidor de IA.");
            }

            const data = await response.json();
            return data.choices[0].message.content;

        } catch (error: any) {
            console.error("SERVICE_LAYER_ERROR [Groq]:", error);
            throw new Error(error.message || "Error al procesar la solicitud con el motor de IA.");
        }
    }

    static async generateStream(history: any[], message: string) {
        const apiKey = env.GROQ_API_KEY;
        const API_URL = "https://api.groq.com/openai/v1/chat/completions";

        const messages = [
            { role: "system", content: SYSTEM_INSTRUCTION },
            ...history.map(msg => ({
                role: msg.role === 'model' ? 'assistant' : 'user',
                content: msg.parts ? msg.parts[0].text : msg.content
            })),
            { role: "user", content: message }
        ];

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages,
                temperature: 0.7,
                max_tokens: 1024,
                stream: true, // Enable streaming
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "Error al conectar con Groq.");
        }

        return response.body; // Return the raw stream
    }
}
