// Backend API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL environment variable is not set. Please check your .env file.');
}

// Default timeout for API requests (in milliseconds)
const DEFAULT_TIMEOUT = 10000; // 10 seconds

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export class TimeoutError extends Error {
  constructor(message = 'Request timeout') {
    super(message);
    this.name = 'TimeoutError';
  }
}

// Fetch wrapper with timeout support
async function fetchWithTimeout(url, options = {}, timeout = DEFAULT_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new TimeoutError('The request took too long to complete. Please try again.');
    }
    throw error;
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
      const message = customMessages[401] || error.detail?.msg || error.detail || 'Your session has expired. Please log in again.';
      
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
    
    // Handle other error status codes - sanitize error messages to prevent information disclosure
    const defaultMessage = 'An error occurred. Please try again.';
    throw new ApiError(defaultMessage, response.status);
  }
  
  return await response.json();
}

export async function login(email, password) {
  const response = await fetchWithTimeout(`${API_BASE_URL}/auth/login`, {
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
  const response = await fetchWithTimeout(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include', // Important: to clear the cookie
  });

  return handleResponse(response);
}

export async function getCurrentUser() {
  const response = await fetchWithTimeout(`${API_BASE_URL}/auth/me`, {
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
  const response = await fetchWithTimeout(`${API_BASE_URL}/timesheet/generate`, {
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
