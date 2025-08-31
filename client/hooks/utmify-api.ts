// Função para enviar dados de conversão (pedido + UTMs) para o backend Utmify
import axios from 'axios';
import { getUtmsFromCookie } from './utm-utils';

export async function enviarConversaoUtmify(pedido: any) {
  const utms = getUtmsFromCookie() || {};
  
  const utmPayload = {
    utm_source: typeof utms.utm_source === 'string' ? utms.utm_source : null,
    utm_medium: typeof utms.utm_medium === 'string' ? utms.utm_medium : null,
    utm_campaign: typeof utms.utm_campaign === 'string' ? utms.utm_campaign : null,
    utm_content: typeof utms.utm_content === 'string' ? utms.utm_content : null,
    utm_term: typeof utms.utm_term === 'string' ? utms.utm_term : null,
  };
  const payload = {
    ...pedido,
    trackingParameters: utmPayload,
  };
  const response = await axios.post('/api/utmify/order', payload);
  return response.data;
}
