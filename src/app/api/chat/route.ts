import { NextRequest, NextResponse } from 'next/server';
import { GeminiService } from '@/shared/services/geminiService';
import { rateLimit } from '@/shared/utils/rate-limit';

const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_LENGTH = 20;

export async function POST(req: NextRequest) {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const { allowed, remaining } = rateLimit(ip, { maxRequests: 20, windowMs: 60_000 });

    if (!allowed) {
        return NextResponse.json(
            { error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' },
            {
                status: 429,
                headers: {
                    'Retry-After': '60',
                    'X-RateLimit-Remaining': '0',
                },
            }
        );
    }

    try {
        const body = await req.json();

        // Input validation
        if (!body || typeof body !== 'object') {
            return NextResponse.json({ error: 'Cuerpo de solicitud inválido.' }, { status: 400 });
        }

        const { messages } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Se requiere un array de mensajes.' }, { status: 400 });
        }

        if (messages.length === 0) {
            return NextResponse.json({ error: 'No se proporcionaron mensajes.' }, { status: 400 });
        }

        if (messages.length > MAX_HISTORY_LENGTH) {
            return NextResponse.json(
                { error: `Máximo ${MAX_HISTORY_LENGTH} mensajes permitidos.` },
                { status: 400 }
            );
        }

        // Validate each message
        for (const msg of messages) {
            if (!msg.content || typeof msg.content !== 'string') {
                return NextResponse.json({ error: 'Cada mensaje debe tener contenido de texto.' }, { status: 400 });
            }
            if (msg.content.length > MAX_MESSAGE_LENGTH) {
                return NextResponse.json(
                    { error: `Cada mensaje no puede exceder ${MAX_MESSAGE_LENGTH} caracteres.` },
                    { status: 400 }
                );
            }
            if (!['user', 'assistant', 'model'].includes(msg.role)) {
                return NextResponse.json({ error: 'Rol de mensaje inválido.' }, { status: 400 });
            }
        }

        const lastMessage = messages[messages.length - 1];

        const history = messages.slice(0, -1).map((msg: any) => ({
            role: (msg.role === 'assistant' ? 'model' : 'user') as 'model' | 'user',
            parts: [{ text: msg.content }],
        }));

        const stream = await GeminiService.generateStream(history, lastMessage.content);

        if (!stream) {
            throw new Error('No stream available');
        }

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache, no-transform',
                'Connection': 'keep-alive',
                'X-Content-Type-Options': 'nosniff',
                'X-RateLimit-Remaining': String(remaining),
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error interno del servidor';
        console.error('API_CHAT_ERROR:', message);
        return NextResponse.json(
            { error: 'Error interno del servidor. Intenta de nuevo más tarde.' },
            { status: 500 }
        );
    }
}
