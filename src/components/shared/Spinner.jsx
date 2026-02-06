import styled from 'styled-components';
import { spin, pulse } from '../../styles/animations';

const SpinnerWrapper = styled.div`
  width: 56px;
  height: 56px;
  position: relative;
  margin: 0 auto 24px;
  
  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
    margin: 0 auto 20px;
  }
`;

const SpinnerRing = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 3px solid ${({ theme }) => theme.colors.borderLight};
    animation: ${pulse} 1.5s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: ${({ theme }) => theme.colors.primary};
    border-right-color: ${({ theme }) => theme.colors.primary};
    animation: ${spin} 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  }
  
  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
    
    &::before,
    &::after {
      width: 48px;
      height: 48px;
    }
  }
`;

export function Spinner() {
  return (
    <SpinnerWrapper>
      <SpinnerRing />
    </SpinnerWrapper>
  );
}
