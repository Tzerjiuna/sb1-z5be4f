import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const API_URL = 'http://localhost:5000/api';

export const getUsers = async () => {
  const token = useAuthStore.getState().token;
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateUser = async ({ id, ...data }: { id: number; [key: string]: any }) => {
  const token = useAuthStore.getState().token;
  const response = await axios.put(
    `${API_URL}/users/${id}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};

export const createUser = async (data: any) => {
  const token = useAuthStore.getState().token;
  const response = await axios.post(
    `${API_URL}/users`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};