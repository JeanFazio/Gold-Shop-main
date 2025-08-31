import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBrand } from "../contexts/BrandContext";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { OptimizedImage } from "./OptimizedImage";

const products = [
  {
    id: "3977478a-1219-4c4c-8281-911ab867590e",
    name: "Tônico Poderoso - 250ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosméticos",
    price: 137.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F3977478a-1219-4c4c-8281-911ab867590e%252Ff4e6ed89-d774-48f0-bfa9-c30734fd1055%3Falt%3Dmedia%26token%3D2fe392df-18da-4821-a984-4aaba6d246ba",
    quantity: 0,
  },
  {
    id: "84b4246e-851b-41e2-ac59-717ba8d544e8",
    name: "Receitinha Poderosa - 250ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosméticos",
    price: 137.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F84b4246e-851b-41e2-ac59-717ba8d544e8%252Ff9cb94c2-9bbb-4835-9f9f-5cb1e1a7186c%3Falt%3Dmedia%26token%3D901622d3-00a1-4d35-aa86-9c7e12f17b74",
    quantity: 2,
  },
  {
    id: "d363175e-dd91-474a-ba72-fb7a131e5e8d",
    name: "Caseirinho Capilar de Açai - 250ml",
    category: "HIDRATANTE CAPILAR",
    brand: "Everk Cosméticos",
    price: 107.97,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fd363175e-dd91-474a-ba72-fb7a131e5e8d%252F984bae79-9584-4dc8-afbd-a0f01621062a%3Falt%3Dmedia%26token%3Dee5f9f1f-7053-4f68-84cc-528cd984ade2",
    quantity: 0,
  },
  {
    id: "ae9a3164-7b89-44dd-ab7c-33c5002dc87d",
    name: "Caseirinho Capilar de Mel - 250ml",
    category: "HIDRATANTE CAPILAR",
    brand: "Everk Cosméticos",
    price: 107.97,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fae9a3164-7b89-44dd-ab7c-33c5002dc87d%252Fc2e6b778-5004-49f4-bc5e-ede2461e9834%3Falt%3Dmedia%26token%3D0db798c4-4ff7-468b-a5ef-712ffde8173d",
    quantity: 0,
  },
  {
    id: "16ac7fe6-9e31-4a64-bf17-2c0563642c69",
    name: "Caseirinho Capilar de Ricino - 250ml",
    category: "HIDRATANTE CAPILAR",
    brand: "Everk Cosméticos",
    price: 107.97,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F16ac7fe6-9e31-4a64-bf17-2c0563642c69%252Fac9a92d0-3f99-464c-98c6-6614fc7481ff%3Falt%3Dmedia%26token%3D61078261-5f33-45d7-bc34-a4c72fe915f2",
    quantity: 0,
  },
  {
    id: "b492cf02-2a31-4e30-ab0d-3d532c5d5a94",
    name: "Everkapsula - 500mg",
    category: "MÁSCARAS EVERK",
    brand: "Everk Cosméticos",
    price: 97.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fb492cf02-2a31-4e30-ab0d-3d532c5d5a94%252F14f82d86-b189-4cdf-a8e1-2b7bc75a4c93%3Falt%3Dmedia%26token%3De950bb21-4f28-4315-bc39-171ab33e7f4e",
    quantity: 0,
  },
  {
    id: "a36aa7fe-8271-4894-82de-9cd1ede80129",
    name: "Pré-Poo Green - 500ml",
    category: "MÁSCARAS EVERK",
    brand: "Everk Cosméticos",
    price: 97.9,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fa36aa7fe-8271-4894-82de-9cd1ede80129%252F424c0f43-f68b-471c-b7b4-4206512aadae%3Falt%3Dmedia%26token%3Da847353b-fec2-4882-a98b-8c813d3e58fe",
    quantity: 0,
  },
  {
    id: "e058834d-df41-4a8a-8473-0410c1333919",
    name: "Pré-Poo Purple - 500ml",
    category: "MÁSCARAS EVERK",
    brand: "Everk Cosméticos",
    price: 97.9,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fe058834d-df41-4a8a-8473-0410c1333919%252Ff6933a0f-8762-462e-a669-c79311781a24%3Falt%3Dmedia%26token%3De8c1aea4-8192-42f1-b3fb-fa75f8526697",
    quantity: 0,
  },
  {
    id: "27a58bdc-844d-4606-8457-6b75b5cbd76f",
    name: "Nosso WHEY - Baunilha",
    category: "WHEY PROTEIN",
    brand: "Extreme Gold",
    price: 239.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F27a58bdc-844d-4606-8457-6b75b5cbd76f%252Fc7513dc1-8413-40e8-ab02-27d9dfeb9ceb%3Falt%3Dmedia%26token%3Da304c323-a642-41d6-b4d4-b1ab2256729b",
    quantity: 0,
  },
  {
    id: "7f6952d3-5239-4f8c-a09c-ac486be9cd36",
    name: "Nosso WHEY - Piñacolada",
    category: "WHEY PROTEIN",
    brand: "Extreme Gold",
    price: 239.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F7f6952d3-5239-4f8c-a09c-ac486be9cd36%252F14dd56a0-22c1-479a-82df-4bcafdfb938d%3Falt%3Dmedia%26token%3D9155b96e-063a-4dc2-8859-7622a84bbdbe",
    quantity: 0,
  },
  {
    id: "388e9408-ed3b-4176-ad61-a5c5db996df9",
    name: "Nosso WHEY – Chocolate Belga",
    category: "WHEY PROTEIN",
    brand: "Extreme Gold",
    price: 239.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F388e9408-ed3b-4176-ad61-a5c5db996df9%252F547d4a0b-93ab-49b6-9ac6-b278210c1c0d%3Falt%3Dmedia%26token%3D63574178-50d3-460a-9fae-3c54691369e3",
    quantity: 0,
  },
  {
    id: "3aa5f2b2-33ce-4149-b85c-0b57983aa96b",
    name: "Nosso WHEY – Cookies and Cream",
    category: "WHEY PROTEIN",
    brand: "Extreme Gold",
    price: 239.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F3aa5f2b2-33ce-4149-b85c-0b57983aa96b%252F67b0dd21-813e-469a-a96a-0f91f0f833e3%3Falt%3Dmedia%26token%3D5c5f7eec-cb11-4d34-9355-25645270d872",
    quantity: 0,
  },
  {
    id: "8cf2651b-5c7f-48ae-ab16-4a4593a3d7ec",
    name: "Pré-Treino Extreme Gold – Maçã Verde",
    category: "PRÉ-TREINO",
    brand: "Extreme Gold",
    price: 199.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F8cf2651b-5c7f-48ae-ab16-4a4593a3d7ec%252F2a4cf12a-a41d-4db3-a698-cf6a1675bfe3%3Falt%3Dmedia%26token%3Dded2ce22-bdb2-40f9-b5ce-797fbcd24650",
    quantity: 0,
  },
  {
    id: "ac97df69-ca97-4084-9fb3-4e8adb7ec17a",
    name: "Pré-Treino Extreme Gold – Uva",
    category: "PRÉ-TREINO",
    brand: "Extreme Gold",
    price: 199.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fac97df69-ca97-4084-9fb3-4e8adb7ec17a%252F1c660d91-44c3-4142-90a6-7cbc24af438e%3Falt%3Dmedia%26token%3D49743249-b8fc-483a-8ae4-e56fa9f4a6bf",
    quantity: 0,
  },
  {
    id: "51f732a9-d9df-47f0-ada5-db01eb41573f",
    name: "Pós-Treinão Extreme Gold - Uva",
    category: "PÓS-TREINO",
    brand: "Extreme Gold",
    price: 199.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F51f732a9-d9df-47f0-ada5-db01eb41573f%252F0c912acc-3de3-4500-aadc-4abc3c1b5204%3Falt%3Dmedia%26token%3D96d15d3d-85dd-4e35-a525-88b14703df6c",
    quantity: 0,
  },
  {
    id: "04092da6-9bb7-4a15-83b9-33768205356b",
    name: "Pós-Treinão Extreme Gold - Maça Verde",
    category: "PÓS-TREINO",
    brand: "Extreme Gold",
    price: 199.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F04092da6-9bb7-4a15-83b9-33768205356b%252Fef987398-b25a-4222-a5be-164c9adcd93c%3Falt%3Dmedia%26token%3Deb1b4f30-05a7-4b95-9391-533d43739ca8",
    quantity: 0,
  },
  {
    id: "c146c5d8-030b-41a9-91c5-89a6a172b78b",
    name: "Creatina Poderosa – Extreme Gold",
    category: "CREATINA",
    brand: "Extreme Gold",
    price: 199.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fc146c5d8-030b-41a9-91c5-89a6a172b78b%252Fce5647aa-9dfc-4ce1-91d1-67d096ee7cc1%3Falt%3Dmedia%26token%3D79bb4c81-a1bb-4958-a66c-7b08e78714fc",
    quantity: 0,
  },
  {
    id: "11cfa05f-9ee1-4988-b9de-b19ead9bb2bd",
    name: "Termogênico",
    category: "CAPSULAS",
    brand: "Extreme Gold",
    price: 77.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F11cfa05f-9ee1-4988-b9de-b19ead9bb2bd%252F739927aa-77a9-434f-ba4a-385d63aa34ff%3Falt%3Dmedia%26token%3D2cc5badd-b68d-44c2-9446-79d4a17ea851",
    quantity: 0,
  },
  {
    id: "1abe77b5-777b-435d-ae33-522e5e1c3503",
    name: "Sem Docin – Extreme Gold",
    category: "CAPSULAS",
    brand: "Extreme Gold",
    price: 99.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F1abe77b5-777b-435d-ae33-522e5e1c3503%252F6ced313d-181d-47f3-9622-3d1c41dc7f7e%3Falt%3Dmedia%26token%3Db0893c54-9a0d-4e9f-a4ee-52601a64eecd",
    quantity: 0,
  },
  {
    id: "6f252684-45bf-47d5-b4bd-c596d4bc1030",
    name: "Ômega 3 – Extreme Gold",
    category: "CAPSULAS",
    brand: "Extreme Gold",
    price: 129.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F6f252684-45bf-47d5-b4bd-c596d4bc1030%252F73583e0e-ab7b-46d5-bb9d-4025574db03d%3Falt%3Dmedia%26token%3D7e7e0580-f6cf-44da-9d09-d162687e4fe0",
    quantity: 0,
  },
  {
    id: "85c88f31-d24a-4ced-8b30-966ea519fb15",
    name: "Pré-Soneca – Extreme Gold",
    category: "CAPSULAS",
    brand: "Extreme Gold",
    price: 79.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F85c88f31-d24a-4ced-8b30-966ea519fb15%252Fdae3d7b7-4fff-4d19-baa5-2fea2cbab071%3Falt%3Dmedia%26token%3D94b73250-d7df-4dda-9917-535dbce49379",
    quantity: 0,
  },
  {
    id: "3aaff7f4-0e2b-4682-abde-8d1a8213b55b",
    name: "Shampoo e Condicionador Babosa e Azeite - 250ml",
    category: "SHAMPOO E CONDICIONADOR",
    brand: "Gold Spell Cosméticos",
    price: 87.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F3aaff7f4-0e2b-4682-abde-8d1a8213b55b%252F664f5809-43d1-47d8-8236-f22d1c74b147%3Falt%3Dmedia%26token%3D4c565507-8b5e-4090-865d-186e152485dd",
    quantity: 0,
  },
  {
    id: "0982c3e2-222f-4224-8bb1-d434bc61130d",
    name: "Shampoo e Condicionador Poderoso - 250ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosméticos",
    price: 137.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F0982c3e2-222f-4224-8bb1-d434bc61130d%252Fe9c516ea-4a02-4ec6-bc28-b8877f9e1118%3Falt%3Dmedia%26token%3D9c7d3e24-aff5-44d0-a781-f2c302c5e4f0",
    quantity: 0,
  },
  {
    id: "df9e1da0-d41f-4f31-a20d-6ed1ea133d64",
    name: "Reparador Poderoso - 60ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosméticos",
    price: 56.9,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fdf9e1da0-d41f-4f31-a20d-6ed1ea133d64%252F73ee973f-8159-483c-af48-2a542b9ea298%3Falt%3Dmedia%26token%3D4447b372-8cb1-471f-b7ea-e7e09e18af9e",
    quantity: 0,
  },
  {
    id: "04151fb6-c19e-4b12-8808-095cdfc15b01",
    name: "Sérum Poderoso - 120ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosméticos",
    price: 127.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F04151fb6-c19e-4b12-8808-095cdfc15b01%252F4687e274-9a44-4cc8-946f-ae312b0799fe%3Falt%3Dmedia%26token%3Df6007b0e-db00-4153-863f-2c88564b1d41",
    quantity: 0,
  },
  {
    id: "67a738d6-bfca-41b1-8955-bbd7809aecf1",
    name: "Mask Poderosa Intensiva - 250ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosméticos",
    price: 127.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F67a738d6-bfca-41b1-8955-bbd7809aecf1%252F47e7f59f-29c3-46f8-b223-c84685743470%3Falt%3Dmedia%26token%3Dc65048ad-56e0-479c-b921-6a6abc8b759b",
    quantity: 0,
  },
  {
    id: "a53ac962-9182-4670-90a4-10d5f3e07d0d",
    name: "Pré-Poo Poderoso - 500ml",
    category: "LINHA PODEROSA",
    brand: "Gold Spell Cosméticos",
    price: 127.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fa53ac962-9182-4670-90a4-10d5f3e07d0d%252F3b48c228-a456-4140-9613-a57f9cf8b1cc%3Falt%3Dmedia%26token%3Dd626dee9-17b0-4882-b6a5-d9e8bbd18afc",
    quantity: 0,
  },
  {
    id: "6628797d-f547-4da2-8988-cdd85bd41ca4",
    name: "Poderosa Goold - Hidratante Corporal e Fragrance Mist - 250ml",
    category: "LINHA CORPORAL",
    brand: "Gold Spell Cosméticos",
    price: 137.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F6628797d-f547-4da2-8988-cdd85bd41ca4%252Fd8724b88-1d1d-46e9-b840-979f1dccf1b0%3Falt%3Dmedia%26token%3Dfeac3b67-7158-45a1-b4d1-377e17c09da3",
    quantity: 0,
  },
  {
    id: "8768eed5-e007-4763-aa1a-72befe2b2ec6",
    name: "Shampoo e Condicionador Soneca - 250ml",
    category: "SHAMPOO E CONDICIONADOR",
    brand: "Gold Spell Cosméticos",
    price: 97.0,
    rating: 4.7,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F8768eed5-e007-4763-aa1a-72befe2b2ec6%252Fe34d1034-dc4a-4a47-b182-11782cbe2a94%3Falt%3Dmedia%26token%3D70ce5dda-0460-4267-bb34-4d8402867ba1",
    quantity: 0,
  },
  {
    id: "7bbb9559-c189-44bc-8eb5-76f7850c5f19",
    name: "Mask Efeito Soneca - 250ml",
    category: "MÁSCARAS",
    brand: "Gold Spell Cosméticos",
    price: 97.99,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F7bbb9559-c189-44bc-8eb5-76f7850c5f19%252Fe173e70a-3f67-4fc2-bb8f-25db3ee864e9%3Falt%3Dmedia%26token%3D13545034-cd3d-4c89-99fb-87d07b38c002",
    quantity: 0,
  },
  {
    id: "2e5cac21-c691-4280-aa21-5778c6494eaa",
    name: "Smell Efeito Soneca - 120ml",
    category: "FINALIZADORES",
    brand: "Gold Spell Cosméticos",
    price: 97.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F2e5cac21-c691-4280-aa21-5778c6494eaa%252Febfac557-c1de-461f-957b-ab68c90a39cf%3Falt%3Dmedia%26token%3D78ca76b8-05ba-4b28-b6f7-e0354eb44ab0",
    quantity: 0,
  },
  {
    id: "4375cdf5-beea-445a-9816-c08aac3a1717",
    name: "Ilumirepair Efeito Soneca - 60ml",
    category: "FINALIZADORES",
    brand: "Gold Spell Cosméticos",
    price: 57.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F4375cdf5-beea-445a-9816-c08aac3a1717%252F0d50b29d-ce83-433f-a76a-c6580f2bbfaa%3Falt%3Dmedia%26token%3D836323a9-d65e-448a-8573-6d0aab565e79",
    quantity: 0,
  },
  {
    id: "f60bf51e-7ee2-4236-830f-4cc433d9ca2d",
    name: "Pré-Poo Efeito Soneca - 500ml",
    category: "MÁSCARAS",
    brand: "Gold Spell Cosméticos",
    price: 117.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Ff60bf51e-7ee2-4236-830f-4cc433d9ca2d%252Fc8e7e915-9ee4-43fb-8583-04aa86d34ecb%3Falt%3Dmedia%26token%3Db9c6d618-6327-430f-af06-e5307f09f2d1",
    quantity: 0,
  },
  {
    id: "b955d503-1401-4afc-91fd-97303e9d3d0a",
    name: "Mask Babosa & Azeite de Oliva - 250ml",
    category: "MÁSCARAS",
    brand: "Gold Spell Cosméticos",
    price: 67.99,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fb955d503-1401-4afc-91fd-97303e9d3d0a%252F1d383313-9897-4695-a387-9014ee593903%3Falt%3Dmedia%26token%3Df6345b17-482b-47db-88d6-4a868cebb376",
    quantity: 0,
  },
  {
    id: "60a1c424-1632-45a0-9622-f2f972bc7ecb",
    name: "Reparador Babosa & Azeite - 60ml",
    category: "FINALIZADORES",
    brand: "Gold Spell Cosméticos",
    price: 56.9,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F60a1c424-1632-45a0-9622-f2f972bc7ecb%252Fbf3da096-7b99-4bca-a567-73653efcc5dd%3Falt%3Dmedia%26token%3D6d671bec-6d86-433f-9637-0da3f5f8b5d1",
    quantity: 0,
  },
  {
    id: "e3edff97-a082-43f0-9e29-bd487053a4db",
    name: "Pré-Poo Babosa & Azeite de Oliva - 500ml",
    category: "MÁSCARAS",
    brand: "Gold Spell Cosméticos",
    price: 117.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252Fe3edff97-a082-43f0-9e29-bd487053a4db%252F2163a148-46ba-46fb-8681-5796abeec0af%3Falt%3Dmedia%26token%3Dd119f3bc-1c04-4c3c-b8a5-60e5858f05dd",
    quantity: 0,
  },
  {
    id: "6deb4f6f-a7bf-4733-a90f-292180a91ebe",
    name: "Smell Babosa e Azeite de Oliva - 120ml",
    category: "FINALIZADORES",
    brand: "Gold Spell Cosméticos",
    price: 97.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F6deb4f6f-a7bf-4733-a90f-292180a91ebe%252Ff94243c5-f8c2-4300-88d3-341125ebac1b%3Falt%3Dmedia%26token%3D436186df-43af-4423-8bf9-c9eb1a7ded2e",
    quantity: 0,
  },
  {
    id: "54e6508f-4a4c-4041-bd3a-b7f71667222d",
    name: "Babosa Goold - Hidratante Corporal e Fragrance Mist",
    category: "LINHA CORPORAL",
    brand: "Gold Spell Cosméticos",
    price: 159.0,
    rating: 5.0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/products%252F54e6508f-4a4c-4041-bd3a-b7f71667222d%252F7f8fe756-51a2-42e7-a6b7-7ed98a2dcd3f%3Falt%3Dmedia%26token%3Dcf044095-c542-4006-9ff3-c8f1c9504c7f",
    quantity: 0,
  },
];

