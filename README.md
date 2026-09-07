<div align="center">

<img src="./public/images/og-cover.png" alt="Karen Herrera Ruiz — Portafolio Profesional" width="100%" />

<br/>

### Portafolio digital y centro de campaña estudiantil de **Karen Dayanna Herrera Ruiz**
Economista en formación · UNEMI · Fundadora, EcoTech Herrera & Pérez S.A.S.

<br/>

[![Sitio en vivo](https://img.shields.io/badge/Sitio_en_vivo-ecokarenherrera.dpdns.org-0F1E2D?style=for-the-badge&logo=vercel&logoColor=C8963E)](https://ecokarenherrera.dpdns.org)

<br/>

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Docker](https://img.shields.io/badge/Portable-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Lighthouse Accessibility](https://img.shields.io/badge/Lighthouse_a11y-100%2F100-2F6B4F?style=flat-square&logo=lighthouse&logoColor=white)
![License](https://img.shields.io/badge/License-Privado-8A93A0?style=flat-square)

</div>

<br/>

## Sobre el proyecto

Sitio corporativo construido con **Next.js 14 (App Router)**, diseñado con una estética ejecutiva sobria (navy `#0F1E2D` + dorado `#C8963E`) y una arquitectura por *features*. Cumple una doble función: portafolio profesional de datos/economía, y plataforma de campaña para la elección de representante estudiantil de la UNEMI.

No es una maqueta — cada métrica de esta tabla se midió con Lighthouse contra el build de producción real, no contra el servidor de desarrollo:

| Métrica | Resultado |
|---|---|
| Accesibilidad (Lighthouse) | **100 / 100** |
| Largest Contentful Paint | **2.6s** (antes: 5.1s) |
| Peso de página (home) | **1.5 MB** (antes: 3.9 MB) |
| Contraste WCAG AA | Cumple en todo el sitio |
| Responsive | Verificado en 375px / 768px / 1440px |

## Características

- 🎯 **Portafolio ejecutivo** — trayectoria, formación, publicaciones y análisis económico
- 🗳️ **Representación Estudiantil 2026** — plataforma de candidatura con propuestas concretas
- 🤖 **EcoAssistant** — chatbot conversacional (Groq/Llama 3.1) con modo de voz y texto a voz
- 🔒 **CSP estricto con nonce por request** — sin debilitar seguridad para lograr compatibilidad
- 📱 **Menú móvil real** — navegación completa en cualquier tamaño de pantalla
- 🌐 **SEO** — sitemap, robots.txt y Open Graph dinámicos

## Arquitectura

Organización por *features*, no por tipo de archivo — cada dominio de negocio es autocontenido.

```text
src/
├── app/                        # Next.js App Router
│   ├── page.tsx                 # Home (Server Component)
│   ├── about/                    # Perfil extendido
│   ├── representacion-estudiantil/ # Candidatura 2026
│   ├── publicaciones/            # Artículos y análisis
│   ├── actualidad-economica/     # Contenido económico
│   ├── legal/                    # Aviso legal · privacidad · cookies
│   ├── api/                      # Rutas /chat y /voice (EcoAssistant)
│   ├── sitemap.ts · robots.ts    # SEO dinámico
│   └── icon.svg                  # Favicon
│
├── core/
│   ├── config/                  # Validación de entorno (Zod)
│   ├── layouts/                  # RootLayout — header, footer, menú móvil
│   └── theme/                    # Tokens de diseño (color, tipografía)
│
├── features/
│   ├── assistant/                # EcoAssistant (chat + voz)
│   └── profile-header/           # Hero, avatar, CTAs
│
├── shared/
│   ├── components/               # Atoms · Molecules
│   ├── hooks/                    # useShare, useSafeRender…
│   ├── services/                 # ProfileService (inyectable)
│   └── utils/                    # sanitize.ts (DOMPurify), stripMarkdown.ts
│
└── middleware.ts                 # CSP con nonce por request
```

## Seguridad

| Capa | Implementación |
|---|---|
| CSP | Nonce único por request vía middleware — no usa `unsafe-inline` |
| Cabeceras | HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy |
| Sanitización | Todo HTML dinámico pasa por `isomorphic-dompurify` |
| Entorno | `env.ts` valida variables con Zod antes de arrancar |
| Secretos | Ninguno en el repositorio — gestionados vía variables de entorno en Vercel |

> **Nota honesta:** esto es una configuración de seguridad verificada, no un pentest formal certificado. Si tu proyecto maneja datos sensibles, contrata una auditoría con una firma certificada.

## Empezar en local

**Requisitos:** Node.js 20+

```bash
git clone https://github.com/eco-karen-herrera-ruiz/p-gina_web_eco_karen_herrera.git
cd p-gina_web_eco_karen_herrera
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Con Docker

```bash
docker compose up -d
```

Levanta la build `standalone` de Next.js en el puerto `3006`.

## Despliegue

Desplegado en **Vercel** con integración continua desde `main`. El `next.config.js` detecta el entorno (`process.env.VERCEL`) para omitir `output: 'standalone'` en Vercel (que empaqueta funciones por su cuenta) y activarlo solo para la imagen Docker — mismo código, dos targets de despliegue.

## Stack técnico

`Next.js 14` · `TypeScript` · `Tailwind CSS` · `Framer Motion` · `Zod` · `isomorphic-dompurify` · `Groq (Llama 3.1)` · `Vercel` · `Docker`

---

<div align="center">
<sub>Construido por Karen Dayanna Herrera Ruiz — Economía, UNEMI · <a href="https://github.com/eco-karen-herrera-ruiz">@eco-karen-herrera-ruiz</a></sub>
</div>
