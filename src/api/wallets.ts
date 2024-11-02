import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const API_URL = 'http://localhost:5000/api';

export const getWallets = async () => {
  const token = useAuthStore.getState().token;
  const response = await axios.get(`${API_URL}/get_my_wallet`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const addWallet = async (data: any) => {
  const token = useAuthStore.getState().token;
  const response = await axios.post(
    `${API_URL}/add_wallet`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};

export const updateWallet = async ({ id, ...data }: { id: number; [key: string]: any }) => {
  const token = useAuthStore.getState().token;
  const response = await axios.put(
    `${API_URL}/update_wallet/${id}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};

export const deleteWallet = async (id: number) => {
  const token = useAuthStore.getState().token;
  const response = await axios.delete(
    `${API_URL}/delete_wallet/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};