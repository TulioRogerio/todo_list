import { AuthLayout } from './layouts/AuthLayout';
import { LoginForm } from './components/LoginForm';
import { authService } from './services/authService';

declare global {
  interface Window { singleSpaNavigate?: (url: string) => void; }
}

function App() {
  const handleLoginSuccess = () => {
    const user = authService.getUser();
    const token = localStorage.getItem('token');
    if (window.location.port === '3001') {
      const params = new URLSearchParams({ token: encodeURIComponent(token || ''), user: encodeURIComponent(JSON.stringify(user)) });
      window.location.href = `http://localhost:3002?${params.toString()}`;
    } else {
      if (window.singleSpaNavigate) window.singleSpaNavigate('/dashboard');
      else window.location.href = '/dashboard';
    }
  };

  return (
    <AuthLayout title="ToDoList" subtitle="Resolução do desafio de implementação de uma aplicação React para o Conecta Sedu." footerText="© 2026 ToDoList App • Desafio do Conecta Sedu">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </AuthLayout>
  );
}

export default App;