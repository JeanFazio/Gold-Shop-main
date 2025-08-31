import { useState } from "react";

// URLs dos produtos Everk Cosméticos
const testUrls = [
  "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fd363175e-dd91-474a-ba72-fb7a131e5e8d%252F984bae79-9584-4dc8-afbd-a0f01621062a%3Falt%3Dmedia%26token%3Dee5f9f1f-7053-4f68-84cc-528cd984ade2",
  "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fae9a3164-7b89-44dd-ab7c-33c5002dc87d%252Fc2e6b778-5004-49f4-bc5e-ede2461e9834%3Falt%3Dmedia%26token%3D0db798c4-4ff7-468b-a5ef-712ffde8173d",
  "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F16ac7fe6-9e31-4a64-bf17-2c0563642c69%252Fac9a92d0-3f99-464c-98c6-6614fc7481ff%3Falt%3Dmedia%26token%3D61078261-5f33-45d7-bc34-a4c72fe915f2",
];

export function ImageDebug() {
  const [results, setResults] = useState<{
    [key: string]: "loading" | "success" | "error";
  }>({});

  const testImage = (url: string, index: number) => {
    setResults((prev) => ({ ...prev, [index]: "loading" }));

    const img = new Image();
    img.onload = () => {
      console.log(`✅ Image ${index} loaded successfully:`, url);
      setResults((prev) => ({ ...prev, [index]: "success" }));
    };
    img.onerror = (e) => {
      console.error(`❌ Image ${index} failed to load:`, url, e);
      setResults((prev) => ({ ...prev, [index]: "error" }));
    };
    img.src = url;
  };

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h3 className="text-lg font-bold mb-4">Teste de Imagens dos Produtos</h3>

      {testUrls.map((url, index) => (
        <div key={index} className="mb-4 p-2 border rounded">
          <div className="mb-2">
            <button
              onClick={() => testImage(url, index)}
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            >
              Testar Imagem {index + 1}
            </button>
            <span
              className={`px-2 py-1 rounded text-sm ${
                results[index] === "loading"
                  ? "bg-yellow-100"
                  : results[index] === "success"
                    ? "bg-green-100"
                    : results[index] === "error"
                      ? "bg-red-100"
                      : "bg-gray-100"
              }`}
            >
              {results[index] || "não testado"}
            </span>
          </div>

          <div className="text-xs break-all text-gray-600 mb-2">
            URL Original: {url}
          </div>

          <div className="w-32 h-32 border">
            <img
              src={url}
              alt={`Teste ${index + 1}`}
              className="w-full h-full object-cover"
              onLoad={() => console.log(`Direct img load success: ${index}`)}
              onError={() => console.log(`Direct img load error: ${index}`)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
