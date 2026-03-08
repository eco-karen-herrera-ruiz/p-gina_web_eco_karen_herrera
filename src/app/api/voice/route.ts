import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID || 'ajOR9IDAaubDK5qtLUqQ';

    console.log(`🎤 [API Voice] Procesando texto: "${text.substring(0, 30)}..."`);
    console.log(`🔑 [API Voice] Usando Voice ID: ${voiceId}`);

    if (!apiKey) {
      console.error('❌ [API Voice] API Key no encontrada en .env');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
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
      const errorData = await response.json();
      console.error('❌ [API Voice] Error de ElevenLabs:', JSON.stringify(errorData));
      return NextResponse.json({ 
        error: errorData.detail?.message || 'Failed to generate voice',
        details: errorData 
      }, { status: response.status });
    }

    const audioBuffer = await response.arrayBuffer();
    console.log(`✅ [API Voice] Audio generado: ${audioBuffer.byteLength} bytes`);

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });
  } catch (error: any) {
    console.error('❌ [API Voice] Error crítico:', error.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
