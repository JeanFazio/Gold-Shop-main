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
  identificacao: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
  tipoFrete?: "PAC" | "SEDEX";
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
        : deliveryData?.tipoFrete === "PAC" ? 5.99 : 0;
  // Free shipping over R$100 carai
  const total = subtotal + shipping;

  // Função para abrir modal de entrega
  const handleOpenDeliveryModal = () => setIsDeliveryModalOpen(true);

  // Função para salvar dados de entrega
  const handleSaveDeliveryData = (data: DeliveryData) => {
    // define PAC por padrão
    setDeliveryData({
      ...data,
      tipoFrete: data.tipoFrete || "PAC"
    });
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
                          : deliveryData?.tipoFrete === "PAC"
                            ? `PAC R$ ${shipping.toFixed(2)}`
                            : "Selecione o frete"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  {/* Endereço e seleção de frete */}
                  {!deliveryData ? (
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={handleOpenDeliveryModal}
                    >
                      Adicionar Endereço
                    </Button>
                  ) : (
                    <div className="border rounded-lg p-3 mb-2 bg-gray-50">
                      <h4 className="font-semibold text-sm mb-1">Endereço cadastrado</h4>
                      <div className="text-xs text-muted-foreground mb-2">
                        <div><span className="font-medium">Identificação:</span> {deliveryData.identificacao}</div>
                        <div><span className="font-medium">CEP:</span> {deliveryData.cep}</div>
                        <div><span className="font-medium">Estado:</span> {deliveryData.estado}</div>
                        <div><span className="font-medium">Cidade:</span> {deliveryData.cidade}</div>
                        <div><span className="font-medium">Bairro:</span> {deliveryData.bairro}</div>
                        <div><span className="font-medium">Rua:</span> {deliveryData.rua}</div>
                        <div><span className="font-medium">Número:</span> {deliveryData.numero}</div>
                        <div><span className="font-medium">Complemento:</span> {deliveryData.complemento}</div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleOpenDeliveryModal}
                      >Editar Endereço</Button>
                      <div className="mt-3">
                        <label className="block text-sm font-medium mb-1">Escolha o frete:</label>
                        <div className="flex gap-4 mt-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="tipoFrete"
                              value="PAC"
                              checked={deliveryData.tipoFrete !== "SEDEX"}
                              onChange={() => setDeliveryData({ ...deliveryData, tipoFrete: "PAC" })}
                            /> PAC {subtotal > 100 ? "(Grátis)" : "R$ 5,99"}
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="tipoFrete"
                              value="SEDEX"
                              checked={deliveryData.tipoFrete === "SEDEX"}
                              onChange={() => setDeliveryData({ ...deliveryData, tipoFrete: "SEDEX" })}
                            /> SEDEX (R$ 14,62)
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  <Button
                    className="w-full mt-4 bg-primarycolor hover:bg-primarycolor/90"
                    onClick={() => setIsCheckoutModalOpen(true)}
                    disabled={!deliveryData?.tipoFrete}
                  >
                    Finalizar Compra
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
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsDeliveryModalOpen(false)} />
          <div className="relative h-full w-full max-w-md bg-white shadow-2xl z-[62] flex flex-col" style={{ maxWidth: '450px', width: '100%', minWidth: '320px', position: 'relative' }}>
            <div className="flex items-center justify-between p-3 border-b sticky top-0 bg-white z-10">
              <h3 className="font-medium text-primarycolor text-lg">Cadastrar endereço</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsDeliveryModalOpen(false)}>
                <X className="h-7 w-7 text-primarycolor" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-24" style={{ maxHeight: 'calc(100vh - 72px)' }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const data: DeliveryData = {
                    identificacao: form.identificacao.value,
                    cep: form.cep.value,
                    estado: form.estado.value,
                    cidade: form.cidade.value,
                    bairro: form.bairro.value,
                    rua: form.rua.value,
                    numero: form.numero.value,
                    complemento: form.complemento.value,
                  };
                  handleSaveDeliveryData(data);
                }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-base font-semibold mb-0 mt-2">Identificação do endereço <span className="text-xs font-normal">(Obrigatório)</span></label>
                  <input name="identificacao" placeholder="Casa, trabalho, etc." required className="focus:border-primarycolor w-full rounded-lg border p-3 text-base outline-none disabled:bg-[#F4F4F4]" />
                </div>
                <div>
                  <label className="block text-base font-semibold">CEP <span className="text-xs font-normal">(Obrigatório)</span></label>
                  <input name="cep" placeholder="Insira o CEP" required className="focus:border-primarycolor w-full rounded-lg border p-3 text-base outline-none disabled:bg-[#F4F4F4]" />
                </div>
                <div>
                  <label className="block text-base font-semibold">Estado <span className="text-xs font-normal">(Obrigatório)</span></label>
                  <input name="estado" placeholder="Insira o estado" required className="focus:border-primarycolor w-full rounded-lg border p-3 text-base outline-none disabled:bg-[#F4F4F4]" />
                </div>
                <div>
                  <label className="block text-base font-semibold">Cidade <span className="text-xs font-normal">(Obrigatório)</span></label>
                  <input name="cidade" placeholder="Insira a cidade" required className="focus:border-primarycolor w-full rounded-lg border p-3 text-base outline-none disabled:bg-[#F4F4F4]" />
                </div>
                <div>
                  <label className="block text-base font-semibold">Bairro <span className="text-xs font-normal">(Obrigatório)</span></label>
                  <input name="bairro" placeholder="Insira o bairro" required className="focus:border-primarycolor w-full rounded-lg border p-3 text-base outline-none disabled:bg-[#F4F4F4]" />
                </div>
                <div>
                  <label className="block text-base font-semibold">Rua <span className="text-xs font-normal">(Obrigatório)</span></label>
                  <input name="rua" placeholder="Insira o endereço" required className="focus:border-primarycolor w-full rounded-lg border p-3 text-base outline-none disabled:bg-[#F4F4F4]" />
                </div>
                <div>
                  <label className="block text-base font-semibold">Número <span className="text-xs font-normal">(Obrigatório)</span></label>
                  <input name="numero" placeholder="Insira o número" required className="focus:border-primarycolor w-full rounded-lg border p-3 text-base outline-none disabled:bg-[#F4F4F4]" />
                </div>
                <div>
                  <label className="block text-base font-semibold">Complemento <span className="text-xs font-normal">(Obrigatório)</span></label>
                  <input name="complemento" placeholder="Insira o complemento" required className="focus:border-primarycolor w-full rounded-lg border p-3 text-base outline-none disabled:bg-[#F4F4F4]" />
                </div>
                <div className="shadow-top absolute bottom-0 left-0 flex w-full items-center justify-center rounded-xl border-t p-4 bg-white">
                  <Button type="submit" className="flex h-10 w-full items-center justify-center rounded-lg border-none text-sm font-medium text-white dynamic-gradient">
                    Salvar endereço
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        total={total}
      />
    </>
  );
}
