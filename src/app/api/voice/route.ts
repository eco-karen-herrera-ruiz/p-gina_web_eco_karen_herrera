import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/shared/utils/rate-limit';

const MAX_TEXT_LENGTH = 5000;

export async function POST(req: NextRequest) {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const { allowed, remaining } = rateLimit(ip, { maxRequests: 10, windowMs: 60_000 });

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

        if (!body || typeof body !== 'object') {
            return NextResponse.json({ error: 'Cuerpo de solicitud inválido.' }, { status: 400 });
        }

        const { text } = body;

        if (!text || typeof text !== 'string') {
            return NextResponse.json({ error: 'Se requiere texto válido.' }, { status: 400 });
        }

        if (text.length > MAX_TEXT_LENGTH) {
            return NextResponse.json(
                { error: `El texto no puede exceder ${MAX_TEXT_LENGTH} caracteres.` },
                { status: 400 }
            );
        }

        const apiKey = process.env.ELEVENLABS_API_KEY;
        const voiceId = process.env.ELEVENLABS_VOICE_ID || 'ajOR9IDAaubDK5qtLUqQ';

        if (!apiKey) {
            console.error('Voice API: API key not configured');
            return NextResponse.json({ error: 'Servicio de voz no configurado.' }, { status: 500 });
        }

        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': apiKey,
                },
                body: JSON.stringify({
                    text,
                    model_id: 'eleven_multilingual_v2',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                    },
                }),
            }
        );

        if (!response.ok) {
            console.error('Voice API: ElevenLabs error', response.status);
            return NextResponse.json(
                { error: 'Error al generar el audio.' },
                { status: response.status }
            );
        }

        const audioBuffer = await response.arrayBuffer();

        return new NextResponse(audioBuffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': audioBuffer.byteLength.toString(),
                'X-RateLimit-Remaining': String(remaining),
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error interno del servidor';
        console.error('API_VOICE_ERROR:', message);
        return NextResponse.json(
            { error: 'Error interno del servidor.' },
            { status: 500 }
        );
    }
}
