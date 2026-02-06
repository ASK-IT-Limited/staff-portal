import styled from 'styled-components';
import { Card } from '../shared/Card';

const IframeContainer = styled.div`
  overflow: hidden;
  height: 550px;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    height: 450px;
  }
  
  @media (max-width: 480px) {
    height: 400px;
  }
`;

const StyledIframe = styled.iframe`
  border: none;
  clip-path: inset(65px 7px 0 0);
  width: 100%;
  height: 600px;
  
  @media (max-width: 768px) {
    height: 500px;
  }
  
  @media (max-width: 480px) {
    height: 450px;
  }
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
