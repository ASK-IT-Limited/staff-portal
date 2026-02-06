import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../styles/animations';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';

const STORAGE_KEY = 'staff_portal_credentials';

const Screen = styled.div`
  animation: ${fadeIn} 0.4s ease-in forwards;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 32px;
  font-size: 14px;
  font-weight: 400;
  
  @media (max-width: 480px) {
    margin-bottom: 24px;
    font-size: 13px;
  }
`;

const ErrorMessage = styled.div`
  background: ${({ theme }) => theme.colors.errorBg};
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ $show }) => ($show ? '10px 14px' : '0 14px')};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.errorBorder};
  margin-bottom: ${({ $show }) => ($show ? '20px' : '0')};
  font-size: 14px;
  max-height: ${({ $show }) => ($show ? '100px' : '0')};
  opacity: ${({ $show }) => ($show ? '1' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out, padding 0.3s ease-out, margin-bottom 0.3s ease-out;
  text-align: left;
  
  @media (max-width: 480px) {
    font-size: 13px;
    padding: ${({ $show }) => ($show ? '10px 12px' : '0 12px')};
  }
`;

const Form = styled.form``;

const RememberMeContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 16px;
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
  }
`;

const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  cursor: pointer;
  padding: 0;
  margin-top: 16px;
  text-align: center;
  width: 100%;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 0;
    margin-top: 12px;
  }
`;

export function LoginScreen({ onSubmit, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved credentials on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { email: savedEmail, password: savedPassword } = JSON.parse(saved);
        setEmail(savedEmail || '');
        setPassword(savedPassword || '');
        setRememberMe(true);
      }
    } catch {
      // Ignore parsing errors
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save or clear credentials based on remember me checkbox
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    
    onSubmit(email, password);
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    alert('Forgot password functionality coming soon!');
  };

  return (
    <Screen>
      <Title>Staff Portal</Title>
      <Subtitle>Sign in to access handy tools</Subtitle>

      <ErrorMessage $show={!!error}>
        {error || 'Invalid email or password. Please try again.'}
      </ErrorMessage>

      <Form onSubmit={handleSubmit}>
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <RememberMeContainer>
          <Checkbox
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </RememberMeContainer>

        <Button type="submit">Login</Button>

        <ForgotPasswordLink type="button" onClick={handleForgotPassword}>
          Forgot password?
        </ForgotPasswordLink>
      </Form>
    </Screen>
  );
}
