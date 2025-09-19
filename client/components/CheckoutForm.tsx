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
import { useToast } from "@/hooks/use-toast";
import { enviarConversaoUtmify } from "@/hooks/utmify-api";
import { QRCodeCanvas } from 'qrcode.react';
import { criarPixBackend, criarCartaoBackend, consultarStatusBackend } from "@/hooks/ezzypag-backend";
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { toast } = useToast();
  useUtmCapture();
  const [showPixModal, setShowPixModal] = useState(false);
  const { getCartTotal } = useCart();
  const { cartItems } = useCart();
  const cartTotal = typeof total === 'number' ? total : getCartTotal();
  const [pixData, setPixData] = useState<{ qrcode?: string, id?: string } | null>(null);
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
      const payload = {
        amount: cartTotal,
        description: "Compra Gold Shop",
        customer_name: formData.name.trim(),
        customer_email: formData.email.trim().toLowerCase(),
        customer_phone: formData.phone.replace(/\D/g, ""),
        customer_document: formData.document.replace(/\D/g, ""),
        card_token: cardToken,
        card_number: cardData.number.replace(/\s/g, ""),
        card_holder: cardData.holderName.trim().toUpperCase(),
        card_exp_month: cardData.expMonth,
        card_exp_year: cardData.expYear,
        card_cvv: cardData.cvv
      };
      console.log("Payload enviado para backend do cartão:", payload);
      const cardResp = await criarCartaoBackend(payload);

      if (cardResp.status === 'refused') {
        let refusedMsg = cardResp.refusedReason?.description || 'Pagamento recusado pelo cartão. Tente outro cartão ou verifique os dados.';
        toast({
          title: 'Pagamento recusado',
          description: refusedMsg,
          variant: 'destructive',
        });
        setIsSubmittingForm(false);
        return;
      }

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
        products: cartItems.length > 0 ? cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          priceInCents: Math.round(item.price * 100),
        })) : [{ id: 'default', name: 'Produto', quantity: 1, priceInCents: Math.round(cartTotal * 100) }],
        paymentMethod: 'credit_card',
        status: cardResp.status || 'paid',
      });

      setSuccessMessage("Pagamento realizado com sucesso! Obrigado pela compra.");
      setShowSuccessModal(true);
    } catch (err) {
      let apiMessage = err?.response?.data?.message || err?.response?.data?.error || err?.message;
      if (typeof apiMessage === 'string' && apiMessage.includes('credit_card_blacklisted')) {
        toast({
          title: 'Cartão bloqueado',
          description: 'Este cartão não pode ser utilizado. Tente outro cartão ou entre em contato com o emissor.',
          variant: 'destructive',
        });
      } else {
        console.error("Erro no checkout:", err, apiMessage);
        alert("Erro no pagamento: " + (apiMessage || err));
      }
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handlePixSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast({
        title: "Erro no checkout PIX",
        description: validationError,
        variant: "destructive",
      });
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


      // Envia evento customizado para Utmify (status: waiting_payment)
      try {
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
          products: cartItems.length > 0 ? cartItems.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            priceInCents: Math.round(item.price * 100),
          })) : [{ id: 'default', name: 'Produto', quantity: 1, priceInCents: Math.round(cartTotal * 100) }],
          paymentMethod: 'pix',
          status: 'waiting_payment',
        });
        toast({
          title: "Pedido registrado!",
          description: "Seu pedido foi registrado e está aguardando pagamento. Assim que o pagamento for confirmado, você receberá a confirmação.",
          variant: "default",
        });
      } catch (utmifyErr) {
        toast({
          title: "Aviso de rastreamento",
          description: "Não foi possível enviar o evento de rastreamento para Utmify.",
          variant: "destructive",
        });
      }

      // Exibe modal com QR Code e dados do cliente

      setPixData({ qrcode: pixResp.pix?.qrcode, id: pixResp.id });
      setShowPixModal(true);

      // Automatiza consulta do status do PIX e envia 'paid' para Utmify
      // Polling: verifica a cada 5s por até 4min
      let pollCount = 0;
      const maxPolls = 50; // 4min
      const pollInterval = setInterval(async () => {
        pollCount++;
        if (!pixResp.id) return;
        try {
          const statusResp = await consultarStatusBackend(pixResp.id);
          if (statusResp.status === 'paid') {
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
              products: cartItems.length > 0 ? cartItems.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                priceInCents: Math.round(item.price * 100),
              })) : [{ id: 'default', name: 'Produto', quantity: 1, priceInCents: Math.round(cartTotal * 100) }],
              paymentMethod: 'pix',
              status: 'paid',
            });
            toast({
              title: "Pagamento PIX confirmado!",
              description: "Seu pagamento foi aprovado e registrado.",
              variant: "default",
            });
            clearInterval(pollInterval);
            setShowPixModal(false);
            setPixData(null);
            setShowSuccessModal(true);
            return;
          }
        } catch (err) {
          // Silencia erro de polling
        }
        if (pollCount >= maxPolls) {
          clearInterval(pollInterval);
          setShowPixModal(false);
          setPixData(null);
        }
      }, 5000);

    } catch (err) {
      console.error("Erro no checkout:", err);
      let userMessage = "Erro ao gerar PIX. Tente novamente.";
      // Axios error: err.response?.data?.message
      const apiMessage = err?.response?.data?.message || err?.message;
      if (apiMessage) {
        if (typeof apiMessage === "string" && apiMessage.toLowerCase().includes("invalid cpf")) {
          userMessage = "CPF inválido. Por favor, verifique o número informado.";
        } else if (apiMessage.toLowerCase().includes("invalid email")) {
          userMessage = "E-mail inválido. Verifique o endereço informado.";
        } else if (apiMessage.toLowerCase().includes("invalid phone")) {
          userMessage = "Telefone inválido. Verifique o número informado.";
        } else if (apiMessage.toLowerCase().includes("400")) {
          userMessage = "Dados inválidos. Por favor, revise as informações.";
        } else {
          userMessage = apiMessage;
        }
      }
      toast({
        title: "Erro no checkout PIX",
        description: userMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const combinedError = error || tokenError;
  const combinedProcessing = isProcessing || isTokenizing || isSubmittingForm;

  return (
    <>
      {/* Modal de sucesso de pagamento */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fadeIn">
          <div className="bg-gradient-to-br from-green-100 via-white to-blue-100 rounded-2xl p-10 shadow-2xl flex flex-col items-center max-w-md w-full border-2 border-green-300 relative animate-slideUp">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="bg-green-500 rounded-full p-4 shadow-lg flex items-center justify-center">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#22c55e" /><path d="M8 12.5l2.5 2.5L16 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <h3 className="font-extrabold text-green-700 mb-2 text-2xl mt-8 text-center drop-shadow">Pedido Confirmado!</h3>
            <div className="text-green-800 text-base mb-4 text-center leading-relaxed">
              <span className="block text-lg font-semibold mb-2">Pagamento realizado com sucesso!</span>
              Em breve enviaremos um e-mail com os detalhes da sua compra.<br />
              Fique atento à sua caixa de entrada e spam.<br />
              <span className="block mt-2 text-gray-700 text-sm">Obrigado por confiar em nosso serviço! 😊</span>
            </div>
            <Button className="mt-2 w-full bg-primarycolor hover:bg-primarycolor/90" onClick={() => setShowSuccessModal(false)}>
              Fechar
            </Button>
          </div>
        </div>
      )}
      {/* Modal PIX */}
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
      {/* Formulário */}
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