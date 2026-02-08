# Staff Portal

A React-based staff portal application built with Vite and styled-components.


## Requirements

- Node.js (v16 or higher)


## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and configure **all required variables**:

```bash
cp .env.example .env
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Done

The application will be available at `http://localhost:5173`


## Deployment

This frontend automatically builds and deploys to GitHub Pages upon pushing changes to the main branch.


## Structure

```
staff-portal/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Container, Footer)
│   │   ├── screens/         # Main screen components (Dashboard, Login, etc.)
│   │   └── shared/          # Reusable UI components (Button, Card, Input, etc.)
│   ├── hooks/               # Custom React hooks (useLogin)
│   ├── services/            # API service layer
│   ├── styles/              # Global styles, theme, and animations
│   ├── img/                 # Static images
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Application entry point
├── .github/workflows/       # CI/CD workflows
└── vite.config.js           # Vite configuration
```
