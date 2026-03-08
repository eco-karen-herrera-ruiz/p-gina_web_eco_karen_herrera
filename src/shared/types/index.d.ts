// src/shared/types/index.d.ts

export interface Experience {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    highlights: string[];
}

export interface Skill {
    id: string;
    name: string;
    level: number; // 1 to 5
    endorsements: number;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    url: string;
    githubUrl?: string;
    tags: string[];
}

export interface KPI {
    id: string;
    label: string;
    value: string;
    trend: "up" | "down" | "neutral";
    percentage?: number;
}

export interface BarData {
    name: string;
    value: number;
    category?: string;
    description?: string;
}

export interface LineData {
    name: string;
    value1: number;
    value2: number;
}

export interface PieData {
    name: string;
    value: number;
    percentage: string;
    description?: string;
}

export interface SSAFData {
    barChartData: BarData[];
    donutChartData: PieData[];
    lineChartData: LineData[];
    criticalThinkingGauge: { score: number; target: number };
}

export interface ProfileData {
    name: string;
    title: string;
    university: string;
    about: string;
    email: string;
    linkedin: string;
    github: string;
    avatarUrl: string;
    resumeUrl: string;
    experiences: Experience[];
    skills: {
        category: string;
        items: Skill[];
    }[];
    projects: Project[];
    kpis: KPI[];
    ssaf?: SSAFData;
}
