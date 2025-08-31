import { Link } from "react-router-dom";
import { useBrand } from "../contexts/BrandContext";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { OptimizedImage } from "./OptimizedImage";

export function Header() {
  const { activeBrand } = useBrand();
  const { openCart, getCartItemsCount } = useCart();
  const { favorites } = useFavorites();
  const cartCount = getCartItemsCount();
  const favoritesCount = favorites.length;

  return (
    <div className="fixed top-0 right-0 left-0 z-10 flex justify-center bg-white px-0 pt-0 lg:px-4 lg:pt-[30px]">
      <header className="border-primarycolor bg-secondarycolor flex h-[90px] w-full max-w-[1200px] items-center rounded-b-lg border lg:rounded-lg">
        <div className="flex w-full items-center justify-between gap-3 px-5 sm:justify-start sm:gap-11">
          <Link
            to="/"
            title="Ir para página inicial do site"
            aria-label="Link para página inicial do site"
            className="min-w-[60px]"
          >
            <OptimizedImage
              alt={`Logo ${activeBrand.name}`}
              loading="eager"
              width={82}
              height={60}
              decoding="async"
              className="h-[60px] w-[82px] object-contain"
              src={activeBrand.primaryLogo}
              fallbackType="brand"
            />
          </Link>

          <nav className="flex pl-4 flex-1 gap-2 justify-end lg:justify-between">
            <div className="flex items-center gap-1 sm:gap-4">
              {/* Products - Shopping Bag with Gradient */}
              <Link
                aria-label="Produtos"
                className="relative rounded-xl transition-colors dynamic-gradient text-white"
                to="/"
              >
                <svg
                  role="img"
                  aria-label="Ícone de bolsa"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 lg:h-10 lg:w-10"
                >
                  <path
                    d="M16.4 14.5H23.6C27 14.5 27.34 16.09 27.57 18.03L28.47 25.53C28.76 27.99 28 30 24.5 30H15.51C12 30 11.24 27.99 11.54 25.53L12.44 18.03C12.66 16.09 13 14.5 16.4 14.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 16V12.5C16 11 17 10 18.5 10H21.5C23 10 24 11 24 12.5V16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28.41 25.0303H16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Cart with Badge */}
              <button
                aria-label="Carrinho"
                className="text-primarycolor relative rounded-xl transition-colors"
                onClick={openCart}
              >
                <svg
                  role="img"
                  aria-label="Ícone de carrinho de compras"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="none"
                  viewBox="0 0 40 40"
                  className="h-9 w-9 lg:h-10 lg:w-10"
                >
                  <path
                    fill="currentColor"
                    d="M9 9.73333C9 9.53884 9.07726 9.35232 9.21479 9.21479C9.35232 9.07726 9.53884 9 9.73333 9H11.9333C12.0969 9.00005 12.2558 9.05478 12.3847 9.1555C12.5136 9.25622 12.6051 9.39715 12.6447 9.55587L13.2387 11.9333H30.2667C30.3743 11.9334 30.4807 11.9572 30.5781 12.0031C30.6756 12.0489 30.7617 12.1156 30.8304 12.1985C30.8992 12.2814 30.9488 12.3784 30.9758 12.4826C31.0029 12.5869 31.0066 12.6958 30.9868 12.8016L28.7868 24.5349C28.7553 24.703 28.6662 24.8548 28.5347 24.964C28.4032 25.0733 28.2376 25.1332 28.0667 25.1333H14.8667C14.6957 25.1332 14.5302 25.0733 14.3987 24.964C14.2672 24.8548 14.178 24.703 14.1465 24.5349L11.948 12.8236L11.3613 10.4667H9.73333C9.53884 10.4667 9.35232 10.3894 9.21479 10.2519C9.07726 10.1144 9 9.92783 9 9.73333ZM13.5496 13.4L15.4753 23.6667H27.458L29.3837 13.4H13.5496ZM16.3333 25.1333C15.5554 25.1333 14.8093 25.4424 14.2592 25.9925C13.709 26.5426 13.4 27.2887 13.4 28.0667C13.4 28.8446 13.709 29.5907 14.2592 30.1408C14.8093 30.691 15.5554 31 16.3333 31C17.1113 31 17.8574 30.691 18.4075 30.1408C18.9576 29.5907 19.2667 28.8446 19.2667 28.0667C19.2667 27.2887 18.9576 26.5426 18.4075 25.9925C17.8574 25.4424 17.1113 25.1333 16.3333 25.1333ZM26.6 25.1333C25.822 25.1333 25.0759 25.4424 24.5258 25.9925C23.9757 26.5426 23.6667 27.2887 23.6667 28.0667C23.6667 28.8446 23.9757 29.5907 24.5258 30.1408C25.0759 30.691 25.822 31 26.6 31C27.378 31 28.1241 30.691 28.6742 30.1408C29.2243 29.5907 29.5333 28.8446 29.5333 28.0667C29.5333 27.2887 29.2243 26.5426 28.6742 25.9925C28.1241 25.4424 27.378 25.1333 26.6 25.1333ZM16.3333 26.6C16.7223 26.6 17.0954 26.7545 17.3704 27.0296C17.6455 27.3046 17.8 27.6777 17.8 28.0667C17.8 28.4557 17.6455 28.8287 17.3704 29.1038C17.0954 29.3788 16.7223 29.5333 16.3333 29.5333C15.9443 29.5333 15.5713 29.3788 15.2962 29.1038C15.0212 28.8287 14.8667 28.4557 14.8667 28.0667C14.8667 27.6777 15.0212 27.3046 15.2962 27.0296C15.5713 26.7545 15.9443 26.6 16.3333 26.6ZM26.6 26.6C26.989 26.6 27.362 26.7545 27.6371 27.0296C27.9121 27.3046 28.0667 27.6777 28.0667 28.0667C28.0667 28.4557 27.9121 28.8287 27.6371 29.1038C27.362 29.3788 26.989 29.5333 26.6 29.5333C26.211 29.5333 25.838 29.3788 25.5629 29.1038C25.2879 28.8287 25.1333 28.4557 25.1333 28.0667C25.1333 27.6777 25.2879 27.3046 25.5629 27.0296C25.838 26.7545 26.211 26.6 26.6 26.6Z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="bg-primarycolor absolute top-1 left-5 lg:left-6 flex h-[12px] w-[12px] items-center justify-center rounded-full text-[8px] font-bold text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {/* Favorites */}
              <Link
                aria-label="Favoritos"
                className="text-primarycolor relative rounded-xl transition-colors"
                to="/favorites"
              >
                <svg
                  role="img"
                  aria-label="Coração"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 31 31"
                  className="h-9 w-9 lg:h-10 lg:w-10"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="1.5"
                    d="M15.465 21.608c-.255.09-.675.09-.93 0-2.175-.743-7.035-3.84-7.035-9.09 0-2.318 1.867-4.193 4.17-4.193 1.365 0 2.573.66 3.33 1.68a4.15 4.15 0 0 1 3.33-1.68c2.303 0 4.17 1.875 4.17 4.193 0 5.25-4.86 8.347-7.035 9.09"
                  />
                </svg>
                {favoritesCount > 0 && (
                  <span className="bg-primarycolor absolute top-1 left-5 lg:left-6 flex h-[12px] w-[12px] items-center justify-center rounded-full text-[8px] font-bold text-white">
                    {favoritesCount > 99 ? "99+" : favoritesCount}
                  </span>
                )}
              </Link>

              {/* Tracking */}
              <Link
                aria-label="Rastrear"
                className="text-primarycolor relative rounded-xl transition-colors"
                to="/tracking"
              >
                <svg
                  role="img"
                  aria-label="Caminhão"
                  fill="none"
                  viewBox="0 0 40 40"
                  width="40"
                  height="40"
                  className="h-9 w-9 lg:h-10 lg:w-10"
                >
                  <path
                    d="M27.2534 13.6323H25.3464C25.1357 12.6074 24.578 11.6866 23.7675 11.025C22.957 10.3633 21.9431 10.0013 20.8969 10H14.5404C13.3366 10.0014 12.1826 10.4803 11.3314 11.3314C10.4803 12.1826 10.0014 13.3366 10 14.5404V22.713C10.0023 23.5263 10.2775 24.3153 10.7814 24.9536C11.2854 25.592 11.989 26.0427 12.7796 26.2336C12.694 26.688 12.7087 27.1557 12.8225 27.6039C12.9363 28.0521 13.1465 28.4701 13.4385 28.8287C13.7305 29.1872 14.0972 29.4778 14.5131 29.68C14.929 29.8822 15.384 29.9913 15.8463 29.9995C16.3087 30.0077 16.7673 29.915 17.1901 29.7277C17.6129 29.5404 17.9897 29.2632 18.2943 28.9152C18.5989 28.5673 18.8239 28.1571 18.9536 27.7132C19.0833 27.2693 19.1146 26.8025 19.0453 26.3453H22.7521C22.7287 26.4955 22.7162 26.6473 22.7148 26.7993C22.7148 27.6423 23.0497 28.4507 23.6457 29.0467C24.2418 29.6427 25.0502 29.9776 25.8931 29.9776C26.736 29.9776 27.5444 29.6427 28.1404 29.0467C28.7365 28.4507 29.0713 27.6423 29.0713 26.7993C29.0703 26.6095 29.0518 26.4201 29.0159 26.2336C29.8062 26.0423 30.5094 25.5915 31.013 24.9532C31.5166 24.3149 31.7915 23.5261 31.7937 22.713V18.1726C31.7923 16.9689 31.3135 15.8149 30.4623 14.9637C29.6111 14.1126 28.4571 13.6337 27.2534 13.6323ZM29.9776 18.1726V19.0807H25.4372V15.4484H27.2534C27.9759 15.4484 28.6688 15.7354 29.1797 16.2463C29.6906 16.7572 29.9776 17.4501 29.9776 18.1726ZM11.8161 22.713V14.5404C11.8161 13.8179 12.1032 13.1249 12.614 12.614C13.1249 12.1032 13.8179 11.8161 14.5404 11.8161H20.8969C21.6194 11.8161 22.3123 12.1032 22.8232 12.614C23.3341 13.1249 23.6211 13.8179 23.6211 14.5404V24.5292H13.6323C13.1506 24.5292 12.6887 24.3378 12.3481 23.9972C12.0075 23.6566 11.8161 23.1947 11.8161 22.713ZM17.2646 26.7993C17.2646 27.1606 17.1211 27.507 16.8656 27.7625C16.6102 28.0179 16.2637 28.1614 15.9025 28.1614C15.5412 28.1614 15.1948 28.0179 14.9393 27.7625C14.6839 27.507 14.5404 27.1606 14.5404 26.7993C14.5409 26.6441 14.5695 26.4903 14.6248 26.3453H17.1801C17.2354 26.4903 17.264 26.6441 17.2646 26.7993ZM25.8913 28.1614C25.53 28.1614 25.1836 28.0179 24.9281 27.7625C24.6727 27.507 24.5292 27.1606 24.5292 26.7993C24.5296 26.6441 24.5582 26.4903 24.6136 26.3453H27.1689C27.2244 26.4903 27.253 26.6441 27.2534 26.7993C27.2534 27.1606 27.1099 27.507 26.8544 27.7625C26.599 28.0179 26.2525 28.1614 25.8913 28.1614ZM28.1614 24.5292H25.4372V20.8969H29.9776V22.713C29.9776 23.1947 29.7862 23.6566 29.4456 23.9972C29.1051 24.3378 28.6431 24.5292 28.1614 24.5292Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
