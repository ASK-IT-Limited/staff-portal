import styled from 'styled-components';
import { fadeIn, textFade } from '../../styles/animations';
import { Spinner } from '../shared/Spinner';

const Screen = styled.div`
  padding: 20px 0;
  animation: ${fadeIn} 0.4s ease-in forwards;
  
  @media (max-width: 480px) {
    padding: 16px 0;
  }
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 15px;
  animation: ${textFade} 1.5s ease-in-out infinite;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export function LoadingScreen() {
  return (
    <Screen>
      <Spinner />
      <LoadingText>Logging in...</LoadingText>
    </Screen>
  );
}
