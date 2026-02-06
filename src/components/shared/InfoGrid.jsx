import styled from 'styled-components';

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const InfoLabel = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.5px;
  
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const InfoValue = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  word-break: break-word;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
