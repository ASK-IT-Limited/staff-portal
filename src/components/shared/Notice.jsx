import styled from 'styled-components';

export const Notice = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  margin-top: 20px;
  
  @media (max-width: 480px) {
    padding: 12px;
    gap: 10px;
  }
`;

export const NoticeIcon = styled.div`
  color: #f59e0b;
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const NoticeText = styled.div`
  font-size: 14px;
  color: #92400e;
  line-height: 1.5;

  a {
    color: #2c5aa0;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
