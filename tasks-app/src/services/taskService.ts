import axios from 'axios';
import { authService } from './authService';

const API_URL = 'http://localhost:3000/tasks';

export interface Task {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  dueDate?: string | Date;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const getHeaders = () => {
  const token = authService.getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const response = await axios.get(API_URL, getHeaders());
    return response.data;
  },

  create: async (task: Partial<Task>): Promise<Task> => {
    const response = await axios.post(API_URL, task, getHeaders());
    return response.data;
  },

  update: async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await axios.patch(`${API_URL}/${id}`, task, getHeaders());
    return response.data;
  },

  toggleDone: async (id: number): Promise<Task> => {
    const response = await axios.patch(`${API_URL}/${id}/toggle`, {}, getHeaders());
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`, getHeaders());
  },
};