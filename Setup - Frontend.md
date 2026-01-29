# ⚙️Arquivos Gerais do Auth-app

## 🎯 package.json

```json
{
  "name": "auth-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.7.9",
    "primeflex": "^3.3.1",
    "primeicons": "^7.0.0",
    "primereact": "^10.9.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.1",
    "single-spa-react": "^6.0.2"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/node": "^22.10.5",
    "@types/react": "^18.3.17",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.17.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.13.0",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.18.1",
    "vite": "^6.0.3"
  }
}
```

> ⚠️ **IMPORTANTE 1**: No `main.tsx`, adicione os imports do CSS do PrimeReact:
> ```typescript
> import 'primereact/resources/themes/lara-light-indigo/theme.css';
> import 'primereact/resources/primereact.min.css';
> import 'primeicons/primeicons.css';
> import 'primeflex/primeflex.css';
> ```

⚠️ **IMPORTANTE 2**: Ainda no `main.tsx`, remova a estilização CSS:

```typescript
import './index.css'
```

## 🎯 vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3001,
    cors: true,
    origin: 'http://localhost:3001',
  },
  
  preview: {
    port: 3001,
  },
  
  build: {
    rollupOptions: {
      input: 'src/root.component.tsx',
      output: {
        format: 'system',
        entryFileNames: 'auth-app.js',
      },
      external: ['react', 'react-dom', 'react-router-dom', 'single-spa-react'],
      preserveEntrySignatures: 'allow-extension',
    },
  },
  
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  
  base: 'http://localhost:3001/',
});
```

##  🎯 Design System: Theme (src/styles/theme.ts)

Centraliza cores e tokens para manutenção facilitada:

```typescript
export const theme = {
  colors: {
    primary: '#13a4ec',
    primaryShadow: 'rgba(19, 164, 236, 0.3)',
    primaryLight: 'rgba(19, 164, 236, 0.1)',
    background: '#f6f7f8',
    cardBg: '#f8fafc',
    textDark: '#0d171b',
    textLight: '#4c809a',
    border: '#cfdfe7',
    divider: '#e7eff3',
    badgeBg: '#f1f5f9',
  },
  sizes: {
    inputHeight: '56px',
    cardMaxWidth: '1000px',
    formMaxWidth: '360px',
    logoSize: '48px',
  },
  gradients: {
    background: 'radial-gradient(at 0% 0%, rgba(19, 164, 236, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(19, 164, 236, 0.1) 0px, transparent 50%)',
    decorativeCard: 'linear-gradient(135deg, rgba(19, 164, 236, 0.05) 0%, rgba(19, 164, 236, 0.15) 100%)',
  },
};
```

## 🎯 Layout Reutilizável: AuthLayout (src/layouts/AuthLayout.tsx)

Layout de duas colunas para páginas de autenticação:

```typescript
import { ReactNode } from 'react';
import { theme } from '../styles/theme';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText?: string;
}

export function AuthLayout({ title, subtitle, children, footerText }: AuthLayoutProps) {
  return (
    <div 
      className="min-h-screen flex align-items-center justify-content-center p-4"
      style={{ backgroundColor: theme.colors.background, backgroundImage: theme.gradients.background }}
    >
      <div 
        className="surface-card border-round-xl shadow-8 overflow-hidden flex flex-column lg:flex-row"
        style={{ maxWidth: theme.sizes.cardMaxWidth, width: '100%' }}
      >
        {/* Lado Esquerdo - Branding */}
        <div className="hidden lg:flex lg:w-6 flex-column justify-content-center p-6" style={{ backgroundColor: theme.colors.cardBg }}>
          <div className="flex flex-column gap-4">
            <div className="flex align-items-center gap-3">
              <div 
                className="flex align-items-center justify-content-center border-round-xl"
                style={{ width: theme.sizes.logoSize, height: theme.sizes.logoSize, backgroundColor: theme.colors.primary, boxShadow: `0 4px 14px ${theme.colors.primaryShadow}` }}
              >
                <i className="pi pi-check-square text-white text-2xl"></i>
              </div>
              <h1 className="text-3xl font-bold m-0" style={{ color: theme.colors.textDark }}>{title}</h1>
            </div>
            <p className="text-lg line-height-3 m-0" style={{ color: theme.colors.textLight }}>{subtitle}</p>
            <div className="border-round-sm" style={{ width: '80px', height: '4px', backgroundColor: theme.colors.primary }}></div>
          </div>
          <div className="mt-6 border-round-xl flex align-items-center justify-content-center" style={{ height: '160px', background: theme.gradients.decorativeCard, border: `1px solid ${theme.colors.primaryLight}` }}>
            <i className="pi pi-send text-6xl" style={{ color: theme.colors.primaryShadow }}></i>
          </div>
        </div>
        {/* Lado Direito - Conteúdo */}
        <div className="w-full lg:w-6 p-6 lg:p-8 flex flex-column justify-content-center">{children}</div>
      </div>
      {footerText && <div className="fixed bottom-0 left-0 right-0 py-4 text-center text-sm" style={{ color: theme.colors.textLight }}>{footerText}</div>}
    </div>
  );
}
```

---

## 🎯 Componentes UI Reutilizáveis: 

### InputField (`src/components/ui/InputField.tsx`)

```typescript
import { InputText } from 'primereact/inputtext';
import { theme } from '../../styles/theme';

