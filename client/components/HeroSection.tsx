import { useState, useEffect } from "react";
import { useBrand } from "../contexts/BrandContext";
import { OptimizedImage } from "./OptimizedImage";

interface BrandContent {
  title: string;
  description: string;
  bannerImages: string[];
}

const brandContent: Record<string, BrandContent> = {
  "Todos Produtos Grupo Goold": {
    title: "Na Goold, cuidar de você é o que nos move!",
    description:
      "Acreditamos que autoestima se constrói com pequenos grandes gestos — um bom cosmético, suplemento, uma roupa que te valoriza, uma bolsa que combina com sua energia, e claro, produtos incríveis de beleza e autocuidado.",
    bannerImages: [
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F7574b389-cbbe-4692-bc95-69b9f8f9ed8d%3Falt%3Dmedia%26token%3D1efc69b6-2654-4a13-90ab-33385cbbc262",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F71b684f3-11f4-4de6-80dc-9f880cd95dd2%3Falt%3Dmedia%26token%3D78079683-cd5c-48b7-b03c-d289847a4892",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F256d5b36-cbba-4e1f-867d-c3d11c4fe535%3Falt%3Dmedia%26token%3Dfe62a340-bad5-4ed2-959e-0a4de477f0d9",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252Ff0d8c1c8-97b5-491a-b286-5c8d66242645%3Falt%3Dmedia%26token%3De3a973f8-f65f-48a7-8056-4223efc3a7d5",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252Feb864754-a5e4-45e0-8a0b-0d8916b97e92%3Falt%3Dmedia%26token%3D1a60d273-3716-40e2-8575-e6bb5c09d76f",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F1d50f4d0-d456-4efb-8ff7-1e1be056895d%3Falt%3Dmedia%26token%3D256be9ec-81e6-423d-ba85-1dd930a002ce",
    ],
  },
  "Gold Spell Cosméticos": {
    title: "Ciência simples e resultados reais!",
    description:
      "Na Gold Spell CO dormimos, sonhamos, acordamos e vivemos pensando em cosméticos! Criamos a Gold Spell CO com o objetivo de levar beleza e felicidade aos nossos clientes por meio de cosméticos de alta qualidade, serviços exclusivos e parceria sincera e duradoura com todos que nos seguem!",
    bannerImages: [
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252Fb6274004-66f8-4c77-ba15-c149ab60de8c%3Falt%3Dmedia%26token%3D8072b07f-12d5-43f4-bdf0-1484cb0a03ce",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F4dd8ea26-83e7-4ada-b0fe-80d40b651504%3Falt%3Dmedia%26token%3D5544bc28-ab4e-4f78-aeaa-a0938bf9468d",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F0fbbccc0-6274-4a61-b695-e621060edac7%3Falt%3Dmedia%26token%3Da0bcb261-9d09-442f-9d3b-944982ceddb6",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F0e83e3a2-66db-45bd-8f7f-8246beb86c1c%3Falt%3Dmedia%26token%3D33623ed7-e6a2-4dd5-8bbe-92121e8e465b",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F3f4f6c3a-3714-411d-85c2-5809ca8295df%3Falt%3Dmedia%26token%3D3eabf097-abd0-4dd2-8cf0-40dd35121367",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252Fe979e717-0fbf-4a11-b864-c9a85dbc9d94%3Falt%3Dmedia%26token%3D6fe34f44-a908-4867-bb14-d8d91ccf3ec4",
    ],
  },
  "Extreme Gold": {
    title: "Sabor Incrível e Resultados Reais – Os Mais Amados",
    description:
      "Na Extreme Gold, vivemos e respiramos performance! Oferecemos suplementos deliciosos e de alta qualidade, feitos para quem busca saúde, resultados e bem-estar em cada dose. Sabor e eficiência que conquistam o Brasil!",
    bannerImages: [
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F65aaba9d-9e36-4e7b-9140-b5700115a416%3Falt%3Dmedia%26token%3Db7bdb172-5a71-4fb4-8fea-f75a512d84f0",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F7012aaee-b713-4f1e-93e7-a9c7955bb421%3Falt%3Dmedia%26token%3Dbf38d207-67ce-44fb-83bc-5f8bd763467f",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252Fed429a1a-b2d6-4078-b40f-9ddc57a9dd40%3Falt%3Dmedia%26token%3D96220884-2461-4a69-8f33-09d3b12b99e8",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F9bbf0b51-0a4c-4020-a890-73f2fef8464e%3Falt%3Dmedia%26token%3D9078eb51-8cfb-4cb0-9a70-e865bc997983",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252Fe195e9fb-e114-497c-97c3-e789b6c51798%3Falt%3Dmedia%26token%3D12fb6840-06d8-4b01-a962-e6d7982dfbdb",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F4eb8ad87-74d6-40bd-912f-4b69669fb044%3Falt%3Dmedia%26token%3D2845f558-d091-4647-bf9f-761fc3ae7f00",
    ],
  },
  "Everk Cosméticos": {
    title: "Beleza e cuidado para seu cabelo, todos os dias!",
    description:
      "Nossos produtos vão muito além da estética. Eles são desenvolvidos com carinho e profissionalismo para cuidar da saúde dos seus fios e deixar seu cabelo mais bonito, forte e cheio de vida.",
    bannerImages: [
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F0c98b8a1-35fc-4032-b756-995500d5d3cd%3Falt%3Dmedia%26token%3Db587029e-9734-4256-a40b-576b8dc849e9",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F3790176a-4970-4346-b986-f3228301165b%3Falt%3Dmedia%26token%3Da19be592-9a15-4216-8b2d-8571938a56ce",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F4f6ffa60-1a3d-4187-8b1e-9c25eb89c48a%3Falt%3Dmedia%26token%3D7625260e-aa57-4ad1-a44c-96f099d168cc",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252Fe5cc64c6-8d85-4178-b0f2-2899f6cb8ec4%3Falt%3Dmedia%26token%3D821406ba-196d-4779-baa1-850f72f109a1",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252F8978c52b-429c-4b25-a50b-a35e6f36ada1%3Falt%3Dmedia%26token%3Db87b7445-415a-4be8-a73b-2101b13413b8",
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/banners%252Ff905241b-9e3a-431f-ab9d-689b4a71611a%3Falt%3Dmedia%26token%3D4ef42417-a0d5-401d-8a51-aede7466efcf",
    ],
  },
};

