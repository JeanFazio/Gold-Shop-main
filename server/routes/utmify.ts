import express from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const utmifyApiUrl = "https://api.utmify.com.br/api-credentials/orders";
const utmifyToken = process.env.UTMIFY_TOKEN || "REMOVED";
const isServerless = process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME;
const logDir = isServerless ? '/tmp/netlify-logs' : path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  try {
    fs.mkdirSync(logDir, { recursive: true });
  } catch (err) {
  }
}
const logFile = path.join(logDir, 'utmify-' + new Date().toISOString().slice(0,10) + '.log');

function writeLog(message: string, data?: any) {
  const timestamp = new Date().toISOString();
  let logMessage = `[${timestamp}] ${message}\n`;
  if (data !== undefined) {
    logMessage += `Dados: ${JSON.stringify(data, null, 2)}\n`;
  }
  logMessage += "----------------------------------------\n";
  fs.appendFileSync(logFile, logMessage);
}

router.post('/order', async (req, res) => {
  try {
    writeLog('📥 Dados recebidos', req.body);
    const inputData = req.body;

    const paidStatuses = ['paid', 'PAID', 'approved', 'APPROVED', 'completed', 'COMPLETED'];
    if (inputData.status && !paidStatuses.includes(inputData.status)) {
      writeLog('⏭️ Status ignorado - não é pagamento confirmado', { status_recebido: inputData.status, status_aceitos: paidStatuses });
      return res.status(200).json({ message: 'Status ignorado - aguardando pagamento confirmado' });
    }
    writeLog('✅ Status de pagamento confirmado detectado', { status: inputData.status });

    // Garante todos os campos UTM como string ou null
    const utms = inputData.trackingParameters || {};
    const utmPayload = {
      utm_source: typeof utms.utm_source === 'string' ? utms.utm_source : null,
      utm_medium: typeof utms.utm_medium === 'string' ? utms.utm_medium : null,
      utm_campaign: typeof utms.utm_campaign === 'string' ? utms.utm_campaign : null,
      utm_content: typeof utms.utm_content === 'string' ? utms.utm_content : null,
      utm_term: typeof utms.utm_term === 'string' ? utms.utm_term : null,
    };
    const utmifyData = {
      orderId: inputData.orderId,
      platform: 'Aurixpay',
      paymentMethod: inputData.paymentMethod || 'pix',
      status: inputData.status || 'paid',
      createdAt: inputData.createdAt || new Date().toISOString(),
      approvedDate: inputData.approvedDate || new Date().toISOString(),
      refundedAt: null,
      customer: {
        name: inputData.customer?.name,
        email: inputData.customer?.email,
        phone: inputData.customer?.phone || null,
        document: inputData.customer?.document,
        country: 'BR',
        ip: req.ip || null
      },
      products: [
        {
          id: inputData.products?.[0]?.id || 'prod-' + Date.now(),
          name: inputData.products?.[0]?.name,
          planId: null,
          planName: null,
          quantity: inputData.products?.[0]?.quantity,
          priceInCents: inputData.products?.[0]?.priceInCents
        }
      ],
      trackingParameters: utmPayload,
      commission: {
        totalPriceInCents: inputData.commission?.totalPriceInCents,
        gatewayFeeInCents: inputData.commission?.gatewayFeeInCents || 0,
        userCommissionInCents: inputData.commission?.userCommissionInCents || inputData.commission?.totalPriceInCents,
        currency: 'BRL'
      },
      isTest: !!inputData.isTest
    };
    writeLog('📤 Dados formatados para Utmify', utmifyData);

    const response = await axios.post(utmifyApiUrl, utmifyData, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': utmifyToken
      }
    });
    // Adiciona log no console para teste rápido
    console.log('Resposta da API Utmify:', response.status, response.data);
    writeLog('✅ Resposta da API Utmify', { http_code: response.status, response: response.data });
    res.status(200).json({ success: true, message: 'Dados enviados com sucesso para Utmify', utmify: response.data });
  } catch (e: any) {
    writeLog('❌ Erro', { message: e.message, details: e.response?.data });
    res.status(500).json({ success: false, message: e.message, details: e.response?.data });
  }
});

export default router;
