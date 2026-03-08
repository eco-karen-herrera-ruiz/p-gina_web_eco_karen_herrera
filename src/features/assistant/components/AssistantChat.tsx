'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sparkles, Mic, MicOff, Volume2, VolumeX, Send, X, Bot, MessageSquare, Zap } from 'lucide-react';
import { stripMarkdown } from '@/shared/utils/sanitize';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function EcoAssistant() {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: '¡Hola! Soy EcoAssistant. ¿En qué puedo ayudarte hoy con respecto a la economía o el perfil de Karen?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(true);
    const [isLoadingVoice, setIsLoadingVoice] = useState(false);
    const [audioQueue, setAudioQueue] = useState<string[]>([]);
    const [isProcessingQueue, setIsProcessingQueue] = useState(false);
    const [isHandsFree, setIsHandsFree] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const [showPermissionGuide, setShowPermissionGuide] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // HYDRATION GUARD & AUDIO ANALYZER SETUP
    useEffect(() => {
        setMounted(true);
        audioRef.current = new Audio();

        const initRecognition = () => {
            if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
                const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.lang = 'es-EC';
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;

                recognitionRef.current.onresult = (event: any) => {
                    let interimTranscript = '';
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            setInput(event.results[i][0].transcript);
                        } else {
                            interimTranscript += event.results[i][0].transcript;
                        }
                    }
                    if (interimTranscript) setInput(interimTranscript);

                    if (isHandsFree) {
                        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
                        silenceTimerRef.current = setTimeout(() => {
                            handleSend();
                        }, 1800);
                    }
                };

                recognitionRef.current.onend = () => {
                    if (isHandsFree) {
                        try { recognitionRef.current.start(); } catch (e) { }
                    }
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error("🎤 Error de reconocimiento:", event.error);
                    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                        setShowPermissionGuide(true);
                        setIsHandsFree(false);
                        setIsListening(false);
                    }
                };
            }
        };

        initRecognition();

        return () => {
            stopAudioAnalysis();
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        };
    }, [isHandsFree]);

    const startAudioAnalysis = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            setShowPermissionGuide(false);

            const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
            const audioContext = new AudioContextClass();
            audioContextRef.current = audioContext;

            const analyser = audioContext.createAnalyser();
            analyserRef.current = analyser;

            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            analyser.fftSize = 64;

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const updateLevel = () => {
                if (!analyserRef.current) return;
                analyserRef.current.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
                const average = sum / bufferLength;
                setAudioLevel(average);
                if (isHandsFree) requestAnimationFrame(updateLevel);
                else setAudioLevel(0);
            };

            updateLevel();
            return true;
        } catch (err: any) {
            console.error("Error accediendo al micrófono:", err);
            setShowPermissionGuide(true);
            return false;
        }
    };

    const stopAudioAnalysis = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        setAudioLevel(0);
    };

    const toggleVoice = async () => {
        if (isHandsFree) {
            setIsHandsFree(false);
            setIsListening(false);
            recognitionRef.current?.stop();
            stopAudioAnalysis();
        } else {
            // Intentar forzar la aparición del prompt del navegador
            const hasPermission = await startAudioAnalysis();
            if (hasPermission) {
                setIsHandsFree(true);
                setIsListening(true);
                try {
                    recognitionRef.current?.start();
                } catch (e) {
                    console.warn("Recognition already started");
                }
            } else {
                // Si llegamos aquí, es porque el permiso está bloqueado permanentemente
                setShowPermissionGuide(true);
            }
        }
    };

    const copySettingsPath = () => {
        const path = "chrome://settings/content/microphone";
        navigator.clipboard.writeText(path);
        alert("Enlace copiado: " + path + "\n\nPégalo en tu barra de direcciones para habilitar el micrófono rápidamente.");
    };

    // Audio Queue Processor
    useEffect(() => {
        const processQueue = async () => {
            if (isProcessingQueue || audioQueue.length === 0 || !audioRef.current) return;

            setIsProcessingQueue(true);
            const nextText = audioQueue[0];

            try {
                await playAudioChunk(nextText);
            } catch (e) {
                console.error("Queue playback error:", e);
            } finally {
                setAudioQueue(prev => prev.slice(1));
                setIsProcessingQueue(false);
            }
        };

        processQueue();
    }, [audioQueue, isProcessingQueue]);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const playAudioChunk = (text: string): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            if (!isSpeaking || !audioRef.current) return resolve();

            console.log(`🔊 [Client] Intentando reproducir fragmento de audio: "${text.substring(0, 20)}..."`);
            setIsLoadingVoice(true);
            try {
                const response = await fetch('/api/voice', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text }),
                });

                if (!response.ok) {
                    const err = await response.json();
                    console.error("❌ [Client] Error en API Voice:", err);
                    throw new Error('Failed to generate voice');
                }

                const audioBlob = await response.blob();
                if (audioBlob.size < 100) {
                    console.warn("⚠️ [Client] Audio recibido es demasiado pequeño o vacío.");
                    throw new Error("Empty audio");
                }

                const audioUrl = URL.createObjectURL(audioBlob);
                console.log(`✅ [Client] Audio descargado correctamente (${audioBlob.size} bytes)`);

                audioRef.current.src = audioUrl;
                audioRef.current.onended = () => {
                    console.log("🏁 [Client] Fin de reproducción del fragmento");
                    resolve();
                };
                audioRef.current.onerror = (e) => {
                    console.error("❌ [Client] Error de reproducción HTML5 Audio:", e);
                    reject(e);
                };

                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("❌ [Client] Reproducción bloqueada por el navegador:", error);
                        // Fallback opcional a SpeechSynthesis si es bloqueado
                        resolve();
                    });
                }
            } catch (error) {
                console.warn('🔊 [Client] ElevenLabs falló, usando síntesis del navegador como respaldo:', error);

                // Fallback robusto
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'es-EC';
                utterance.onend = () => resolve();
                utterance.onerror = () => resolve();
                window.speechSynthesis.speak(utterance);
            } finally {
                setIsLoadingVoice(false);
            }
        });
    };

    const speak = async (text: string) => {
        if (!isSpeaking) return;
        const cleanText = stripMarkdown(text);
        if (!cleanText) return;
        setAudioQueue(prev => [...prev, cleanText]);
    };

    const handleSend = async (overrideInput?: string) => {
        const textToSend = overrideInput || input;
        if (!textToSend.trim() || loading) return;

        // Barge-in: Stop AI speaking when user sends a new message
        if (audioRef.current) {
            audioRef.current.pause();
            setAudioQueue([]);
        }

        const userMsg: Message = { role: 'user', content: textToSend };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        const assistantPlaceholder: Message = { role: 'assistant', content: '' };
        setMessages(prev => [...prev, assistantPlaceholder]);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMsg] }),
            });

            if (!res.ok || !res.body) throw new Error('Failed to start stream');

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = '';
            let sentenceBuffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.trim().startsWith('data: ')) {
                        const dataStr = line.replace('data: ', '').trim();
                        if (dataStr === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(dataStr);
                            const content = parsed.choices[0]?.delta?.content || '';
                            if (content) {
                                accumulatedContent += content;
                                sentenceBuffer += content;

                                // Detect sentence end for faster audio playback
                                if (/[.!?]\s$/.test(sentenceBuffer) || (sentenceBuffer.length > 80 && /[.!?]/.test(sentenceBuffer))) {
                                    speak(sentenceBuffer);
                                    sentenceBuffer = '';
                                }

                                setMessages(prev => {
                                    const newMsgs = [...prev];
                                    newMsgs[newMsgs.length - 1] = {
                                        role: 'assistant',
                                        content: accumulatedContent
                                    };
                                    return newMsgs;
                                });
                            }
                        } catch (e) { }
                    }
                }
            }

            // Final chunk
            if (sentenceBuffer.trim()) {
                speak(sentenceBuffer);
            }

        } catch (e) {
            console.error("Stream error:", e);
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-sans">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 45 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="h-16 w-16 bg-gradient-to-tr from-status-pink to-status-gold text-status-teal rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center border-2 border-white/50 backdrop-blur-sm group"
                    >
                        <Sparkles className="w-8 h-8 group-hover:animate-pulse" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-full bg-status-gold/30 -z-10"
                        />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showPermissionGuide && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                    >
                        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-status-gold/30 relative">
                            {/* Flecha indicadora (solo visual para guiar al candado) */}
                            <div className="absolute -top-12 right-1/4 animate-bounce hidden md:block">
                                <div className="text-white font-bold text-xs bg-status-teal px-3 py-1 rounded-full shadow-lg">
                                    Haz clic aquí arriba 🔒
                                </div>
                                <div className="w-2 h-2 bg-status-teal rotate-45 mx-auto -mt-1 shadow-lg" />
                            </div>

                            <div className="w-16 h-16 bg-status-gold/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <Mic className="w-8 h-8 text-status-gold" />
                            </div>
                            <h3 className="text-xl font-heading font-black text-status-teal text-center mb-4 italic">Acceso Bloqueado</h3>
                            <p className="text-sm text-zinc-600 text-center mb-8 leading-relaxed">
                                El navegador ha bloqueado el micrófono. Para activarlo directamente:
                                <br /><br />
                                1. Haz clic en el **candado 🔒** de la barra de direcciones.
                                <br />
                                2. Activa el interruptor de **Micrófono**.
                            </p>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        setShowPermissionGuide(false);
                                        toggleVoice();
                                    }}
                                    className="w-full py-4 bg-status-teal text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg"
                                >
                                    Ya lo habilité, reintentar
                                </button>
                                <button
                                    onClick={() => setShowPermissionGuide(false)}
                                    className="w-full py-4 bg-zinc-100 text-zinc-500 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all"
                                >
                                    Cerrar guía
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 100, scale: 0.8, filter: 'blur(10px)' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="w-[400px] h-[600px] bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(15,41,38,0.2)] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 bg-gradient-to-r from-status-teal to-status-teal/90 text-white flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-status-gold rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                                        <Bot className="w-7 h-7 text-status-teal" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-status-teal animate-pulse" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-heading font-black tracking-tight leading-none italic">EcoAssistant</span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-status-gold/80 mt-1">AI Intelligence v3.0</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5 text-status-gold" />
                            </button>
                        </div>

                        {/* Messages Body */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-thin scrollbar-thumb-status-gold/20"
                        >
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] px-5 py-4 text-sm font-medium leading-relaxed rounded-[1.5rem] shadow-sm transform transition-all ${msg.role === 'user'
                                        ? 'bg-status-teal text-white rounded-tr-none'
                                        : 'bg-white border border-status-gold/30 text-status-teal rounded-tl-none'
                                        }`}>
                                        <div className="prose prose-sm prose-invert max-w-none">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    p: ({ children }) => <p className="mb-0 last:mb-0">{children}</p>,
                                                    strong: ({ children }) => <strong className="font-black text-status-gold">{children}</strong>,
                                                    ul: ({ children }) => <ul className="list-disc ml-4 my-2">{children}</ul>,
                                                    ol: ({ children }) => <ol className="list-decimal ml-4 my-2">{children}</ol>,
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                        {msg.role === 'assistant' && (
                                            <div className="mt-2 pt-2 border-t border-status-gold/10 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-status-goldText">
                                                <Zap className="w-3 h-3" />
                                                EcoTech Engine
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <div className="flex gap-2 pl-4 items-center">
                                    <div className="w-8 h-8 bg-status-gold/10 rounded-full flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-status-gold rounded-full animate-bounce [animation-delay:0s]" />
                                        <div className="w-1.5 h-1.5 bg-status-gold rounded-full animate-bounce [animation-delay:0.2s] mx-1" />
                                        <div className="w-1.5 h-1.5 bg-status-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                    <span className="text-[10px] font-bold text-status-goldText uppercase tracking-widest animate-pulse">Analizando...</span>
                                </div>
                            )}
                            {isLoadingVoice && (
                                <div className="flex gap-2 pl-4 items-center">
                                    <div className="w-8 h-8 bg-status-teal/10 rounded-full flex items-center justify-center">
                                        <Volume2 className="w-4 h-4 text-status-teal animate-pulse" />
                                    </div>
                                    <span className="text-[10px] font-bold text-status-teal uppercase tracking-widest animate-pulse">Generando voz...</span>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white/40 border-t border-status-gold/20 backdrop-blur-md">
                            <div className="flex gap-3 mb-4">
                                <button
                                    onClick={toggleVoice}
                                    className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-[10px] uppercase tracking-widest ${isHandsFree
                                        ? 'bg-red-500 text-white animate-pulse'
                                        : 'bg-status-teal/5 text-status-teal hover:bg-status-teal/10'
                                        }`}
                                >
                                    {isHandsFree ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                    {isHandsFree ? 'Manos Libres' : 'Modo Voz'}
                                </button>
                                <button
                                    onClick={() => setIsSpeaking(!isSpeaking)}
                                    className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-[10px] uppercase tracking-widest ${isSpeaking
                                        ? 'bg-status-gold/20 text-status-goldText'
                                        : 'bg-zinc-100 text-zinc-400'
                                        }`}
                                >
                                    {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                    Audio
                                </button>
                            </div>
                            <div className="relative group">
                                <input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    placeholder="Escribe tu consulta económica..."
                                    className="w-full pl-6 pr-14 py-4 bg-white/80 border-2 border-status-gold/20 rounded-[1.25rem] text-sm font-medium outline-none focus:border-status-gold focus:ring-4 focus:ring-status-gold/10 transition-all placeholder:text-status-teal/30"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || loading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-status-teal text-status-gold rounded-xl hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:scale-100"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="mt-4 text-[9px] text-center font-bold text-status-teal/40 uppercase tracking-widest">
                                Powered by Llama 3.1 & Groq
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

