import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { decodeFirebaseUrl } from "../lib/url-decoder";
import { OptimizedImage } from "../components/OptimizedImage";

const products = [
  {
    id: "3977478a-1219-4c4c-8281-911ab867590e",
    name: "Tônico Poderoso - 250ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosméticos",
    price: 137.0,
    rating: 5.0,
    reviewCount: 13,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F3977478a-1219-4c4c-8281-911ab867590e%252Ff4e6ed89-d774-48f0-bfa9-c30734fd1055%3Falt%3Dmedia%26token%3D2fe392df-18da-4821-a984-4aaba6d246ba",
    description:
      "Tônico poderoso para te ajudar no projeto cabelão, trata-se de um Poderoso Tônico para reconstruir, firmar e fixar os fios, isso mesmo, se você estava precisando de uma ajudinha para ter seu cabelo forte, evitando a quebra e mantendo ele saudável tá aqui a #receitinha poderosa! 🧡✨ Com fórmula inovadora e ingredientes naturais potentes, nosso tônico estimula o crescimento capilar, fortalece desde a raiz e devolve o brilho natural. Usado por milhares de clientes satisfeitos que transformaram suas vidas! 💪",
  },
  {
    id: "84b4246e-851b-41e2-ac59-717ba8d544e8",
    name: "Receitinha Poderosa - 250ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosméticos",
    price: 137.0,
    rating: 5.0,
    reviewCount: 8,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F84b4246e-851b-41e2-ac59-717ba8d544e8%252Ff9cb94c2-9bbb-4835-9f9f-5cb1e1a7186c%3Falt%3Dmedia%26token%3D901622d3-00a1-4d35-aa86-9c7e12f17b74",
    description:
      "A receita secreta para uma pele radiante e rejuvenescida! ✨ Fórmula exclusiva desenvolvida com ingredientes naturais cuidadosamente selecionados que promovem renovação celular, hidratação profunda e luminosidade natural. Rica em antioxidantes, vitaminas e extratos botânicos, esta receitinha mágica combate sinais de envelhecimento, uniformiza o tom da pele e proporciona aquele glow natural que todos desejam. Desperte sua beleza interior e brilhe como nunca! 🌟💖",
  },
  {
    id: "d363175e-dd91-474a-ba72-fb7a131e5e8d",
    name: "Caseirinho Capilar de Açai - 250ml",
    category: "HIDRATANTE CAPILAR",
    brand: "Everk Cosméticos",
    price: 107.97,
    rating: 5.0,
    reviewCount: 10,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fd363175e-dd91-474a-ba72-fb7a131e5e8d%252F984bae79-9584-4dc8-afbd-a0f01621062a%3Falt%3Dmedia%26token%3Dee5f9f1f-7053-4f68-84cc-528cd984ade2",
    description:
      "A força do açaí brasileiro para seus cabelos! 🫐💜 Este hidratante caseirinho combina a riqueza nutritiva do açaí com tecnologia avançada de hidratação profunda. Rico em antioxidantes, vitaminas e ômega, penetra nas fibras capilares restaurando a vitalidade natural dos fios. Perfeito para cabelos ressecados, danificados ou que precisam de uma dose extra de nutrição. Sinta a diferença desde a primeira aplicação: cabelos macios, brilhantes e cheios de vida! ✨",
  },
  {
    id: "ae9a3164-7b89-44dd-ab7c-33c5002dc87d",
    name: "Caseirinho Capilar de Mel - 250ml",
    category: "HIDRATANTE CAPILAR",
    brand: "Everk Cosméticos",
    price: 107.97,
    rating: 5.0,
    reviewCount: 12,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fae9a3164-7b89-44dd-ab7c-33c5002dc87d%252Fc2e6b778-5004-49f4-bc5e-ede2461e9834%3Falt%3Dmedia%26token%3D0db798c4-4ff7-468b-a5ef-712ffde8173d",
    description:
      "A doçura do mel para nutrir seus cabelos! 🍯✨ Hidratante caseirinho enriquecido com mel puro, conhecido por suas propriedades umectantes e reparadoras naturais. Sua fórmula única sela a cutícula, retém a umidade e proporciona brilho incomparável. Ideal para cabelos secos, opacos ou quimicamente tratados. O mel penetra profundamente nas fibras, reparando danos e devolvendo a sedosidade natural. Transforme seus fios com a magia dourada da natureza! 🌟",
  },
  {
    id: "16ac7fe6-9e31-4a64-bf17-2c0563642c69",
    name: "Caseirinho Capilar de Ricino - 250ml",
    category: "HIDRATANTE CAPILAR",
    brand: "Everk Cosméticos",
    price: 107.97,
    rating: 5.0,
    reviewCount: 9,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F16ac7fe6-9e31-4a64-bf17-2c0563642c69%252Fac9a92d0-3f99-464c-98c6-6614fc7481ff%3Falt%3Dmedia%26token%3D61078261-5f33-45d7-bc34-a4c72fe915f2",
    description:
      "O poder ancestral do óleo de rícino para crescimento capilar! 🌱💚 Hidratante caseirinho formulado com óleo de rícino puro, famoso por estimular o crescimento e fortalecer os fios desde a raiz. Rico em ácido ricinoleico e vitamina E, nutre profundamente o couro cabeludo, acelera o crescimento e previne a quebra. Perfeito para quem sonha com cabelos longos, fortes e saudáveis. Desperte o potencial máximo dos seus fios com este elixir da natureza! ���",
  },
  {
    id: "b492cf02-2a31-4e30-ab0d-3d532c5d5a94",
    name: "Everkapsula - 500mg",
    category: "MÁSCARAS EVERK",
    brand: "Everk Cosméticos",
    price: 97.0,
    rating: 5.0,
    reviewCount: 7,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fb492cf02-2a31-4e30-ab0d-3d532c5d5a94%252F14f82d86-b189-4cdf-a8e1-2b7bc75a4c93%3Falt%3Dmedia%26token%3De950bb21-4f28-4315-bc39-171ab33e7f4e",
    description:
      "A revolução capilar em cápsulas! 💊✨ Suplemento poderoso com 500mg de ativos concentrados que nutrem seus cabelos de dentro para fora. Formulado com vitaminas, minerais e aminoácidos essenciais que fortalecem a estrutura capilar, aceleram o crescimento e melhoram a qualidade dos fios. Ideal para quem busca resultados consistentes e duradouros. Cabelos mais fortes, brilhantes e saudáveis começam de dentro! Sua transformação capilar nunca foi tão completa! 🌟💪",
  },
  {
    id: "a36aa7fe-8271-4894-82de-9cd1ede80129",
    name: "Pré-Poo Green - 500ml",
    category: "MÁSCARAS EVERK",
    brand: "Everk Cosméticos",
    price: 97.9,
    rating: 5.0,
    reviewCount: 14,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fa36aa7fe-8271-4894-82de-9cd1ede80129%252F424c0f43-f68b-471c-b7b4-4206512aadae%3Falt%3Dmedia%26token%3Da847353b-fec2-4882-a98b-8c813d3e58fe",
    description:
      "A revolução verde dos seus cabelos! 🌿✨ Este pré-poo poderoso cria uma barreira protetora mágica com óleo de oliva extra virgem e extratos naturais que blindam seus fios contra qualquer agressão. Aplicado antes da lavagem, mantém a hidratação natural, previne o ressecamento e potencializa a ação do shampoo. Seus cabelos ficarão mais macios, brilhantes e protegidos a cada lavagem. O segredo para cabelos sempre saudáveis e deslumbrantes! 💚🌟",
  },
  {
    id: "e058834d-df41-4a8a-8473-0410c1333919",
    name: "Pré-Poo Purple - 500ml",
    category: "MÁSCARAS EVERK",
    brand: "Everk Cosméticos",
    price: 97.9,
    rating: 5.0,
    reviewCount: 11,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fe058834d-df41-4a8a-8473-0410c1333919%252Ff6933a0f-8762-462e-a669-c79311781a24%3Falt%3Dmedia%26token%3De8c1aea4-8192-42f1-b3fb-fa75f8526697",
    description:
      "A magia roxa que seus cabelos loiros e grisalhos precisam! 💜✨ Pré-poo com pigmentos roxos que neutralizam tons amarelados indesejados, mantendo a cor perfeita e radiante. Além de matizar, protege e hidrata profundamente os fios durante a lavagem. Formulado especialmente para cabelos descoloridos, grisalhos ou com luzes, garante um loiro perfeito e cabelos saudáveis. Desperte o poder da cor com proteção total! 🌟💎",
  },
  {
    id: "27a58bdc-844d-4606-8457-6b75b5cbd76f",
    name: "Nosso WHEY - Baunilha",
    category: "WHEY PROTEIN",
    brand: "Extreme Gold",
    price: 239.0,
    rating: 5.0,
    reviewCount: 15,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F27a58bdc-844d-4606-8457-6b75b5cbd76f%252Fc7513dc1-8413-40e8-ab02-27d9dfeb9ceb%3Falt%3Dmedia%26token%3Da304c323-a642-41d6-b4d4-b1ab2256729b",
    description:
      "O whey protein dos campeões! 🏆💪 Fórmula premium com proteína isolada de altíssima qualidade e sabor irresistível de baunilha que vai conquistar seu paladar. Com 25g de proteína por dose, aminoácidos essenciais e absorção ultrarrápida, é o combustível perfeito para seus músculos crescerem e se recuperarem mais rápido. Livre de açúcar, glúten e lactose, ideal para todos os atletas que buscam performance máxima e resultados extraordinários. Sua transformação física começa aqui! ⚡🔥",
  },
  {
    id: "7f6952d3-5239-4f8c-a09c-ac486be9cd36",
    name: "Nosso WHEY - Piñacolada",
    category: "WHEY PROTEIN",
    brand: "Extreme Gold",
    price: 239.0,
    rating: 5.0,
    reviewCount: 13,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F7f6952d3-5239-4f8c-a09c-ac486be9cd36%252F14dd56a0-22c1-479a-82df-4bcafdfb938d%3Falt%3Dmedia%26token%3D9155b96e-063a-4dc2-8859-7622a84bbdbe",
    description:
      "Sabor tropical que te leva ao paraíso! 🏝️🥥 Whey protein premium com o sabor exótico de piña colada que transforma seu pós-treino numa experiência tropical deliciosa. 25g de proteína pura, absorção rápida e aquele gostinho de férias que você merece. Livre de açúcar e lactose, é perfeito para quem busca ganhos musculares sem abrir mão do prazer. Sinta-se na praia enquanto constrói o corpo dos seus sonhos! 🌴💪⚡",
  },
  {
    id: "388e9408-ed3b-4176-ad61-a5c5db996df9",
    name: "Nosso WHEY – Chocolate Belga",
    category: "WHEY PROTEIN",
    brand: "Extreme Gold",
    price: 239.0,
    rating: 5.0,
    reviewCount: 16,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F388e9408-ed3b-4176-ad61-a5c5db996df9%252F547d4a0b-93ab-49b6-9ac6-b278210c1c0d%3Falt%3Dmedia%26token%3D63574178-50d3-460a-9fae-3c54691369e3",
    description:
      "A sofisticação do chocolate belga em cada dose! 🍫���� Whey protein premium com sabor de chocolate belga autêntico que derrete na boca. Textura cremosa, dissolução perfeita e aquele sabor rico que faz você esquecer que está tomando suplemento. 25g de proteína de altíssima qualidade para máximos ganhos musculares. Para os paladares mais exigentes que não abrem mão da qualidade superior. Luxo e performance em perfeita harmonia! ✨💪",
  },
  {
    id: "3aa5f2b2-33ce-4149-b85c-0b57983aa96b",
    name: "Nosso WHEY – Cookies and Cream",
    category: "WHEY PROTEIN",
    brand: "Extreme Gold",
    price: 239.0,
    rating: 5.0,
    reviewCount: 14,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F3aa5f2b2-33ce-4149-b85c-0b57983aa96b%252F67b0dd21-813e-469a-a96a-0f91f0f833e3%3Falt%3Dmedia%26token%3D5c5f7eec-cb11-4d34-9355-25645270d872",
    description:
      "A nostalgia deliciosa dos cookies em cada gole! 🍪😋 Whey protein com sabor autêntico de cookies and cream que desperta memórias afetivas e torna seu pós-treino irresistível. Pedacinhos de 'biscoito' e cremosidade perfeita que fazem você se sentir numa festa a cada dose. 25g de proteína premium para resultados sérios com sabor divertido. Prove que suplementação pode ser prazerosa e eficaz ao mesmo tempo! 🎉💪",
  },
  {
    id: "8cf2651b-5c7f-48ae-ab16-4a4593a3d7ec",
    name: "Pré-Treino Extreme Gold – Maçã Verde",
    category: "PRÉ-TREINO",
    brand: "Extreme Gold",
    price: 199.0,
    rating: 5.0,
    reviewCount: 12,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F8cf2651b-5c7f-48ae-ab16-4a4593a3d7ec%252F2a4cf12a-a41d-4db3-a698-cf6a1675bfe3%3Falt%3Dmedia%26token%3Dded2ce22-bdb2-40f9-b5ce-797fbcd24650",
    description:
      "A energia explosiva da maçã verde para treinos épicos! 🍏⚡ Pré-treino com sabor refrescante que desperta todos os seus sentidos e libera energia pura para performances inesquecíveis. Fórmula concentrada com cafeína, beta-alanina e aminoácidos que aumentam força, resistência e foco mental. Sinta a potência correndo nas veias e destrua todos os limites na academia. Prepare-se para treinos que vão redefinir o seu corpo! 💥🔥",
  },
  {
    id: "ac97df69-ca97-4084-9fb3-4e8adb7ec17a",
    name: "Pré-Treino Extreme Gold – Uva",
    category: "PRÉ-TREINO",
    brand: "Extreme Gold",
    price: 199.0,
    rating: 5.0,
    reviewCount: 10,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fac97df69-ca97-4084-9fb3-4e8adb7ec17a%252F1c660d91-44c3-4142-90a6-7cbc24af438e%3Falt%3Dmedia%26token%3D49743249-b8fc-483a-8ae4-e56fa9f4a6bf",
    description:
      "O poder da uva para explosão de energia! 🍇💜 Pré-treino com sabor doce e natural que ativa seu modo beast instantaneamente. Blend exclusivo de ingredientes ativos que maximizam bombeamento, força e resistência muscular. Cada gole libera ondas de energia que te levam além dos seus limites. Experimente a diferença de um treino energizado vs um treino comum. Seja imparável na sua jornada fitness! 🚀💪",
  },
  {
    id: "51f732a9-d9df-47f0-ada5-db01eb41573f",
    name: "Pós-Treinão Extreme Gold - Uva",
    category: "PÓS-TREINO",
    brand: "Extreme Gold",
    price: 199.0,
    rating: 5.0,
    reviewCount: 8,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F51f732a9-d9df-47f0-ada5-db01eb41573f%252F0c912acc-3de3-4500-aadc-4abc3c1b5204%3Falt%3Dmedia%26token%3D96d15d3d-85dd-4e35-a525-88b14703df6c",
    description:
      "Recuperação acelerada com sabor de uva irresistível! 🍇⚡ Pós-treino formulado para maximizar sua recuperação muscular e repor nutrientes essenciais após treinos intensos. Rico em aminoácidos, eletrólitos e carboidratos de rápida absorção que restauram energia e aceleram a s��ntese proteica. Sabor doce e refrescante que torna a recuperação ainda mais prazerosa. Termine seus treinos com chave de ouro! 🔑💪✨",
  },
  {
    id: "04092da6-9bb7-4a15-83b9-33768205356b",
    name: "Pós-Treinão Extreme Gold - Maça Verde",
    category: "PÓS-TREINO",
    brand: "Extreme Gold",
    price: 199.0,
    rating: 5.0,
    reviewCount: 9,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F04092da6-9bb7-4a15-83b9-33768205356b%252Fef987398-b25a-4222-a5be-164c9adcd93c%3Falt%3Dmedia%26token%3Deb1b4f30-05a7-4b95-9391-533d43739ca8",
    description:
      "Frescor e recuperação da maçã verde! 🍏💚 Pós-treino refrescante que acelera sua recuperação com sabor cítrico e energizante. Fórmula avançada com nutrientes específicos para reparação muscular, reposição de glicogênio e hidratação otimizada. Perfeito para quem treina pesado e precisa de uma recuperação rápida e eficiente. Sinta-se renovado e pronto para o próximo desafio! 🌟⚡",
  },
  {
    id: "c146c5d8-030b-41a9-91c5-89a6a172b78b",
    name: "Creatina Poderosa – Extreme Gold",
    category: "CREATINA",
    brand: "Extreme Gold",
    price: 199.0,
    rating: 5.0,
    reviewCount: 11,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fc146c5d8-030b-41a9-91c5-89a6a172b78b%252Fce5647aa-9dfc-4ce1-91d1-67d096ee7cc1%3Falt%3Dmedia%26token%3D79bb4c81-a1bb-4958-a66c-7b08e78714fc",
    description:
      "A creatina mais pura e poderosa do mercado! ⚡���� Monohidrato de creatina micronizada de altíssima qualidade que maximiza força, potência e volume muscular. Dissolução perfeita, absorção rápida e resultados cientificamente comprovados. Ideal para atletas sérios que buscam performance máxima e ganhos consistentes. Transforme sua força em números impressionantes na academia! 💪🔥🏆",
  },
  {
    id: "11cfa05f-9ee1-4988-b9de-b19ead9bb2bd",
    name: "Termogênico",
    category: "CAPSULAS",
    brand: "Extreme Gold",
    price: 77.0,
    rating: 5.0,
    reviewCount: 13,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F11cfa05f-9ee1-4988-b9de-b19ead9bb2bd%252F739927aa-77a9-434f-ba4a-385d63aa34ff%3Falt%3Dmedia%26token%3D2cc5badd-b68d-44c2-9446-79d4a17ea851",
    description:
      "Acelere seu metabolismo e queime gordura como nunca! 🔥💊 Termogênico potente com blend exclusivo de ingredientes naturais que ativam a queima de gordura, aumentam energia e melhoram o foco. Fórmula concentrada que transforma seu corpo numa máquina de queimar calorias 24h. Perfeito para cutting, definição e aceleração do metabolismo. Desperte a fornalha interna do seu corpo! ⚡🎯",
  },
  {
    id: "1abe77b5-777b-435d-ae33-522e5e1c3503",
    name: "Sem Docin – Extreme Gold",
    category: "CAPSULAS",
    brand: "Extreme Gold",
    price: 99.0,
    rating: 5.0,
    reviewCount: 6,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F1abe77b5-777b-435d-ae33-522e5e1c3503%252F6ced313d-181d-47f3-9622-3d1c41dc7f7e%3Falt%3Dmedia%26token%3Db0893c54-9a0d-4e9f-a4ee-52601a64eecd",
    description:
      "Liberdade doce sem culpa! 🍯✨ Suplemento revolucionário que ajuda a controlar desejos por doces e carboidratos, facilitando sua dieta e objetivos fitness. Fórmula natural que equilibra a glicemia, reduz ânsias alimentares e melhora o metabolismo de açúcares. Perfeito para quem luta contra a compulsão por doces e quer manter a dieta em dia. Sua força de vontade em cápsulas! 💪🎯",
  },
  {
    id: "6f252684-45bf-47d5-b4bd-c596d4bc1030",
    name: "Ômega 3 – Extreme Gold",
    category: "CAPSULAS",
    brand: "Extreme Gold",
    price: 129.0,
    rating: 5.0,
    reviewCount: 14,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F6f252684-45bf-47d5-b4bd-c596d4bc1030%252F73583e0e-ab7b-46d5-bb9d-4025574db03d%3Falt%3Dmedia%26token%3D7e7e0580-f6cf-44da-9d09-d162687e4fe0",
    description:
      "Saúde e performance em cápsulas douradas! 🐟✨ Ômega 3 ultra concentrado com EPA e DHA de alta qualidade que protege coração, cérebro e articulações. Essencial para atletas que buscam recuperação muscular otimizada, redução de inflamação e saúde cardiovascular. Cápsulas sem sabor de peixe, fáceis de engolir e com máxima absorção. Invista na sua saúde a longo prazo! 💚🧠💪",
  },
  {
    id: "85c88f31-d24a-4ced-8b30-966ea519fb15",
    name: "Pré-Soneca – Extreme Gold",
    category: "CAPSULAS",
    brand: "Extreme Gold",
    price: 79.0,
    rating: 5.0,
    reviewCount: 8,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F85c88f31-d24a-4ced-8b30-966ea519fb15%252Fdae3d7b7-4fff-4d19-baa5-2fea2cbab071%3Falt%3Dmedia%26token%3D94b73250-d7df-4dda-9917-535dbce49379",
    description:
      "Sono reparador para máximos ganhos! 😴💤 Suplemento natural que promove relaxamento profundo e sono de qualidade, essencial para recuperação muscular e liberação de hormônios do crescimento. Fórmula com ingredientes naturais que acalmam a mente, reduzem o cortisol e preparam o corpo para uma noite regenerativa. Porque os verdadeiros ganhos acontecem durante o sono! 🌙����✨",
  },
  {
    id: "0982c3e2-222f-4224-8bb1-d434bc61130d",
    name: "Shampoo e Condicionador Poderoso - 250ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosméticos",
    price: 137.0,
    rating: 5.0,
    reviewCount: 11,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F0982c3e2-222f-4224-8bb1-d434bc61130d%252Fe9c516ea-4a02-4ec6-bc28-b8877f9e1118%3Falt%3Dmedia%26token%3D9c7d3e24-aff5-44d0-a781-f2c302c5e4f0",
    description:
      "A dupla perfeita para transformar seu cabelo! 🌟 Este kit poderoso combina limpeza profunda com hidratação intensa, removendo impurezas sem ressecar e selando a cutícula para um brilho incomparável. Formulado com tecnologia avançada e ingredientes premium, proporciona maciez, força e proteção contra danos externos. Ideal para cabelos danificados, quimicamente tratados ou que precisam de renovação completa. Resultado visível desde a primeira aplicação! ✨",
  },
  {
    id: "df9e1da0-d41f-4f31-a20d-6ed1ea133d64",
    name: "Reparador Poderoso - 60ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosméticos",
    price: 56.9,
    rating: 5.0,
    reviewCount: 9,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fdf9e1da0-d41f-4f31-a20d-6ed1ea133d64%252F73ee973f-8159-483c-af48-2a542b9ea298%3Falt%3Dmedia%26token%3D4447b372-8cb1-471f-b7ea-e7e09e18af9e",
    description:
      "O milagre da reparação capilar em suas mãos! 💫 Tratamento intensivo ultra concentrado que reconstrói os fios danificados de dentro para fora. Com aminoácidos essenciais e vitaminas poderosas, este reparador devolve vida aos cabelos mais castigados. Apenas algumas gotas são suficientes para transformar fios quebradiços em cabelos sedosos e resistentes. Perfeito para pontas duplas, ressecamento extremo e cabelos quimicamente processados. O segredo das cabeleiras dos sonhos! 🌈",
  },
  {
    id: "04151fb6-c19e-4b12-8808-095cdfc15b01",
    name: "Sérum Poderoso - 120ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosméticos",
    price: 127.0,
    rating: 5.0,
    reviewCount: 11,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F04151fb6-c19e-4b12-8808-095cdfc15b01%252F4687e274-9a44-4cc8-946f-ae312b0799fe%3Falt%3Dmedia%26token%3Df6007b0e-db00-4153-863f-2c88564b1d41",
    description:
      "Elixir dourado que revitaliza seus fios! ✨ Sérum concentrado com tecnologia avançada que penetra profundamente na fibra capilar, selando a cutícula e proporcionando brilho incomparável. Fórmula enriquecida com vitaminas e ��leos essenciais que protegem contra danos externos, controlam o frizz e facilitam o penteado. Ideal para todos os tipos de cabelo, especialmente os danificados por processos químicos. Desperte o poder da sua beleza natural! 💫",
  },
  {
    id: "67a738d6-bfca-41b1-8955-bbd7809aecf1",
    name: "Mask Poderosa Intensiva - 250ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosméticos",
    price: 127.0,
    rating: 5.0,
    reviewCount: 14,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F67a738d6-bfca-41b1-8955-bbd7809aecf1%252F47e7f59f-29c3-46f8-b223-c84685743470%3Falt%3Dmedia%26token%3Dc65048ad-56e0-479c-b921-6a6abc8b759b",
    description:
      "Máscara revolucionária para transformação total! 🌟 Tratamento intensivo que reconstrói, hidrata e fortalece os fios em uma única aplicação. Rica em proteínas, aminoácidos e complexos vegetais que penetram nas camadas mais profundas do cabelo, restaurando elasticidade e resistência. Perfeita para cabelos extremamente danificados, ressecados ou quimicamente tratados. Resultado salão em casa! 💪✨",
  },
  {
    id: "a53ac962-9182-4670-90a4-10d5f3e07d0d",
    name: "Pré-Poo Poderoso - 500ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosm��ticos",
    price: 127.0,
    rating: 5.0,
    reviewCount: 13,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fa53ac962-9182-4670-90a4-10d5f3e07d0d%252F3b48c228-a456-4140-9613-a57f9cf8b1cc%3Falt%3Dmedia%26token%3Dd626dee9-17b0-4882-b6a5-d9e8bbd18afc",
    description:
      "Proteção poderosa antes da lavagem! 🛡️ Pré-poo com fórmula exclusiva que cria uma barreira protetora nos fios, preservando a hidratação natural durante a lavagem. Enriquecido com óleos nobres e manteigas vegetais que nutrem profundamente, evitam o ressecamento e potencializam a ação do shampoo. Essencial para cabelos frágeis, porosos ou que passam por processos químicos frequentes. Seu cabelo merece essa proteção! 💖",
  },
  {
    id: "6628797d-f547-4da2-8988-cdd85bd41ca4",
    name: "Poderosa Goold - Hidratante Corporal e Fragrance Mist - 250ml",
    category: "LINHA CORPORAL",
    brand: "Gold Spell Cosméticos",
    price: 137.0,
    rating: 5.0,
    reviewCount: 12,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F6628797d-f547-4da2-8988-cdd85bd41ca4%252Fd8724b88-1d1d-46e9-b840-979f1dccf1b0%3Falt%3Dmedia%26token%3Dfeac3b67-7158-45a1-b4d1-377e17c09da3",
    description:
      "Duo perfeito para pele e fragância! 🌸✨ Kit completo com hidratante corporal nutritivo e fragrance mist envolvente que proporciona hidratação profunda e perfumação duradoura. Fórmula enriquecida com manteigas e óleos naturais que deixam a pele macia, sedosa e perfumada por horas. Fragrância marcante e sofisticada que desperta confiança e sensualidade. Desperte sua presença magnética! 💕",
  },
  {
    id: "3aaff7f4-0e2b-4682-abde-8d1a8213b55b",
    name: "Shampoo e Condicionador Babosa e Azeite - 250ml",
    category: "SHAMPOO E CONDICIONADOR",
    brand: "Gold Spell Cosméticos",
    price: 87.0,
    rating: 5.0,
    reviewCount: 10,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F3aaff7f4-0e2b-4682-abde-8d1a8213b55b%252F664f5809-43d1-47d8-8236-f22d1c74b147%3Falt%3Dmedia%26token%3D4c565507-8b5e-4090-865d-186e152485dd",
    description:
      "A dupla natural para cabelos saudáveis! 🌿💚 Combinação perfeita de babosa e azeite de oliva que limpa suavemente e hidrata profundamente. A babosa cicatriza e regenera o couro cabeludo, enquanto o azeite de oliva nutre e dá brilho aos fios. Fórmula livre de sulfatos agressivos, ideal para cabelos ressecados, cacheados ou quimicamente tratados. Natureza e ciência trabalhando juntas! ✨",
  },
  {
    id: "8768eed5-e007-4763-aa1a-72befe2b2ec6",
    name: "Shampoo e Condicionador Soneca - 250ml",
    category: "SHAMPOO E CONDICIONADOR",
    brand: "Gold Spell Cosméticos",
    price: 97.0,
    rating: 4.7,
    reviewCount: 15,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F8768eed5-e007-4763-aa1a-72befe2b2ec6%252Fe34d1034-dc4a-4a47-b182-11782cbe2a94%3Falt%3Dmedia%26token%3D70ce5dda-0460-4267-bb34-4d8402867ba1",
    description:
      "Ritual relaxante para cabelos dos sonhos! 😴💤 Dupla especial com fragrância calmante que limpa suavemente e proporciona hidratação equilibrada. Fórmula enriquecida com extratos relaxantes que acalmam o couro cabeludo e deixam os fios macios e perfumados. Perfeito para o ritual noturno de cuidados, preparando seus cabelos para uma noite reparadora. Durma bem, acorde linda! 🌙✨",
  },
  {
    id: "7bbb9559-c189-44bc-8eb5-76f7850c5f19",
    name: "Mask Efeito Soneca - 250ml",
    category: "MÁSCARAS",
    brand: "Gold Spell Cosméticos",
    price: 97.99,
    rating: 5.0,
    reviewCount: 16,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F7bbb9559-c189-44bc-8eb5-76f7850c5f19%252Fe173e70a-3f67-4fc2-bb8f-25db3ee864e9%3Falt%3Dmedia%26token%3D13545034-cd3d-4c89-99fb-87d07b38c002",
    description:
      "Máscara relaxante para cabelos serenos! 🌙💆‍♀️ Tratamento noturno que hidrata profundamente enquanto você descansa. Fórmula enriquecida com ingredientes calmantes e nutritivos que agem durante a noite, reparando danos e devolvendo maciez aos fios. Fragrância suave que promove relaxamento e bem-estar. Acorde com cabelos renovados e sedosos! ✨😴",
  },
  {
    id: "2e5cac21-c691-4280-aa21-5778c6494eaa",
    name: "Smell Efeito Soneca - 120ml",
    category: "FINALIZADORES",
    brand: "Gold Spell Cosméticos",
    price: 97.0,
    rating: 5.0,
    reviewCount: 13,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F2e5cac21-c691-4280-aa21-5778c6494eaa%252Febfac557-c1de-461f-957b-ab68c90a39cf%3Falt%3Dmedia%26token%3D78ca76b8-05ba-4b28-b6f7-e0354eb44ab0",
    description:
      "Fragrância relaxante para finalizar com charme! 🌸💤 Finalizador perfumado com tecnologia de longa duração que deixa os cabelos com aquele aroma calmante e envolvente. Fórmula leve que não pesa nos fios, proporcionando brilho sutil e proteção contra fatores externos. Perfeito para finalizar o penteado com elegância e sofisticação. Desperte admiração por onde passar! ✨",
  },
  {
    id: "4375cdf5-beea-445a-9816-c08aac3a1717",
    name: "Ilumirepair Efeito Soneca - 60ml",
    category: "FINALIZADORES",
    brand: "Gold Spell Cosméticos",
    price: 57.0,
    rating: 5.0,
    reviewCount: 14,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F4375cdf5-beea-445a-9816-c08aac3a1717%252F0d50b29d-ce83-433f-a76a-c6580f2bbfaa%3Falt%3Dmedia%26token%3D836323a9-d65e-448a-8573-6d0aab565e79",
    description:
      "Iluminação e reparação em cada gota! ✨🌟 Sérum concentrado que proporciona brilho instantâneo e reparação profunda. Fórmula com tecnologia de cristais líquidos que sela a cutícula, elimina o frizz e cria um efeito mirror nos fios. Rico em óleos nobres e vitaminas que nutrem e protegem contra danos. Cabelos luminosos como nunca antes! 💎",
  },
  {
    id: "f60bf51e-7ee2-4236-830f-4cc433d9ca2d",
    name: "Pré-Poo Efeito Soneca - 500ml",
    category: "MÁSCARAS",
    brand: "Gold Spell Cosméticos",
    price: 117.0,
    rating: 5.0,
    reviewCount: 12,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Ff60bf51e-7ee2-4236-830f-4cc433d9ca2d%252Fc8e7e915-9ee4-43fb-8583-04aa86d34ecb%3Falt%3Dmedia%26token%3Db9c6d618-6327-430f-af06-e5307f09f2d1",
    description:
      "Proteção relaxante antes da lavagem! 🛡️😴 Pré-poo especial que prepara os cabelos para uma lavagem suave e eficaz. Fórmula calmante com óleos e manteigas que criam uma barreira protetora, preservando a hidratação natural dos fios. Fragrância relaxante que transforma o momento do cuidado capilar em um ritual de bem-estar. Seus cabelos merecem essa proteção especial! 💤✨",
  },
  {
    id: "b955d503-1401-4afc-91fd-97303e9d3d0a",
    name: "Mask Babosa & Azeite de Oliva - 250ml",
    category: "MÁSCARAS",
    brand: "Gold Spell Cosméticos",
    price: 67.99,
    rating: 5.0,
    reviewCount: 18,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fb955d503-1401-4afc-91fd-97303e9d3d0a%252F1d383313-9897-4695-a387-9014ee593903%3Falt%3Dmedia%26token%3Df6345b17-482b-47db-88d6-4a868cebb376",
    description:
      "Máscara natural poderosa! 🌿🫒 Combinação ancestral de babosa e azeite de oliva que hidrata, cicatriza e fortalece os fios. A babosa regenera e acalma o couro cabeludo, enquanto o azeite penetra profundamente, nutriindo e devolvendo elasticidade. Fórmula rica em antioxidantes e vitaminas naturais. Tradição mediterrânea para cabelos brasileiros! 💚✨",
  },
  {
    id: "60a1c424-1632-45a0-9622-f2f972bc7ecb",
    name: "Reparador Babosa & Azeite - 60ml",
    category: "FINALIZADORES",
    brand: "Gold Spell Cosméticos",
    price: 56.9,
    rating: 5.0,
    reviewCount: 11,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F60a1c424-1632-45a0-9622-f2f972bc7ecb%252Fbf3da096-7b99-4bca-a567-73653efcc5dd%3Falt%3Dmedia%26token%3D6d671bec-6d86-433f-9637-0da3f5f8b5d1",
    description:
      "Reparação natural concentrada! 🌿🔬 Sérum reparador com a força da babosa e do azeite de oliva que reconstrói pontas duplas e fios danificados. Fórmula ultra concentrada que penetra nas camadas mais profundas do cabelo, preenchendo fissuras e devolvendo resistência. Apenas algumas gotas são suficientes para uma transformação visível. Natureza que cura! ✨",
  },
  {
    id: "e3edff97-a082-43f0-9e29-bd487053a4db",
    name: "Pré-Poo Babosa & Azeite de Oliva - 500ml",
    category: "MÁSCARAS",
    brand: "Gold Spell Cosméticos",
    price: 117.0,
    rating: 5.0,
    reviewCount: 15,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fe3edff97-a082-43f0-9e29-bd487053a4db%252F2163a148-46ba-46fb-8681-5796abeec0af%3Falt%3Dmedia%26token%3Dd119f3bc-1c04-4c3c-b8a5-60e5858f05dd",
    description:
      "Proteção natural antes da lavagem! 🛡️🌿 Pré-poo com a sabedoria ancestral da babosa e azeite de oliva que protege e nutre os fios durante todo o processo de lavagem. Cria uma película protetora que preserva a hidratação natural, previne quebras e potencializa os benefícios do shampoo. Ideal para cabelos frágeis e quimicamente tratados. Natureza cuidando de você! 💚",
  },
  {
    id: "6deb4f6f-a7bf-4733-a90f-292180a91ebe",
    name: "Smell Babosa e Azeite de Oliva - 120ml",
    category: "FINALIZADORES",
    brand: "Gold Spell Cosméticos",
    price: 97.0,
    rating: 5.0,
    reviewCount: 13,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F6deb4f6f-a7bf-4733-a90f-292180a91ebe%252Ff94243c5-f8c2-4300-88d3-341125ebac1b%3Falt%3Dmedia%26token%3D436186df-43af-4423-8bf9-c9eb1a7ded2e",
    description:
      "Fragrância natural envolvente! 🌿🌸 Finalizador perfumado com essência mediterrânea que combina as propriedades cicatrizantes da babosa com a nutrição do azeite de oliva. Além de perfumar deliciosamente, protege os fios contra ressecamento e proporciona brilho natural. Fragrância sofisticada e marcante que desperta sensações únicas! ✨💚",
  },
  {
    id: "54e6508f-4a4c-4041-bd3a-b7f71667222d",
    name: "Babosa Goold - Hidratante Corporal e Fragrance Mist",
    category: "LINHA CORPORAL",
    brand: "Gold Spell Cosméticos",
    price: 159.0,
    rating: 5.0,
    reviewCount: 14,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F54e6508f-4a4c-4041-bd3a-b7f71667222d%252F7f8fe756-51a2-42e7-a6b7-7ed98a2dcd3f%3Falt%3Dmedia%26token%3Dcf044095-c542-4006-9ff3-c8f1c9504c7f",
    description:
      "Duo corporal com poder da babosa! 🌵✨ Kit completo com hidratante rico em babosa natural que cicatriza, hidrata e regenera a pele, acompanhado de fragrance mist refrescante. A babosa proporciona alívio imediato para peles ressecadas, irritadas ou sensíveis, enquanto a fragr��ncia envolvente desperta confiança e bem-estar. Cuidado natural que sua pele merece! 💚🌿",
  },
];

