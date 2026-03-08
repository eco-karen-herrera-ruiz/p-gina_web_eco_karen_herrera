'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    Bot,
    User,
    Terminal,
    Cpu,
    History,
    ShieldAlert
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Estructura de historia para la API REST de Gemini
interface GeminiPart {
    text: string;
}

interface GeminiContent {
    role: "user" | "model";
    parts: GeminiPart[];
}

export default function ChatSandbox() {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant' | 'error', text: string }[]>([]);
    const [history, setHistory] = useState<GeminiContent[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: history
                })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Error al conectar con la IA.");
            }

            const aiResponse = data.content;

            // Actualizar UI
            setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);

            // Actualizar Historial para el contexto (formato REST)
            setHistory(prev => [
                ...prev,
                { role: 'user', parts: [{ text: userMessage }] },
                { role: 'model', parts: [{ text: aiResponse }] }
            ]);

        } catch (error: any) {
            setMessages(prev => [...prev, { role: 'error', text: `ERROR: ${error.message}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-zinc-950 text-zinc-300 font-sans overflow-hidden">
            {/* Sidebar minimalista */}
            <aside className="w-64 border-r border-white/10 bg-black/40 flex flex-col p-6">
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <Cpu className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="font-bold text-white tracking-tight">EcoCore v2</span>
                </div>

                <div className="space-y-4 flex-1">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Estado del Sandbox</p>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            <span>API Gateway Activo</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <History className="w-3 h-3" />
                            <span>{history.length / 2} Turnos de Memoria</span>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 text-[10px] text-zinc-600 flex items-center gap-2">
                    <ShieldAlert className="w-3 h-3" />
                    <span>No Sensitive Data Leakage</span>
                </div>
            </aside>

            {/* Chat Area */}
            <main className="flex-1 flex flex-col pt-6">
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-10 space-y-8 pb-10">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-4">
                            <Terminal className="w-12 h-12 text-zinc-800" />
                            <p className="text-sm text-zinc-500">Inicia una sesión de prueba con el núcleo de IA de Karen Herrera.</p>
                        </div>
                    )}

                    <AnimatePresence>
                        {messages.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : ''}`}
                            >
                                {m.role !== 'user' && (
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${m.role === 'assistant' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                        <Bot className="w-4 h-4" />
                                    </div>
                                )}

                                <div className={`max-w-[70%] p-4 rounded-2xl text-sm ${m.role === 'user'
                                        ? 'bg-zinc-800 text-white rounded-tr-none'
                                        : m.role === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-transparent text-zinc-300'
                                    }`}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {m.text}
                                    </ReactMarkdown>
                                </div>

                                {m.role === 'user' && (
                                    <div className="w-8 h-8 rounded-lg bg-zinc-700 flex items-center justify-center text-zinc-400 border border-white/5">
                                        <User className="w-4 h-4" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && (
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-emerald-500 animate-pulse" />
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" />
                                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Bar */}
                <div className="p-8 bg-zinc-950">
                    <div className="max-w-4xl mx-auto flex gap-4 bg-zinc-900 p-2 rounded-2xl border border-white/5 focus-within:border-emerald-500/50 transition-all">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder="Pregunta sobre economía..."
                            className="flex-1 bg-transparent border-none outline-none px-4 text-sm"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="p-3 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
