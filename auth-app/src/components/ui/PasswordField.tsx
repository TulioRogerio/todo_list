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