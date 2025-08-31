import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Brand {
  id: number;
  name: string;
  logo: string;
  primaryLogo: string;
  primaryColor: string;
  secondaryColor: string;
}

const brands: Brand[] = [
  {
    id: 1,
    name: "Todos Produtos Grupo Goold",
    logo: "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/brands%252Flogo_secondary%252Fc6054d89-c1c3-4151-977a-ecde41888e85%3Falt%3Dmedia%26token%3D7f1d1042-e21d-43c2-876c-ab09a4e40b12",
    primaryLogo:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/brands%252Flogo_primary%252Fce3a834d-6583-4721-9f50-c4ec6c831375?alt=media&token=aa1194fa-c92f-4a9f-aca5-ba793a1ae280",
    primaryColor: "#D9032C",
    secondaryColor: "#FFE9ED",
  },
  {
    id: 2,
    name: "Gold Spell Cosméticos",
    logo: "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/brands%252Flogo_secondary%252Fc5b55d3c-76ce-43b4-8d27-531c6976e606%3Falt%3Dmedia%26token%3D2617540b-65e4-4bcf-ab2a-e2ea038fa2a3",
    primaryLogo:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/brands%252Flogo_primary%252Fdbcc1861-d7c5-4061-93fc-670df18d760f%3Falt%3Dmedia%26token%3D40295070-8504-4684-bb05-3c82184ff81d",
    primaryColor: "#CBC698",
    secondaryColor: "#FFFBF5",
  },
  {
    id: 3,
    name: "Extreme Gold",
    logo: "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/brands%252Flogo_secondary%252F0c07fa06-18c9-4133-aad0-3abf9763297d%3Falt%3Dmedia%26token%3D2830c378-f45c-4991-a1f1-6999f7a95457",
    primaryLogo:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/brands%252Flogo_primary%252F34d6c418-d736-456a-b6de-7ce1aa440dc2%3Falt%3Dmedia%26token%3D7ff8dfec-0a52-438f-a83b-3ce346ebd8ae",
    primaryColor: "#4EBBC7",
    secondaryColor: "#F5FEFF",
  },
  {
    id: 4,
    name: "Everk Cosméticos",
    logo: "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/brands%252Flogo_secondary%252Ff1eac315-4258-495b-91ae-8b74b96d0441%3Falt%3Dmedia%26token%3D6a1fce50-d81c-4a91-a18b-a9bf3c124c0e",
    primaryLogo:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/brands%252Flogo_primary%252F560ebe29-babb-487b-92da-c00e3a651aa2%3Falt%3Dmedia%26token%3D200c5b57-9f5e-4820-b2c5-d03d787d75a0",
    primaryColor: "#7407DD",
    secondaryColor: "#FBF8FF",
  },
];

interface BrandContextType {
  activeBrand: Brand;
  brands: Brand[];
  switchBrand: (brandId: number) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [activeBrandId, setActiveBrandId] = useState(3);

  const activeBrand =
    brands.find((brand) => brand.id === activeBrandId) || brands[0];

  const switchBrand = (brandId: number) => {
    setActiveBrandId(brandId);
  };

  return (
    <BrandContext.Provider value={{ activeBrand, brands, switchBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
}
