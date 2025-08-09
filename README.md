# SpeedLeads.AI

SpeedLeads.AI is a modern business automation platform that provides advanced AI solutions for website development, business automations, and smart integrations designed to accelerate your business forward.

## Features

- **AI-Powered Website Development** - Build modern, responsive websites with intelligent automation
- **Business Process Automation** - Streamline operations with smart workflow solutions
- **Lead Management System** - Advanced CRM with integrated chatbot and analytics
- **Smart Integrations** - Connect your business tools and platforms seamlessly
- **Multi-language Support** - Full Hebrew/RTL language support with internationalization
- **Analytics Dashboard** - Track performance with Google Analytics integration
- **Admin Panel** - Complete backend management system for leads and settings

## Technology Stack

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript development
- **React** - Modern UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **React Router** - Client-side routing
- **Google Analytics** - User behavior tracking
- **WhatsApp Integration** - Direct customer communication

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd speedleads-ai-genesis
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components (Header, Footer)
│   └── sections/       # Page sections
├── pages/              # Application pages
│   ├── admin/          # Admin panel pages
│   └── legal/          # Legal pages
├── lib/                # Utility functions
└── hooks/              # Custom React hooks
```

## Deployment

The application can be deployed to any static hosting service such as:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.