interface InputFieldProps {
  id: string;
  label: string;
  icon: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function InputField({ id, label, icon, type = 'text', placeholder, value, onChange, required = false }: InputFieldProps) {
  return (
    <div className="flex flex-column gap-2">
      <label htmlFor={id} className="font-semibold text-sm" style={{ color: theme.colors.textDark }}>{label}</label>
      <div className="p-inputgroup">
        <InputText id={id} type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full" style={{ height: theme.sizes.inputHeight, backgroundColor: theme.colors.cardBg, borderColor: theme.colors.border }} required={required} />
        <span className="p-inputgroup-addon" style={{ backgroundColor: theme.colors.cardBg, borderColor: theme.colors.border, color: theme.colors.textLight }}><i className={`pi ${icon}`}></i></span>
      </div>
    </div>
  );
}
```

### PasswordField (`src/components/ui/PasswordField.tsx`)

```typescript
import { Password } from 'primereact/password';
import { theme } from '../../styles/theme';

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  showForgotLink?: boolean;
}

export function PasswordField({ id, label, value, onChange, showForgotLink = false }: PasswordFieldProps) {
  return (
    <div className="flex flex-column gap-2">
      <label htmlFor={id} className="font-semibold text-sm" style={{ color: theme.colors.textDark }}>{label}</label>
      <div className="p-inputgroup">
        <Password id={id} placeholder="••••••••" value={value} onChange={(e) => onChange(e.target.value)} feedback={false} toggleMask className="w-full" inputClassName="w-full" inputStyle={{ height: theme.sizes.inputHeight, backgroundColor: theme.colors.cardBg, borderColor: theme.colors.border }} />
      </div>
      {showForgotLink && <a href="#" className="text-sm font-medium no-underline align-self-end" style={{ color: theme.colors.primary }}>Esqueci a minha senha</a>}
    </div>
  );
}
```

### TestCredentials (`src/components/ui/TestCredentials.tsx`)

```typescript
import { theme } from '../../styles/theme';

interface TestCredentialsProps {
  email: string;
  password: string;
}

export function TestCredentials({ email, password }: TestCredentialsProps) {
  return (
    <div className="mt-6 pt-6 text-center" style={{ borderTop: `1px solid ${theme.colors.divider}` }}>
      <div className="inline-flex align-items-center gap-2 px-4 py-2 border-round-3xl" style={{ backgroundColor: theme.colors.badgeBg }}>
        <i className="pi pi-info-circle text-sm" style={{ color: theme.colors.primary }}></i>
        <span className="text-xs" style={{ color: theme.colors.textLight }}>
          Teste: <strong style={{ color: theme.colors.textDark }}>{email}</strong> / <strong style={{ color: theme.colors.textDark }}>{password}</strong>
        </span>
      </div>
    </div>
  );
}
```

---

## 🎯 Padrão de AuthService

**Arquivo:** `src/services/authService.ts`

```typescript
import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: { id: number; name: string; email: string; };
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, data);
    return response.data;
  },
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new CustomEvent('auth:logout'));
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
  
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  saveAuth(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('auth:login', { detail: { user } }));
  },
};
```

---

## 🎯 Padrão de App.tsx

**Arquivo:** `src/App.tsx`

```typescript
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
```

## 🎯 Padrão de LoginForm

**Arquivo:** `src/components/LoginForm.tsx`

```typescript
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
```


# ⚙️Arquivos Gerais do Tasks-app

## 🎯 package.json
```json
{
  "name": "tasks-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.7.9",
    "primeflex": "^3.3.1",
    "primeicons": "^7.0.0",
    "primereact": "^10.9.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.1",
    "single-spa-react": "^6.0.2"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/node": "^22.10.5",
    "@types/react": "^18.3.17",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.17.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.13.0",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.18.1",
    "vite": "^6.0.3"
  }
}

