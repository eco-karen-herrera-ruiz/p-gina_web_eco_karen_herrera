import { NextRequest, NextResponse } from 'next/server';
import { GeminiService } from '@/shared/services/geminiService';

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "No se proporcionaron mensajes válidos." }, { status: 400 });
        }

        const lastMessage = messages[messages.length - 1];

        const history = messages.slice(0, -1).map((msg: any) => ({
            role: (msg.role === 'assistant' ? 'model' : 'user') as "model" | "user",
            parts: [{ text: msg.content }]
        }));

        const stream = await GeminiService.generateStream(history, lastMessage.content);

        if (!stream) {
            throw new Error("No stream available");
        }

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error: any) {
        console.error("API_CHAT_ERROR:", error);
        return NextResponse.json({
            error: error.message || "Error interno en el núcleo AI EcoAssistant."
        }, { status: 500 });
    }
}
