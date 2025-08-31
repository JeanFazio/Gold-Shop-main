import { useState, useEffect } from "react";
import axios from 'axios';
const EZZYPAG_BASE_URL = 'https://api.ezzypag.com.br';

export async function criarCobrancaPix({valor, nome, cpf, descricao, apiKey}) {
  try {
    const response = await axios.post(
      `${EZZYPAG_BASE_URL}/pix/cobranca`,
      {
        valor,
        nome,
        cpf,
        descricao,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function pagarComCartao({valor, nome, numero, validade, cvv, cpf, descricao, apiKey}) {
  try {
    const response = await axios.post(
      `${EZZYPAG_BASE_URL}/cartao/pagamento`,
      {
        valor,
        nome,
        numero,
        validade,
        cvv,
        cpf,
        descricao,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
import { CreditCardData } from "@shared/api";

declare global {
  interface Window {
    EzzyPag?: {
      setPublicKey: (key: string) => void;
      setTestMode: (testMode: boolean) => void;
      encrypt: (cardData: CreditCardData) => Promise<string>;
    };
  }
}

export function useEzzyPag() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isTokenizing, setIsTokenizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);


  useEffect(() => {
    const checkScript = () => {
      if (typeof window !== "undefined" && window.EzzyPag) {
        setScriptLoaded(true);
        console.log("EzzyPag script detectado");
      }
    };

    checkScript();
    
    const interval = setInterval(() => {
      if (!scriptLoaded) {
        checkScript();
      } else {
        clearInterval(interval);
      }
    }, 500);

    // Limpar interval após 10 segundos
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!scriptLoaded) {
        console.error("EzzyPag script não carregado após 10 segundos");
        setError(
          "Script de pagamento não carregado. Tente recarregar a página.",
        );
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [scriptLoaded]);

  const initializeEzzyPag = async () => {
    if (typeof window === "undefined") {
      console.log("Não está no browser");
      return false;
    }

    if (isInitialized) {
      console.log("EzzyPag já inicializado");
      return true;
    }

    if (!window.EzzyPag) {
      setError("Script EzzyPag não carregado");
      return false;
    }

    try {
      console.log("Inicializando EzzyPag...");

      // Verificar se as funções necessárias existem
      if (typeof window.EzzyPag.setPublicKey !== "function") {
        throw new Error("EzzyPag.setPublicKey não disponível");
      }

      if (typeof window.EzzyPag.setTestMode !== "function") {
        throw new Error("EzzyPag.setTestMode não disponível");
      }

      // Configurar EzzyPag
      window.EzzyPag.setPublicKey("pk_live_v2BERQuXAylDF9sKuo7bCwC6SKD30RHk22");
      window.EzzyPag.setTestMode(false);

      setIsInitialized(true);
      setError(null);
      console.log("EzzyPag inicializado com sucesso");
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao inicializar EzzyPag";
      setError(errorMessage);
      console.error("Erro ao inicializar EzzyPag:", err);
      return false;
    }
  };

  const tokenizeCard = async (
    cardData: CreditCardData,
  ): Promise<string | null> => {
    try {
      // Verificar se está no browser
      if (typeof window === "undefined") {
        setError("Não é possível tokenizar no servidor");
        return null;
      }

      // Verificar se o script foi carregado
      if (!scriptLoaded) {
        setError("Script de pagamento ainda não carregado. Aguarde...");
        return null;
      }

      // Tentar inicializar se necessário
      if (!isInitialized) {
        const initialized = await initializeEzzyPag();
        if (!initialized) {
          return null;
        }
      }

      // Verificar se EzzyPag está disponível
      if (!window.EzzyPag || typeof window.EzzyPag.encrypt !== "function") {
        setError("Função de tokenização não disponível");
        return null;
      }

      setIsTokenizing(true);
      setError(null);

      // Validar dados do cartão
      const cleanNumber = cardData.number.replace(/\s/g, "");

      if (cleanNumber.length < 13 || cleanNumber.length > 19) {
        throw new Error("Número do cartão inválido");
      }

      if (!cardData.holderName || cardData.holderName.trim().length < 2) {
        throw new Error("Nome no cartão é obrigatório");
      }

      if (!cardData.cvv || cardData.cvv.length < 3) {
        throw new Error("CVV inválido");
      }

      if (cardData.expMonth < 1 || cardData.expMonth > 12) {
        throw new Error("Mês de vencimento inválido");
      }

      const currentYear = new Date().getFullYear();
      if (cardData.expYear < currentYear) {
        throw new Error("Cartão vencido");
      }

      // Preparar dados para tokenização
      const cleanCardData: CreditCardData = {
        number: cleanNumber,
        holderName: cardData.holderName.trim().toUpperCase(),
        expMonth: cardData.expMonth,
        expYear: cardData.expYear,
        cvv: cardData.cvv,
      };

      console.log("Tokenizando cartão...");
      const token = await window.EzzyPag.encrypt(cleanCardData);

      if (!token) {
        throw new Error("Token não gerado");
      }

      console.log("Cartão tokenizado com sucesso");
      return token;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao tokenizar cartão";
      setError(errorMessage);
      console.error("Erro na tokenização:", err);
      return null;
    } finally {
      setIsTokenizing(false);
    }
  };

  return {
    tokenizeCard,
    isTokenizing,
    isInitialized,
    scriptLoaded,
    error,
    clearError: () => setError(null),
    initialize: initializeEzzyPag,
  };
}
