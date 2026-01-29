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