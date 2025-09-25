import React, {useState} from "react";

interface SearchSectionProps {
  searchText: string;
  setSearchText: (value: string) => void;
}

export function SearchSection({ searchText, setSearchText }: SearchSectionProps) {
  return (
    <section className="mt-2 mb-2 h-[96px]">
      <div className="flex w-full items-center justify-start gap-4 py-3 md:py-6">
        <div className="text-grey-4 relative w-full max-w-[400px] text-sm">
          <input
            id="search"
            type="text"
            placeholder="Pesquisar item..."
            className="h-12 w-full flex-grow rounded-full border bg-white py-2.5 pr-2 pl-12 focus:outline-none"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
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
        <button
          aria-label="Abrir filtro"
          title="Abrir filtro"
          className="dynamic-gradient rounded-full p-3"
        >
          <svg
            role="img"
            aria-label="Ícone de um funil"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 19"
            width="18"
            height="19"
            fill="none"
          >
            <path
              fill="#fff"
              d="M10.29 19a.792.792 0 0 1-.475-.158l-3.167-2.375a.793.793 0 0 1-.317-.634v-4.449L.777 5.136A3.087 3.087 0 0 1 3.086 0h11.241a3.087 3.087 0 0 1 2.306 5.136l-5.552 6.248v6.824a.791.791 0 0 1-.791.792Zm-2.375-3.563 1.583 1.188v-5.542c0-.194.071-.38.2-.525l5.754-6.474a1.505 1.505 0 0 0-1.125-2.5H3.086a1.504 1.504 0 0 0-1.125 2.5l5.754 6.474a.79.79 0 0 1 .2.525v4.354Z"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