```


> ⚠️ **IMPORTANTE**: No `main.tsx`, adicione os imports do CSS do PrimeReact:
> ```typescript
> import 'primereact/resources/themes/lara-light-indigo/theme.css';
> import 'primereact/resources/primereact.min.css';
> import 'primeicons/primeicons.css';
> import 'primeflex/primeflex.css';
> ```

⚠️ **IMPORTANTE 2**: Ainda no `main.tsx`, remova a estilização CSS:

```typescript
import './index.css'
```

## 🎯  vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3002,
    cors: true,
    origin: 'http://localhost:3002',
  },
  
  preview: {
    port: 3002,
  },
  
  build: {
    rollupOptions: {
      input: 'src/root.component.tsx',
      output: {
        format: 'system',
        entryFileNames: 'tasks-app.js',
      },
      external: ['react', 'react-dom', 'react-router-dom', 'single-spa-react'],
      preserveEntrySignatures: 'allow-extension',
    },
  },
  
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  
  base: 'http://localhost:3002/',
});
```

## 🎯 Design System: Theme (src/styles/theme.ts)

```typescript
export const theme = {
  colors: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    background: '#f8fafc',
    cardBg: '#ffffff',
    textDark: '#0f172a',
    textMuted: '#64748b',
    textLight: '#94a3b8',
    border: '#e2e8f0',
    status: {
      pending: '#f59e0b',
      completed: '#22c55e',
    },
    danger: '#ef4444',
    info: '#3b82f6',
  },
  sizes: {
    inputHeight: '48px',
    headerHeight: '5rem',
  },
};
```

---

## 🎯 Layout Reutilizável: DashboardLayout (`src/layouts/DashboardLayout.tsx`)

```typescript
import { ReactNode } from 'react';
import { Button } from 'primereact/button';
import { theme } from '../styles/theme';

interface DashboardLayoutProps {
  title: string;
  userName?: string;
  children: ReactNode;
  onLogout: () => void;
}

export function DashboardLayout({ title, userName, children, onLogout }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-column" style={{ backgroundColor: theme.colors.background }}>
      <header className="surface-card shadow-2 px-4 flex align-items-center justify-content-between sticky top-0 z-5" style={{ height: theme.sizes.headerHeight }}>
        <div className="flex align-items-center gap-2">
          <i className="pi pi-list text-3xl" style={{ color: theme.colors.primary }}></i>
          <h1 className="m-0 font-bold text-xl" style={{ color: theme.colors.textDark }}>{title}</h1>
        </div>
        <div className="flex align-items-center gap-4">
          {userName && <span>Olá, <strong>{userName}</strong></span>}
          <Button label="Sair" icon="pi pi-sign-out" severity="danger" outlined size="small" onClick={onLogout} />
        </div>
      </header>
      <main className="flex-grow-1 p-4 md:p-6"><div className="mx-auto" style={{ maxWidth: '1200px' }}>{children}</div></main>
      <footer className="p-4 text-center text-sm" style={{ color: theme.colors.textLight }}>© 2026 ToDoList App • Desafio proposto pela equipe do Conecta Sedu</footer>
    </div>
  );
}
```

---

## 🎯 Componentes UI Reutilizáveis

### SearchField (`src/components/ui/SearchField.tsx`)

```typescript
import { InputText } from 'primereact/inputtext';
import { theme } from '../../styles/theme';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchField({ value, onChange, placeholder = 'Pesquisar...' }: SearchFieldProps) {
  return (
    <div 
      className="flex align-items-center w-full md:w-25rem border-round"
      style={{ backgroundColor: theme.colors.cardBg, border: `1px solid ${theme.colors.border}`, height: theme.sizes.inputHeight, paddingLeft: '1rem' }}
    >
      <i className="pi pi-search mr-2" style={{ color: theme.colors.textLight }}></i>
      <InputText value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full border-none" style={{ backgroundColor: 'transparent' }} />
    </div>
  );
}
```

