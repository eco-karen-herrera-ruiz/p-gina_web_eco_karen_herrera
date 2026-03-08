import { ProfileData } from '../types';

export const mockProfileData: ProfileData = {
    name: "Karen Dayanna Herrera Ruiz",
    title: "Economista en Formación | Fundadora de EcoTech Herrera & Pérez S.A.S.",
    university: "Universidad Estatal de Milagro (UNEMI)",
    about: "Estudiante de Economía en la UNEMI con un fuerte enfoque en el análisis cuantitativo y la gestión de datos. Comprometida con la excelencia académica y el desarrollo de soluciones digitales que aporten valor económico y social.",
    email: "kherrerar3@unemi.edu.ec",
    linkedin: "https://linkedin.com/in/karenherrera",
    github: "https://github.com/eco-karen-herrera-ruiz",
    avatarUrl: "/images/Gemini_Generated_Image_gmj6kpgmj6kpgmj6.png",
    resumeUrl: "/docs/karen_herrera_resume.pdf",
    experiences: [
        {
            id: "exp-1",
            role: "Gestión de Activos y Logística Administrativa",
            company: "Clínica San José",
            location: "Cuenca, Ecuador",
            startDate: "2021-01-01",
            endDate: "2022-12-31",
            description: "Enfoque en eficiencia operativa y saneamiento de datos administrativos.",
            highlights: [
                "Optimización del flujo de inventarios y suministros médicos mediante análisis de demanda interna.",
                "Saneamiento y organización de bases de datos contables, reduciendo inconsistencias en el reporte de información.",
                "Coordinación de agendas y recursos operativos bajo estándares de eficiencia y ética profesional."
            ]
        }
    ],
    skills: [
        {
            category: "Hard Skills",
            items: [
                { id: "sk-1", name: "Análisis de Datos (R/Python)", level: 4, endorsements: 12 },
                { id: "sk-2", name: "Econometría", level: 5, endorsements: 15 },
                { id: "sk-3", name: "Modelado Financiero", level: 4, endorsements: 8 }
            ]
        },
        {
            category: "Soft Skills",
            items: [
                { id: "sk-4", name: "Pensamiento Crítico", level: 5, endorsements: 20 },
                { id: "sk-5", name: "Comunicación de Datos", level: 4, endorsements: 14 }
            ]
        }
    ],
    projects: [
        {
            id: "proj-1",
            title: "Predictor de Inflación Local",
            description: "Modelo econométrico de series temporales para predecir fluctuaciones en mercados locales.",
            url: "https://example.com/project-1",
            tags: ["Python", "Pandas", "Statsmodels"]
        },
        {
            id: "proj-2",
            title: "Dashboard de Finanzas Personales",
            description: "Herramienta interactiva para proyectar crecimiento patrimonial basado en interés compuesto.",
            url: "https://example.com/project-2",
            tags: ["React", "DataViz", "Finances"]
        }
    ],
    kpis: [
        { id: "kpi-1", label: "Portafolio de Soluciones Analíticas", value: "12", trend: "up", percentage: 40 },
        { id: "kpi-2", label: "Índice de Fiabilidad de Datos", value: "98.5%", trend: "up", percentage: 5 },
        { id: "kpi-3", label: "Inversión en Capital Intelectual", value: "1,402", trend: "up" }
    ],
    ssaf: {
        barChartData: [
            { name: "Análisis Cuantitativo", value: 95, description: "Capacidad para transformar variables crudas en indicadores clave (KPIs), utilizando rigor estadístico para identificar tendencias y patrones de comportamiento económico." },
            { name: "Pensamiento Sistémico", value: 92, description: "Comprensión de la interdependencia entre micro-variables administrativas y el impacto macro en la organización, optimizando la cadena de valor." },
            { name: "Comunicación Técnica", value: 88, description: "Habilidad para traducir hallazgos económicos complejos en reportes ejecutivos claros, facilitando la toma de decisiones en equipos multidisciplinarios." },
            { name: "Ética y Responsabilidad Social", value: 100, description: "Compromiso con la integridad del dato y el cumplimiento de normativas institucionales, asegurando una gestión transparente y equitativa de los recursos." },
            { name: "Adaptabilidad Tecnológica", value: 96, description: "Dominio ágil de entornos virtuales (UNEMI Online) y herramientas de control de versiones (GitHub) para la colaboración técnica remota." }
        ],
        donutChartData: [
            { name: "Entornos Virtuales", value: 45, percentage: "45%", description: "Autogestión y disciplina productiva bajo la modalidad en línea de la UNEMI, optimizando el uso de plataformas digitales." },
            { name: "Scrum/Ágil", value: 30, percentage: "30%", description: "Metodologías de trabajo colaborativo para la resolución de problemas en tiempos críticos, priorizando entregables de alto valor." },
            { name: "Presencial", value: 25, percentage: "25%", description: "Relaciones interpersonales y logística operativa desarrolladas en entornos de alta demanda (Sector Salud)." }
        ],
        lineChartData: [
            { name: "2020", value1: 40, value2: 50 },
            { name: "2021", value1: 60, value2: 65 },
            { name: "2022", value1: 75, value2: 70 },
            { name: "2023", value1: 85, value2: 80 },
            { name: "2024", value1: 95, value2: 90 }
        ],
        criticalThinkingGauge: {
            score: 92,
            target: 100
        }
    }
};

export class ProfileService {
    /**
     * Fetches profile data. In a real application, this would call an API.
     * Here we mock a slight delay to simulate network latency.
     */
    static async getProfile(): Promise<ProfileData> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockProfileData);
            }, 500); // 500ms network simulation
        });
    }
}
