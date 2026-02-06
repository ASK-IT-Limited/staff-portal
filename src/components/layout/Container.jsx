import styled from 'styled-components';

const StyledContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 38px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadow.card};
  width: 100%;
  max-width: 420px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  margin: 100px auto 0 auto;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.cardHover};
    transform: translateY(-2px);
  }
  
  @media (max-width: 480px) {
    padding: 32px 24px;
    margin: 60px 16px 0 16px;
    width: calc(100% - 32px);
    border-radius: 12px;
  }
  
  @media (max-width: 360px) {
    padding: 24px 20px;
    margin: 40px 12px 0 12px;
    width: calc(100% - 24px);
  }
`;

export function Container({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}
