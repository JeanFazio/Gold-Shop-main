import { useBrand } from "../contexts/BrandContext";
import { OptimizedImage } from "./OptimizedImage";

export function Footer() {
  const { activeBrand } = useBrand();

  const getInstagramUrl = () => {
    if (activeBrand.name === "Gold Spell Cosméticos") {
      return "https://www.instagram.com/goldspellcosmeticos/";
    }
    if (activeBrand.name === "Extreme Gold") {
      return "https://www.instagram.com/extremegoldbrasil/";
    }
    if (activeBrand.name === "Everk Cosméticos") {
      return "https://www.instagram.com/everkcos/";
    }
    return "https://www.instagram.com/gooldshopoficial/";
  };

  const getTikTokUrl = () => {
    if (activeBrand.name === "Gold Spell Cosméticos") {
      return "https://www.tiktok.com/@goldspellcosmeticos";
    }
    if (activeBrand.name === "Extreme Gold") {
      return "https://www.tiktok.com/@extremegoldbrasil";
    }
    if (activeBrand.name === "Everk Cosméticos") {
      return "https://www.tiktok.com/@everkcos";
    }
    return "https://www.tiktok.com/@gooldshop";
  };
  return (
    <section className="flex flex-col gap-5">
      <footer className="border-primarycolor bg-secondarycolor mx-auto mb-2 flex w-full max-w-[1200px] flex-col items-center justify-between gap-5 rounded-lg border px-4 py-4 md:mb-4 lg:mb-5 lg:flex-row">
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <div className="flex gap-4">
            <a
              href={getInstagramUrl()}
              target="_blank"
              aria-label="Instagram"
              rel="noreferrer"
            >
              <svg
                role="img"
                aria-label="Instagram"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 21"
                width="20"
                height="21"
              >
                <path
                  fill="currentColor"
                  d="M10 2.302c2.67 0 2.987.01 4.04.058 1.09.05 2.213.298 3.008 1.093.801.801 1.042 1.913 1.092 3.006.048 1.054.058 1.371.058 4.041 0 2.67-.01 2.987-.058 4.04-.05 1.085-.303 2.218-1.093 3.008-.801.801-1.912 1.042-3.006 1.092-1.054.048-1.371.058-4.041.058-2.67 0-2.987-.01-4.04-.058-1.077-.05-2.225-.31-3.007-1.093-.798-.797-1.043-1.92-1.093-3.006-.048-1.054-.058-1.371-.058-4.041 0-2.67.01-2.987.058-4.04.05-1.08.306-2.22 1.093-3.007.8-.8 1.915-1.043 3.006-1.093C7.013 2.312 7.33 2.302 10 2.302ZM10 .5C7.284.5 6.943.512 5.877.56c-1.546.07-3.081.5-4.199 1.618C.557 3.3.131 4.832.06 6.377.012 7.443 0 7.784 0 10.5s.012 3.057.06 4.123c.07 1.545.502 3.084 1.618 4.199 1.121 1.12 2.655 1.547 4.199 1.618 1.066.048 1.407.06 4.123.06s3.057-.012 4.123-.06c1.545-.07 3.082-.502 4.199-1.618 1.122-1.123 1.547-2.654 1.618-4.199.048-1.066.06-1.407.06-4.123s-.012-3.057-.06-4.123c-.07-1.546-.502-3.082-1.618-4.199C17.202 1.06 15.664.63 14.123.56 13.057.512 12.716.5 10 .5Z"
                />
                <path
                  fill="currentColor"
                  d="M10 5.365a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27Zm0 8.468a3.333 3.333 0 1 1 0-6.667 3.333 3.333 0 0 1 0 6.667ZM15.339 6.362a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z"
                />
              </svg>
            </a>
            <a
              href={getTikTokUrl()}
              target="_blank"
              aria-label="TikTok"
              rel="noreferrer"
            >
              <svg
                role="img"
                aria-label="Tik Tok"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 21"
                width="18"
                height="21"
              >
                <path
                  fill="currentColor"
                  d="M17.44 8.722a8.175 8.175 0 0 1-4.783-1.538v6.987c0 3.49-2.84 6.329-6.328 6.329a6.29 6.29 0 0 1-3.627-1.147A6.326 6.326 0 0 1 0 14.171c0-3.49 2.84-6.329 6.33-6.329.29 0 .573.024.852.062V11.414a2.855 2.855 0 0 0-.853-.134 2.894 2.894 0 0 0-2.89 2.891 2.892 2.892 0 0 0 2.891 2.89 2.892 2.892 0 0 0 2.885-2.781L9.218.5h3.438a4.793 4.793 0 0 0 4.784 4.784v3.438Z"
                />
              </svg>
            </a>
          </div>
          <ul className="flex flex-col gap-[2px] text-center lg:text-start">
            <li className="cursor-pointer">
              <a
                target="_blank"
                rel="noreferrer"
                aria-label="Política de privacidade"
                className="font-regular text-sm"
                href="https://grupo.goold.shop/Politica-de-privacidade-1e00b9df8c6181e7b78ec01dc937ae06"
              >
                Política de privacidade
              </a>
            </li>
            <li className="cursor-pointer">
              <a
                target="_blank"
                rel="noreferrer"
                aria-label="Política de Trocas e Devoluções"
                className="font-regular text-sm"
                href="https://grupo.goold.shop/Pol-tica-de-Trocas-e-Devolu-es-Grupo-Goold-1e00b9df8c618156a72beffb79b74cf6"
              >
                Política de Trocas e Devoluções
              </a>
            </li>
            <li className="cursor-pointer">
              <a
                target="_blank"
                rel="noreferrer"
                aria-label="Central de Ajuda"
                className="font-regular text-sm"
                href="https://grupo.goold.shop/"
              >
                Central de Ajuda
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center gap-2">
          <OptimizedImage
            alt={`Logo ${activeBrand.name}`}
            loading="lazy"
            width={82}
            height={60}
            decoding="async"
            className="h-[60px] w-[82px] object-contain"
            src={activeBrand.primaryLogo}
            fallbackType="brand"
          />
          <p className="font-regular text-sm">💖 Não testamos em animais! 💖</p>
        </div>

        <div className="flex flex-col gap-2 text-center lg:text-start">
          <div>
            <p className="font-regular text-sm">
              Produtos fabricados e distribuídos por:
            </p>
            <p className="font-regular text-base">CNPJ: 57.570.640/0001-54</p>
          </div>
          <div>
            <p className="font-regular text-sm">Pagamento processado por:</p>
            <p className="font-regular text-base">CNPJ: 26.287.652/0001-42</p>
          </div>
        </div>
      </footer>
    </section>
  );
}
