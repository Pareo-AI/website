# Pareo Marketing Website

This is the marketing website for Pareo, built with Next.js 16, React 19, and Tailwind CSS 4.

## Features

- **Next.js 16** with App Router
- **Internationalization (i18n)** - English and German
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Meta tags, sitemap, robots.txt
- **Legal Pages** - GDPR-compliant privacy policy, terms, cookie policy, Impressum (DE)
- **Performance** - Optimized for speed and Core Web Vitals
- **Security** - Security headers, HTTPS-only

## Getting Started

### Prerequisites

- Node.js 22+
- Bun 1.3.8+

### Installation

```bash
cd website
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build

```bash
bun run build
bun run start
```

### Docker

Build and run with Docker:

```bash
# Development
docker build -f Dockerfile.dev -t pareo-website:dev .
docker run -p 3001:3000 pareo-website:dev

# Production
docker build -f Dockerfile -t pareo-website:prod .
docker run -p 3001:3000 pareo-website:prod
```

## Project Structure

```
website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── [lang]/            # Internationalized routes
│   │   ├── health/            # Health check endpoint
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Root redirect
│   ├── components/
│   │   ├── layout/            # Header, Footer, LanguageSwitcher
│   │   ├── sections/          # Homepage sections
│   │   └── ui/                # Reusable UI components
│   ├── content/               # MDX legal content
│   │   ├── en/
│   │   └── de/
│   ├── lib/
│   │   ├── i18n/              # Internationalization config & translations
│   │   ├── constants.ts       # App constants
│   │   └── utils.ts           # Utility functions
│   └── styles/
│       └── globals.css        # Global styles
├── public/                    # Static assets
├── Dockerfile                 # Production Docker image
├── Dockerfile.dev             # Development Docker image
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## Deployment

The website is deployed to Google Kubernetes Engine (GKE) at https://new.pareo.ai

Deployment is automated via GitHub Actions:
- Changes to `website/**` trigger a build
- Docker image is pushed to Artifact Registry
- Kubernetes deployment is updated via Kustomize

## Legal Pages

Legal pages are stored as MDX files in `src/content/{lang}/`:
- **Impressum** (DE only) - Company information
- **Privacy Policy** (EN/DE) - Data protection
- **Terms of Service** (EN/DE) - Terms and conditions
- **Cookie Policy** (EN/DE) - Cookie usage

## Environment Variables

No environment variables are required for basic operation.

## License

Proprietary - Pareo
