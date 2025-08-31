import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import {
  CheckoutRequest,
  CheckoutResponse,
  CheckoutCustomer,
  PaymentMethodData,
} from "@shared/api";

export function useCheckout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cartItems, getCartTotal, clearCart } = useCart();

  const processCheckout = async (
    customer: CheckoutCustomer,
    paymentMethod: PaymentMethodData,
  ) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Validar se tem itens no carrinho
      if (cartItems.length === 0) {
        throw new Error("Carrinho vazio");
      }

      // Calcular total em centavos (EzzyPag espera valores em centavos)
      const totalAmount = Math.round(getCartTotal() * 100);

      // Preparar dados para envio
      const checkoutData: CheckoutRequest = {
        amount: totalAmount,
        currency: "BRL",
        reference_id: `pedido-${Date.now()}`,
        customer: {
          name: customer.name,
          email: customer.email,
          document: customer.document,
          phone: customer.phone,
        },
        items: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          unit_amount: Math.round(item.price * 100), // Converter para centavos
        })),
        payment_method: paymentMethod,
      };

      // Chamar API do backend
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro HTTP:", response.status, errorText);
        throw new Error(`Erro no servidor: ${response.status}`);
      }

      const result: CheckoutResponse = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Erro ao processar pagamento");
      }

      if (!result.checkout_url) {
        throw new Error("Link de pagamento não gerado");
      }

      // Limpar carrinho em caso de sucesso
      clearCart();

      // Redirecionar para o checkout da Zedy
      window.location.href = result.checkout_url;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro no checkout:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processCheckout,
    isProcessing,
    error,
    clearError: () => setError(null),
  };
}
