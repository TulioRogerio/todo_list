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
