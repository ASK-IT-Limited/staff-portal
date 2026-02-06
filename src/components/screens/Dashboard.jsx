import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../styles/animations';
import { MyProfile } from './MyProfile';
import { TimesheetGenerator } from './TimesheetGenerator';
import { Amy } from './Amy';
import { DashboardHome } from './DashboardHome';
import askitLogo from '../../img/askit_logo_white.png';
import {
  LayoutDashboard,
  User,
  Clock,
  Bot,
  LogOut,
  RefreshCw,
  Menu,
  X,
} from 'lucide-react';

const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  animation: ${fadeIn} 0.4s ease-in forwards;
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
`;

const Sidebar = styled.aside`
  width: 250px;
  background: #2c5aa0;
  color: #fff;
  padding: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 999;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
`;

const SidebarHeaderActions = styled.div`
  display: flex;
  align-items: center;
`;

const NavSection = styled.div`
  padding: 16px 0;
`;

const NavLabel = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  padding: 8px 20px;
  letter-spacing: 0.5px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: ${({ $active }) => ($active ? '#fff' : 'rgba(255, 255, 255, 0.7)')};
  background: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.1)' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 600px) {
    gap: 8px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 600px) {
    display: none;
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
`;

const UserDetails = styled.div`
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const RefreshButton = styled(HeaderButton)`
  &:hover {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
    color: #3b82f6;
  }
`;

const SignOutButton = styled(HeaderButton)`
  &:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.3);
    color: #ef4444;
  }
`;

const MainContent = styled.main`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const Header = styled.header`
  background: #fff;
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  gap: 16px;
  
  @media (max-width: 768px) {
    padding: 16px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 16px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  flex: 1;
  
  h1 {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 4px 0;
    
    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
    
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;

const HeaderTitleGroup = styled.div`
  min-width: 0;
`;

const Content = styled.div`
  padding: 24px 32px;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const SCREEN_TITLES = {
  dashboard: 'Dashboard',
  profile: 'My Profile',
  timesheet: 'Timesheet Generator',
  amy: 'Amy',
};

export function Dashboard({ employee, onRefresh, onLogout }) {
  const [activeScreen, setActiveScreen] = useState(() => {
    return localStorage.getItem('activeScreen') || 'dashboard';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('activeScreen', activeScreen);
  }, [activeScreen]);

  const handleNavClick = (screen) => {
    setActiveScreen(screen);
    setIsSidebarOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const renderScreen = () => {
    switch (activeScreen) {
      case 'profile':
        return <MyProfile employee={employee} />;
      case 'timesheet':
        return <TimesheetGenerator employee={employee} />;
      case 'amy':
        return <Amy />;
      default:
        return <DashboardHome employee={employee} onNavigate={setActiveScreen} />;
    }
  };

  return (
    <DashboardLayout>
      <Overlay $isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
      <Sidebar $isOpen={isSidebarOpen}>
        <SidebarHeader>
          <Logo>
            <img src={askitLogo} alt="Askit Logo" style={{ height: '24px', marginRight: '12px' }} />
            Staff Portal
          </Logo>
          <SidebarHeaderActions>
            <CloseButton onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </CloseButton>
          </SidebarHeaderActions>
        </SidebarHeader>

        <NavSection>
          <NavItem $active={activeScreen === 'dashboard'} onClick={() => handleNavClick('dashboard')}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavItem>
        </NavSection>

        <NavSection>
          <NavLabel>Profile</NavLabel>
          <NavItem $active={activeScreen === 'profile'} onClick={() => handleNavClick('profile')}>
            <User size={18} />
            My Profile
          </NavItem>
        </NavSection>

        <NavSection>
          <NavLabel>Tools</NavLabel>
          <NavItem $active={activeScreen === 'timesheet'} onClick={() => handleNavClick('timesheet')}>
            <Clock size={18} />
            Timesheet Generator
          </NavItem>
        </NavSection>

        <NavSection>
          <NavLabel>Agents</NavLabel>
          <NavItem $active={activeScreen === 'amy'} onClick={() => handleNavClick('amy')}>
            <Bot size={18} />
            Amy
          </NavItem>
        </NavSection>
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderLeft>
            <MobileMenuButton onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </MobileMenuButton>
            <HeaderTitleGroup>
              <h1>{SCREEN_TITLES[activeScreen] || 'Dashboard'}</h1>
              <p>{today}</p>
            </HeaderTitleGroup>
          </HeaderLeft>
          <HeaderRight>
            <UserInfo>
              <UserAvatar>{getInitials(employee?.empName)}</UserAvatar>
              <UserDetails>
                <UserName>{employee?.empName || 'User'}</UserName>
                <UserRole>{employee?.empDept || 'Department'}</UserRole>
              </UserDetails>
            </UserInfo>
            <RefreshButton onClick={onRefresh} title="Refresh data">
              <RefreshCw size={16} />
            </RefreshButton>
            <SignOutButton onClick={onLogout} title="Sign out">
              <LogOut size={16} />
            </SignOutButton>
          </HeaderRight>
        </Header>

        <Content>
          {renderScreen()}
        </Content>
      </MainContent>
    </DashboardLayout>
  );
}
