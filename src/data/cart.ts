// Правила корзины: оферта «2+1 gratis» и промокоды TAKE5 / TAKE10 / TAKE20.
// Чистые функции без React — их можно перенести на сервер, когда появится настоящий магазин.
import { getProduct, type Product } from "@/data/products";

export type CartLine = {
  /** slug товара + размер — один товар разных размеров лежит отдельными строками */
  id: string;
  slug: string;
  size?: string;
  qty: number;
};

export const MAX_QTY = 99;

export function lineId(slug: string, size?: string) {
  return size ? `${slug}|${size}` : slug;
}

// Промокоды из баннера «Compre más, ahorre más» (страница Regalos)
export const COUPONS = {
  TAKE5: { percent: 5, minItems: 2 },
  TAKE10: { percent: 10, minItems: 3 },
  TAKE20: { percent: 20, minItems: 4 },
} as const;

export type CouponCode = keyof typeof COUPONS;

export function normalizeCoupon(code: string): CouponCode | null {
  const c = code.trim().toUpperCase();
  return c in COUPONS ? (c as CouponCode) : null;
}

export type CartRow = CartLine & { product: Product; lineTotal: number };

export type CartTotals = {
  rows: CartRow[];
  /** Всего штук в корзине (для значка в шапке) */
  count: number;
  subtotal: number;
  /** Сколько сэкономили на «старых» ценах (зачёркнутых) — для мотивации */
  savedVsCompare: number;
  /** Скидка «2+1 gratis»: каждая 3-я самая дешёвая штука бесплатно */
  offerDiscount: number;
  freeItems: number;
  /** Сколько штук докинуть до следующей бесплатной */
  toNextFree: number;
  coupon: CouponCode | null;
  /** Купон введён, но товаров мало — показываем подсказку, скидку не даём */
  couponPending: { code: CouponCode; missing: number } | null;
  couponDiscount: number;
  total: number;
};

const round = (n: number) => Math.round(n * 100) / 100;

export function computeTotals(lines: CartLine[], couponCode: CouponCode | null): CartTotals {
  const rows: CartRow[] = [];
  for (const l of lines) {
    const product = getProduct(l.slug);
    if (!product) continue; // товар убрали из каталога — просто не показываем
    rows.push({ ...l, product, lineTotal: round(product.price * l.qty) });
  }

  const count = rows.reduce((s, r) => s + r.qty, 0);
  const subtotal = round(rows.reduce((s, r) => s + r.lineTotal, 0));
  const savedVsCompare = round(
    rows.reduce((s, r) => s + Math.max(0, (r.product.compareAtPrice ?? r.product.price) - r.product.price) * r.qty, 0),
  );

  // 2+1: на каждые 3 штуки — самая дешёвая бесплатно (3 → платишь 2, 6 → платишь 4)
  const freeItems = Math.floor(count / 3);
  const unitPrices = rows.flatMap((r) => Array<number>(r.qty).fill(r.product.price)).sort((a, b) => a - b);
  const offerDiscount = round(unitPrices.slice(0, freeItems).reduce((s, p) => s + p, 0));
  const toNextFree = count === 0 ? 3 : 3 - (count % 3);

  // Промокод считается от суммы после оферты
  let coupon: CouponCode | null = null;
  let couponPending: CartTotals["couponPending"] = null;
  let couponDiscount = 0;
  if (couponCode) {
    const rule = COUPONS[couponCode];
    if (count >= rule.minItems) {
      coupon = couponCode;
      couponDiscount = round(((subtotal - offerDiscount) * rule.percent) / 100);
    } else {
      couponPending = { code: couponCode, missing: rule.minItems - count };
    }
  }

  return {
    rows,
    count,
    subtotal,
    savedVsCompare,
    offerDiscount,
    freeItems,
    toNextFree,
    coupon,
    couponPending,
    couponDiscount,
    total: Math.max(0, round(subtotal - offerDiscount - couponDiscount)),
  };
}
