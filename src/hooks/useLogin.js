import { useState, useCallback, useEffect } from 'react';
import { login as loginApi, logout as logoutApi, getCurrentUser, ApiError, setSessionExpiredHandler } from '../services/api';

export function useLogin() {
  const [status, setStatus] = useState('loading'); // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);
  const [employee, setEmployee] = useState(null);

  // Register session expiration handler
  useEffect(() => {
    const handleSessionExpired = (message) => {
      console.warn('Session expired:', message);
      // Clear local state and show error message
      setEmployee(null);
      setStatus('idle');
      setError(message || 'Your session has expired. Please log in again.');
    };
    
    setSessionExpiredHandler(handleSessionExpired);
    
    // Cleanup on unmount
    return () => setSessionExpiredHandler(null);
  }, []);

  // Restore session from backend cookie on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setEmployee(userData);
          setStatus('success');
        } else {
          setStatus('idle');
        }
      } catch (err) {
        console.error('Failed to restore session:', err);
        setStatus('idle');
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(async (userEmail, password) => {
    setStatus('loading');
    setError(null);

    try {
      const employeeData = await loginApi(userEmail, password);
      setEmployee(employeeData);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Connection failed. Please check your internet and try again.');
      }
    }
  }, []);

  const refresh = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const userData = await getCurrentUser();
      if (userData) {
        setEmployee(userData);
        setStatus('success');
      } else {
        // Session expired, reset to idle
        setEmployee(null);
        setStatus('idle');
        setError('Session expired. Please log in again.');
      }
    } catch (err) {
      setStatus('error');
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to refresh data. Please try again.');
      }
    }
  }, []);

  const reset = useCallback(async () => {
    try {
      // Call backend to invalidate session/cookie
      await logoutApi();
    } catch (err) {
      // Even if logout fails, still clear local state
      console.error('Logout API error:', err);
    } finally {
      // Always clear local state
      setStatus('idle');
      setError(null);
      setEmployee(null);
    }
  }, []);

  return {
    status,
    error,
    employee,
    login,
    refresh,
    reset,
  };
}
