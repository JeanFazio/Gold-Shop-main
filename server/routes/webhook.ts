import { RequestHandler } from "express";
import {
  EzzyPagWebhook,
  WebhookProcessResult,
  TransactionWebhook,
  CheckoutWebhook,
} from "@shared/webhook-types";

export const handleEzzyPagWebhook: RequestHandler = async (req, res) => {
  try {
    const webhookData: EzzyPagWebhook = req.body;

    console.log(
      "Webhook recebido da EzzyPag:",
      JSON.stringify(webhookData, null, 2),
    );

    // Validar estrutura básica do webhook
    if (!webhookData.type || !webhookData.data) {
      console.error("Webhook inválido: estrutura incorreta");
      return res.status(400).json({
        success: false,
        message: "Estrutura de webhook inválida",
      } as WebhookProcessResult);
    }

    let result: WebhookProcessResult;

    // Processar baseado no tipo do webhook
    if (webhookData.type === "transaction") {
      result = await processTransactionWebhook(
        webhookData as TransactionWebhook,
      );
    } else if (webhookData.type === "checkout") {
      result = await processCheckoutWebhook(webhookData as CheckoutWebhook);
    } else {
      console.error(
        "Tipo de webhook não suportado:",
        (webhookData as any).type,
      );
      return res.status(400).json({
        success: false,
        message: "Tipo de webhook não suportado",
      } as WebhookProcessResult);
    }

    // Responder baseado no resultado do processamento
    if (result.success) {
      console.log("Webhook processado com sucesso:", result.message);
      res.status(200).json(result);
    } else {
      console.error("Erro ao processar webhook:", result.message);
      res.status(400).json(result);
    }
  } catch (error) {
    console.error("Erro interno no webhook:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    } as WebhookProcessResult);
  }
};

async function processTransactionWebhook(
  webhook: TransactionWebhook,
): Promise<WebhookProcessResult> {
  const transaction = webhook.data;

  console.log(
    `Processando transação ${transaction.id} com status: ${transaction.status}`,
  );

  // Extrair informações importantes
  const orderId = transaction.externalRef || transaction.secureId;
  const amount = transaction.amount / 100; // Converter de centavos para reais
  const status = transaction.status;
  const paymentMethod = transaction.paymentMethod;
  const customerEmail = transaction.customer.email;
  const customerName = transaction.customer.name;

  // Log das informações principais
  console.log("Detalhes da transação:", {
    orderId,
    amount: `R$ ${amount.toFixed(2)}`,
    status,
    paymentMethod,
    customerEmail,
    customerName,
    paidAt: transaction.paidAt,
  });

  // Aqui você implementaria a lógica específica do seu negócio
  // Por exemplo: atualizar status do pedido no banco de dados

  switch (status) {
    case "paid":
      console.log(`✅ Pagamento confirmado para o pedido ${orderId}`);
      // TODO: Marcar pedido como pago no banco de dados
      // TODO: Enviar email de confirmação para o cliente
      // TODO: Iniciar processo de fulfillment
      break;

    case "refused":
      console.log(`❌ Pagamento recusado para o pedido ${orderId}`);
      console.log("Motivo:", transaction.refusedReason);
      // TODO: Marcar pedido como cancelado
      // TODO: Notificar cliente sobre falha no pagamento
      break;

    case "pending":
      console.log(`⏳ Pagamento pendente para o pedido ${orderId}`);
      // TODO: Manter pedido em status pendente
      break;

    case "refunded":
      console.log(`💰 Estorno processado para o pedido ${orderId}`);
      // TODO: Processar estorno no sistema
      break;

    case "chargeback":
      console.log(`⚠️ Chargeback registrado para o pedido ${orderId}`);
      // TODO: Processar chargeback no sistema
      break;

    default:
      console.log(`❓ Status desconhecido: ${status} para o pedido ${orderId}`);
  }

  return {
    success: true,
    message: `Transação ${transaction.id} processada com status: ${status}`,
    orderStatus: status,
  };
}

async function processCheckoutWebhook(
  webhook: CheckoutWebhook,
): Promise<WebhookProcessResult> {
  const checkout = webhook.data;
  const transaction = checkout.transaction;

  console.log(
    `Processando checkout ${checkout.id} com transação ${transaction?.id}`,
  );

  // Se o checkout tem uma transação associada, processar ela também
  if (transaction) {
    console.log("Checkout contém transação, processando...");

    // Criar um webhook simulado para a transação
    const transactionWebhook: TransactionWebhook = {
      id: webhook.id,
      type: "transaction",
      objectId: transaction.id.toString(),
      url: webhook.url,
      data: transaction,
    };

    return await processTransactionWebhook(transactionWebhook);
  }

  // Caso não tenha transação (checkout apenas criado)
  console.log("Checkout criado sem transação ainda");

  return {
    success: true,
    message: `Checkout ${checkout.id} criado com sucesso`,
  };
}
