// Funções para consumir a rota EzzyPag do backend Express
import axios from 'axios';

export interface PixPaymentData {
  amount: number;
  description: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_document: string;
}

export async function criarPixBackend(data: PixPaymentData) {
  const response = await axios.post('/api/ezzypag/pix', data);
  return response.data;
}

export async function consultarStatusBackend(id: string) {
  const response = await axios.get(`/api/ezzypag/status/${encodeURIComponent(id)}`);
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
  const response = await axios.post('/api/ezzypag/card', data);
  return response.data;
}