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