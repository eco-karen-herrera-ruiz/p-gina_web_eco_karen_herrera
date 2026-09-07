'use client';

import React, { useEffect, useRef } from 'react';

interface VoiceOrbProps {
    /** Web Audio analyser to read live audio data from (mic while listening, TTS playback while speaking). */
    analyser: AnalyserNode | null;
    /** Whether real audio is currently flowing — false falls back to a gentle idle sine animation. */
    active: boolean;
    mode: 'idle' | 'listening' | 'speaking';
    /** Canvas size in px (square). */
    size?: number;
    className?: string;
}

const COLORS = {
    navy: '#0F1E2D',
    gold: '#C8963E',
    goldLight: '#E8D5B0',
};

interface Ring {
    radiusFactor: number; // as a fraction of baseRadius
    freq: number; // how many sine "petals" wrap around the ring
    speed: number; // phase speed
    ampFactor: number; // wobble amplitude as a fraction of baseRadius
    width: number;
}

const RINGS: Ring[] = [
    { radiusFactor: 1.9, freq: 1, speed: 0.6, ampFactor: 0.5, width: 2 },
    { radiusFactor: 1.45, freq: 1, speed: -0.9, ampFactor: 0.38, width: 1.5 },
    { radiusFactor: 1.05, freq: 1, speed: 1.3, ampFactor: 0.22, width: 1.5 },
];

/**
 * Canvas-driven "Jarvis HUD" voice visualizer: concentric rings whose edges
 * ripple with the real audio waveform (time-domain samples, i.e. an actual
 * oscillating sine-like signal) plus a live oscilloscope trace through the
 * core. Runs its own requestAnimationFrame loop reading directly from the
 * analyser so it never forces a React re-render.
 */
export const VoiceOrb: React.FC<VoiceOrbProps> = ({ analyser, active, mode, size = 200, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number | undefined>(undefined);
    const phaseRef = useRef(0);
    const levelRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.scale(dpr, dpr);

        const timeData = analyser ? new Uint8Array(analyser.fftSize) : null;

        // Given an angle in [0, 2π) and a ring's wave params, returns a
        // wobble offset — sampled from the real waveform when audio is
        // flowing, otherwise a synthetic idle sine so the HUD never looks dead.
        const sampleWave = (angleT: number, ring: Ring): number => {
            if (analyser && timeData && active) {
                const idx = Math.floor(angleT * (timeData.length - 1));
                const sampleVal = (timeData[idx] - 128) / 128; // -1..1
                return sampleVal;
            }
            return Math.sin(angleT * Math.PI * 2 * ring.freq + phaseRef.current * ring.speed * 2) * 0.35;
        };

        const draw = () => {
            phaseRef.current += 0.016;
            const cx = size / 2;
            const cy = size / 2;
            const baseRadius = size * 0.16;

            ctx.clearRect(0, 0, size, size);

            // Live amplitude (0..1), used to scale glow/core/ring intensity
            if (analyser && timeData && active) {
                analyser.getByteTimeDomainData(timeData);
                let sum = 0;
                for (let i = 0; i < timeData.length; i++) sum += Math.abs(timeData[i] - 128);
                const avg = sum / timeData.length / 128;
                levelRef.current += (avg - levelRef.current) * 0.25;
            } else {
                levelRef.current += ((0.15 + 0.05 * Math.sin(phaseRef.current * 1.5)) - levelRef.current) * 0.05;
            }
            const level = levelRef.current;

            const ringColor = mode === 'listening' ? COLORS.goldLight : COLORS.gold;

            // Concentric rippling rings — the "Jarvis" sonar-HUD look
            RINGS.forEach((ring) => {
                const radius = baseRadius * ring.radiusFactor;
                const amp = baseRadius * ring.ampFactor * (0.3 + level * 1.4);
                ctx.beginPath();
                const steps = 96;
                for (let i = 0; i <= steps; i++) {
                    const t = i / steps;
                    const angle = t * Math.PI * 2 + phaseRef.current * ring.speed * 0.3;
                    const wobble = sampleWave(t, ring) * amp;
                    const r = radius + wobble;
                    const x = cx + Math.cos(angle) * r;
                    const y = cy + Math.sin(angle) * r;
                    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.strokeStyle = ringColor;
                ctx.globalAlpha = 0.55;
                ctx.lineWidth = ring.width;
                ctx.shadowColor = ringColor;
                ctx.shadowBlur = 6 + level * 14;
                ctx.stroke();
            });
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

            // Live oscilloscope trace through the core — a real sine-like
            // waveform readout, the classic Jarvis voice signature
            const traceWidth = baseRadius * 1.7;
            ctx.beginPath();
            const traceSteps = 64;
            for (let i = 0; i <= traceSteps; i++) {
                const t = i / traceSteps;
                let y: number;
                if (analyser && timeData && active) {
                    const idx = Math.floor(t * (timeData.length - 1));
                    y = cy + ((timeData[idx] - 128) / 128) * baseRadius * 0.85;
                } else {
                    y = cy + Math.sin(t * Math.PI * 4 + phaseRef.current * 3) * baseRadius * 0.18;
                }
                const x = cx - traceWidth / 2 + t * traceWidth;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = COLORS.goldLight;
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.shadowColor = COLORS.gold;
            ctx.shadowBlur = 10 + level * 16;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Central glowing core, breathing with the live level
            const coreRadius = baseRadius * (0.5 + level * 0.35);
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
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.arc(cx, cy, baseRadius * 0.5, 0, Math.PI * 2);
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
