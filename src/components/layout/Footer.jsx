import styled from 'styled-components';

const StyledFooter = styled.footer`
  margin-top: auto;
  padding: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  
  @media (max-width: 480px) {
    padding: 20px 16px;
    font-size: 12px;
  }
`;

export function Footer() {
  return (
    <StyledFooter>
      &copy; 2026 ASK IT Limited. All rights reserved.
    </StyledFooter>
  );
}
