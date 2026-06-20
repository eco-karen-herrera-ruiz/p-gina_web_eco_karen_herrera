import { z } from 'zod';

const envSchema = z.object({
    NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
    GOOGLE_AI_API_KEY: z.string().optional(),
    GROQ_API_KEY: z.string().optional(),
});

const _env = envSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
});

if (!_env.success) {
    console.error("❌ Invalid environment variables:", _env.error.format());
    throw new Error("Invalid environment variables");
}

export const env = _env.data;
