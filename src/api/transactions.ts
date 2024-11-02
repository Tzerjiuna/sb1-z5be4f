import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const API_URL = 'http://localhost:5000/api';

export const getRechargeRecords = async () => {
  const token = useAuthStore.getState().token;
  const response = await axios.post(
    `${API_URL}/get_recharge`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};

export const updateWithdrawal = async ({ id, ...data }: { id: number; [key: string]: any }) => {
  const token = useAuthStore.getState().token;
  const response = await axios.put(
    `${API_URL}/update_withdrawal/${id}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};