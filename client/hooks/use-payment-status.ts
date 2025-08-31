import { useState, useEffect } from "react";

export interface PaymentStatus {
  orderId: string;
  status: "pending" | "paid" | "refused" | "refunded" | "chargeback";
  amount: number;
  paymentMethod: string;
  customerName: string;
  updatedAt: string;
}

export function usePaymentStatus(orderId?: string) {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkPaymentStatus = async (orderIdToCheck: string) => {
    if (!orderIdToCheck) return;

    setIsLoading(true);
    setError(null);

    try {
      // Aqui você implementaria a consulta real ao seu backend
      // Por enquanto, simulamos uma consulta
      console.log(`Verificando status do pedido: ${orderIdToCheck}`);

      // TODO: Implementar endpoint real para consultar status
      // const response = await fetch(`/api/orders/${orderIdToCheck}/status`);
      // const status = await response.json();

      // Simulação de resposta
      const mockStatus: PaymentStatus = {
        orderId: orderIdToCheck,
        status: "pending",
        amount: 127.0,
        paymentMethod: "credit_card",
        customerName: "Cliente Exemplo",
        updatedAt: new Date().toISOString(),
      };

      setPaymentStatus(mockStatus);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao verificar status";
      setError(errorMessage);
      console.error("Erro ao verificar status do pagamento:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-verificar se orderId for fornecido
  useEffect(() => {
    if (orderId) {
      checkPaymentStatus(orderId);
    }
  }, [orderId]);

  return {
    paymentStatus,
    isLoading,
    error,
    checkPaymentStatus,
    clearError: () => setError(null),
  };
}
