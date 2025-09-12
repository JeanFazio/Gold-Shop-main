import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCheckout } from "@/hooks/use-checkout";
import { useEzzyPag } from "@/hooks/use-ezzypag";
import { useCart } from "@/contexts/CartContext";
import { useUtmCapture, getUtmsFromCookie } from "@/hooks/utm-utils";
import { enviarConversaoUtmify } from "@/hooks/utmify-api";
import { QRCodeCanvas } from 'qrcode.react';
import { criarPixBackend, criarCartaoBackend } from "@/hooks/ezzypag-backend";
import { criarCobrancaPix, pagarComCartao } from "@/hooks/use-ezzypag";
import {
  CheckoutCustomer,
  CreditCardData,
  PaymentMethodData,
} from "@shared/api";
import { CreditCardForm } from "./CreditCardForm";
import { Loader2, CreditCard, QrCode } from "lucide-react";


interface CheckoutFormProps {
  onClose?: () => void;
  total?: number;
}

export function CheckoutForm({ onClose, total }: CheckoutFormProps) {
  useUtmCapture();
  const [showPixModal, setShowPixModal] = useState(false);
  const { getCartTotal } = useCart();
  const cartTotal = typeof total === 'number' ? total : getCartTotal();
  const [pixData, setPixData] = useState<{ qrcode?: string } | null>(null);
  const { processCheckout, isProcessing, error, clearError } = useCheckout();
  const {
    tokenizeCard,
    isTokenizing,
    error: tokenError,
    scriptLoaded,
  } = useEzzyPag();
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "pix">(
    "credit_card",
  );
  const [formData, setFormData] = useState<CheckoutCustomer>({
    name: "",
    email: "",
    document: "",
    phone: "",
  });
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const handleInputChange = (field: keyof CheckoutCustomer, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) clearError();
  };

  const formatDocument = (value: string) => {
    // Remove caracteres não numéricos
    const cleaned = value.replace(/\D/g, "");

    // Aplica máscara CPF (000.000.000-00)
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2");
    }

    return cleaned.slice(0, 11);
  };

  const formatPhone = (value: string) => {
    // Remove caracteres não numéricos
    const cleaned = value.replace(/\D/g, "");

    // Aplica máscara telefone (00) 00000-0000
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }

    return cleaned.slice(0, 11);
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Nome é obrigatório";
    if (!formData.email.trim()) return "E-mail é obrigatório";
    if (!formData.email.includes("@")) return "E-mail inválido";

    const cleanDocument = formData.document.replace(/\D/g, "");
    if (cleanDocument.length !== 11) return "CPF deve ter 11 dígitos";

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) return "Telefone inválido";

    return null;
  };

  const handleCreditCardSubmit = async (cardData: CreditCardData) => {
    const validationError = validateForm();
    if (validationError) {
      clearError();
      return;
    }

    setIsSubmittingForm(true);

    try {
      // Tokenizar cartão
      const cardToken = await tokenizeCard(cardData);
      if (!cardToken) {
        throw new Error("Erro ao processar dados do cartão");
      }

      // 1. Chamar backend para pagamento com cartão
      const cardResp = await criarCartaoBackend({
        amount: cartTotal,
        description: "Compra Gold Shop",
        customer_name: formData.name.trim(),
        customer_email: formData.email.trim().toLowerCase(),
        customer_phone: formData.phone.replace(/\D/g, ""),
        customer_document: formData.document.replace(/\D/g, ""),
        card_token: cardToken,
      });

      // 2. Envia tracking Utmify
      await enviarConversaoUtmify({
        orderId: cardResp.id,
        amount: cartTotal,
        description: "Compra Gold Shop",
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.replace(/\D/g, ""),
          document: formData.document.replace(/\D/g, ""),
        },
        products: [],
        paymentMethod: 'credit_card',
        status: cardResp.status || 'paid',
      });

      alert("Pagamento realizado!" + JSON.stringify(cardResp));
    } catch (err) {
      console.error("Erro no checkout:", err);
      alert("Erro no pagamento: " + (err?.message || err));
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handlePixSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      return;
    }

    setIsSubmittingForm(true);

    try {
      const pixResp = await criarPixBackend({
        amount: cartTotal,
        description: "Compra Gold Shop",
        customer_name: formData.name.trim(),
        customer_email: formData.email.trim().toLowerCase(),
        customer_phone: formData.phone.replace(/\D/g, ""),
        customer_document: formData.document.replace(/\D/g, ""),
      });

      // Envia tracking Utmify
      await enviarConversaoUtmify({
        orderId: pixResp.id,
        amount: cartTotal,
        description: "Compra Gold Shop",
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.replace(/\D/g, ""),
          document: formData.document.replace(/\D/g, ""),
        },
        products: [],
        paymentMethod: 'pix',
        status: 'waiting_payment',
      });

      // Exibe modal com QR Code e dados do cliente
      setPixData({ qrcode: pixResp.pix?.qrcode });
      setShowPixModal(true);

    } catch (err) {
      console.error("Erro no checkout:", err);
      alert("Erro ao gerar PIX: " + (err?.message || err));
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const combinedError = error || tokenError;
  const combinedProcessing = isProcessing || isTokenizing || isSubmittingForm;

  return (
    <>
      {showPixModal && pixData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg p-12 shadow-lg flex flex-col items-center max-w-md w-full">
            <h3 className="font-bold text-green-700 mb-2 text-lg">Pagamento PIX</h3>
            <QRCodeCanvas value={pixData.qrcode || ''} size={220} style={{ marginBottom: 12 }} />
            <div className="mt-2 text-green-800 text-sm break-all text-center">
              <strong>Código Copia e Cola:</strong>
              <div className="bg-gray-100 p-2 rounded border mt-1 select-all text-xs">{pixData.qrcode ? pixData.qrcode : 'Código não disponível'}</div>
            </div>
            <div className="w-full mt-4 mb-2 border-t pt-4">
              <h4 className="font-semibold text-gray-700 mb-2 text-base text-left w-full">Dados do Cliente</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div><span className="font-medium">Nome:</span> {formData.name}</div>
                <div><span className="font-medium">E-mail:</span> {formData.email}</div>
                <div><span className="font-medium">Telefone:</span> {formData.phone}</div>
                <div><span className="font-medium">CPF:</span> {formData.document}</div>
              </div>
            </div>
            <Button className="mt-4 w-full bg-primarycolor hover:bg-primarycolor/90" onClick={() => { setShowPixModal(false); setPixData(null); }}>
              Fechar
            </Button>
          </div>
        </div>
      )}
      <Card className="w-full max-w-lg sm:max-w-full sm:rounded-none sm:shadow-none sm:border-0 max-h-[70vh] my-4 overflow-y-auto p-2 sm:p-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <CreditCard className="h-5 w-5" />
            Finalizar Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          {combinedError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{combinedError}</AlertDescription>
            </Alert>
          )}

          {!scriptLoaded && (
            <Alert className="mb-4">
              <AlertDescription>
                Carregando sistema de pagamento... Por favor, aguarde.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            {/* Dados do Cliente */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Dados do Cliente</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Seu nome completo"
                    required
                    disabled={combinedProcessing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="seu@email.com"
                    required
                    disabled={combinedProcessing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document">CPF</Label>
                  <Input
                    id="document"
                    type="text"
                    value={formData.document}
                    onChange={(e) =>
                      handleInputChange(
                        "document",
                        formatDocument(e.target.value),
                      )
                    }
                    placeholder="000.000.000-00"
                    required
                    disabled={combinedProcessing}
                    maxLength={14}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", formatPhone(e.target.value))
                    }
                    placeholder="(11) 99999-9999"
                    required
                    disabled={combinedProcessing}
                    maxLength={15}
                  />
                </div>
              </div>
            </div>

            {/* Método de Pagamento */}
            <Tabs
              value={paymentMethod}
              onValueChange={(value) =>
                setPaymentMethod(value as "credit_card" | "pix")
              }
            >
              <TabsList className="grid w-full grid-cols-2 gap-2">
                <TabsTrigger
                  value="credit_card"
                  className="flex items-center gap-2 text-xs sm:text-sm"
                >
                  <CreditCard className="h-4 w-4" />
                  Cartão de Crédito
                </TabsTrigger>
                <TabsTrigger value="pix" className="flex items-center gap-2 text-xs sm:text-sm">
                  <QrCode className="h-4 w-4" />
                  PIX
                </TabsTrigger>
              </TabsList>

              <TabsContent value="credit_card" className="mt-4">
                <CreditCardForm
                  onSubmit={handleCreditCardSubmit}
                  isProcessing={combinedProcessing}
                  error={combinedError}
                  disabled={!!validateForm()}
                />
              </TabsContent>

              <TabsContent value="pix" className="mt-4">
                <form onSubmit={handlePixSubmit} className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <QrCode className="h-12 w-12 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold text-blue-800 text-base sm:text-lg">
                      Pagamento via PIX
                    </h3>
                    <p className="text-sm text-blue-600 mt-1">
                      Você será redirecionado para gerar o código PIX
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primarycolor hover:bg-primarycolor/90 text-xs sm:text-base"
                    disabled={combinedProcessing || !!validateForm()}
                  >
                    {combinedProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      "Gerar PIX"
                    )}
                  </Button>

                </form>
              </TabsContent>
            </Tabs>

            {onClose && (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={combinedProcessing}
                className="w-full text-xs sm:text-base"
              >
                Cancelar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}