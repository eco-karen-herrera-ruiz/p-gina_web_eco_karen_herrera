'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function EnvironmentDecorations() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Luces de neón rosadas ambientales (Glows) */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-rose-400/10 rounded-full blur-[100px]"
            />

            {/* Partículas de "Estrellas" (Micro-luces) */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`star-${i}`}
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: Math.random() * 0.5,
                        scale: Math.random() * 0.5 + 0.5
                    }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
                />
            ))}

            {/* Sutiles formas de corazón abstractas (Blurry Hearts) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                <svg width="800" height="800" viewBox="0 0 24 24" fill="currentColor" className="text-pink-500 blur-[80px]">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </div>
        </div>
    );
}
