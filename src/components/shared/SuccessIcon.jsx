import styled from 'styled-components';
import { scaleIn, drawCheck } from '../../styles/animations';

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background: ${({ theme }) => theme.colors.success};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  animation: ${scaleIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const CheckSvg = styled.svg`
  width: 32px;
  height: 32px;
  stroke: white;
  stroke-width: 3;
  fill: none;
`;

const CheckPath = styled.polyline`
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  animation: ${drawCheck} 0.5s ease-out 0.3s forwards;
`;

export function SuccessIcon() {
  return (
    <IconWrapper>
      <CheckSvg viewBox="0 0 24 24">
        <CheckPath points="20 6 9 17 4 12" />
      </CheckSvg>
    </IconWrapper>
  );
}
