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