import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { SubscriptionBanner } from "../components/SubscriptionBanner";
import { BrandSelection } from "../components/BrandSelection";
import { SearchSection } from "../components/SearchSection";
import { ProductGrid } from "../components/ProductGrid";
import { Footer } from "../components/Footer";

export default function Index() {
  return (
    <main className="h-dvh">
      {/* Fixed Header */}
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-[90px] lg:h-[120px]"></div>

      {/* Main scrollable content */}
      <div className="h-[calc(100%-90px)] overflow-auto px-3 lg:h-[calc(100%-120px)] xl:px-0">
        <div className="mx-auto h-full w-full max-w-[1200px]">
          {/* Hero Section */}
          <HeroSection />

          {/* Subscription Banner */}
          <SubscriptionBanner />

          {/* Brand Selection */}
          <BrandSelection />

          {/* Search Section */}
          <SearchSection />

          {/* Product Grid */}
          <ProductGrid />

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </main>
  );
}
