import { useState, useCallback, useEffect } from 'react';
import { login as loginApi, ApiError } from '../services/api';

const STORAGE_KEY = 'staff_portal_employee';

export function useLogin() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);
  const [employee, setEmployee] = useState(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedEmployee = localStorage.getItem(STORAGE_KEY);
    if (savedEmployee) {
      try {
        const parsed = JSON.parse(savedEmployee);
        setEmployee(parsed);
        setStatus('success');
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = useCallback(async (userEmail, password) => {
    setStatus('loading');
    setError(null);

    try {
      const employeeData = await loginApi(userEmail, password);
      setEmployee(employeeData);
      setStatus('success');
      // Persist to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employeeData));
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
    if (!employee?.email || !employee?.password) {
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const employeeData = await loginApi(employee.email, employee.password);
      setEmployee(employeeData);
      setStatus('success');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employeeData));
    } catch (err) {
      setStatus('error');
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to refresh data. Please try again.');
      }
    }
  }, [employee?.email, employee?.password]);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setEmployee(null);
    // Clear from localStorage on explicit sign out
    localStorage.removeItem(STORAGE_KEY);
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
