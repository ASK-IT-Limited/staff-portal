import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;

  ${({ $variant, theme }) =>
    $variant === 'secondary'
      ? css`
          background: ${theme.colors.borderLight};
          color: ${theme.colors.text};

          &:hover {
            background: ${theme.colors.border};
            transform: translateY(-1px);
            box-shadow: ${theme.boxShadow.buttonSecondary};
          }

          &:active {
            background: #c1c1c1;
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }
        `
      : css`
          background: ${theme.colors.primary};
          color: ${theme.colors.white};

          &:hover {
            background: ${theme.colors.primaryHover};
            transform: translateY(-1px);
            box-shadow: ${theme.boxShadow.button};
          }

          &:active {
            background: ${theme.colors.primaryActive};
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(44, 90, 160, 0.2);
          }
        `}
  
  @media (max-width: 480px) {
    padding: 14px;
    font-size: 16px;
  }
`;

export function Button({ variant = 'primary', children, ...props }) {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}
