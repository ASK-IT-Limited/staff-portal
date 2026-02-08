# Staff Portal Frontend

This guide will help you set up the frontend of the Staff Portal application.

## Prerequisites

- **Node.js** (v16 or higher) for the frontend

## Setup

### 1. Navigate to the project root

```bash
cd ..  # If you're in the backend directory
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
# Copy the example env file
copy .env.example .env    # Windows
cp .env.example .env      # macOS/Linux
```

The default configuration points to `http://localhost:8000/api` which should work if your backend is running locally.

### 4. Start the development server

```bash
npm run dev
```

The frontend will be available at: `http://localhost:5173` (or another port if 5173 is in use)
