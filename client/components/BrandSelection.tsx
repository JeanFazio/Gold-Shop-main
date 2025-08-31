import { useBrand } from "../contexts/BrandContext";
import { OptimizedImage } from "./OptimizedImage";

export function BrandSelection() {
  const { activeBrand, brands, switchBrand } = useBrand();

  return (
    <div className="pt-3">
      <div className="flex gap-5 overflow-x-auto pt-3 pb-4 xl:pb-2">
        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => switchBrand(brand.id)}
            className={`flex items-center gap-3 max-w-[285px] min-w-[285px] overflow-hidden rounded-lg border p-4 ${
              brand.id === activeBrand.id
                ? "bg-secondarycolor border-primarycolor"
                : "bg-white border-gray-200"
            }`}
          >
            <OptimizedImage
              alt={`logo da marca ${brand.name}`}
              loading="lazy"
              width={50}
              height={50}
              decoding="async"
              className="object-contain rounded-lg overflow-hidden w-[50px] h-[50px]"
              src={brand.logo}
              fallbackType="brand"
            />
            <div className="flex-1">
              <h2
                className={`text-left text-base font-medium ${
                  brand.id === activeBrand.id
                    ? "text-primarycolor"
                    : "text-black"
                }`}
              >
                {brand.name}
              </h2>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
