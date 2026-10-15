// ВРЕМЕННЫЕ ДАННЫЕ для вёрстки каталога.
// Фото — из макета Figma. Названия, цены и отзывы скопированы из макета:
// там 4 названия повторяются по рядам, поэтому у разных колец одинаковые имена.
// Атрибуты для фильтров (материал, размер, цвет) — заглушки.
// Когда подключим реальный магазин (Shopify и т.п.), этот файл заменится загрузкой товаров.

export type Category = "anillos" | "pulseras" | "pendientes" | "collares";
export type Material = "plata-925" | "oro-18k" | "impermeable";
export type Size = "ajustable" | "con-tallas";
export type Color = "oro" | "plata" | "oro-rosado";

export type Product = {
  slug: string;
  name: string;
  image: string;
  /** Во сколько раз фото больше карточки (в макете кольцо «приближено») */
  imageScale: number;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  category: Category;
  materials: Material[];
  size: Size;
  colors: Color[];
};

export const FILTER_GROUPS = [
  {
    key: "category",
    title: "Categorías",
    options: [
      { value: "anillos", label: "Anillos" },
      { value: "pulseras", label: "Pulseras" },
      { value: "pendientes", label: "Pendientes" },
      { value: "collares", label: "Collares" },
    ],
  },
  {
    key: "material",
    title: "Material",
    options: [
      { value: "plata-925", label: "Plata de Ley 925" },
      { value: "oro-18k", label: "Acabado oro 18k" },
      { value: "impermeable", label: "impermeable" },
    ],
  },
  {
    key: "size",
    title: "Tallas",
    options: [
      { value: "ajustable", label: "Ajustable" },
      { value: "con-tallas", label: "Con tallas" },
    ],
  },
  {
    key: "color",
    title: "Colores",
    options: [
      { value: "oro", label: "Oro" },
      { value: "plata", label: "Plata" },
      { value: "oro-rosado", label: "Oro Rosado" },
    ],
  },
] as const;

export type FilterKey = (typeof FILTER_GROUPS)[number]["key"];

// Четыре «шаблона» карточек из макета (название, цены, отзывы, масштаб фото)
const templates = [
  { name: "Anillo Girasol", price: 490.99, compareAtPrice: 1009.99, reviews: 42, imageScale: 1.253 },
  { name: "Anillo Amor Propio - Elijo mi Paz", price: 490.99, compareAtPrice: 1809.99, reviews: 19, imageScale: 1.253 },
  { name: "Anillo Lotus - Empieza de nuevo", price: 440.99, compareAtPrice: 909.99, reviews: 42, imageScale: 1.235 },
  { name: "A mi Hija - Anillo Universo", price: 440.99, compareAtPrice: 809.99, reviews: 42, imageScale: 1.185 },
];

// Атрибуты-заглушки по номеру фото (1–16)
const attrs: Partial<
  Record<number, Pick<Product, "materials" | "size" | "colors">>
> = {
  1: { materials: ["plata-925", "oro-18k"], size: "ajustable", colors: ["plata", "oro"] },
  5: { materials: ["plata-925"], size: "con-tallas", colors: ["plata"] },
  6: { materials: ["plata-925", "impermeable"], size: "con-tallas", colors: ["plata"] },
  10: { materials: ["plata-925"], size: "con-tallas", colors: ["plata"] },
  14: { materials: ["plata-925", "impermeable"], size: "ajustable", colors: ["plata"] },
};

export const PRODUCTS: Product[] = Array.from({ length: 16 }, (_, i) => {
  const n = i + 1;
  const t = templates[i % 4];
  return {
    slug: `producto-${String(n).padStart(2, "0")}`,
    image: `/productos/producto-${String(n).padStart(2, "0")}.png`,
    rating: 5,
    badge: "Oferta",
    category: "anillos",
    materials: ["plata-925"],
    size: "ajustable",
    colors: ["plata"],
    ...t,
    ...attrs[n],
  };
});

// Коллекции для страниц /joyas/[coleccion]
export const COLLECTIONS = {
  "mas-vendidos": { title: "Más Vendidos" },
  novedades: { title: "Novedades" },
  anillos: { title: "Anillos", category: "anillos" },
  pulseras: { title: "Pulseras", category: "pulseras" },
  pendientes: { title: "Pendientes", category: "pendientes" },
  collares: { title: "Collares", category: "collares" },
} satisfies Record<string, { title: string; category?: Category }>;

export type CollectionSlug = keyof typeof COLLECTIONS;

export function formatPrice(value: number) {
  return `$${value.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} MXN`;
}
