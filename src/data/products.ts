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
const attrs: Partial<Record<number, Partial<Omit<Product, "slug" | "image">>>> = {
  1: { materials: ["plata-925", "oro-18k"], size: "ajustable", colors: ["plata", "oro"] },
  // №5 — кольцо с горами. На нём сделана страница товара из макета, поэтому
  // название взято из карусели на главной, а цены и отзывы — со страницы товара в макете.
  5: {
    name: "Anillo Aventura",
    price: 490.99,
    compareAtPrice: 1190.99,
    reviews: 24,
    materials: ["plata-925"],
    size: "con-tallas",
    colors: ["plata"],
  },
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

// ─── Страница товара ───────────────────────────────────────────────

export type ProductDetails = {
  /** Цветные плашки над галереей и над названием */
  labels: { text: string; color: string }[];
  gallery: string[];
  /** Размеры для выпадающего списка «Talla» (только для колец «con tallas») */
  sizes?: string[];
  story?: { title: string; paragraphs: string[] };
  includes: string[];
  specs: { label: string; value: string }[];
  /** Товар для блока «Completa el look» */
  lookSlug?: string;
};

// ВРЕМЕННО: размеры-заглушки, заменить реальными
const DEMO_SIZES = ["5", "6", "7", "8", "9"];

// Тексты из макета Figma (страница товара). Для остальных товаров — значения по умолчанию.
const DETAILS: Partial<Record<string, Partial<ProductDetails>>> = {
  "producto-05": {
    labels: [
      { text: "Los más vendidos", color: "#F5743C" },
      { text: "-50%", color: "#1BAA7E" },
    ],
    gallery: Array.from({ length: 8 }, (_, i) => `/productos/aventura/foto-${i + 1}.png`),
    story: {
      title: "UN SÍMBOLO DE EMPODERAMIENTO INTERIOR",
      paragraphs: [
        "Este precioso Anillo Reina simboliza la importancia del compromiso contigo misma y del empoderamiento interior.",
        "Es un recordatorio de que somos importantes y especiales para nosotras mismas y que NUNCA debemos descuidarnos y permitir que otros nos falten el respeto.",
      ],
    },
    lookSlug: "producto-03",
  },
};

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductDetails(product: Product): ProductDetails {
  const d = DETAILS[product.slug] ?? {};
  return {
    labels: d.labels ?? (product.badge ? [{ text: product.badge, color: "#E38465" }] : []),
    gallery: d.gallery ?? [product.image],
    sizes: d.sizes ?? (product.size === "con-tallas" ? DEMO_SIZES : undefined),
    story: d.story,
    // Из макета: «Incluye tarjeta y caja regalo», «Plata de ley 925»
    includes: d.includes ?? ["La joya", "Tarjeta con mensaje", "Caja de regalo"],
    specs: d.specs ?? [
      { label: "Material", value: "Plata de ley 925" },
      { label: "Talla", value: product.size === "ajustable" ? "Ajustable" : "Con tallas" },
    ],
    lookSlug: d.lookSlug,
  };
}
