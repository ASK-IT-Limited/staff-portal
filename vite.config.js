import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// CSP Plugin - adds Content Security Policy headers
function cspPlugin(mode) {
  return {
    name: 'csp-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Load env variables for dev server
        const env = loadEnv(mode, process.cwd(), '');
        const backendUrl = env.VITE_API_BASE_URL;
        
        if (!backendUrl) {
          throw new Error(
            'VITE_API_BASE_URL is not set in .env file. ' +
            'Please set it before running the dev server.'
          );
        }
        
        // Parse backend URL to get origin
        let backendOrigin;
        try {
          backendOrigin = new URL(backendUrl).origin;
        } catch (err) {
          throw new Error(
            `Invalid VITE_API_BASE_URL: "${backendUrl}". ` +
            'Please provide a valid URL in your .env file.'
          );
        }
        
        // Dev CSP: More permissive for Vite HMR and dev server
        res.setHeader(
          'Content-Security-Policy',
          [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed for Vite HMR
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' data:",
            `connect-src 'self' ws: wss: http://localhost:* ${backendOrigin}`, // ws for HMR
            "frame-src https://apps.abacus.ai",
            "frame-ancestors 'none'",
          ].join('; ')
        );
        next();
      });
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        // Production CSP: Stricter, no unsafe-inline for scripts
        if (ctx.bundle) {
          // Get backend URL from environment
          const env = loadEnv(mode, process.cwd(), '');
          const backendUrl = env.VITE_API_BASE_URL;
          
          if (!backendUrl) {
            throw new Error(
              'VITE_API_BASE_URL is not set in .env file. ' +
              'Please set it before building for production.'
            );
          }
          
          // Parse to get origin only
          let backendOrigin;
          try {
            backendOrigin = new URL(backendUrl).origin;
          } catch (err) {
            throw new Error(
              `Invalid VITE_API_BASE_URL: "${backendUrl}". ` +
              'Please provide a valid URL in your .env file.'
            );
          }
          
          return html.replace(
            '</head>',
            `    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' ${backendOrigin}; frame-src https://apps.abacus.ai; frame-ancestors 'none';" />
</head>`
          );
        }
        return html;
      },
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), cspPlugin(mode)],
  base: '/staff-portal/',
}));
