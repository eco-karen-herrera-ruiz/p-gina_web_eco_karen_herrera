# Econ-Digital Identity Framework - Karen Herrera Ruiz

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify)
![Security](https://img.shields.io/badge/Security-Strict-green)

Portafolio profesional para **Karen Dayanna Herrera Ruiz** – Economista y Especialista en Datos de la UNEMI. Estética sobria, corporativa, inspirada en LinkedIn y Stripe Docs, construida para ser segura, performante y accesible.

## 🏗️ Árbol de Directorios y Arquitectura

El proyecto emplea una estricta **Feature-Based Architecture**.

```text
src/
├── app/                  # Next.js App Router (Páginas y UI global)
│   ├── globals.css       # Variables CSS de Shadcn y Tailwind
│   ├── layout.tsx        # Inyección de fuentes (DM Sans, Playfair, DM Mono)
│   └── page.tsx          # Integración principal de features
│
├── core/                 # Configuraciones globales y wrappers
│   ├── config/           # Validaciones (env.ts con Zod) y Headings CSP
│   ├── layouts/          # RootLayout, Navbar global y Footer
│   └── theme/            # design-tokens.ts (Colores UNEMI, tipografía)
│
├── features/             # Módulos de negocio independientes
│   ├── economic-insights/# Dashboard de KPIs con minigráficos (Recharts)
│   ├── soft-skills-dashboard/ # Soft-Skills Analytics Framework (SSAF)
│   ├── experience-timeline/ # Render de trayectoria
│   └── profile-header/   # Hero principal, avatar, metadata y botones
│
└── shared/               # Código reutilizable agnóstico a features
    ├── components/       # Componentes atómicos e UI
    │   ├── atoms/        # Button (variantes con CVA)
    │   └── molecules/    # Card compuesto (Header, Title, Content)
    ├── hooks/            # Lógica (useProfile.ts para datos, useSafeRender)
    ├── services/         # Inyección de dependencias (API/Mocks)
    ├── types/            # Tipado estricto global (interfaces)
    └── utils/            # Utilidades generales (sanitize.ts DOMPurify)
```

## 🔒 Security-First Approach

1. **Prevención XSS**: Todo el contenido dinámico del CMS / API debe pasar por la función `sanitize()` (`src/shared/utils/sanitize.ts`) basada en `isomorphic-dompurify`.
2. **CSP Estricto**: `next.config.js` y `netlify.toml` inyectan headers robustos (HSTS, DENY en Frame Options, nosniff, etc.).
3. **Validación de Entorno**: `src/core/config/env.ts` usa `Zod` para garantizar que la app no inicie sin las variables vitales y seguras en tiempo de ejecución.

## 📊 Soft-Skills Analytics Framework (SSAF)

Incluye un módulo de analítica cuantitativa enfocado en competencias blandas:
- **Radar de Análisis y Síntesis**
- **Barras de Progreso de Resolución de Problemas**
- **Dashboard de Sinergia y Comunicación**
- **Termómetro de Pensamiento Crítico**
- **Mapa de Alcance Globalizado** (vía `react-simple-maps`)

## 🚀 Instalación y Despliegue

### Entorno de Desarrollo

Requisitos: Node.js 18+

```bash
git clone <repository-url>
cd econdigital-identity
npm install
npm run dev
```

La aplicación correrá en `http://localhost:3000`.

### Despliegue en Netlify

El proyecto incluye el archivo `netlify.toml` configurado para un deploy fácil.
1. Conecta el repositorio a Netlify.
2. Netlify automáticamente detectará `npm run build` como comando de construcción y `.next` como directorio de publicación gracias al plugin de Next.js.
3. Los security headers están definidos directamente en la capa de CDN para mayor rendimiento.

## 📋 Principios SOLID Aplicados

- **Single Responsibility**: `ProfileHeader` solo se encarga de UI; el request de datos ocurre vía hook `useProfile`.
- **Open/Closed**: Atomos como `Button` extienden a través del prop `variant` y `size` y clases CSS gracias a `cva`.
- **Dependency Inversion**: `Home` en `page.tsx` no se acopla a una API estática. Utiliza `ProfileService` inyectado mediante hook.
