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