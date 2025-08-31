import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { OptimizedImage } from "@/components/OptimizedImage";
import { CheckoutModal } from "@/components/CheckoutModal";

export default function Cart() {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartItemsCount,
  } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 5.99; // Free shipping over R$100
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#2A2A2A]">
      {/* Header */}
      <div className="bg-[#2A2A2A] px-4 py-6">
        <div className="container mx-auto max-w-[1200px]">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-white hover:bg-white/10"
            >
              <Link to="/">
                <ArrowLeft className="h-6 w-6" />
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold text-white">Checkout</h1>
            <div className="ml-auto flex items-center gap-2 text-sm text-green-400">
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
              <span>Ambiente 100% seguro!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white min-h-[calc(100vh-120px)]">
        <div className="container mx-auto max-w-[1200px] px-4 py-12">
          {cartItems.length === 0 ? (
            // Empty Cart State
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-[#D9032C] leading-tight">
                  Na Goold, cuidar de você é o que nos move!
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed">
                  Acreditamos que autoestima se constrói com pequenos grandes
                  gestos — um bom cosmético, suplemento, uma roupa que te
                  valoriza, uma bolsa que combina com sua energia, e claro,
                  produtos incríveis de beleza e autocuidado.
                </p>

                <Button
                  asChild
                  className="bg-[#D9032C] hover:bg-[#B8022A] text-white px-8 py-3 rounded-lg font-semibold text-lg"
                >
                  <Link to="/" className="inline-flex items-center gap-2">
                    Confira agora nossos produtos
                  </Link>
                </Button>
              </div>

              {/* Right Content - Empty Cart Illustration */}
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Empty Box Illustration */}
                <div className="relative">
                  <svg
                    width="300"
                    height="200"
                    viewBox="0 0 300 200"
                    fill="none"
                  >
                    {/* Main box */}
                    <path
                      d="M75 60L225 60L250 100L250 160L50 160L50 100L75 60Z"
                      fill="#E5E7EB"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                    />

                    {/* Box top */}
                    <path
                      d="M75 60L100 40L250 40L225 60"
                      fill="#F3F4F6"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                    />

                    {/* Box side */}
                    <path
                      d="M225 60L250 40L250 100L225 120L225 60Z"
                      fill="#D1D5DB"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                    />

                    {/* Floating elements around the box */}
                    <circle
                      cx="80"
                      cy="50"
                      r="4"
                      fill="#D9032C"
                      opacity="0.3"
                    />
                    <circle
                      cx="220"
                      cy="45"
                      r="3"
                      fill="#D9032C"
                      opacity="0.5"
                    />
                    <circle
                      cx="260"
                      cy="70"
                      r="2"
                      fill="#D9032C"
                      opacity="0.4"
                    />
                    <circle
                      cx="40"
                      cy="90"
                      r="3"
                      fill="#D9032C"
                      opacity="0.3"
                    />

                    {/* Plus signs */}
                    <g transform="translate(70, 30)">
                      <path
                        d="M0 5L10 5M5 0L5 10"
                        stroke="#D9032C"
                        strokeWidth="2"
                        opacity="0.4"
                      />
                    </g>
                    <g transform="translate(230, 30)">
                      <path
                        d="M0 5L10 5M5 0L5 10"
                        stroke="#D9032C"
                        strokeWidth="2"
                        opacity="0.6"
                      />
                    </g>
                    <g transform="translate(270, 120)">
                      <path
                        d="M0 5L10 5M5 0L5 10"
                        stroke="#D9032C"
                        strokeWidth="2"
                        opacity="0.3"
                      />
                    </g>
                  </svg>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Seu carrinho está vazio...
                  </h3>

                  <p className="text-gray-600 max-w-md">
                    Seu carrinho está esperando! Adicione produtos e volte
                    quando quiser concluir sua compra.
                  </p>

                  <Button
                    asChild
                    className="bg-[#D9032C] hover:bg-[#B8022A] text-white px-8 py-3 rounded-lg font-semibold w-full max-w-sm"
                  >
                    <Link to="/">Adicionar itens no carrinho</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Cart with Items
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items - 2 columns */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Seu Carrinho ({getCartItemsCount()}{" "}
                  {getCartItemsCount() === 1 ? "item" : "itens"})
                </h2>

                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <OptimizedImage
                          src={item.image}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="w-24 h-24 object-cover rounded-lg bg-muted"
                          fallbackType="product"
                        />
                        <div className="flex-1 space-y-3">
                          <div>
                            <h4 className="font-semibold text-lg">
                              {item.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {item.brand}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="min-w-[2rem] text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-lg">
                                R$ {(item.price * item.quantity).toFixed(2)}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary - 1 column */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frete</span>
                      <span>
                        {shipping === 0
                          ? "Grátis"
                          : `R$ ${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full mt-6 bg-primarycolor hover:bg-primarycolor/90 text-white font-semibold py-3"
                      onClick={() => setIsCheckoutModalOpen(true)}
                    >
                      Finalizar Compra
                    </Button>
                  </CardContent>
                </Card>

                {/* Shipping Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Informações de Entrega
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>• Frete grátis em pedidos acima de R$ 100</p>
                    <p>• Entrega padrão: 3-5 dias úteis</p>
                    <p>• Entrega expressa disponível no checkout</p>
                  </CardContent>
                </Card>

                <Button variant="outline" className="w-full" asChild>
                  <Link to="/">Continuar Comprando</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#2A2A2A] text-white">
        <div className="container mx-auto max-w-[1200px] px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/brands%252Flogo_primary%252Fce3a834d-6583-4721-9f50-c4ec6c831375?alt=media&token=aa1194fa-c92f-4a9f-aca5-ba793a1ae280"
                alt="Goold Logo"
                className="h-12 object-contain"
              />
              <div className="border-l border-gray-600 pl-4">
                <p className="text-sm opacity-80">Clube de Assinatura</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold">
                Assine a partir de R$ 127,00/Mês
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </div>
  );
}
