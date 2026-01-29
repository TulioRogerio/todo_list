import { useState, FormEvent } from 'react';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { InputField } from './ui/InputField';
import { PasswordField } from './ui/PasswordField';
import { TestCredentials } from './ui/TestCredentials';
import { authService, LoginData } from '../services/authService';
import { theme } from '../styles/theme';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authService.login(formData);
      authService.saveAuth(response.access_token, response.user);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full" style={{ maxWidth: theme.sizes.formMaxWidth, margin: '0 auto' }}>
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2" style={{ color: theme.colors.textDark }}>Bem-vindo</h2>
        <p className="m-0" style={{ color: theme.colors.textLight }}>Por favor, insira seus dados para entrar.</p>
      </div>
      {error && <Message severity="error" text={error} className="w-full mb-4" />}
      <form onSubmit={handleSubmit} className="flex flex-column gap-5">
        <InputField id="email" label="E-mail" icon="pi-envelope" type="email" placeholder="admin@admin.com" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} required />
        <PasswordField id="password" label="Senha" value={formData.password} onChange={(v) => setFormData({ ...formData, password: v })} showForgotLink />
        <Button type="submit" label="Entrar" className="w-full font-bold" style={{ height: theme.sizes.inputHeight, backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }} loading={loading} />
      </form>
      <TestCredentials email="admin@admin.com" password="admin123" />
    </div>
  );
}