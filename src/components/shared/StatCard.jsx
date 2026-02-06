import styled from 'styled-components';

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: ${({ $color }) => $color || '#10b981'};
  border-radius: 12px;
  padding: 20px;
  color: #fff;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 8px;
  }

  &::after {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
`;

export const StatLabel = styled.div`
  font-size: 13px;
  opacity: 0.9;
  margin-bottom: 8px;
  
  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 4px;
  }
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  
  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const StatIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;