### TaskStatusTag (`src/components/ui/TaskStatusTag.tsx`)

```typescript
import { Tag } from 'primereact/tag';

export function TaskStatusTag({ done }: { done: boolean }) {
  return <Tag value={done ? 'Concluída' : 'Pendente'} severity={done ? 'success' : 'warning'} />;
}
```

### TaskDialog (`src/components/ui/TaskDialog.tsx`)

```typescript
import { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';

import { Task } from '../services/taskService';

interface TaskDialogProps {
  visible: boolean;
  task: Task | null;
  loading: boolean;
  onHide: () => void;
  onSave: (data: { id?: number; title: string; description: string; dueDate?: string }) => void;
}

export function TaskDialog({ visible, task, loading, onHide, onSave }: TaskDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (visible) {
      if (task) {
        setTitle(task.title);
        setDescription(task.description || '');
        setDueDate(task.dueDate ? new Date(task.dueDate) : null);
      } else {
        setTitle('');
        setDescription('');
        setDueDate(null);
      }
      setSubmitted(false);
    }
  }, [visible, task]);

  const handleSubmit = () => {
    setSubmitted(true);

    if (title.trim()) {
      onSave({
        id: task?.id,
        title,
        description,
        dueDate: dueDate ? dueDate.toISOString() : undefined,
      });
    }
  };

  const footer = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={onHide} className="p-button-text" />
      <Button label="Salvar" icon="pi pi-check" onClick={handleSubmit} loading={loading} autoFocus />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      style={{ width: '450px' }}
      header={task ? 'Editar Tarefa' : 'Nova Tarefa'}
      modal
      className="p-fluid"
      footer={footer}
      onHide={onHide}
    >
      <div className="field">
        <label htmlFor="title">Título</label>
        <InputText
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
          className={classNames({ 'p-invalid': submitted && !title })}
        />
        {submitted && !title && <small className="p-error">Título é obrigatório.</small>}
      </div>

      <div className="field">
        <label htmlFor="description">Descrição</label>
        <InputTextarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          cols={20}
        />
      </div>

      <div className="field">
        <label htmlFor="dueDate">Data de Vencimento</label>
        <Calendar
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.value || null)}
          showIcon
          dateFormat="dd/mm/yy"
        />
      </div>
    </Dialog>
  );
}

```

### TaskHeader (`src/components/TaskHeader.tsx`)

```typescript
import { Button } from 'primereact/button';
import { SearchField } from './ui/SearchField';
import { theme } from '../styles/theme';

interface TaskHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onNewTask: () => void;
}

export function TaskHeader({ searchValue, onSearchChange, onNewTask }: TaskHeaderProps) {
  return (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4 gap-3">
      <SearchField value={searchValue} onChange={onSearchChange} placeholder="Pesquisar tarefas..." />
      <Button label="Nova Tarefa" icon="pi pi-plus" className="font-bold" style={{ backgroundColor: theme.colors.primary }} onClick={onNewTask} />
    </div>
  );
}
```

---
### TaskHeader (`src/components/ui/TaskTable.tsx`)

```typescript
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { TaskStatusTag } from './ui/TaskStatusTag';
import { Task } from '../services/taskService';

interface TaskTableProps {
  tasks: Task[];
  loading: boolean;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskTable({ tasks, loading, onToggle, onEdit, onDelete }: TaskTableProps) {
  return (
    <DataTable value={tasks} loading={loading} emptyMessage="Nenhuma tarefa encontrada" stripedRows className="shadow-3 border-round-xl">
      <Column body={(task) => <Checkbox checked={task.done} onChange={() => onToggle(task)} />} style={{ width: '3rem' }} />
      <Column field="title" header="Título" sortable />
      <Column field="description" header="Descrição" body={(task) => <span className="text-600">{task.description}</span>} />
      <Column header="Status" body={(task) => <TaskStatusTag done={task.done} />} />
      <Column header="Ações" body={(task) => (
        <div className="flex justify-content-center gap-2">
          <Button icon="pi pi-pencil" rounded text severity="info" onClick={() => onEdit(task)} />
          <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => onDelete(task)} />
        </div>
      )} />
    </DataTable>
  );
}
```