export function HeroSection() {
  const { activeBrand } = useBrand();
  const [currentSlide, setCurrentSlide] = useState(0);

  const content =
    brandContent[activeBrand.name] ||
    brandContent["Todos Produtos Grupo Goold"];
  const bannerImages = content.bannerImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [bannerImages.length]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeBrand.name]);

  return (
    <div className="border-primarycolor bg-secondarycolor my-4 flex w-full flex-col gap-10 rounded-lg border p-4 md:mt-10 md:h-[400px] md:flex-row md:p-8 md:px-6 md:py-10">
      {/* Left Content */}
      <div className="flex flex-col items-start justify-center gap-[20px] md:w-1/2 md:gap-[25px] md:pr-10">
        <h1 className="text-primarycolor text-2xl sm:text-3xl leading-tight font-semibold">
          {content.title}
        </h1>

        <div className="min-h-[140px] sm:min-h-auto">
          <h2 className="font-regular text-base md:text-sm xl:text-base">
            {content.description}
          </h2>
        </div>

        <button
          onClick={() => {
            const element = document.getElementById("products");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="dynamic-gradient flex w-full items-center justify-center gap-3 rounded-md py-4 px-2 text-sm font-medium text-white md:max-w-[300px] md:p-3"
        >
          <svg
            role="img"
            aria-label="Lupa ou lentes de aumento"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.583 17.5a7.917 7.917 0 1 0 0-15.833 7.917 7.917 0 0 0 0 15.833ZM18.333 18.333l-1.667-1.666"
            />
          </svg>
          Confira agora nossos produtos
        </button>
      </div>

      {/* Right Carousel */}
      <div className="my-auto w-full md:w-[50%] min-h-[299px] sm:min-h-auto">
        <div className="w-full max-w-[600px] mx-auto">
          <div className="flex items-center overflow-hidden cursor-grab">
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                width: `${bannerImages.length * 191.667}px`,
                transform: `translateX(-${currentSlide * 191.667}px)`,
              }}
            >
              {bannerImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ flexBasis: "191.667px", padding: "0px 4px" }}
                >
                  <OptimizedImage
                    alt="Banner"
                    loading={index < 3 ? "eager" : "lazy"}
                    width={384}
                    height={511}
                    decoding="async"
                    className="h-[250px] w-full rounded-lg object-cover select-none sm:h-[330px] md:h-[290px]"
                    src={image}
                    fallbackType="product"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="transition-all duration-300 w-3 h-3 bg-gray-300 rounded-full"
              aria-label="Go to page 1"
              onClick={() => setCurrentSlide(0)}
            ></button>
            <button
              className="transition-all duration-300 w-8 h-3 bg-primarycolor rounded-full"
              aria-label="Go to page 2"
              onClick={() => setCurrentSlide(1)}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
