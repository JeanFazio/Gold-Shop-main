import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { OptimizedImage } from "./OptimizedImage";
import { CheckoutModal } from "./CheckoutModal";
import { Dialog } from "@/components/ui/dialog";

interface DeliveryData {
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  tipoFrete: "PAC" | "SEDEX";
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [deliveryData, setDeliveryData] = useState<DeliveryData | null>(null);
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartItemsCount,
  } = useCart();

  const subtotal = getCartTotal();
  const shipping =
    deliveryData?.tipoFrete === "SEDEX"
      ? 14.62
      : subtotal > 100
        ? 0
        : 5.99;
  // Free shipping over R$100
  const total = subtotal + shipping;

  // Função para abrir modal de entrega
  const handleOpenDeliveryModal = () => setIsDeliveryModalOpen(true);

  // Função para salvar dados de entrega
  const handleSaveDeliveryData = (data: DeliveryData) => {
    setDeliveryData(data);
    setIsDeliveryModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-primarycolor" />
            <h2 className="text-xl font-semibold">
              Carrinho ({getCartItemsCount()})
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Content */}
        <div className="p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-muted-foreground mb-6">
                Adicione alguns produtos para começar!
              </p>
              <Button onClick={onClose} asChild>
                <Link to="/">Continuar Comprando</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <OptimizedImage
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-md bg-muted"
                          fallbackType="product"
                        />
                        <div className="flex-1 space-y-2">
                          <div>
                            <h4 className="font-semibold text-sm">
                              {item.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {item.brand}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="min-w-[1.5rem] text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">
                                R$ {(item.price * item.quantity).toFixed(2)}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Frete</span>
                    <span>
                      {deliveryData?.tipoFrete === "SEDEX"
                        ? `SEDEX R$ 14,62`
                        : shipping === 0
                          ? "PAC Grátis"

                          : `PAC R$ ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <Button
                    className="w-full mt-4 bg-primarycolor hover:bg-primarycolor/90"
                    onClick={() => setIsCheckoutModalOpen(true)}
                  >
                    Finalizar Compra
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={handleOpenDeliveryModal}
                  >
                    {deliveryData
                      ? "Editar Endereço/Frete"
                      : "Adicionar Endereço/Frete"}
                  </Button>
                </CardContent>
              </Card>

              {/* Shipping Info */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 text-sm">
                    Informações de Entrega
                  </h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Frete grátis em pedidos acima de R$ 100</p>
                    <p>• Entrega padrão: 3-5 dias úteis</p>
                    <p>• Entrega expressa disponível no checkout</p>
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full" onClick={onClose}>
                Continuar Comprando
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Endereço/Frete */}
      {isDeliveryModalOpen && (
        <Dialog
          open={isDeliveryModalOpen}
          onOpenChange={setIsDeliveryModalOpen}
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
              <h3 className="font-bold text-primarycolor mb-4 text-lg">
                Dados de Entrega
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const data: DeliveryData = {
                    endereco: form.endereco.value,
                    numero: form.numero.value,
                    complemento: form.complemento.value,
                    bairro: form.bairro.value,
                    cidade: form.cidade.value,
                    estado: form.estado.value,
                    cep: form.cep.value,
                    tipoFrete: form.tipoFrete.value,
                  };
                  handleSaveDeliveryData(data);
                }}
                className="space-y-3"
              >
                <input
                  name="endereco"
                  placeholder="Endereço"
                  defaultValue={deliveryData?.endereco || ""}
                  required
                  className="input input-bordered w-full p-2 rounded border-2 border-gray-300 focus:border-primarycolor focus:ring-2 focus:ring-primarycolor/30 transition-all"
                />
                <input
                  name="numero"
                  placeholder="Número"
                  defaultValue={deliveryData?.numero || ""}
                  required
                  className="input input-bordered w-full p-2 rounded border-2 border-gray-300 focus:border-primarycolor focus:ring-2 focus:ring-primarycolor/30 transition-all"
                />
                <input
                  name="complemento"
                  placeholder="Complemento"
                  defaultValue={deliveryData?.complemento || ""}
                  className="input input-bordered w-full p-2 rounded border-2 border-gray-300 focus:border-primarycolor focus:ring-2 focus:ring-primarycolor/30 transition-all"
                />
                <input
                  name="bairro"
                  placeholder="Bairro"
                  defaultValue={deliveryData?.bairro || ""}
                  required
                  className="input input-bordered w-full p-2 rounded border-2 border-gray-300 focus:border-primarycolor focus:ring-2 focus:ring-primarycolor/30 transition-all"
                />
                <input
                  name="cidade"
                  placeholder="Cidade"
                  defaultValue={deliveryData?.cidade || ""}
                  required
                  className="input input-bordered w-full p-2 rounded border-2 border-gray-300 focus:border-primarycolor focus:ring-2 focus:ring-primarycolor/30 transition-all"
                />
                <input
                  name="estado"
                  placeholder="Estado"
                  defaultValue={deliveryData?.estado || ""}
                  required
                  className="input input-bordered w-full p-2 rounded border-2 border-gray-300 focus:border-primarycolor focus:ring-2 focus:ring-primarycolor/30 transition-all"
                />
                <input
                  name="cep"
                  placeholder="CEP"
                  defaultValue={deliveryData?.cep || ""}
                  required
                  className="input input-bordered w-full p-2 rounded border-2 border-gray-300 focus:border-primarycolor focus:ring-2 focus:ring-primarycolor/30 transition-all"
                />
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="tipoFrete"
                      value="PAC"
                      defaultChecked={deliveryData?.tipoFrete !== "SEDEX"}
                    /> PAC {subtotal > 100 ? "(Grátis)" : "R$ 5,99"}
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="tipoFrete"
                      value="SEDEX"
                      defaultChecked={deliveryData?.tipoFrete === "SEDEX"}
                    /> SEDEX (R$ 14,62)
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full mt-4 bg-primarycolor hover:bg-primarycolor/90"
                >Salvar</Button>
              </form>
            </div>
          </div>
        </Dialog>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </>
  );
}
