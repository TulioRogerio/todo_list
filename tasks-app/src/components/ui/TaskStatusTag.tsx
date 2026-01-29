import { Tag } from 'primereact/tag';

export function TaskStatusTag({ done }: { done: boolean }) {
  return <Tag value={done ? 'Concluída' : 'Pendente'} severity={done ? 'success' : 'warning'} />;
}