// Use products directly - OptimizedImage will handle URL decoding
const decodedProducts = products;

function ProductCard({ product }: { product: (typeof decodedProducts)[0] }) {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFavorited = isFavorite(product.id);

  // Get quantity from cart
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const incrementQuantity = () => {
    if (quantity === 0) {
      // Add new item to cart
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
      });
    } else {
      // Update existing item quantity
      updateQuantity(product.id, quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <li className="relative w-full flex flex-col h-full pb-2">
      <div className="relative w-full">
        {/* Favorite Button */}
        <button
          title="Favoritar produto"
          className="absolute right-[20px] flex justify-end rounded-full text-white bg-black top-3 left-3 w-[28px] sm:w-[33px] lg:w-[38px] z-30"
          aria-label="Add to favorites"
          onClick={() =>
            toggleFavorite({
              id: product.id,
              name: product.name,
              brand: product.brand,
              price: product.price,
              image: product.image,
              rating: product.rating,
              category: product.category,
            })
          }
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

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 select-none flex-col-reverse absolute top-3 right-3 z-30">
          <button
            aria-label="Substrair"
            title="Subtrair"
            className="rounded-full border bg-white flex justify-center items-center w-[28px] h-[28px] sm:w-[33px] sm:h-[33px] lg:w-[38px] lg:h-[38px]"
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
              <path stroke="currentColor" d="M8.5 17h17" strokeWidth="2.5" />
            </svg>
          </button>
          <p className="w-6 text-center font-semibold">{quantity}</p>
          <button
            title="Adicionar"
            aria-label="Adicionar"
            className="rounded-full border bg-white flex justify-center items-center w-[28px] h-[28px] sm:w-[33px] sm:h-[33px] lg:w-[38px] lg:h-[38px]"
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

        {/* Product Image */}
        <Link
          className="overflow-hidden relative block"
          to={`/product/${product.id}`}
        >
          <div className="relative block w-full overflow-hidden rounded-lg border pt-[127%] z-10">
            <OptimizedImage
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              src={product.image}
            />
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="pt-2 px-1 flex flex-col flex-grow gap-2">
        <div>
          <div>
            <p className="line-clamp-2 text-sm font-semibold lg:text-lg">
              {product.name}
            </p>
          </div>
          <p className="text-xs text-[#A4AAAD] lg:text-sm">
            {product.category}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold lg:text-lg">
              R$ {product.price.toFixed(2)}
            </p>
          </div>
          <span className="flex items-center gap-1">
            <svg
              role="img"
              aria-label="Estrela"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 33 31"
              className="text-primarycolor mb-1 w-[14px] lg:w-[16px]"
            >
              <path
                fill="currentColor"
                d="M17.105.602a1.08 1.08 0 0 0-1.936 0L10.767 9.52.924 10.95a1.08 1.08 0 0 0-.598 1.841l7.122 6.943-1.681 9.803a1.08 1.08 0 0 0 1.566 1.138l8.804-4.628 8.804 4.628a1.08 1.08 0 0 0 1.566-1.138l-1.681-9.803 7.122-6.943a1.08 1.08 0 0 0-.598-1.84L21.507 9.52 17.105.6Z"
              />
            </svg>
            <p className="text-xs lg:text-sm">{product.rating}</p>
          </span>
        </div>

        {/* Buy Button */}
        <div className="mt-auto">
          <div>
            <button
              aria-label="Comprar agora"
              title="Comprar agora"
              role="button"
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg p-2 dynamic-gradient"
              onClick={incrementQuantity}
            >
              <p className="max-w-[calc(100%-28px)] text-sm font-medium text-white">
                Comprar agora
              </p>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export function ProductGrid() {
  const { activeBrand } = useBrand();

  // Filter products based on active brand
  const filteredProducts =
    activeBrand.name === "Todos Produtos Grupo Goold"
      ? decodedProducts
      : decodedProducts.filter((product) => product.brand === activeBrand.name);

  return (
    <section id="products" className="scroll-mt-52">
      <ul className="mb-24 grid grid-cols-2 gap-4 sm:gap-8 lg:gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
      <div className="mb-10 flex justify-center" aria-hidden="true"></div>
    </section>
  );
}
