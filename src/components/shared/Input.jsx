import styled from 'styled-components';

const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
  
  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 5px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 11px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 15px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.08);
  }

  &::placeholder {
    color: #999;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    font-size: 16px; /* Prevents zoom on iOS */
  }
`;

export function Input({ label, id, ...props }) {
  return (
    <FormGroup>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledInput id={id} {...props} />
    </FormGroup>
  );
}
