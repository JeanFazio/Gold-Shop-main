// Funções para consumir a rota EzzyPag do backend Express
import axios from 'axios';

// Permite configurar o domínio do backend via variável de ambiente
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export interface PixPaymentData {
  amount: number;
  description: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_document: string;
}

export async function criarPixBackend(data: PixPaymentData) {
  const response = await axios.post(`${API_BASE_URL}/api/ezzypag/pix`, data);
  return response.data;
}

export async function consultarStatusBackend(id: string) {
  const response = await axios.get(`${API_BASE_URL}/api/ezzypag/status/${encodeURIComponent(id)}`);
  return response.data;
}

export interface CardPaymentData {
  amount: number;
  description: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_document: string;
  card_token: string;
}

export async function criarCartaoBackend(data: CardPaymentData) {
  const response = await axios.post(`${API_BASE_URL}/api/ezzypag/card`, data);
  return response.data;
}
