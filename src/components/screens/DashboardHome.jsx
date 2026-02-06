import styled from 'styled-components';
import { User, Clock, Bot, Hash, Building2, CheckCircle, UserCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../shared/Card';
import { StatsGrid, StatCard, StatLabel, StatValue, StatIcon } from '../shared/StatCard';

const QuickAction = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const QuickActionLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

export function DashboardHome({ employee, onNavigate }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <QuickActionsGrid>
          <QuickAction onClick={() => onNavigate('timesheet')}>
            <Clock size={24} />
            <QuickActionLabel>Timesheet Generator</QuickActionLabel>
          </QuickAction>
          <QuickAction onClick={() => onNavigate('amy')}>
            <Bot size={24} />
            <QuickActionLabel>Amy</QuickActionLabel>
          </QuickAction>
          <QuickAction onClick={() => onNavigate('profile')}>
            <User size={24} />
            <QuickActionLabel>My Profile</QuickActionLabel>
          </QuickAction>
        </QuickActionsGrid>
      </Card>
    </>
  );
}
