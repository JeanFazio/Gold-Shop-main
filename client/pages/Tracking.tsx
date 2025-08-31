import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Search, Truck, CheckCircle, Clock } from "lucide-react";
import { Header } from "../components/Header";

export default function Tracking() {
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackingSearch = async () => {
    if (!trackingCode.trim()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock tracking data
      setTrackingResult({
        orderNumber: trackingCode,
        status: "Em trânsito",
        estimatedDelivery: "2-3 dias úteis",
        steps: [
          {
            status: "Pedido confirmado",
            date: "15/01/2024 - 14:30",
            description: "Seu pedido foi confirmado e está sendo preparado",
            completed: true,
          },
          {
            status: "Preparando envio",
            date: "16/01/2024 - 09:15",
            description: "Produto embalado e pronto para envio",
            completed: true,
          },
          {
            status: "Em trânsito",
            date: "16/01/2024 - 16:45",
            description: "Produto saiu para entrega",
            completed: true,
          },
          {
            status: "Entregue",
            date: "Estimativa: 18/01/2024",
            description: "Produto será entregue no endereço cadastrado",
            completed: false,
          },
        ],
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="h-dvh">
      {/* Fixed Header */}
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-[90px] lg:h-[120px]"></div>

      {/* Main scrollable content */}
      <div className="h-[calc(100%-90px)] overflow-auto px-3 lg:h-[calc(100%-120px)] xl:px-0">
        <div className="mx-auto h-full w-full max-w-[800px] py-8">
          {/* Page Header */}
          <div className="flex items-center gap-3 mb-8">
            <Package className="h-8 w-8 text-primarycolor" />
            <h1 className="text-3xl font-bold">Rastrear Pedido</h1>
          </div>

          {/* Tracking Search */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">
                Digite seu código de rastreamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tracking-code">Código de rastreamento</Label>
                <div className="flex gap-2">
                  <Input
                    id="tracking-code"
                    placeholder="Ex: BR123456789"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleTrackingSearch()
                    }
                  />
                  <Button
                    onClick={handleTrackingSearch}
                    disabled={isLoading || !trackingCode.trim()}
                    className="bg-primarycolor hover:bg-primarycolor/90"
                  >
                    {isLoading ? (
                      <Clock className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    {isLoading ? "Buscando..." : "Rastrear"}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Você pode encontrar o código de rastreamento no email de
                confirmação do pedido.
              </p>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primarycolor" />
                  Pedido #{trackingResult.orderNumber}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-semibold text-primarycolor">
                    Status: {trackingResult.status}
                  </span>
                  <span className="text-muted-foreground">
                    Previsão: {trackingResult.estimatedDelivery}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trackingResult.steps.map((step: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`rounded-full p-2 ${
                            step.completed
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>
                        {index < trackingResult.steps.length - 1 && (
                          <div
                            className={`w-0.5 h-12 mt-2 ${
                              step.completed ? "bg-green-200" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex flex-col">
                          <h3
                            className={`font-semibold ${
                              step.completed
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          >
                            {step.status}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            {step.date}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* No results message when search but no results */}
          {trackingResult === null && trackingCode && !isLoading && (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">
                  Código não encontrado
                </h3>
                <p className="text-muted-foreground mb-6">
                  Verifique se o código foi digitado corretamente ou se o pedido
                  já foi processado.
                </p>
                <Button variant="outline" onClick={() => setTrackingCode("")}>
                  Tentar novamente
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Help section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Precisa de ajuda?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  • O código de rastreamento é enviado por email após a
                  confirmação do pedido
                </p>
                <p>• O prazo de entrega é contado em dias úteis</p>
                <p>• Em caso de dúvidas, entre em contato conosco</p>
              </div>
              <Button variant="outline" className="w-full">
                Falar com o suporte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
