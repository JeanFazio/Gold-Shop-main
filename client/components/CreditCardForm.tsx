import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, Lock } from "lucide-react";
import { CreditCardData } from "@shared/api";

interface CreditCardFormProps {
  onSubmit: (cardData: CreditCardData) => Promise<void>;
  isProcessing: boolean;
  error?: string | null;
  disabled?: boolean;
}

export function CreditCardForm({
  onSubmit,
  isProcessing,
  error,
  disabled,
}: CreditCardFormProps) {
  const [cardData, setCardData] = useState<CreditCardData>({
    number: "",
    holderName: "",
    expMonth: 1,
    expYear: new Date().getFullYear(),
    cvv: "",
  });

  const formatCardNumber = (value: string) => {
    // Remove todos os caracteres que não são números
    const cleaned = value.replace(/\D/g, "");

    // Adiciona espaços a cada 4 dígitos
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(" ") : "";
  };

  const formatCVV = (value: string) => {
    // Apenas números, máximo 4 dígitos
    return value.replace(/\D/g, "").slice(0, 4);
  };

  const formatHolderName = (value: string) => {
    // Apenas letras e espaços, converte para maiúsculo
    return value.replace(/[^a-zA-Z\s]/g, "").toUpperCase();
  };

  const handleInputChange = (
    field: keyof CreditCardData,
    value: string | number,
  ) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const cleanNumber = cardData.number.replace(/\s/g, "");

    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      return "Número do cartão deve ter entre 13 e 19 dígitos";
    }

    if (!cardData.holderName.trim() || cardData.holderName.trim().length < 2) {
      return "Nome no cartão é obrigatório";
    }

    if (cardData.cvv.length < 3) {
      return "CVV deve ter pelo menos 3 dígitos";
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (
      cardData.expYear < currentYear ||
      (cardData.expYear === currentYear && cardData.expMonth < currentMonth)
    ) {
      return "Cartão vencido";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      return;
    }

    await onSubmit(cardData);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="h-5 w-5 text-primarycolor" />
        <h3 className="text-lg font-semibold">Dados do Cartão</h3>
        <Lock className="h-4 w-4 text-green-600 ml-auto" />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Número do Cartão</Label>
          <Input
            id="cardNumber"
            type="text"
            value={cardData.number}
            onChange={(e) =>
              handleInputChange("number", formatCardNumber(e.target.value))
            }
            placeholder="0000 0000 0000 0000"
            maxLength={23} // 19 dígitos + 4 espaços
            required
            disabled={disabled || isProcessing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="holderName">Nome no Cartão</Label>
          <Input
            id="holderName"
            type="text"
            value={cardData.holderName}
            onChange={(e) =>
              handleInputChange("holderName", formatHolderName(e.target.value))
            }
            placeholder="NOME COMO NO CARTÃO"
            required
            disabled={disabled || isProcessing}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-2">
            <Label htmlFor="expMonth">Mês</Label>
            <Select
              value={cardData.expMonth.toString()}
              onValueChange={(value) =>
                handleInputChange("expMonth", parseInt(value))
              }
              disabled={disabled || isProcessing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month.toString()}>
                    {month.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expYear">Ano</Label>
            <Select
              value={cardData.expYear.toString()}
              onValueChange={(value) =>
                handleInputChange("expYear", parseInt(value))
              }
              disabled={disabled || isProcessing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              type="text"
              value={cardData.cvv}
              onChange={(e) =>
                handleInputChange("cvv", formatCVV(e.target.value))
              }
              placeholder="123"
              maxLength={4}
              required
              disabled={disabled || isProcessing}
            />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="font-medium">Seus dados estão seguros</span>
          </div>
          <p className="mt-1 text-xs">
            Utilizamos criptografia de ponta para proteger suas informações.
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-primarycolor hover:bg-primarycolor/90"
          disabled={disabled || isProcessing || !!validateForm()}
        >
          {isProcessing ? "Processando..." : "Finalizar Pagamento"}
        </Button>
      </form>
    </div>
  );
}
