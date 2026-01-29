import { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { TaskTable } from './components/TaskTable';
import { TaskDialog } from './components/TaskDialog';
import { taskService, type Task } from './services/taskService';
import { authService } from './services/authService';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useRef<Toast>(null);
  const user = authService.getUser();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userData = urlParams.get('user');

    if (token && userData) {
      localStorage.setItem('token', decodeURIComponent(token));
      localStorage.setItem('user', decodeURIComponent(userData));
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchTasks();
    } else if (authService.isAuthenticated()) {
      fetchTasks();
    } else {
      window.location.href = 'http://localhost:3001';
    }
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        authService.logout();
      } else {
        showError('Erro ao carregar tarefas');
      }
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (message: string) => {
    toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: message, life: 3000 });
  };

  const showError = (message: string) => {
    toast.current?.show({ severity: 'error', summary: 'Erro', detail: message, life: 3000 });
  };

  const handleCreate = () => {
    setSelectedTask(null);
    setDialogVisible(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setDialogVisible(true);
  };

  const handleSave = async (data: { id?: number; title: string; description: string; dueDate?: string }) => {
    setSaving(true);
    try {
      if (data.id) {
        await taskService.update(data.id, data);
        showSuccess('Tarefa atualizada');
      } else {
        await taskService.create(data);
        showSuccess('Tarefa criada');
      }
      setDialogVisible(false);
      fetchTasks();
    } catch {
      showError('Erro ao salvar tarefa');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (task: Task) => {
    try {
      await taskService.toggleDone(task.id);
      fetchTasks();
    } catch {
      showError('Erro ao alterar status');
    }
  };

  const handleDelete = (task: Task) => {
    confirmDialog({
      message: `Deseja excluir "${task.title}"?`,
      header: 'Confirmar exclusão',
      icon: 'pi pi-trash',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: async () => {
        try {
          await taskService.delete(task.id);
          showSuccess('Tarefa excluída');
          fetchTasks();
        } catch {
          showError('Erro ao excluir');
        }
      },
    });
  };

  return (
    <div className="min-h-screen surface-ground">
      <Toast ref={toast} />
      <ConfirmDialog />

      {/* Header */}
      <header className="surface-card shadow-2 p-3 flex justify-content-between align-items-center">
        <h1 className="text-xl m-0">📋 Minhas Tarefas</h1>
        <div className="flex align-items-center gap-3">
          <span>Olá, {user?.name || 'Usuário'}</span>
          <Button label="Sair" icon="pi pi-sign-out" severity="secondary" size="small" onClick={() => authService.logout()} />
        </div>
      </header>

      {/* Content */}
      <main className="p-4">
        <div className="flex justify-content-end mb-3">
          <Button label="Nova Tarefa" icon="pi pi-plus" onClick={handleCreate} />
        </div>
        <TaskTable tasks={tasks} loading={loading} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      {/* Dialog */}
      <TaskDialog visible={dialogVisible} task={selectedTask} loading={saving} onHide={() => setDialogVisible(false)} onSave={handleSave} />
    </div>
  );
}

export default App;