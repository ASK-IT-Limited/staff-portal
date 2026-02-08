// Backend API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Global handler for session expiration
let onSessionExpired = null;

export function setSessionExpiredHandler(handler) {
  onSessionExpired = handler;
}

// Centralized function to handle responses and check for 401 errors
async function handleResponse(response, customMessages = {}) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    
    // Handle 401 - Session expired
    if (response.status === 401) {
      const message = customMessages[401] || error.detail || 'Your session has expired. Please log in again.';
      
      // Notify the app that session expired (triggers logout and redirect)
      if (onSessionExpired) {
        onSessionExpired(message);
      }
      
      throw new ApiError(message, 401);
    }
    
    // Handle other specific status codes
    if (customMessages[response.status]) {
      throw new ApiError(customMessages[response.status], response.status);
    }
    
    // Handle other error status codes
    const defaultMessage = error.detail || 'An error occurred. Please try again.';
    throw new ApiError(defaultMessage, response.status);
  }
  
  return await response.json();
}

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include', // Important: sends and receives cookies
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(response, {
    401: 'Invalid email or password. Please try again.',
    429: 'Too many login attempts. Please try again later.',
  });
}

export async function logout() {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include', // Important: to clear the cookie
  });

  return handleResponse(response);
}

export async function getCurrentUser() {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    credentials: 'include', // Important: sends the cookie
  });

  // Special case: for getCurrentUser, 401 means not authenticated (not necessarily expired)
  // This is used on initial page load, so we don't want to trigger the session expired handler
  if (response.status === 401) {
    return null; // Not authenticated
  }

  return handleResponse(response);
}

export async function generateTimesheetTemplate(email) {
  const response = await fetch(`${API_BASE_URL}/timesheet/generate`, {
    method: 'POST',
    credentials: 'include', // Important: sends the cookie for authentication
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  return handleResponse(response, {
    401: 'Your session has expired. Please log in again.',
    403: 'You can only generate timesheets for your own account.',
  });
}
