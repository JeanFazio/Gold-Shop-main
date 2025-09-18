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

    // Monta payload flexível para Utmify, inspirado no exemplo PHP
    const utms = inputData.trackingParameters || {};
    const utmPayload = {
      src: utms.src || null,
      sck: utms.sck || null,
      utm_source: utms.utm_source || null,
      utm_campaign: utms.utm_campaign || null,
      utm_medium: utms.utm_medium || null,
      utm_content: utms.utm_content || null,
      utm_term: utms.utm_term || null,
      xcod: utms.xcod || null,
      fbclid: utms.fbclid || null,
      gclid: utms.gclid || null,
      ttclid: utms.ttclid || null,
    };
    // Garante pelo menos 1 produto genérico se não vier nenhum
    let products = Array.isArray(inputData.products) && inputData.products.length > 0
      ? inputData.products.map((p: any, idx: number) => ({
          id: p.id || `prod-${idx}-${Date.now()}`,
          name: p.name || 'Produto Genérico',
          planId: p.planId || null,
          planName: p.planName || null,
          quantity: p.quantity || 1,
          priceInCents: p.priceInCents || Math.round(inputData.amount * 100) || 100
        }))
      : [{
          id: `prod-1-${Date.now()}`,
          name: 'Produto Genérico',
          planId: null,
          planName: null,
          quantity: 1,
          priceInCents: Math.round(inputData.amount * 100) || 100
        }];

    // Garante todos os campos de comissão como número
    const commission = {
      totalPriceInCents: typeof inputData.commission?.totalPriceInCents === 'number'
        ? inputData.commission.totalPriceInCents
        : Math.round(inputData.amount * 100) || 100,
      gatewayFeeInCents: typeof inputData.commission?.gatewayFeeInCents === 'number'
        ? inputData.commission.gatewayFeeInCents
        : 0,
      userCommissionInCents: typeof inputData.commission?.userCommissionInCents === 'number'
        ? inputData.commission.userCommissionInCents
        : Math.round(inputData.amount * 100) || 100,
      currency: 'BRL'
    };

    const utmifyData = {
      orderId: inputData.orderId,
      platform: 'Aurixpay',
      paymentMethod: inputData.paymentMethod || 'pix',
      status: inputData.status || 'waiting_payment',
      createdAt: inputData.createdAt || new Date().toISOString(),
      approvedDate: inputData.approvedDate || null,
      refundedAt: inputData.refundedAt || null,
      customer: {
        name: inputData.customer?.name,
        email: inputData.customer?.email,
        phone: inputData.customer?.phone || null,
        document: inputData.customer?.document,
        country: 'BR',
        ip: req.ip || null
      },
      products,
      trackingParameters: utmPayload,
      commission,
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
