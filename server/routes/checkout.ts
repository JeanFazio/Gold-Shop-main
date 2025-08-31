import { RequestHandler } from "express";
import { CheckoutRequest, CheckoutResponse } from "@shared/api";

export const handleCheckout: RequestHandler = async (req, res) => {
  try {
    const checkoutData: CheckoutRequest = req.body;
    console.log(
      "Dados do checkout recebidos:",
      JSON.stringify(checkoutData, null, 2),
    );

    // Validação básica dos dados
    if (!checkoutData.customer?.name || !checkoutData.customer?.email) {
      return res.status(400).json({
        success: false,
        error: "Dados do cliente são obrigatórios",
      } as CheckoutResponse);
    }

    if (!checkoutData.items || checkoutData.items.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Carrinho vazio",
      } as CheckoutResponse);
    }

    if (!checkoutData.payment_method || !checkoutData.payment_method.type) {
      return res.status(400).json({
        success: false,
        error: "Método de pagamento é obrigatório",
      } as CheckoutResponse);
    }

    // Validar dados específicos do método de pagamento
    if (
      checkoutData.payment_method.type === "credit_card" &&
      !checkoutData.payment_method.card_token
    ) {
      return res.status(400).json({
        success: false,
        error: "Token do cartão é obrigatório",
      } as CheckoutResponse);
    }

    // Configurar headers para EzzyPag
    const ezzypagApiKey = process.env.EZZYPAG_API_KEY;

    if (!ezzypagApiKey) {
      console.error("EZZYPAG_API_KEY não configurada");
      return res.status(500).json({
        success: false,
        error: "Configuração de pagamento não encontrada",
      } as CheckoutResponse);
    }

    // Adicionar URL de postback se não estiver definida
    if (!checkoutData.postback_url) {
      // Determinar URL base dinamicamente
      const protocol = req.headers["x-forwarded-proto"] || "http";
      const host = req.headers.host || "localhost:8080";
      checkoutData.postback_url = `${protocol}://${host}/api/webhook/ezzypag`;
    }

    // Criar Basic Auth token (chave_secreta:x em base64)
    const basicAuth = Buffer.from(`${ezzypagApiKey}:x`).toString("base64");

    // Chamar API da EzzyPag
    console.log(
      "Chamando API EzzyPag com dados:",
      JSON.stringify(checkoutData, null, 2),
    );
    const ezzypagResponse = await fetch(
      "https://api.ezzypag.com.br/v1/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${basicAuth}`,
        },
        body: JSON.stringify(checkoutData),
      },
    );

    let ezzypagData;
    let responseText;

    try {
      // Tentar ler como JSON primeiro
      responseText = await ezzypagResponse.text();
      ezzypagData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Erro ao fazer parse da resposta EzzyPag:", parseError);
      console.error("Resposta raw:", responseText);
      return res.status(500).json({
        success: false,
        error: "Erro ao processar resposta do pagamento",
      } as CheckoutResponse);
    }

    if (!ezzypagResponse.ok) {
      console.error(
        "Erro na API EzzyPag:",
        ezzypagResponse.status,
        responseText,
      );
      return res.status(500).json({
        success: false,
        error: ezzypagData?.message || "Erro ao processar pagamento",
      } as CheckoutResponse);
    }

    // Verificar se recebemos o checkout_url
    if (!ezzypagData.checkout_url) {
      console.error("checkout_url não retornado pela EzzyPag:", ezzypagData);
      return res.status(500).json({
        success: false,
        error: "Link de pagamento não gerado",
      } as CheckoutResponse);
    }

    // Retornar sucesso com o checkout_url
    res.json({
      success: true,
      checkout_url: ezzypagData.checkout_url,
    } as CheckoutResponse);
  } catch (error) {
    console.error("Erro no checkout:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor",
    } as CheckoutResponse);
  }
};
