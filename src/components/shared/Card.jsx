import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  
  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 8px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

export const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;
