import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import { OptimizedImage } from "../components/OptimizedImage";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter favorites based on search term
  const filteredFavorites = favorites.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <main className="h-dvh">
      {/* Fixed Header */}
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-[90px] lg:h-[120px]"></div>

      {/* Main scrollable content */}
      <div className="h-[calc(100%-90px)] overflow-auto px-3 lg:h-[calc(100%-120px)] xl:px-0">
        <div className="mx-auto h-full w-full max-w-[1200px] py-8">
          {favorites.length === 0 ? (
            // Empty favorites state matching Goold design
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
              {/* Shopping bag illustration with plus signs */}
              <div className="relative">
                <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
                  {/* Main shopping bag */}
                  <path
                    d="M60 45L140 45L150 65L150 120L50 120L50 65L60 45Z"
                    fill="#E5E7EB"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                  />

                  {/* Bag handles */}
                  <path
                    d="M75 45C75 38 81 32 88 32L112 32C119 32 125 38 125 45"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                  />

                  {/* Bag fold/top */}
                  <path
                    d="M60 45L140 45L135 55L65 55L60 45Z"
                    fill="#D1D5DB"
                    stroke="#9CA3AF"
                    strokeWidth="1"
                  />

                  {/* Small decorative elements around the bag */}
                  <circle cx="40" cy="60" r="3" fill="#D9032C" opacity="0.3" />
                  <circle cx="160" cy="50" r="2" fill="#D9032C" opacity="0.4" />
                  <circle
                    cx="170"
                    cy="80"
                    r="2.5"
                    fill="#D9032C"
                    opacity="0.3"
                  />
                  <circle cx="30" cy="90" r="2" fill="#D9032C" opacity="0.5" />

                  {/* Plus signs */}
                  <g transform="translate(35, 40)">
                    <path
                      d="M0 5L10 5M5 0L5 10"
                      stroke="#D9032C"
                      strokeWidth="2"
                      opacity="0.4"
                    />
                  </g>
                  <g transform="translate(155, 35)">
                    <path
                      d="M0 5L10 5M5 0L5 10"
                      stroke="#D9032C"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                  </g>
                  <g transform="translate(165, 100)">
                    <path
                      d="M0 5L10 5M5 0L5 10"
                      stroke="#D9032C"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                  </g>
                  <g transform="translate(25, 110)">
                    <path
                      d="M0 5L10 5M5 0L5 10"
                      stroke="#D9032C"
                      strokeWidth="2"
                      opacity="0.4"
                    />
                  </g>
                </svg>
              </div>

              <div className="space-y-4 max-w-md">
                <h2 className="text-2xl font-bold text-gray-800">
                  Seu favoritos está vazio...
                </h2>

                <p className="text-gray-600 leading-relaxed">
                  Salve seus produtos preferidos para encontrar tudo rapidinho
                  quando quiser comprar — seus favoritos sempre à mão, no seu
                  tempo.
                </p>

                <Button
                  asChild
                  className="bg-[#D9032C] hover:bg-[#B8022A] text-white px-8 py-3 rounded-lg font-semibold w-full max-w-xs"
                >
                  <Link to="/">Favoritar produtos</Link>
                </Button>
              </div>
            </div>
          ) : (
            // Favorites grid when there are items
            <div>
              <div className="flex items-center justify-center mb-8">
                <div className="text-grey-4 relative w-full max-w-[400px] text-sm">
                  <input
                    id="search"
                    placeholder="Pesquisar item..."
                    className="h-12 w-full flex-grow rounded-full border bg-white py-2.5 pr-2 pl-12 focus:outline-none"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    role="img"
                    aria-label="Lupa ou lentes de aumento"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="absolute top-1/2 left-[12px] -translate-y-1/2 transform"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9.583 17.5a7.917 7.917 0 1 0 0-15.833 7.917 7.917 0 0 0 0 15.833ZM18.333 18.333l-1.667-1.666"
                    />
                  </svg>
                </div>
              </div>

              {filteredFavorites.length === 0 && searchTerm ? (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">
                    Nenhum resultado encontrado
                  </h3>
                  <p className="text-muted-foreground">
                    Tente buscar por outro termo ou limpe a pesquisa
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredFavorites.map((product) => (
                    <Card
                      key={product.id}
                      className="group hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="aspect-square relative mb-4 overflow-hidden rounded-md bg-muted">
                          <OptimizedImage
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full"
                            loading="lazy"
                            decoding="async"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                            onClick={() => toggleFavorite(product)}
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold text-sm line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {product.brand}
                          </p>

                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">
                              ({product.rating})
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-bold text-primary">
                              R$ {product.price.toFixed(2)}
                            </span>
                          </div>

                          <Button
                            className="w-full bg-primarycolor hover:bg-primarycolor/90"
                            onClick={() =>
                              addToCart({
                                id: product.id,
                                name: product.name,
                                brand: product.brand,
                                price: product.price,
                                image: product.image,
                              })
                            }
                          >
                            Adicionar ao Carrinho
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <Link to="/">Continuar Comprando</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
