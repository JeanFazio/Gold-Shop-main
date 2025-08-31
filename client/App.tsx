import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrandProvider } from "./contexts/BrandContext";
import { CartProvider, useCart } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { BrandThemeProvider } from "./components/BrandThemeProvider";
import { CartSidebar } from "./components/CartSidebar";
import Index from "./pages/Index";
import Favorites from "./pages/Favorites";
import Tracking from "./pages/Tracking";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const CartSidebarComponent = () => {
  const { isCartOpen, closeCart } = useCart();
  return <CartSidebar isOpen={isCartOpen} onClose={closeCart} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrandProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrandThemeProvider />
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="/product/:id" element={<Product />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CartSidebarComponent />
            </BrowserRouter>
          </TooltipProvider>
        </FavoritesProvider>
      </CartProvider>
    </BrandProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;
let root = (window as any).__app_root;

if (!root) {
  root = createRoot(container);
  (window as any).__app_root = root;
}

root.render(<App />);
