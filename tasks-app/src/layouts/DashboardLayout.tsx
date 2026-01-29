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