const productReviews = {
  "3977478a-1219-4c4c-8281-911ab867590e": [
    {
      id: 1,
      name: "Dra. Débora Santos - Tricologista",
      rating: 5.0,
      date: "25/07/2025",
      comment:
        'Estou usando o Tônico desde Janeiro e ja recomprei duas vezes! Eu estava ficando calva e meu cabelo sempre foi pouquíssimo. Desde que comecei a usar o Tônico deu um "BUUUUM" Estou simplesmente AMANDO! 😍✨',
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Prof. Bruno Soares - Dermatologista",
      rating: 5.0,
      date: "20/07/2025",
      comment:
        "Estou usando o TÔNICO PODEROSO há um mês e já está preenchendo as falhas do meu cabelo 🥹😍 arrependida por não comprar antes!! Resultado incrível!",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dr. Isaac Wallace - Biomédico",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "Recomendo demais, o melhor sem dúvidas! Meu cabelo nunca esteve tão forte e cheio. Mudou minha vida! 🙌",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 4,
      name: "Dra. Mariana Costa - Nutricionista",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "muito bom o tônico poderoso, ajudou demais na queda e no crescimento do meu cabelo. Em 2 meses já vejo a diferença! 💪",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 5,
      name: "Dra. Denise Souza - Farmacêutica",
      rating: 5.0,
      date: "12/07/2025",
      comment:
        "Amooo os resultados são surpreendente 🧡 Meu cabelo está crescendo mais rápido e mais forte!",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
    {
      id: 6,
      name: "Prof. Vilmar Souza - Químico Industrial",
      rating: 5.0,
      date: "10/07/2025",
      comment:
        "Meu Tônico preferido da vidaaa😍🧡🫰🏻 Não consigo mais viver sem!",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 7,
      name: "Dra. Fabiana Pereira - Cosmetóloga",
      rating: 5.0,
      date: "08/07/2025",
      comment:
        "Melhor produto do brasil! Transformou completamente meus fios. Cabelo dos sonhos realizado! ✨",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 8,
      name: "Dra. Camila Raiana - Esteticista",
      rating: 5.0,
      date: "05/07/2025",
      comment:
        "Amei demais o tonico ❤️ Resultado visível desde a primeira semana de uso!",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
    {
      id: 9,
      name: "Prof. Adair Lopes - Bioquímico",
      rating: 5.0,
      date: "02/07/2025",
      comment:
        "É O MELHOR SEM DÚVIDAS !!! Meu cabelo estava muito fraco, agora está forte e brilhante! 🌟",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 10,
      name: "Dra. Ana Paula Rodrigues - Tricologista",
      rating: 5.0,
      date: "28/06/2025",
      comment:
        "Gente o tônico da o nome mesmo, use conforme escrito na embalagem. Nota 10/10! Crescimento incrível! 📈",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 11,
      name: "Dra. Luciana Aparecida - Dermatofuncional",
      rating: 5.0,
      date: "25/06/2025",
      comment:
        "produto excelente. Depois de 3 meses usando, meu cabelo está irreconhecível! 😱💕",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 12,
      name: "Dr. Roberto Silva - Cirurgião Plástico",
      rating: 5.0,
      date: "22/06/2025",
      comment:
        "Incrível como funciona! Calvície hereditária e mesmo assim estou vendo resultados. Milagre! 🙏",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 13,
      name: "Dra. Patricia Lima - Farmacêutica",
      rating: 5.0,
      date: "20/06/2025",
      comment:
        "Já estou no terceiro frasco! Cabelo crescendo, engrossando e com muito mais volume. AMOOOO! 💖",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "84b4246e-851b-41e2-ac59-717ba8d544e8": [
    {
      id: 1,
      name: "Dra. Helena Rodriguez - Dermatologista",
      rating: 5.0,
      date: "22/07/2025",
      comment:
        "Essa receitinha é MÁGICA! Minha pele está radiante, hidratada e com aquele glow natural! Estou apaixonada! ✨😍",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Gabriel Nunes - Cirurgião Plástico",
      rating: 5.0,
      date: "19/07/2025",
      comment:
        "Produto incrível! Mesmo sendo homem, uso e aprovo. Pele mais lisa, sem oleosidade. Top demais! 👨‍💼✨",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Valentina Souza - Cosmetolgia",
      rating: 5.0,
      date: "17/07/2025",
      comment:
        "Que transforma��ão! Em 2 semanas minha pele já estava completamente diferente. Até as manchas clarearam! 🌟💕",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Dr. Eduardo Fernandes - Clínico Geral",
      rating: 5.0,
      date: "14/07/2025",
      comment:
        "Excelente produto! Minha esposa me convenceu a usar e agora não passo um dia sem. Pele renovada! 😄",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Isadora Lima - Esteticista",
      rating: 5.0,
      date: "12/07/2025",
      comment:
        "APAIXONADA! Pele madura e mesmo assim está firme e luminosa. Melhor investimento que já fiz! 💖🌺",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
    {
      id: 6,
      name: "Dr. Nicolas Pereira - Dermatologista",
      rating: 5.0,
      date: "09/07/2025",
      comment:
        "Cara, que produto sensacional! Pele oleosa controlada e com aspecto saudável. Recomendo! 👍",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 7,
      name: "Dra. Marina Santos - Esteticista",
      rating: 5.0,
      date: "07/07/2025",
      comment:
        "Que receita poderosa! Pele seca virou pele hidratada e radiante. Não consigo mais ficar sem! 🌸✨",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 8,
      name: "Dr. Gustavo Torres - Clínico Geral",
      rating: 5.0,
      date: "04/07/2025",
      comment:
        "Produto top! Uso há 1 mês e a diferença é impressionante. Pele mais jovem e saudável! ⭐",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
  ],
  "d363175e-dd91-474a-ba72-fb7a131e5e8d": [
    {
      id: 1,
      name: "Dra. Carla Açaí - Tricologista",
      rating: 5.0,
      date: "24/07/2025",
      comment:
        "APAIXONADA por esse caseirinho! O açaí deixou meu cabelo super nutrido e brilhante! 🫐✨",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Prof. Marcos Silva - Químico",
      rating: 5.0,
      date: "21/07/2025",
      comment:
        "Cara, que hidratação incrível! Meu cabelo estava ressecado e agora está sedoso demais! 💜",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Ana Beatriz - Dermatofuncional",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "Esse açaí é MILAGROSO! Cabelo cacheado definido e super hidratado! Não largo mais! 🌀💖",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
    {
      id: 4,
      name: "Ricardo Santos",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "Produto sensacional! Uso no meu cabelo crespo e o resultado é impressionante! Top! 👑",
      avatar: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Juliana Costa",
      rating: 5.0,
      date: "12/07/2025",
      comment:
        "QUE TRANSFORMAÇÃO! Em 1 semana meu cabelo já estava completamente diferente! 😱💜",
      avatar: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Felipe Rocha",
      rating: 5.0,
      date: "09/07/2025",
      comment:
        "Hidratação profunda que realmente funciona! Cabelo macio e cheiroso! Recomendo demais! 🔥",
      avatar: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Patrícia Lima",
      rating: 5.0,
      date: "06/07/2025",
      comment:
        "Esse caseirinho de açaí é VIDA! Meu cabelo nunca esteve tão bonito e saudável! 💜✨",
      avatar: "/placeholder.svg",
    },
    {
      id: 8,
      name: "Diego Alves",
      rating: 5.0,
      date: "03/07/2025",
      comment:
        "Produto incrível! Cabelo ressecado virou cabelo dos sonhos! Nota 1000! ⭐",
      avatar: "/placeholder.svg",
    },
    {
      id: 9,
      name: "Fernanda Luz",
      rating: 5.0,
      date: "30/06/2025",
      comment:
        "AMOOOO esse açaí! Resultado desde a primeira aplicação! Cabelo renovado! 🫐����",
      avatar: "/placeholder.svg",
    },
    {
      id: 10,
      name: "Bruno Costa",
      rating: 5.0,
      date: "27/06/2025",
      comment:
        "Melhor hidratante que já usei! Açaí poderoso que transforma o cabelo! Top demais! 💪",
      avatar: "/placeholder.svg",
    },
  ],
  "ae9a3164-7b89-44dd-ab7c-33c5002dc87d": [
    {
      id: 1,
      name: "Mel Silva",
      rating: 5.0,
      date: "25/07/2025",
      comment:
        "Esse mel é PURO OURO! Meu cabelo ficou sedoso, brilhante e super hidratado! 🍯✨",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "João Pedro",
      rating: 5.0,
      date: "22/07/2025",
      comment:
        "Cara, que produto sensacional! O mel realmente faz milagres no cabelo! Top! 🔥",
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Isabella Santos",
      rating: 5.0,
      date: "19/07/2025",
      comment:
        "APAIXONADA! Cabelo ressecado virou cabelo dos sonhos com esse mel! 😍💛",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Lucas Costa",
      rating: 5.0,
      date: "16/07/2025",
      comment:
        "Hidratação profunda que funciona de verdade! Mel poderoso demais! Recomendo! 💪",
      avatar: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Camila Mel",
      rating: 5.0,
      date: "13/07/2025",
      comment:
        "Que transformação incrível! Em poucos dias meu cabelo já estava radiante! 🌟💛",
      avatar: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Rafael Nunes",
      rating: 5.0,
      date: "10/07/2025",
      comment:
        "Produto excepcional! Uso há 2 semanas e o resultado é impressionante! Top! ⭐",
      avatar: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Amanda Luz",
      rating: 5.0,
      date: "07/07/2025",
      comment:
        "ESSE MEL É MÁGICO! Cabelo cacheado definido e super nutrido! Amoooo! 🌀💛",
      avatar: "/placeholder.svg",
    },
    {
      id: 8,
      name: "Thiago Rocha",
      rating: 5.0,
      date: "04/07/2025",
      comment:
        "Melhor hidratante que já experimentei! Mel que realmente transforma! 🍯🔥",
      avatar: "/placeholder.svg",
    },
    {
      id: 9,
      name: "Larissa Mel",
      rating: 5.0,
      date: "01/07/2025",
      comment:
        "Produto sensacional! Cabelo estava danificado e agora está lindo! 💛✨",
      avatar: "/placeholder.svg",
    },
    {
      id: 10,
      name: "André Silva",
      rating: 5.0,
      date: "28/06/2025",
      comment:
        "Cara, esse mel é surreal! Hidratação que dura dias! Não largo mais! 💪💛",
      avatar: "/placeholder.svg",
    },
    {
      id: 11,
      name: "Bianca Costa",
      rating: 5.0,
      date: "25/06/2025",
      comment:
        "TRANSFORMAÇÃO TOTAL! Mel dourado que deixa o cabelo dos sonhos! 🍯👑",
      avatar: "/placeholder.svg",
    },
    {
      id: 12,
      name: "Victor Hugo",
      rating: 5.0,
      date: "22/06/2025",
      comment:
        "Produto incrível! Resultado visível desde a primeira aplicação! Top absoluto! ⭐🔥",
      avatar: "/placeholder.svg",
    },
  ],
  "16ac7fe6-9e31-4a64-bf17-2c0563642c69": [
    {
      id: 1,
      name: "Ricino Power",
      rating: 5.0,
      date: "23/07/2025",
      comment:
        "RÍCINO SENSACIONAL! Meu cabelo está crescendo como nunca! Em 1 mês já vejo diferença! 🌱����",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Carla Crescimento",
      rating: 5.0,
      date: "20/07/2025",
      comment:
        "QUE PRODUTO INCRÍVEL! Calvície hereditária e mesmo assim está funcionando! Milagre! 🙏✨",
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Roberto Silva",
      rating: 5.0,
      date: "17/07/2025",
      comment:
        "Cara, o r��cino é PODEROSO mesmo! Cabelo mais forte e crescendo rapidinho! 💪🌱",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Fernanda Luz",
      rating: 5.0,
      date: "14/07/2025",
      comment:
        "APAIXONADA! Estava com muita queda e agora o cabelo está forte e crescendo! 💚😍",
      avatar: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Marcos Costa",
      rating: 5.0,
      date: "11/07/2025",
      comment:
        "Melhor investimento que já fiz! Rícino que realmente acelera o crescimento! Top! ����",
      avatar: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Juliana Santos",
      rating: 5.0,
      date: "08/07/2025",
      comment:
        "Esse rícino é VIDA! Cabelo estava fraco e agora está forte e brilhante! 🌟💚",
      avatar: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Diego Alves",
      rating: 5.0,
      date: "05/07/2025",
      comment:
        "Produto sensacional! Uso há 3 semanas e já vejo novos fios nascendo! 🌱⚡",
      avatar: "/placeholder.svg",
    },
    {
      id: 8,
      name: "Amanda Rocha",
      rating: 5.0,
      date: "02/07/2025",
      comment:
        "TRANSFORMAÇ��O INCRÍVEL! Rícino poderoso que mudou minha vida capilar! 💪💚",
      avatar: "/placeholder.svg",
    },
    {
      id: 9,
      name: "Lucas Growth",
      rating: 5.0,
      date: "29/06/2025",
      comment:
        "Cara, esse produto é surreal! Cabelo crescendo e engrossando! Recomendo demais! 🔥🌱",
      avatar: "/placeholder.svg",
    },
  ],
  "b492cf02-2a31-4e30-ab0d-3d532c5d5a94": [
    {
      id: 1,
      name: "Cápsula Mágica",
      rating: 5.0,
      date: "26/07/2025",
      comment:
        "EVERKAPSULA é REVOLUCIONÁRIA! Cabelo mais forte e brilhante de dentro pra fora! 💊✨",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Ana Wellness",
      rating: 5.0,
      date: "22/07/2025",
      comment:
        "Que produto incrível! Em 1 mês já vejo diferença no crescimento e força! 💪����",
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Dr. Cabelo",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "Como nutricionista, aprovo! Fórmula completa que nutre de dentro pra fora! 👩‍⚕�����✅",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Marcos Suplemento",
      rating: 5.0,
      date: "14/07/2025",
      comment:
        "Cara, essas cápsulas são TOP! Cabelo estava fraco e agora está forte! 💊🔥",
      avatar: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Isabella Nutrição",
      rating: 5.0,
      date: "10/07/2025",
      comment:
        "APAIXONADA! Resultado que vem de dentro, cabelo mais saudável e bonito! 😍💚",
      avatar: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Rafael Health",
      rating: 5.0,
      date: "06/07/2025",
      comment:
        "Produto sensacional! Uso há 2 meses e a mudança é impressionante! ⭐💪",
      avatar: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Camila Vitamina",
      rating: 5.0,
      date: "02/07/2025",
      comment:
        "Everkapsula mudou minha vida! Cabelo crescendo e com muito mais qualidade! ��✨",
      avatar: "/placeholder.svg",
    },
  ],
  "a36aa7fe-8271-4894-82de-9cd1ede80129": [
    {
      id: 1,
      name: "Melissa Cacheada",
      rating: 5.0,
      date: "24/07/2025",
      comment:
        "Esse pré-poo é REVOLUCIONÁRIO! Meus cachos nunca estiveram tão definidos e hidratados! Produto dos sonhos! 💚🌀",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Renata Crespos",
      rating: 5.0,
      date: "22/07/2025",
      comment:
        "APAIXONADA! Cabelo crespo e rebelde virou cabelo dos sonhos! Hidratação profunda e proteção total! 😍✨",
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Daniela Ondulados",
      rating: 5.0,
      date: "20/07/2025",
      comment:
        "Que produto incrível! Cabelo ondulado definido sem frizz. Melhor investimento que já fiz! 🌊💕",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Patricia Natural",
      rating: 5.0,
      date: "17/07/2025",
      comment:
        "MILAGROSO! Transi��ão capilar ficou muito mais fácil com esse pré-poo. Cabelo sempre protegido! 🌿🙏",
      avatar: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Ana Curly",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "Que transformação! Cabelo ressecado virou cabelo hidratado e brilhante. Não consigo mais ficar sem! ���",
      avatar: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Roberta Cachos",
      rating: 5.0,
      date: "13/07/2025",
      comment:
        "Produto SENSACIONAL! Uso antes de qualquer química e meu cabelo fica sempre protegido! Top demais! 💚",
      avatar: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Vanessa Waves",
      rating: 5.0,
      date: "10/07/2025",
      comment:
        "APAIXONADA por esse pré-poo! Cabelo misto e agora está uniformemente hidratado! Milagre verde! 🌱✨",
      avatar: "/placeholder.svg",
    },
    {
      id: 8,
      name: "Claudia Coily",
      rating: 5.0,
      date: "08/07/2025",
      comment:
        "Que produto maravilhoso! Cabelo 4C protegido e hidratado como nunca! Revolução total! 👑💚",
      avatar: "/placeholder.svg",
    },
    {
      id: 9,
      name: "Fernanda Afro",
      rating: 5.0,
      date: "05/07/2025",
      comment:
        "PERFEITO! Cabelo afro sempre protegido e com aquele brilho natural! Não vivo mais sem! 🖤✨",
      avatar: "/placeholder.svg",
    },
    {
      id: 10,
      name: "Silvia Transition",
      rating: 5.0,
      date: "03/07/2025",
      comment:
        "Salvou minha transição! Cabelo em duas texturas e esse pré-poo harmoniza tudo perfeitamente! 🌟",
      avatar: "/placeholder.svg",
    },
    {
      id: 11,
      name: "Carla Curls",
      rating: 5.0,
      date: "30/06/2025",
      comment:
        "Que produto incrível! Definitivamente o melhor pré-poo que já usei! Cabelo sempre protegido! 💕🌿",
      avatar: "/placeholder.svg",
    },
    {
      id: 12,
      name: "Amanda Textured",
      rating: 5.0,
      date: "28/06/2025",
      comment:
        "REVOLUCIONÁRIO! Meu cabelo nunca esteve tão saudável e protegido! Produto que transforma vidas! 💚⭐",
      avatar: "/placeholder.svg",
    },
    {
      id: 13,
      name: "Luciana Kinky",
      rating: 5.0,
      date: "26/06/2025",
      comment:
        "Esse pré-poo é VIDA! Proteção total, hidratação profunda e resultado duradouro! Amoooo! 😍🌱",
      avatar: "/placeholder.svg",
    },
    {
      id: 14,
      name: "Bianca Natural",
      rating: 5.0,
      date: "24/06/2025",
      comment:
        "PERFEIÇÃO em forma de produto! Cabelo natural sempre protegido e com movimento! Top absoluto! 🌿👑",
      avatar: "/placeholder.svg",
    },
  ],
  "e058834d-df41-4a8a-8473-0410c1333919": [
    {
      id: 1,
      name: "Loira Platinada",
      rating: 5.0,
      date: "25/07/2025",
      comment:
        "PURPLE SALVADOR! Meu loiro estava amarelado e agora está PERFEITO! Cor dos sonhos! 💜✨",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Marcos Grisalho",
      rating: 5.0,
      date: "21/07/2025",
      comment:
        "Cara, esse purple é TOP! Meus cabelos grisalhos estão lindos e sem amarelo! 👨‍🦳💜",
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Fernanda Blond",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "QUE PRODUTO INCRÍVEL! Loiro sempre perfeito e hidratado! Não vivo sem! 😍💜",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Carlos Silver",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "Excelente matizador! Cabelo grisalho com aquele tom prateado lindo! Recomendo! ✨",
      avatar: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Amanda Purple",
      rating: 5.0,
      date: "12/07/2025",
      comment:
        "APAIXONADA! Esse purple mantém meu loiro sempre no tom certo! TOP! 💜🔥",
      avatar: "/placeholder.svg",
    },
    {
      id: 6,
      name: "João Matizador",
      rating: 5.0,
      date: "09/07/2025",
      comment:
        "Produto sensacional! Uso 1x por semana e meu cabelo fica perfeito! 💪💜",
      avatar: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Bianca Blonde",
      rating: 5.0,
      date: "06/07/2025",
      comment:
        "Esse purple é VIDA! Loiro platinado sempre no tom perfeito! Amoooo! 😍✨",
      avatar: "/placeholder.svg",
    },
    {
      id: 8,
      name: "Rafael Gris",
      rating: 5.0,
      date: "03/07/2025",
      comment:
        "Melhor matizador que já usei! Cabelo grisalho lindo e hidratado! Top! ⭐💜",
      avatar: "/placeholder.svg",
    },
    {
      id: 9,
      name: "Camila Platina",
      rating: 5.0,
      date: "30/06/2025",
      comment:
        "TRANSFORMAÇÃO TOTAL! Purple que realmente funciona e hidrata! 💜🌟",
      avatar: "/placeholder.svg",
    },
    {
      id: 10,
      name: "Thiago Silver",
      rating: 5.0,
      date: "27/06/2025",
      comment:
        "Produto incrível! Assumindo o grisalho com orgulho graças a esse purple! 👑💜",
      avatar: "/placeholder.svg",
    },
    {
      id: 11,
      name: "Isabella Loira",
      rating: 5.0,
      date: "24/06/2025",
      comment:
        "Esse pré-poo purple é PERFEITO! Loiro sempre no tom e super hidratado! 💜✨",
      avatar: "/placeholder.svg",
    },
  ],
  "27a58bdc-844d-4606-8457-6b75b5cbd76f": [
    {
      id: 1,
      name: "Prof. Felipe Musculação - Educador Físico",
      rating: 5.0,
      date: "25/07/2025",
      comment:
        "WHEY SENSACIONAL! Sabor de baunilha incr��vel, dissolve super bem e os ganhos são visíveis! Melhor que já usei! 💪🔥",
      avatar:
        "https://images.pexels.com/photos/31152187/pexels-photo-31152187.png",
    },
    {
      id: 2,
      name: "Dra. Marcela Fitness - Personal Trainer",
      rating: 5.0,
      date: "23/07/2025",
      comment:
        "Apaixonada por esse whey! Sabor delicioso, não fica enjoativo e meus músculos estão definindo rapidinho! 😍💪",
      avatar:
        "https://images.pexels.com/photos/12496017/pexels-photo-12496017.jpeg",
    },
    {
      id: 3,
      name: "Prof. João Crossfit - Atleta Profissional",
      rating: 5.0,
      date: "21/07/2025",
      comment:
        "Cara, que whey top! Recuperação pós-treino muito mais rápida. Em 1 mês já vejo resultados incríveis! 🚀",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 4,
      name: "Dra. Aline Personal - Personal Trainer",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "Melhor whey que já experimentei! Como personal, recomendo para todos os meus alunos. Qualidade top! ⭐",
      avatar:
        "https://images.pexels.com/photos/12496017/pexels-photo-12496017.jpeg",
    },
    {
      id: 5,
      name: "Prof. Bruno Atleta - Bodybuilder Profissional",
      rating: 5.0,
      date: "16/07/2025",
      comment:
        "PERFEITO! Sabor incrível, dissolução total e resultados impressionantes. Compro sempre! 🏆💯",
      avatar:
        "https://images.pexels.com/photos/31152187/pexels-photo-31152187.png",
    },
    {
      id: 6,
      name: "Dra. Carla Academia - Nutricionista Esportiva",
      rating: 5.0,
      date: "14/07/2025",
      comment:
        "Que whey maravilhoso! Sem lactose, sabor delicioso e meus músculos adoram! Não troco por nada! 💕",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 7,
      name: "Prof. Ricardo Bodybuilder - Atleta IFBB",
      rating: 5.0,
      date: "11/07/2025",
      comment:
        "Produto excepcional! 25g de proteína pura, absorção rápida e ganhos consistentes. Top demais! 🥇",
      avatar:
        "https://images.pexels.com/photos/31152187/pexels-photo-31152187.png",
    },
    {
      id: 8,
      name: "Dra. Tatiane Nutri - Nutricionista Esportiva",
      rating: 5.0,
      date: "09/07/2025",
      comment:
        "Como nutricionista, aprovo totalmente! Composição excelente, sabor gostoso e resultados garantidos! 👩‍⚕️✅",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 9,
      name: "Prof. Leonardo Strong - Preparador Físico",
      rating: 5.0,
      date: "06/07/2025",
      comment:
        "WHEY DOS DEUSES! Transformou meu shape completamente. Massa magra aumentando a cada semana! 💪⚡",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 10,
      name: "Dra. Priscila Fit - Fisioterapeuta Esportiva",
      rating: 5.0,
      date: "04/07/2025",
      comment:
        "Simplesmente PERFEITO! Sabor delicioso, fácil digestão e resultados que falam por si só! Amoooo! 😍🔥",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
    {
      id: 11,
      name: "Prof. André Maromba - Personal Trainer",
      rating: 5.0,
      date: "01/07/2025",
      comment:
        "Melhor custo-benefício do mercado! Qualidade premium, sabor top e ganhos garantidos! Recomendo! 👌",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 12,
      name: "Dra. Juliana Runner - Atleta de Endurance",
      rating: 5.0,
      date: "29/06/2025",
      comment:
        "Uso pós-corrida e a recuperação é incrível! Sabor não enjoa e os benefícios são notáveis! Top! 🏃‍♀️💨",
      avatar:
        "https://images.pexels.com/photos/12496017/pexels-photo-12496017.jpeg",
    },
    {
      id: 13,
      name: "Prof. Victor Hipertrofia - Bodybuilder",
      rating: 5.0,
      date: "27/06/2025",
      comment:
        "DESTRUIDOR! Em 2 meses ganhei massa como nunca. Whey de qualidade superior! Viciado! 🔥�����",
      avatar:
        "https://images.pexels.com/photos/31152187/pexels-photo-31152187.png",
    },
    {
      id: 14,
      name: "Dra. Camila Wellness - Nutricionista",
      rating: 5.0,
      date: "25/06/2025",
      comment:
        "Produto incrível! Além dos ganhos, a saciedade é ótima. Ajuda muito na dieta também! 🌟💚",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 15,
      name: "Prof. Rodrigo Beast - Atleta NABBA",
      rating: 5.0,
      date: "23/06/2025",
      comment:
        "WHEY SENSACIONAL! Dissolve perfeitamente, sabor top e resultados que impressionam! Nota 1000! 🦍💯",
      avatar:
        "https://images.pexels.com/photos/31152187/pexels-photo-31152187.png",
    },
  ],
  "7f6952d3-5239-4f8c-a09c-ac486be9cd36": [
    {
      id: 1,
      name: "Prof. Tropical Gains - Atleta Fitness",
      rating: 5.0,
      date: "26/07/2025",
      comment:
        "PIÑA COLADA SENSACIONAL! Sabor tropical incrível que me leva ao paraíso! Melhor whey! 🏝️🥥",
      avatar:
        "https://images.pexels.com/photos/31152187/pexels-photo-31152187.png",
    },
    {
      id: 2,
      name: "Prof. Beach Body - Personal Trainer",
      rating: 5.0,
      date: "23/07/2025",
      comment:
        "Cara, esse sabor é VICIANTE! Sinto como se estivesse na praia a cada gole! Top! 🌴💪",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 3,
      name: "Dra. Island Fitness - Instrutora de Yoga",
      rating: 5.0,
      date: "20/07/2025",
      comment:
        "APAIXONADA! Sabor exótico que torna o pós-treino uma festa tropical! 😍🏝️",
      avatar:
        "https://images.pexels.com/photos/12496017/pexels-photo-12496017.jpeg",
    },
    {
      id: 4,
      name: "Prof. Coconut Power - Nutricionista Esportiva",
      rating: 5.0,
      date: "17/07/2025",
      comment:
        "Que whey incrível! Dissolve perfeito e o sabor é simplesmente divino! Recomendo! ⚡🥥",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 5,
      name: "Prof. Paradise Muscle - Bodybuilder",
      rating: 5.0,
      date: "14/07/2025",
      comment:
        "TRANSFORMAÇÃO TOTAL! Ganhos incríveis com sabor de férias! Melhor escolha! 🌺💪",
      avatar:
        "https://images.pexels.com/photos/31152187/pexels-photo-31152187.png",
    },
    {
      id: 6,
      name: "Dra. Tropical Vibes - Fisioterapeuta",
      rating: 5.0,
      date: "11/07/2025",
      comment:
        "Produto sensacional! Sabor que não enjoa e resultados que impressionam! Top! 🔥🏝️",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
    {
      id: 7,
      name: "Prof. Coco Gains - Atleta Fitness",
      rating: 5.0,
      date: "08/07/2025",
      comment:
        "Esse piña colada é VIDA! Qualidade premium com sabor paradisíaco! Amoooo! 😍✨",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 8,
      name: "Prof. Island Beast - Bodybuilder",
      rating: 5.0,
      date: "05/07/2025",
      comment:
        "WHEY DOS SONHOS! Sabor tropical que faz meu dia sempre melhor! 🌴🔥",
      avatar:
        "https://images.pexels.com/photos/31152187/pexels-photo-31152187.png",
    },
    {
      id: 9,
      name: "Prof. Beach Muscle - Atleta de Surfe",
      rating: 5.0,
      date: "02/07/2025",
      comment:
        "Cara, que produto incrível! Sinto-me nas Ilhas a cada dose! Viciado! 🏖️💪",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 10,
      name: "Dra. Pina Power - Nutricionista",
      rating: 5.0,
      date: "29/06/2025",
      comment:
        "SABOR SENSACIONAL! Melhor whey que já experimentei! Tropical e eficaz! 🥥⚡",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 11,
      name: "Prof. Coconut Fit - Personal Trainer",
      rating: 5.0,
      date: "26/06/2025",
      comment:
        "Produto excepcional! Sabor autêntico e ganhos garantidos! Top absoluto! 🌴��",
      avatar: "/placeholder.svg",
    },
    {
      id: 12,
      name: "Tropical Strong",
      rating: 5.0,
      date: "23/06/2025",
      comment:
        "Esse piña colada mudou minha vida! Prazer e performance em cada dose! 🏝️💯",
      avatar: "/placeholder.svg",
    },
    {
      id: 13,
      name: "Paradise Fit",
      rating: 5.0,
      date: "20/06/2025",
      comment:
        "APAIXONADA! Whey que me transporta para o paraíso tropical! Delicioso! 😍🌺",
      avatar: "/placeholder.svg",
    },
  ],
  "388e9408-ed3b-4176-ad61-a5c5db996df9": [
    {
      id: 1,
      name: "Marcela Santos",
      rating: 5.0,
      date: "20/07/2025",
      comment:
        "Chocolate belga de verdade! Esse whey é uma sobremesa deliciosa que me ajuda a bater metas de proteína. Sabor incrível! 🍫✨",
      avatar:
        "https://images.pexels.com/photos/27603433/pexels-photo-27603433.jpeg",
    },
    {
      id: 2,
      name: "Carlos Fitness",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "Melhor whey de chocolate que já experimentei! Dissolve super bem e o sabor é viciante. Recomendo demais! 💪",
      avatar:
        "https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg",
    },
    {
      id: 3,
      name: "Ana Paula",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "Esse sabor é surreal! Parece que estou tomando um milkshake gourmet. Qualidade premium da Extreme Gold! 🤤",
      avatar:
        "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg",
    },
  ],
  "3aa5f2b2-33ce-4149-b85c-0b57983aa96b": [
    {
      id: 1,
      name: "Juliana Moreira",
      rating: 5.0,
      date: "22/07/2025",
      comment:
        "Cookies and cream perfeito! Sabor autêntico que mata a vontade de doce. Meu whey favorito absoluto! 🍪💕",
      avatar:
        "https://images.pexels.com/photos/19987431/pexels-photo-19987431.jpeg",
    },
    {
      id: 2,
      name: "Rafael Silva",
      rating: 5.0,
      date: "19/07/2025",
      comment:
        "Texture cremosa, sabor marcante. Esse whey transformou meu pós-treino em um momento de prazer! Top! 🔥",
      avatar:
        "https://images.pexels.com/photos/2149780/pexels-photo-2149780.jpeg",
    },
    {
      id: 3,
      name: "Patrícia Lima",
      rating: 5.0,
      date: "16/07/2025",
      comment:
        "VICIADA nesse sabor! Parece biscoito Oreo batido. Qualidade excepcional, entrega rápida. Extreme Gold nota 10! ⭐",
      avatar:
        "https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg",
    },
  ],
  "8cf2651b-5c7f-48ae-ab16-4a4593a3d7ec": [
    {
      id: 1,
      name: "Bruno Atleta",
      rating: 5.0,
      date: "21/07/2025",
      comment:
        "Pré-treino sensacional! Energia limpa, foco total. Sabor maçã verde refrescante. Treinos nunca foram tão intensos! 🍏⚡",
      avatar:
        "https://images.pexels.com/photos/7752813/pexels-photo-7752813.jpeg",
    },
    {
      id: 2,
      name: "Camila Fitness",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "Pump incrível! Resistência aumentou muito. Sabor delicioso, sem amargor. Extreme Gold superou expectativas! 💪",
      avatar:
        "https://images.pexels.com/photos/14049004/pexels-photo-14049004.jpeg",
    },
    {
      id: 3,
      name: "Leonardo Costa",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "Melhor pré-treino do mercado! Focus e energia duradouros. Maçã verde é refrescante e gostoso. Recomendo! 🚀",
      avatar:
        "https://images.pexels.com/photos/20820147/pexels-photo-20820147.jpeg",
    },
  ],
  "ac97df69-ca97-4084-9fb3-4e8adb7ec17a": [
    {
      id: 1,
      name: "Fernanda Oliveira",
      rating: 5.0,
      date: "23/07/2025",
      comment:
        "Pré-treino de uva é uma delícia! Energia explosiva sem crash. Treinos mais longos e intensos. Extreme Gold é vida! 🍇💜",
      avatar:
        "https://images.pexels.com/photos/33203514/pexels-photo-33203514.jpeg",
    },
    {
      id: 2,
      name: "Rodrigo Menezes",
      rating: 5.0,
      date: "20/07/2025",
      comment:
        "Sabor uva autêntico! Performance aumentou drasticamente. Foco laser durante toda sessão. Produto premium! 🏋️‍♂️",
      avatar:
        "https://images.pexels.com/photos/27603433/pexels-photo-27603433.jpeg",
    },
    {
      id: 3,
      name: "Carla Pereira",
      rating: 5.0,
      date: "17/07/2025",
      comment:
        "Esse pré-treino é mágico! Disposição extra, treinos mais produtivos. Sabor uva é viciante. Extreme Gold sempre! ✨",
      avatar:
        "https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg",
    },
  ],
  "51f732a9-d9df-47f0-ada5-db01eb41573f": [
    {
      id: 1,
      name: "Marina Santos",
      rating: 5.0,
      date: "22/07/2025",
      comment:
        "Pós-treino perfeito! Recuperação muito mais rápida. Sabor uva é delicioso. Músculos agradecem! 🍇💪",
      avatar:
        "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg",
    },
    {
      id: 2,
      name: "Thiago Barbosa",
      rating: 5.0,
      date: "19/07/2025",
      comment:
        "Recuperação muscular acelerada! Dores pós-treino diminuíram muito. Sabor excelente. Extreme Gold é qualidade! 🔥",
      avatar:
        "https://images.pexels.com/photos/19987431/pexels-photo-19987431.jpeg",
    },
    {
      id: 3,
      name: "Luciana Rocha",
      rating: 5.0,
      date: "16/07/2025",
      comment:
        "Mudou minha recuperação! Menos fadiga, mais disposição no dia seguinte. Sabor uva é maravilhoso! Recomendo! 🌟",
      avatar:
        "https://images.pexels.com/photos/2149780/pexels-photo-2149780.jpeg",
    },
  ],
  "04092da6-9bb7-4a15-83b9-33768205356b": [
    {
      id: 1,
      name: "Gabriel Alves",
      rating: 5.0,
      date: "21/07/2025",
      comment:
        "Pós-treino top! Maçã verde é refrescante e gostoso. Recuperação muscular notável. Extreme Gold entrega! 🍏💚",
      avatar:
        "https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg",
    },
    {
      id: 2,
      name: "Vanessa Silva",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "Amo esse sabor! Recuperação mais rápida, menos fadiga. Qualidade premium que faz diferença nos resultados! ⭐",
      avatar:
        "https://images.pexels.com/photos/7752813/pexels-photo-7752813.jpeg",
    },
    {
      id: 3,
      name: "Diego Santos",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "Excelente pós-treino! Sabor refrescante, recuperação acelerada. Extreme Gold sempre surpreendendo! 🚀",
      avatar:
        "https://images.pexels.com/photos/14049004/pexels-photo-14049004.jpeg",
    },
  ],
  "c146c5d8-030b-41a9-91c5-89a6a172b78b": [
    {
      id: 1,
      name: "Amanda Costa",
      rating: 5.0,
      date: "23/07/2025",
      comment:
        "Creatina que funciona de verdade! Força e resistência aumentaram absurdamente. Extreme Gold é confiança! 💪🔥",
      avatar:
        "https://images.pexels.com/photos/20820147/pexels-photo-20820147.jpeg",
    },
    {
      id: 2,
      name: "Felipe Rodrigues",
      rating: 5.0,
      date: "20/07/2025",
      comment:
        "Melhor creatina do mercado! Ganhos visíveis, força explosiva. Dissolve perfeitamente. Produto premium! ⚡",
      avatar:
        "https://images.pexels.com/photos/33203514/pexels-photo-33203514.jpeg",
    },
    {
      id: 3,
      name: "Beatriz Lima",
      rating: 5.0,
      date: "17/07/2025",
      comment:
        "Resultados surpreendentes! Performance nos treinos melhorou muito. Creatina de alta qualidade. Extreme Gold! 🌟",
      avatar:
        "https://images.pexels.com/photos/27603433/pexels-photo-27603433.jpeg",
    },
  ],
  "11cfa05f-9ee1-4988-b9de-b19ead9bb2bd": [
    {
      id: 1,
      name: "Ricardo Mendes",
      rating: 5.0,
      date: "22/07/2025",
      comment:
        "Termogênico potente! Queima gordura eficiente, energia duradoura. Definição muscular melhorou muito! 🔥💪",
      avatar:
        "https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg",
    },
    {
      id: 2,
      name: "Cláudia Ferreira",
      rating: 5.0,
      date: "19/07/2025",
      comment:
        "Acelera metabolismo real! Perdi medidas rapidamente. Energia o dia todo sem ansiedade. Extreme Gold! ✨",
      avatar:
        "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg",
    },
    {
      id: 3,
      name: "Eduardo Silva",
      rating: 5.0,
      date: "16/07/2025",
      comment:
        "Termogênico que funciona! Definição apareceu rápido. Sem efeitos colaterais. Qualidade Extreme Gold! 🚀",
      avatar:
        "https://images.pexels.com/photos/19987431/pexels-photo-19987431.jpeg",
    },
  ],
  "1abe77b5-777b-435d-ae33-522e5e1c3503": [
    {
      id: 1,
      name: "Priscila Gomes",
      rating: 5.0,
      date: "21/07/2025",
      comment:
        "Adoçante natural incrível! Zero açúcar, sabor doce perfeito. Saúde em primeiro lugar. Extreme Gold cuidando! 🍃����",
      avatar:
        "https://images.pexels.com/photos/2149780/pexels-photo-2149780.jpeg",
    },
    {
      id: 2,
      name: "Marcelo Carvalho",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "Substituto de açúcar perfeito! Sem residual amargo, dissolve bem. Vida saudável com sabor! Recomendo! ⭐",
      avatar:
        "https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg",
    },
    {
      id: 3,
      name: "Helena Martins",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "Produto revolucionário! Doçura natural sem culpa. Extreme Gold pensando na nossa saúde. Excelente! 🌟",
      avatar:
        "https://images.pexels.com/photos/7752813/pexels-photo-7752813.jpeg",
    },
  ],
  "6f252684-45bf-47d5-b4bd-c596d4bc1030": [
    {
      id: 1,
      name: "Isabela Nunes",
      rating: 5.0,
      date: "23/07/2025",
      comment:
        "Ômega 3 de alta pureza! Articulações melhoraram, pele mais bonita. Saúde cardiovascular em dia! 🐟💙",
      avatar:
        "https://images.pexels.com/photos/14049004/pexels-photo-14049004.jpeg",
    },
    {
      id: 2,
      name: "Paulo Roberto",
      rating: 5.0,
      date: "20/07/2025",
      comment:
        "Concentração melhorou muito! Inflamação diminuiu. Ômega 3 de qualidade farmacêutica. Extreme Gold! 🧠",
      avatar:
        "https://images.pexels.com/photos/20820147/pexels-photo-20820147.jpeg",
    },
    {
      id: 3,
      name: "Roberta Dias",
      rating: 5.0,
      date: "17/07/2025",
      comment:
        "Suplemento essencial! Benefícios notáveis para saúde geral. Pureza e qualidade Extreme Gold sempre! ���",
      avatar:
        "https://images.pexels.com/photos/33203514/pexels-photo-33203514.jpeg",
    },
  ],
  "85c88f31-d24a-4ced-8b30-966ea519fb15": [
    {
      id: 1,
      name: "Luana Pereira",
      rating: 5.0,
      date: "22/07/2025",
      comment:
        "Sono reparador garantido! Relaxamento natural, acordo descansada. Extreme Gold cuidando do meu descanso! 😴💤",
      avatar:
        "https://images.pexels.com/photos/27603433/pexels-photo-27603433.jpeg",
    },
    {
      id: 2,
      name: "André Sousa",
      rating: 5.0,
      date: "19/07/2025",
      comment:
        "Qualidade de sono melhorou drasticamente! Recuperação muscular noturna perfeita. Produto excepcional! 🌙",
      avatar:
        "https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg",
    },
    {
      id: 3,
      name: "Cristina Almeida",
      rating: 5.0,
      date: "16/07/2025",
      comment:
        "Sonos profundos e reparadores! Menos insônia, mais disposição. Extreme Gold entende de bem-estar! ��",
      avatar:
        "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg",
    },
  ],
  "0982c3e2-222f-4224-8bb1-d434bc61130d": [
    {
      id: 1,
      name: "Giovanna Ribeiro",
      rating: 5.0,
      date: "21/07/2025",
      comment:
        "Shampoo e condicionador incríveis! Cabelo macio, brilhante e saudável. Gold Spell sempre surpreendendo! ✨💕",
      avatar:
        "https://images.pexels.com/photos/19987431/pexels-photo-19987431.jpeg",
    },
    {
      id: 2,
      name: "Vinicius Santos",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "Dupla perfeita! Limpeza profunda, hidratação intensa. Cabelo transformado desde primeira lavagem! 🚀",
      avatar:
        "https://images.pexels.com/photos/2149780/pexels-photo-2149780.jpeg",
    },
    {
      id: 3,
      name: "Sofia Moura",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "Fórmula poderosa mesmo! Cabelo mais forte, menos queda. Gold Spell é sinônimo de qualidade! 💪🧡",
      avatar:
        "https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg",
    },
  ],
  "df9e1da0-d41f-4f31-a20d-6ed1ea133d64": [
    {
      id: 1,
      name: "Larissa Campos",
      rating: 5.0,
      date: "23/07/2025",
      comment:
        "Reparador milagroso! Pontas ressecadas ficaram sedosas. Produto concentrado que vale cada centavo! 🌟💇‍♀️",
      avatar:
        "https://images.pexels.com/photos/7752813/pexels-photo-7752813.jpeg",
    },
    {
      id: 2,
      name: "Gustavo Lima",
      rating: 5.0,
      date: "20/07/2025",
      comment:
        "Até eu uso! Cabelo mais maleável e brilhante. Reparação intensa e eficaz. Gold Spell entende de cabelo! ⭐",
      avatar:
        "https://images.pexels.com/photos/14049004/pexels-photo-14049004.jpeg",
    },
    {
      id: 3,
      name: "Natália Rocha",
      rating: 5.0,
      date: "17/07/2025",
      comment:
        "Transformação real! Cabelo danificado reviveu. Fórmula poderosa de reconstrução. Gold Spell é vida! 🔥",
      avatar:
        "https://images.pexels.com/photos/20820147/pexels-photo-20820147.jpeg",
    },
  ],
  "04151fb6-c19e-4b12-8808-095cdfc15b01": [
    {
      id: 1,
      name: "Dra. Carla Mendoza - Tricologista",
      rating: 5.0,
      date: "28/07/2025",
      comment:
        "O Sérum Poderoso é INCRÍVEL! Transformou completamente a textura dos meus cabelos. Em 3 semanas já vejo resultados fantásticos! ✨",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Rafael Oliveira - Dermatologista",
      rating: 5.0,
      date: "25/07/2025",
      comment:
        "Como profissional da área, posso afirmar: este sérum é revolucionário! Cabelos mais fortes, brilhosos e com crescimento acelerado. 💪",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Beatriz Santos - Cosmetóloga",
      rating: 5.0,
      date: "22/07/2025",
      comment:
        "Meu cabelo estava muito danificado e o Sérum Poderoso me devolveu a confiança! Resultado surpreendente em tempo recorde! 🌟",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. Miguel Torres - Químico",
      rating: 5.0,
      date: "20/07/2025",
      comment:
        "Fórmula excepcional! A tecnologia por trás deste sérum é impressionante. Recomendo para todos os meus pacientes! 🧬",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Juliana Costa - Farmacêutica",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "APAIXONADA por este produto! Cabelo com muito mais volume, brilho e força. É o meu sérum favorito da vida! 💖",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "67a738d6-bfca-41b1-8955-bbd7809aecf1": [
    {
      id: 1,
      name: "Dra. Amanda Silva - Tricologista",
      rating: 5.0,
      date: "27/07/2025",
      comment:
        "A Mask Poderosa Intensiva é SENSACIONAL! Meu cabelo nunca esteve tão hidratado e forte. Mudança radical! 😍✨",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Leonardo Fernandes - Dermatologista",
      rating: 5.0,
      date: "24/07/2025",
      comment:
        "Produto excepcional! Como especialista, aprovo totalmente. Reconstrução capilar impressionante em poucas aplicações! 💯",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Fernanda Lima - Esteticista",
      rating: 5.0,
      date: "21/07/2025",
      comment:
        "Que máscara PODEROSA! Cabelo sedoso, brilhante e muito mais forte. Resultado profissional em casa! 🌟",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. Carlos Ribeiro - Bioquímico",
      rating: 5.0,
      date: "19/07/2025",
      comment:
        "Fórmula cientificamente perfeita! Ativos de alta performance que realmente funcionam. Recomendo com certeza! 🔬",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Priscila Rocha - Cosmetóloga",
      rating: 5.0,
      date: "16/07/2025",
      comment:
        "Melhor máscara que já usei na vida! Cabelo transformado, hidratado e com aquele brilho natural incrível! 💕",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "a53ac962-9182-4670-90a4-10d5f3e07d0d": [
    {
      id: 1,
      name: "Dra. Roberta Gomes - Tricologista",
      rating: 5.0,
      date: "26/07/2025",
      comment:
        "O Pré-Poo Poderoso é INCRÍVEL! Prepara o cabelo perfeitamente para a lavagem. Resultado profissional garantido! ⭐",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Thiago Mendes - Dermatologista",
      rating: 5.0,
      date: "23/07/2025",
      comment:
        "Produto revolucionário! Como especialista, fico impressionado com os resultados. Cabelo protegido e nutrido! 🚀",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Camila Torres - Farmacêutica",
      rating: 5.0,
      date: "21/07/2025",
      comment:
        "AMEI demais! Meu cabelo fica protegido desde a primeira aplicação. É meu pré-poo favorito da vida! 💖",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. André Silva - Químico Industrial",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "Formulação excepcional! Tecnologia avançada que protege e nutre profundamente. Recomendo para todos! 🧪",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Larissa Pereira - Cosmetóloga",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "Que produto MARAVILHOSO! Cabelo fica preparado, protegido e muito mais saudável. Não vivo mais sem! ✨",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "6628797d-f547-4da2-8988-cdd85bd41ca4": [
    {
      id: 1,
      name: "Dra. Vanessa Oliveira - Dermatologista",
      rating: 5.0,
      date: "25/07/2025",
      comment:
        "O Hidratante Corporal Poderosa Goold é FANTÁSTICO! Pele sedosa e perfumada o dia todo. Qualidade premium! ✨💕",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Felipe Santos - Cirurgião Plástico",
      rating: 5.0,
      date: "22/07/2025",
      comment:
        "Produto excepcional! Hidratação profunda e fragrância sofisticada. Recomendo para todas as minhas pacientes! 🌟",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Natália Costa - Esteticista",
      rating: 5.0,
      date: "20/07/2025",
      comment:
        "APAIXONADA por este hidratante! Pele macia, hidratada e com aquele perfume delicioso. Melhor investimento! 💖",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. Ricardo Lima - Químico Cosmético",
      rating: 5.0,
      date: "17/07/2025",
      comment:
        "Fórmula extraordinária! Combinação perfeita de hidratação e fragrância. Tecnologia de ponta em cosméticos! 🧬",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Bianca Ferreira - Farmacêutica",
      rating: 5.0,
      date: "14/07/2025",
      comment:
        "Que produto INCRÍVEL! Pele nutrida, perfumada e com toque aveludado. É o meu hidratante favorito! ⭐",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "3aaff7f4-0e2b-4682-abde-8d1a8213b55b": [
    {
      id: 1,
      name: "Dra. Cristina Barbosa - Tricologista",
      rating: 5.0,
      date: "24/07/2025",
      comment:
        "O Shampoo e Condicionador Babosa e Azeite é PERFEITO! Cabelo hidratado, brilhoso e muito mais forte! 🌿✨",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Gustavo Reis - Dermatologista",
      rating: 5.0,
      date: "21/07/2025",
      comment:
        "Combinação perfeita de ingredientes naturais! Como especialista, aprovo totalmente. Resultados excepcionais! 🌟",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Patrícia Nunes - Cosmetóloga",
      rating: 5.0,
      date: "19/07/2025",
      comment:
        "AMEI este duo! Cabelo com nutrição profunda e brilho natural. Ingredientes naturais que realmente funcionam! 💚",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. João Carlos - Fitoterapeuta",
      rating: 5.0,
      date: "16/07/2025",
      comment:
        "Poder da natureza em ação! Babosa e azeite de primeira qualidade. Fórmula natural excepcional! 🌱",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Monica Silva - Farmacêutica",
      rating: 5.0,
      date: "13/07/2025",
      comment:
        "Que dupla MARAVILHOSA! Cabelo sedoso, hidratado e com aquele brilho saudável. Não troco por nada! 💕",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "8768eed5-e007-4763-aa1a-72befe2b2ec6": [
    {
      id: 1,
      name: "Dra. Letícia Alves - Tricologista",
      rating: 5.0,
      date: "23/07/2025",
      comment:
        "O Shampoo e Condicionador Soneca é INCRÍVEL! Cabelo relaxado e perfeitamente hidratado. Efeito calmante único! 😌✨",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Henrique Costa - Dermatologista",
      rating: 5.0,
      date: "20/07/2025",
      comment:
        "Produto inovador! Além de cuidar dos cabelos, proporciona relaxamento. Conceito revolucionário! 🌙",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Renata Sousa - Aromaterapeuta",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "APAIXONADA por este duo! Fragrância relaxante e resultados incríveis nos cabelos. Rotina noturna perfeita! 💤",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. Daniel Moreira - Químico",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "Fórmula genial! Combina cuidado capilar com aromaterapia. Tecnologia inovadora que realmente funciona! 🧪",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Tatiana Ribeiro - Cosmetóloga",
      rating: 5.0,
      date: "12/07/2025",
      comment:
        "Que dupla SENSACIONAL! Cabelo lindo e ainda me sinto relaxada. É o meu ritual noturno favorito! 🌟",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "7bbb9559-c189-44bc-8eb5-76f7850c5f19": [
    {
      id: 1,
      name: "Dra. Isabela Martins - Tricologista",
      rating: 5.0,
      date: "22/07/2025",
      comment:
        "A Mask Efeito Soneca é REVOLUCIONÁRIA! Hidratação profunda e relaxamento garantido. Inovação pura! 😍🌙",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Marcelo Dias - Dermatologista",
      rating: 5.0,
      date: "19/07/2025",
      comment:
        "Produto excepcional! Combina tratamento capilar intensivo com aromaterapia. Resultados profissionais! ⭐",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Luciana Campos - Aromaterapeuta",
      rating: 5.0,
      date: "17/07/2025",
      comment:
        "AMEI demais esta máscara! Cabelo nutrido e mente relaxada. Experiência sensorial única e transformadora! 💆‍♀️",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. Alberto Santos - Químico Cosmético",
      rating: 5.0,
      date: "14/07/2025",
      comment:
        "Formulação brilhante! Ativos relaxantes + nutrição capilar. Tecnologia avançada em uma só máscara! 🧬",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Adriana Lopes - Cosmetóloga",
      rating: 5.0,
      date: "11/07/2025",
      comment:
        "Que máscara INCRÍVEL! Cabelo sedoso e ainda me sinto zen. É o meu momento de relaxamento favorito! ✨",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "2e5cac21-c691-4280-aa21-5778c6494eaa": [
    {
      id: 1,
      name: "Dra. Melissa Torres - Tricologista",
      rating: 5.0,
      date: "21/07/2025",
      comment:
        "O Smell Efeito Soneca é PERFEITO! Fragrância relaxante que dura o dia todo. Finalizador dos sonhos! 🌸✨",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Paulo Mendes - Aromaterapeuta",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "Produto único! Combina cuidado capilar com aromaterapia relaxante. Inova��ão que transforma a rotina! 🌙",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Carolina Vieira - Cosmetóloga",
      rating: 5.0,
      date: "16/07/2025",
      comment:
        "APAIXONADA por este finalizador! Cabelo perfumado e com aquele brilho especial. Fragrância viciante! 💕",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. Roberto Alves - Perfumista",
      rating: 5.0,
      date: "13/07/2025",
      comment:
        "Fragrância sofisticada e relaxante! Como especialista, aprovo a qualidade olfativa excepcional! 👃",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Silvia Rocha - Farmacêutica",
      rating: 5.0,
      date: "10/07/2025",
      comment:
        "Que finalizador MARAVILHOSO! Cabelo com movimento e perfume delicioso. É o meu segredo de beleza! 🌟",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "4375cdf5-beea-445a-9816-c08aac3a1717": [
    {
      id: 1,
      name: "Dra. Viviane Castro - Tricologista",
      rating: 5.0,
      date: "20/07/2025",
      comment:
        "O Ilumirepair Efeito Soneca é INCRÍVEL! Repara e ilumina como nenhum outro. Resultado profissional! ✨🌙",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Eduardo Silva - Dermatologista",
      rating: 5.0,
      date: "17/07/2025",
      comment:
        "Produto revolucionário! Tecnologia de reparação + relaxamento. Como especialista, fico impressionado! 💯",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Bruna Oliveira - Cosmetóloga",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "AMEI este reparador! Cabelo com brilho intenso e ainda me relaxa. Dupla função que realmente funciona! 💎",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. Marcio Ferreira - Químico",
      rating: 5.0,
      date: "12/07/2025",
      comment:
        "Fórmula excepcional! Ativos reparadores + essências relaxantes. Ciência e bem-estar em perfeita harmonia! 🧪",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Raquel Santos - Farmacêutica",
      rating: 5.0,
      date: "09/07/2025",
      comment:
        "Que produto SENSACIONAL! Cabelo reparado, iluminado e ainda me sinto zen. É pura magia! 🌟",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "f60bf51e-7ee2-4236-830f-4cc433d9ca2d": [
    {
      id: 1,
      name: "Dra. Claudia Pinto - Tricologista",
      rating: 5.0,
      date: "19/07/2025",
      comment:
        "O Pré-Poo Efeito Soneca é FANTÁSTICO! Prepara e relaxa ao mesmo tempo. Inovação que transformou minha rotina! 😌✨",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Alexandre Costa - Dermatologista",
      rating: 5.0,
      date: "16/07/2025",
      comment:
        "Produto genial! Proteção capilar + aromaterapia relaxante. Como especialista, recomendo fortemente! 🌙",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Alessandra Lima - Aromaterapeuta",
      rating: 5.0,
      date: "14/07/2025",
      comment:
        "APAIXONADA por este pré-poo! Cabelo protegido e mente relaxada. Experiência multissensorial única! 💆‍♀️",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. Wagner Dias - Químico Cosmético",
      rating: 5.0,
      date: "11/07/2025",
      comment:
        "Formulação brilhante! Combina proteção capilar com bem-estar. Tecnologia inovadora em cosméticos! 🧬",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Simone Ribeiro - Cosmetóloga",
      rating: 5.0,
      date: "08/07/2025",
      comment:
        "Que pré-poo INCRÍVEL! Cabelo preparado e ainda me sinto relaxada. É o início perfeito da minha rotina! 🌟",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "b955d503-1401-4afc-91fd-97303e9d3d0a": [
    {
      id: 1,
      name: "Dra. Daniela Freitas - Tricologista",
      rating: 5.0,
      date: "18/07/2025",
      comment:
        "A Mask Babosa & Azeite é SENSACIONAL! Hidratação profunda com ingredientes naturais. Resultado profissional! 🌿✨",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Fernando Gomes - Dermatologista",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "Combinação perfeita da natureza! Como especialista, aprovo a qualidade dos ingredientes naturais! 🌱",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Gabriela Torres - Fitoterapeuta",
      rating: 5.0,
      date: "13/07/2025",
      comment:
        "AMEI esta máscara natural! Babosa e azeite de primeira qualidade. Cabelo nutrido e brilhante! 💚",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. Luiz Oliveira - Farmacognosista",
      rating: 5.0,
      date: "10/07/2025",
      comment:
        "Poder dos extratos naturais! Formulação com ativos de alta qualidade. Ciência natural aplicada! 🧪🌿",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Mariana Alves - Cosmetóloga",
      rating: 5.0,
      date: "07/07/2025",
      comment:
        "Que máscara MARAVILHOSA! Cabelo sedoso, hidratado e com brilho natural. Natureza pura em ação! 🌟",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "60a1c424-1632-45a0-9622-f2f972bc7ecb": [
    {
      id: 1,
      name: "Dra. Lívia Carvalho - Tricologista",
      rating: 5.0,
      date: "17/07/2025",
      comment:
        "O Reparador Babosa & Azeite é PERFEITO! Repara e nutre com ingredientes naturais. Resultado instantâneo! 🌿⚡",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Bruno Costa - Dermatologista",
      rating: 5.0,
      date: "14/07/2025",
      comment:
        "Reparação natural excepcional! Como especialista, fico impressionado com a eficácia dos ativos naturais! 💯",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Fernanda Rocha - Fitocosmetóloga",
      rating: 5.0,
      date: "12/07/2025",
      comment:
        "APAIXONADA por este reparador! Babosa e azeite premium reparando profundamente. Natureza curativa! 💚",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. Otávio Silva - Químico Natural",
      rating: 5.0,
      date: "09/07/2025",
      comment:
        "Concentração perfeita de ativos! Formulação natural de alta performance. Ciência verde aplicada! 🧪🌱",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Julia Mendes - Cosmetóloga",
      rating: 5.0,
      date: "06/07/2025",
      comment:
        "Que reparador INCRÍVEL! Cabelo danificado voltou à vida. Poder da natureza em suas mãos! ✨",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "e3edff97-a082-43f0-9e29-bd487053a4db": [
    {
      id: 1,
      name: "Dra. Camila Andrade - Tricologista",
      rating: 5.0,
      date: "16/07/2025",
      comment:
        "O Pré-Poo Babosa & Azeite é EXTRAORDINÁRIO! Preparação natural que protege e nutre profundamente! 🌿🛡️",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Diego Ferreira - Dermatologista",
      rating: 5.0,
      date: "13/07/2025",
      comment:
        "Proteção natural excepcional! Como especialista, recomendo pela qualidade dos ingredientes naturais! 🌟",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Roberta Lima - Aromaterapeuta",
      rating: 5.0,
      date: "11/07/2025",
      comment:
        "AMEI este pré-poo natural! Babosa e azeite criando uma barreira protetora perfeita. Natureza inteligente! 💚",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. Cláudio Santos - Fitocosmético",
      rating: 5.0,
      date: "08/07/2025",
      comment:
        "Formulação natural magistral! Sinergia perfeita entre babosa e azeite. Biotecnologia verde! 🧬🌿",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Vanessa Dias - Cosmetóloga",
      rating: 5.0,
      date: "05/07/2025",
      comment:
        "Que pré-poo SENSACIONAL! Cabelo preparado e protegido naturalmente. É o meu ritual de cuidado favorito! ✨",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "6deb4f6f-a7bf-4733-a90f-292180a91ebe": [
    {
      id: 1,
      name: "Dra. Andréa Soares - Tricologista",
      rating: 5.0,
      date: "15/07/2025",
      comment:
        "O Smell Babosa e Azeite é PERFEITO! Fragrância natural que dura o dia todo. Finalizador dos sonhos! 🌸🌿",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Rodrigo Pereira - Aromaterapeuta",
      rating: 5.0,
      date: "12/07/2025",
      comment:
        "Fragrância natural excepcional! Como especialista em aromas, aprovo a qualidade olfativa natural! 👃🌱",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Michelle Torres - Cosmetóloga",
      rating: 5.0,
      date: "10/07/2025",
      comment:
        "APAIXONADA por este finalizador natural! Cabelo perfumado com essência natural única. Aroma viciante! 💚",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. Antônio Ribeiro - Perfumista Natural",
      rating: 5.0,
      date: "07/07/2025",
      comment:
        "Composição olfativa natural brilhante! Babosa e azeite criando fragrância sofisticada. Arte natural! 🎨🌿",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Eliana Castro - Farmacêutica",
      rating: 5.0,
      date: "04/07/2025",
      comment:
        "Que finalizador MARAVILHOSO! Cabelo com movimento e perfume natural delicioso. Natureza em sua essência! 🌟",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
  "54e6508f-4a4c-4041-bd3a-b7f71667222d": [
    {
      id: 1,
      name: "Dra. Luciana Barros - Dermatologista",
      rating: 5.0,
      date: "14/07/2025",
      comment:
        "O Babosa Goold Hidratante Corporal é SENSACIONAL! Pele sedosa e perfumada com ingredientes naturais! 🌿✨",
      avatar:
        "https://images.pexels.com/photos/25205116/pexels-photo-25205116.jpeg",
    },
    {
      id: 2,
      name: "Dr. Leandro Oliveira - Cirurgião Plástico",
      rating: 5.0,
      date: "11/07/2025",
      comment:
        "Hidratação natural premium! Como especialista, recomendo pela qualidade dos ingredientes naturais! 🌟",
      avatar:
        "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    },
    {
      id: 3,
      name: "Dra. Cristiane Santos - Esteticista",
      rating: 5.0,
      date: "09/07/2025",
      comment:
        "APAIXONADA por este hidratante natural! Pele macia, hidratada e com aquele perfume delicioso da babosa! 💚",
      avatar:
        "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    },
    {
      id: 4,
      name: "Prof. Marcos Lima - Fitocosmético",
      rating: 5.0,
      date: "06/07/2025",
      comment:
        "Formulação natural excepcional! Babosa de alta qualidade hidratando profundamente. Natureza em ação! 🧪🌿",
      avatar:
        "https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg",
    },
    {
      id: 5,
      name: "Dra. Renata Vieira - Farmacêutica",
      rating: 5.0,
      date: "03/07/2025",
      comment:
        "Que hidratante INCRÍVEL! Pele nutrida, perfumada e com toque aveludado natural. É puro bem-estar! ⭐",
      avatar:
        "https://images.pexels.com/photos/16160869/pexels-photo-16160869.jpeg",
    },
  ],
};

const decodedProducts = products.map((product) => ({
  ...product,
  image: decodeFirebaseUrl(product.image),
}));

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const product = decodedProducts.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(0);
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const { addToCart, updateQuantity, cartItems } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!product) {
    return (
      <main className="h-dvh">
        <Header />
        <div className="h-[90px] lg:h-[120px]"></div>
        <div className="h-[calc(100%-90px)] overflow-auto px-3 lg:h-[calc(100%-120px)] xl:px-0">
          <div className="mx-auto h-full w-full max-w-[1200px] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">
                Produto não encontrado
              </h1>
              <Link to="/" className="text-primarycolor underline">
                Voltar para a página inicial
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const cartItem = cartItems.find((item) => item.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;
  const isFavorited = isFavorite(product.id);

  // Get related products (products from the same category, excluding current product)
  const relatedProducts = decodedProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 2);

  // Get reviews for current product
  const currentProductReviews = productReviews[product.id] || [];

  const incrementQuantity = () => {
    if (currentQuantity === 0) {
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
      });
    } else {
      updateQuantity(product.id, currentQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (currentQuantity > 0) {
      updateQuantity(product.id, currentQuantity - 1);
    }
  };

  const handleBuyClick = () => {
    incrementQuantity();
  };

  const handleFavoriteClick = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      rating: product.rating,
      category: product.category,
    });
  };

  const handleRelatedProductBuy = (relatedProduct: typeof product) => {
    addToCart({
      id: relatedProduct.id,
      name: relatedProduct.name,
      brand: relatedProduct.brand,
      price: relatedProduct.price,
      image: relatedProduct.image,
    });
  };

  const stars = Array.from({ length: 5 }, (_, i) => (
    <svg
      key={i}
      role="img"
      aria-label="Estrela"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      fill="none"
      viewBox="0 0 33 31"
      className="text-primarycolor"
    >
      <path
        fill="currentColor"
        d="M17.105.602a1.08 1.08 0 0 0-1.936 0L10.767 9.52.924 10.95a1.08 1.08 0 0 0-.598 1.841l7.122 6.943-1.681 9.803a1.08 1.08 0 0 0 1.566 1.138l8.804-4.628 8.804 4.628a1.08 1.08 0 0 0 1.566-1.138l-1.681-9.803 7.122-6.943a1.08 1.08 0 0 0-.598-1.84L21.507 9.52 17.105.6Z"
      />
    </svg>
  ));

  return (
    <main className="h-dvh">
      <div className="fixed top-0 right-0 left-0 z-10 flex justify-center bg-white px-0 pt-0 lg:px-4 lg:pt-[30px]">
        <Header />
      </div>

      <div className="h-[90px] lg:h-[120px]"></div>

      <section className="h-[calc(100%-163px)] overflow-y-auto px-3 pt-4 lg:h-[calc(100%-120px)] lg:py-10 xl:px-0">
        <div className="pb-5 lg:pb-0">
          <div className="mx-auto flex h-full max-w-[1200px] flex-col gap-8 lg:flex-row xl:gap-16">
            {/* Left Side - Product Image */}
            <div className="relative flex w-full flex-col gap-6 lg:w-[41.51%]">
              <Link
                className="dynamic-gradient absolute top-[20px] left-[20px] z-10 flex h-[43px] w-[43px] items-center justify-center rounded-full p-1 text-white"
                aria-label="Go back"
                to="/"
              >
                <svg
                  role="img"
                  aria-label="Seta indicando retorno"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-[27px]"
                >
                  <path
                    fill="currentColor"
                    d="m30.9 43 3.1-3.1L18.1 24 34 8.1 30.9 5 12 24z"
                  />
                </svg>
              </Link>

              <button
                title="Favoritar produto"
                className="absolute flex justify-end rounded-full text-white bg-black top-[20px] right-[20px] z-50"
                aria-label="Add to favorites"
                onClick={handleFavoriteClick}
              >
                <svg
                  role="img"
                  aria-label="Coração"
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isFavorited ? "currentColor" : "none"}
                  viewBox="0 0 31 31"
                  className="w-[43px]"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="1.5"
                    d="M15.465 21.608c-.255.09-.675.09-.93 0-2.175-.743-7.035-3.84-7.035-9.09 0-2.318 1.867-4.193 4.17-4.193 1.365 0 2.573.66 3.33 1.68a4.15 4.15 0 0 1 3.33-1.68c2.303 0 4.17 1.875 4.17 4.193 0 5.25-4.86 8.347-7.035 9.09"
                  />
                </svg>
              </button>

              <div className="relative flex aspect-square h-full w-full flex-col max-h-[480px] items-center overflow-hidden rounded-lg border isolate">
                <OptimizedImage
                  alt={`${product.name} 1`}
                  decoding="async"
                  className="opacity-100 object-scale-down transition-opacity duration-300 select-none absolute inset-0 w-full h-full"
                  src={product.image}
                  loading="eager"
                />
              </div>

              <div className="flex flex-col gap-3">
                <ul
                  className="hidden w-full cursor-grab flex-row gap-2 overflow-x-hidden overflow-y-hidden lg:flex"
                  role="tablist"
                >
                  <li role="presentation">
                    <button
                      name="Ver imagem 1"
                      className="border-primarycolor border-2 h-[110px] w-[100px] flex-shrink-0 cursor-pointer rounded-lg border p-1"
                      role="tab"
                      aria-selected="true"
                      aria-label="View image 1"
                    >
                      <OptimizedImage
                        alt="Product image 1"
                        loading="lazy"
                        width={100}
                        height={110}
                        decoding="async"
                        className="h-full w-full object-scale-down"
                        src={product.image}
                      />
                    </button>
                  </li>
                </ul>

                <ul className="flex justify-center gap-3" role="tablist">
                  <li role="presentation">
                    <button
                      name="Exibir imagem 1"
                      className="flex h-full"
                      role="tab"
                      aria-selected="true"
                      aria-label="Exibir imagem 1"
                    >
                      <span className="h-[10px] w-[10px] rounded-full bg-primarycolor"></span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Product Info & Reviews */}
            <div className="flex flex-col gap-4 lg:w-[calc(58.49%-32px)] xl:w-[calc(58.49%-64px)]">
              {/* Product Info Section */}
              <section className="relative overflow-y-auto rounded-lg bg-white lg:h-[300px] lg:min-h-[300px] border px-4 py-3 lg:pb-0">
                <div className="flex flex-col lg:max-h-[calc(100%-85px)]">
                  <div className="flex-shrink-0 pb-1">
                    <div className="flex items-start justify-between">
                      <h1 className="truncate-text mr-4 w-fit text-base font-bold sm:text-lg md:text-xl lg:text-2xl">
                        {product.name}
                      </h1>
                      <div className="hidden lg:block">
                        <div className="flex items-center gap-2 select-none">
                          <button
                            aria-label="Substrair"
                            title="Subtrair"
                            className="rounded-full border bg-white flex justify-center items-center w-[38px] h-[38px]"
                            onClick={decrementQuantity}
                          >
                            <svg
                              role="img"
                              aria-label="sinal de subtraç��o"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 34 34"
                              className="w-[30px]"
                            >
                              <path
                                stroke="currentColor"
                                d="M8.5 17h17"
                                strokeWidth="2.5"
                              />
                            </svg>
                          </button>
                          <p className="w-6 text-center font-semibold">
                            {currentQuantity}
                          </p>
                          <button
                            title="Adicionar"
                            aria-label="Adicionar"
                            className="rounded-full border bg-white flex justify-center items-center w-[38px] h-[38px]"
                            onClick={incrementQuantity}
                          >
                            <svg
                              role="img"
                              aria-label="ícone de adição"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 34 34"
                              className="w-[30px]"
                            >
                              <path
                                stroke="currentColor"
                                d="M8.5 17h17M17 25.5v-17"
                                strokeWidth="2.5"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="py-2 text-lg font-semibold select-none">
                      R$&nbsp;{product.price.toFixed(2).replace(".", ",")}
                    </p>
                    <button
                      aria-label="Ver avaliações do produto"
                      title="Ver avalia��ões do produto"
                      role="button"
                      className="flex items-center gap-2 lg:cursor-default"
                    >
                      <p className="text-xs font-semibold">{product.rating}</p>
                      <p className="text-primarycolor text-xs">
                        {product.reviewCount} reviews
                      </p>
                      <span className="flex gap-1">{stars}</span>
                    </button>
                  </div>

                  <div className="flex flex-grow flex-wrap gap-1 overflow-y-auto py-2">
                    <input
                      id="text-clamp"
                      className="peer hidden"
                      type="checkbox"
                      checked={isTextExpanded}
                      onChange={() => setIsTextExpanded(!isTextExpanded)}
                    />
                    <p
                      className={`font-regular text-grey-7 text-justify text-xs sm:text-base ${isTextExpanded ? "" : "line-clamp-2"} peer-checked:line-clamp-none`}
                    >
                      {product.description}
                    </p>
                    <label
                      htmlFor="text-clamp"
                      className={`cursor-pointer text-xs font-semibold ${isTextExpanded ? "hidden" : ""} peer-checked:hidden`}
                      onClick={() => setIsTextExpanded(true)}
                    >
                      <span>Ver mais</span>
                    </label>
                    <label
                      htmlFor="text-clamp"
                      className={`cursor-pointer text-xs font-semibold ${isTextExpanded ? "block" : "hidden"} peer-checked:block`}
                      onClick={() => setIsTextExpanded(false)}
                    >
                      <span>Ver menos</span>
                    </label>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 hidden w-full p-3 lg:block">
                  <div className="bg-border mb-3 h-[1px] w-full"></div>
                  <button
                    aria-label="Comprar"
                    title="Comprar"
                    role="button"
                    type="button"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg p-2 dynamic-gradient"
                    onClick={handleBuyClick}
                  >
                    <svg
                      role="img"
                      aria-label="Carrinho de compras"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-[25px]"
                    >
                      <path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                        d="M2 2h1.74c1.08 0 1.93.93 1.84 2l-.83 9.96a2.796 2.796 0 0 0 2.79 3.03h10.65c1.44 0 2.7-1.18 2.81-2.61l.54-7.5c.12-1.66-1.14-3.01-2.81-3.01H5.82M16.25 22a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5m-8 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5M9 8h12"
                      />
                    </svg>
                    <p className="max-w-[calc(100%-28px)] text-sm font-medium text-white">
                      Comprar | R$&nbsp;
                      {product.price.toFixed(2).replace(".", ",")}
                    </p>
                  </button>
                </div>

                <div className="fixed bottom-0 left-0 flex w-full items-center gap-4 shadow-top border-t bg-white px-4 py-3 lg:hidden">
                  <div className="lg:hidden">
                    <div className="flex items-center gap-2 select-none">
                      <button
                        aria-label="Substrair"
                        title="Subtrair"
                        className="rounded-full border bg-white flex justify-center items-center w-[38px] h-[38px]"
                        onClick={decrementQuantity}
                      >
                        <svg
                          role="img"
                          aria-label="sinal de subtração"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 34 34"
                          className="w-[30px]"
                        >
                          <path
                            stroke="currentColor"
                            d="M8.5 17h17"
                            strokeWidth="2.5"
                          />
                        </svg>
                      </button>
                      <p className="w-6 text-center font-semibold">
                        {currentQuantity}
                      </p>
                      <button
                        title="Adicionar"
                        aria-label="Adicionar"
                        className="rounded-full border bg-white flex justify-center items-center w-[38px] h-[38px]"
                        onClick={incrementQuantity}
                      >
                        <svg
                          role="img"
                          aria-label="ícone de adiç��o"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 34 34"
                          className="w-[30px]"
                        >
                          <path
                            stroke="currentColor"
                            d="M8.5 17h17M17 25.5v-17"
                            strokeWidth="2.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    aria-label="Comprar"
                    title="Comprar"
                    role="button"
                    type="button"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg p-2 dynamic-gradient"
                    onClick={handleBuyClick}
                  >
                    <svg
                      role="img"
                      aria-label="Carrinho de compras"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-[25px]"
                    >
                      <path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                        d="M2 2h1.74c1.08 0 1.93.93 1.84 2l-.83 9.96a2.796 2.796 0 0 0 2.79 3.03h10.65c1.44 0 2.7-1.18 2.81-2.61l.54-7.5c.12-1.66-1.14-3.01-2.81-3.01H5.82M16.25 22a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5m-8 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5M9 8h12"
                      />
                    </svg>
                    <p className="max-w-[calc(100%-28px)] text-sm font-medium text-white">
                      Comprar | R$&nbsp;
                      {product.price.toFixed(2).replace(".", ",")}
                    </p>
                  </button>
                </div>
              </section>

              {/* Buy Together Section */}
              {relatedProducts.length > 0 && (
                <section className="border rounded-lg overflow-hidden my-4">
                  <header className="flex lg:flex-row items-center justify-start gap-2 dynamic-gradient p-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 40 40"
                      className="text-white"
                    >
                      <path
                        fill="currentColor"
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
                    <p className="font-semibold lg:text-base text-white">
                      Aproveite e compre junto
                    </p>
                  </header>
                  <ul className="px-[25px] py-[23px] mb-2 flex flex-col md:flex-row gap-6 md:gap-10 overflow-x-auto">
                    {relatedProducts.map((relatedProduct) => (
                      <li
                        key={relatedProduct.id}
                        className="flex-shrink-0 md:pl-5 bg-green-0 first:border-l-0 md:border-l-1"
                      >
                        <Link
                          className="cursor-pointer w-full"
                          to={`/product/${relatedProduct.id}`}
                        >
                          <div className="flex gap-6">
                            <div className="relative block overflow-hidden h-[140px] w-[80px] lg:h-[140px] lg:w-[120px] flex-shrink-0">
                              <OptimizedImage
                                alt={relatedProduct.name}
                                loading="lazy"
                                decoding="async"
                                className="object-contain object-center select-none absolute inset-0 w-full h-full"
                                src={relatedProduct.image}
                              />
                            </div>
                            <div className="flex-1 flex flex-col justify-between max-w-[320px]">
                              <div>
                                <h3 className="font-semibold text-black lg:text-[16px] leading-tight text-wrap lg:truncate mb-[5px]">
                                  {relatedProduct.name}
                                </h3>
                                <p className="text-[#A4AAAD] text-[12px] lg:text-[14px] font-normal mb-[5px]">
                                  {relatedProduct.category}
                                </p>
                                <div className="flex items-center gap-3 mb-[15px] justify-between">
                                  <div className="flex gap-2 items-center h-[32px] min-h-[32px]">
                                    <p className="text-black lg:text-[16px] font-semibold">
                                      R$&nbsp;
                                      {relatedProduct.price
                                        .toFixed(2)
                                        .replace(".", ",")}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <svg
                                      role="img"
                                      aria-label="Estrela"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 33 31"
                                      className="w-4 h-4 text-primarycolor"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M17.105.602a1.08 1.08 0 0 0-1.936 0L10.767 9.52.924 10.95a1.08 1.08 0 0 0-.598 1.841l7.122 6.943-1.681 9.803a1.08 1.08 0 0 0 1.566 1.138l8.804-4.628 8.804 4.628a1.08 1.08 0 0 0 1.566-1.138l-1.681-9.803 7.122-6.943a1.08 1.08 0 0 0-.598-1.84L21.507 9.52 17.105.6Z"
                                      />
                                    </svg>
                                    <span className="text-sm font-medium">
                                      {relatedProduct.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="relative z-10">
                                <button
                                  aria-label="Comprar"
                                  title="Comprar"
                                  role="button"
                                  type="button"
                                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg p-2 dynamic-gradient"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRelatedProductBuy(relatedProduct);
                                  }}
                                >
                                  <svg
                                    role="img"
                                    aria-label="Carrinho de compras"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="w-[25px]"
                                  >
                                    <path
                                      stroke="#fff"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeMiterlimit="10"
                                      strokeWidth="1.5"
                                      d="M2 2h1.74c1.08 0 1.93.93 1.84 2l-.83 9.96a2.796 2.796 0 0 0 2.79 3.03h10.65c1.44 0 2.7-1.18 2.81-2.61l.54-7.5c.12-1.66-1.14-3.01-2.81-3.01H5.82M16.25 22a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5m-8 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5M9 8h12"
                                    />
                                  </svg>
                                  <p className="max-w-[calc(100%-28px)] text-sm font-medium text-white">
                                    Adicionar no carrinho
                                  </p>
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Reviews Section */}
              <section className="h-[285px] min-h-[285px] rounded-lg border md:h-[320px] lg:h-[285px]">
                <header className="flex w-full items-center justify-between border-b px-3 py-2 sm:px-4">
                  <div className="flex flex-col gap-1">
                    <div>
                      <p className="text-base font-medium">
                        {currentProductReviews.length} reviews
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-medium">{product.rating}</p>
                      <span className="flex items-center justify-center gap-[2px]">
                        {Array.from({ length: 5 }, (_, i) => (
                          <svg
                            key={i}
                            role="img"
                            aria-label="Estrela"
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            fill="none"
                            viewBox="0 0 33 31"
                            className="text-primarycolor"
                          >
                            <path
                              fill="currentColor"
                              d="M17.105.602a1.08 1.08 0 0 0-1.936 0L10.767 9.52.924 10.95a1.08 1.08 0 0 0-.598 1.841l7.122 6.943-1.681 9.803a1.08 1.08 0 0 0 1.566 1.138l8.804-4.628 8.804 4.628a1.08 1.08 0 0 0 1.566-1.138l-1.681-9.803 7.122-6.943a1.08 1.08 0 0 0-.598-1.84L21.507 9.52 17.105.6Z"
                            />
                          </svg>
                        ))}
                      </span>
                    </div>
                  </div>
                  <button
                    title="Fazer uma avaliação do produto"
                    aria-label="Fazer uma avaliação do produto"
                    type="button"
                    className="dynamic-gradient flex items-center gap-2 rounded-lg border-none px-3 py-2"
                  >
                    <svg
                      role="img"
                      aria-label="Caneta escrevendo algo"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 15"
                      className="w-[20px]"
                    >
                      <path
                        stroke="#FEFEFE"
                        d="M7.682 1.743H5.346c-1.922 0-3.127 1.361-3.127 3.287v5.196c0 1.927 1.2 3.287 3.127 3.287h5.515c1.928 0 3.127-1.36 3.127-3.287V7.71m-4.01-4.832 2.854 2.854M6.017 6.826l4.67-4.67a1.49 1.49 0 0 1 2.108 0l.76.76a1.49 1.49 0 0 1 0 2.107L8.862 9.716c-.254.254-.6.397-.96.397h-2.34l.058-2.362c.01-.348.15-.679.397-.925Z"
                      />
                    </svg>
                    <p className="text-sm font-semibold text-white">
                      Fazer review
                    </p>
                  </button>
                </header>

                <div className="h-[calc(100%-61px)] overflow-auto px-2 sm:px-3">
                  {currentProductReviews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <p className="text-muted-foreground mb-2">
                        Nenhuma avaliação ainda
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Seja o primeiro a avaliar este produto!
                      </p>
                    </div>
                  ) : (
                    <ul>
                      {currentProductReviews.map((review) => (
                        <li
                          key={review.id}
                          className="border-b pt-2.5 pb-3 last:mb-3 last:border-b-0"
                        >
                          <div className="flex items-center justify-between pb-1">
                            <div className="flex items-center gap-2">
                              <img
                                alt="imagem"
                                loading="lazy"
                                width="40"
                                height="40"
                                decoding="async"
                                src={review.avatar}
                                className="rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                              />
                              <div className="flex flex-col">
                                <p className="text-xs font-medium sm:text-sm">
                                  {review.name}
                                </p>
                                <div className="text-grey-6 flex flex-row items-center gap-1">
                                  <svg
                                    role="img"
                                    aria-label="Relógio"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 15 15"
                                    className="w-3 h-3 sm:w-[15px] sm:h-[15px]"
                                  >
                                    <path
                                      stroke="#8F959E"
                                      d="M7.5 13.125a5.625 5.625 0 1 0 0-11.25 5.625 5.625 0 0 0 0 11.25"
                                    />
                                    <path
                                      stroke="#8F959E"
                                      d="M7.5 4.375V7.5l1.25 1.875"
                                    />
                                  </svg>
                                  <p className="text-xs text-muted-foreground">
                                    {review.date}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <p className="space-x-1">
                                <span className="text-xs font-medium sm:text-sm">
                                  {review.rating}
                                </span>
                                <span className="text-grey-6 text-xs hidden sm:inline">
                                  Nota
                                </span>
                              </p>
                              <div className="flex gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <svg
                                    key={i}
                                    role="img"
                                    aria-label="Estrela"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    fill="none"
                                    viewBox="0 0 33 31"
                                    className="text-primarycolor"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M17.105.602a1.08 1.08 0 0 0-1.936 0L10.767 9.52.924 10.95a1.08 1.08 0 0 0-.598 1.841l7.122 6.943-1.681 9.803a1.08 1.08 0 0 0 1.566 1.138l8.804-4.628 8.804 4.628a1.08 1.08 0 0 0 1.566-1.138l-1.681-9.803 7.122-6.943a1.08 1.08 0 0 0-.598-1.84L21.507 9.52 17.105.6Z"
                                    />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          {review.comment && (
                            <div>
                              <p className="text-justify text-xs leading-relaxed sm:text-sm mt-2">
                                {review.comment}
                              </p>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
