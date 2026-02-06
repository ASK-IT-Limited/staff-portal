import styled from 'styled-components';
import { Card } from '../shared/Card';

const IframeContainer = styled.div`
  overflow: hidden;
  height: 70vh;
  border-radius: 8px;
`;

const StyledIframe = styled.iframe`
  border: none;
  clip-path: inset(60px 6px 0 0);
  width: 100%;
  height: 100%;
`;

export function Amy() {
  return (
    <Card>
      <IframeContainer>
        <StyledIframe
          src="https://apps.abacus.ai/chatllm/?appId=1503d076aa&hideTopBar=2"
        />
      </IframeContainer>
    </Card>
  );
}