## 🎯 authService.ts

```typescript
// tasks-app/src/services/authService.ts
export const authService = {
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'http://localhost:3001';
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },
};
```

## 🎯 Padrão de taskService

**Arquivo:** `src/services/taskService.ts`

```typescript
import axios from 'axios';
import { authService } from './authService';

const API_URL = 'http://localhost:3000/tasks';

export interface Task {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  dueDate?: string | Date;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const getHeaders = () => {
  const token = authService.getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const response = await axios.get(API_URL, getHeaders());
    return response.data;
  },

  create: async (task: Partial<Task>): Promise<Task> => {
    const response = await axios.post(API_URL, task, getHeaders());
    return response.data;
  },

  update: async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await axios.patch(`${API_URL}/${id}`, task, getHeaders());
    return response.data;
  },

  toggleDone: async (id: number): Promise<Task> => {
    const response = await axios.patch(`${API_URL}/${id}/toggle`, {}, getHeaders());
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`, getHeaders());
  },
};
```

---

## 🎯 App.tsx

```typescript
import { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { TaskTable } from './components/TaskTable';
import { TaskDialog } from './components/TaskDialog';
import { taskService, type Task } from './services/taskService';
import { authService } from './services/authService';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useRef<Toast>(null);
  const user = authService.getUser();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userData = urlParams.get('user');

    if (token && userData) {
      localStorage.setItem('token', decodeURIComponent(token));
      localStorage.setItem('user', decodeURIComponent(userData));
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchTasks();
    } else if (authService.isAuthenticated()) {
      fetchTasks();
    } else {
      window.location.href = 'http://localhost:3001';
    }
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        authService.logout();
      } else {
        showError('Erro ao carregar tarefas');
      }
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (message: string) => {
    toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: message, life: 3000 });
  };

  const showError = (message: string) => {
    toast.current?.show({ severity: 'error', summary: 'Erro', detail: message, life: 3000 });
  };

  const handleCreate = () => {
    setSelectedTask(null);
    setDialogVisible(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setDialogVisible(true);
  };

  const handleSave = async (data: { id?: number; title: string; description: string; dueDate?: string }) => {
    setSaving(true);
    try {
      if (data.id) {
        await taskService.update(data.id, data);
        showSuccess('Tarefa atualizada');
      } else {
        await taskService.create(data);
        showSuccess('Tarefa criada');
      }
      setDialogVisible(false);
      fetchTasks();
    } catch {
      showError('Erro ao salvar tarefa');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (task: Task) => {
    try {
      await taskService.toggleDone(task.id);
      fetchTasks();
    } catch {
      showError('Erro ao alterar status');
    }
  };

  const handleDelete = (task: Task) => {
    confirmDialog({
      message: `Deseja excluir "${task.title}"?`,
      header: 'Confirmar exclusão',
      icon: 'pi pi-trash',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: async () => {
        try {
          await taskService.delete(task.id);
          showSuccess('Tarefa excluída');
          fetchTasks();
        } catch {
          showError('Erro ao excluir');
        }
      },
    });
  };

  return (
    <div className="min-h-screen surface-ground">
      <Toast ref={toast} />
      <ConfirmDialog />

      {/* Header */}
      <header className="surface-card shadow-2 p-3 flex justify-content-between align-items-center">
        <h1 className="text-xl m-0">📋 Minhas Tarefas</h1>
        <div className="flex align-items-center gap-3">
          <span>Olá, {user?.name || 'Usuário'}</span>
          <Button label="Sair" icon="pi pi-sign-out" severity="secondary" size="small" onClick={() => authService.logout()} />
        </div>
      </header>

      {/* Content */}
      <main className="p-4">
        <div className="flex justify-content-end mb-3">
          <Button label="Nova Tarefa" icon="pi pi-plus" onClick={handleCreate} />
        </div>
        <TaskTable tasks={tasks} loading={loading} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      {/* Dialog */}
      <TaskDialog visible={dialogVisible} task={selectedTask} loading={saving} onHide={() => setDialogVisible(false)} onSave={handleSave} />
    </div>
  );
}

export default App;
```

---

