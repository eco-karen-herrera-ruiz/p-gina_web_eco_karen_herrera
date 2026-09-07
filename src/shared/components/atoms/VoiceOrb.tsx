'use client';

import React, { useEffect, useRef } from 'react';

interface VoiceOrbProps {
    /** Web Audio analyser to read live frequency data from (mic while listening, TTS playback while speaking). */
    analyser: AnalyserNode | null;
    /** Whether real audio is currently flowing — false falls back to a gentle idle breathing animation. */
    active: boolean;
    mode: 'idle' | 'listening' | 'speaking';
    /** Canvas size in px (square). */
    size?: number;
    className?: string;
}

const COLORS = {
    navy: '#0F1E2D',
    navyLight: '#1A3447',
    gold: '#C8963E',
    goldLight: '#E8D5B0',
};

const BAR_COUNT = 48;

/**
 * Canvas-driven radial audio visualizer (Jarvis-console style): a glowing
 * core ringed by bars that oscillate to real frequency data. Runs its own
 * requestAnimationFrame loop reading directly from the analyser so it never
 * forces a React re-render — smooth at 60fps regardless of chat state.
 */
export const VoiceOrb: React.FC<VoiceOrbProps> = ({ analyser, active, mode, size = 200, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number | undefined>(undefined);
    const phaseRef = useRef(0);
    const barsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.scale(dpr, dpr);

        const freqData = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
        const bars = barsRef.current;

        const draw = () => {
            phaseRef.current += 0.02;
            const cx = size / 2;
            const cy = size / 2;
            const baseRadius = size * 0.22;

            ctx.clearRect(0, 0, size, size);

            if (analyser && freqData && active) {
                analyser.getByteFrequencyData(freqData);
                for (let i = 0; i < BAR_COUNT; i++) {
                    const binIndex = Math.floor((i / BAR_COUNT) * freqData.length * 0.85) + 1;
                    const raw = freqData[Math.min(binIndex, freqData.length - 1)] / 255;
                    bars[i] += (raw - bars[i]) * 0.35;
                }
            } else {
                for (let i = 0; i < BAR_COUNT; i++) {
                    const idle = 0.1 + 0.05 * Math.sin(phaseRef.current * 1.4 + i * 0.4);
                    bars[i] += (idle - bars[i]) * 0.06;
                }
            }

            // Slow rotating outer ring
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(phaseRef.current * 0.15);
            ctx.strokeStyle = 'rgba(200,150,62,0.25)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.46, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // Radial equalizer bars
            const glow = mode === 'listening' ? COLORS.goldLight : COLORS.gold;
            for (let i = 0; i < BAR_COUNT; i++) {
                const angle = (i / BAR_COUNT) * Math.PI * 2 + phaseRef.current * 0.05;
                const magnitude = bars[i];
                const barLen = baseRadius * 0.15 + magnitude * baseRadius * 1.1;
                const x1 = cx + Math.cos(angle) * baseRadius;
                const y1 = cy + Math.sin(angle) * baseRadius;
                const x2 = cx + Math.cos(angle) * (baseRadius + barLen);
                const y2 = cy + Math.sin(angle) * (baseRadius + barLen);

                ctx.strokeStyle = glow;
                ctx.lineWidth = 2.5;
                ctx.lineCap = 'round';
                ctx.shadowColor = glow;
                ctx.shadowBlur = 8 + magnitude * 16;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
            ctx.shadowBlur = 0;

            // Central glowing core
            const avg = bars.reduce((a, b) => a + b, 0) / BAR_COUNT;
            const coreScale = 1 + (active ? avg * 0.4 : Math.sin(phaseRef.current) * 0.03);
            const coreRadius = baseRadius * 0.62 * coreScale;
            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
            gradient.addColorStop(0, COLORS.goldLight);
            gradient.addColorStop(0.55, COLORS.gold);
            gradient.addColorStop(1, 'rgba(200,150,62,0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = COLORS.navy;
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(cx, cy, baseRadius * 0.62, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;

            rafRef.current = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [analyser, active, mode, size]);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: size, height: size }}
            className={className}
            aria-hidden="true"
        />
    );
};
