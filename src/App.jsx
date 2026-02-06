import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Container } from './components/layout/Container';
import { Footer } from './components/layout/Footer';
import { LoginScreen } from './components/screens/LoginScreen';
import { LoadingScreen } from './components/screens/LoadingScreen';
import { Dashboard } from './components/screens/Dashboard';
import { useLogin } from './hooks/useLogin';

function App() {
  const { status, error, employee, login, refresh, reset } = useLogin();

  // Dashboard has its own full-page layout
  if (status === 'success') {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Dashboard employee={employee} onRefresh={refresh} onLogout={reset} />
      </ThemeProvider>
    );
  }

  // Login and Loading screens use the centered container layout
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        {status === 'loading' ? (
          <LoadingScreen />
        ) : (
          <LoginScreen onSubmit={login} error={error} />
        )}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
