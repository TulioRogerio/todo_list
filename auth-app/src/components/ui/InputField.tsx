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