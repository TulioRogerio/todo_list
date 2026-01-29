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