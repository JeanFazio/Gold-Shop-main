const EZZYPAG_SECRET = process.env.EZZYPAG_SECRET || 'sk_live_v2I3Eu3wHDBJrFtwGYpfrH4DrwK2T1MJfVBBxSklME';
import express from 'express';
import axios from 'axios';

const router = express.Router();

function getAuthHeader(secret: string) {
  return 'Basic ' + Buffer.from(secret + ':x').toString('base64');
}

router.post('/pix', async (req, res) => {
  try {
    console.log('REQ BODY PIX:', req.body);
    const { amount, description, customer_name, customer_email, customer_phone, customer_document } = req.body;
    const ezzypagData = {
      amount: Math.round(amount * 100),
      paymentMethod: 'pix',
      items: [{
        title: description || 'Pagamento PIX',
        unitPrice: Math.round(amount * 100),
        quantity: 1,
        tangible: true
      }],
      customer: {
        name: customer_name,
        email: customer_email,
        phone: customer_phone,
        document: { type: 'cpf', number: customer_document }
      }
    };
    console.log('ENVIANDO PARA EZZYPAG:', ezzypagData);
    const response = await axios.post('https://api.ezzypag.com.br/v1/transactions', ezzypagData, {
      headers: {
        'Authorization': getAuthHeader(EZZYPAG_SECRET),
        'Content-Type': 'application/json'
      }
    });
    console.log('RESPOSTA EZZYPAG:', response.data);
    res.status(response.status).json(response.data);
  } catch (err: any) {
    console.error('ERRO EZZYPAG:', err?.response?.data || err.message);
    res.status(400).json({ success: false, error: err.message, details: err?.response?.data });
  }
});

router.get('/status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.ezzypag.com.br/v1/transactions/${encodeURIComponent(id)}`, {
      headers: {
        'Authorization': getAuthHeader(EZZYPAG_SECRET),
        'Content-Type': 'application/json'
      }
    });
    res.status(response.status).json(response.data);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.post('/card', async (req, res) => {
  try {
    const { amount, description, customer_name, customer_email, customer_phone, customer_document, card_token } = req.body;
    const ezzypagData = {
      amount: Math.round(amount * 100),
      paymentMethod: 'credit_card',
      items: [{
        title: description || 'Pagamento Cartão',
        unitPrice: Math.round(amount * 100),
        quantity: 1,
        tangible: true
      }],
      customer: {
        name: customer_name,
        email: customer_email,
        phone: customer_phone,
        document: { type: 'cpf', number: customer_document }
      },
      card: {
        token: card_token
      }
    };
    const response = await axios.post('https://api.ezzypag.com.br/v1/transactions', ezzypagData, {
      headers: {
        'Authorization': getAuthHeader(EZZYPAG_SECRET),
        'Content-Type': 'application/json'
      }
    });
    res.status(response.status).json(response.data);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

export default router;
