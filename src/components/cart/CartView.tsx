"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { nunito } from "@/app/fonts";
import ProductCard from "@/components/ProductCard";
import { PaymentIcons } from "@/components/ProductPurchase";
import { COUPONS, MAX_QTY, type CartRow, type CouponCode } from "@/data/cart";
import { PRODUCTS, formatPrice } from "@/data/products";
import { useCart } from "./CartProvider";

const pad = "px-[3.89vw] md:px-[2.08vw] lg:px-[1.53vw]";
const plural = (n: number) => (n === 1 ? "artículo" : "artículos");

export default function CartView() {
  const cart = useCart();

  return (
    <>
      <div className={`${pad} pb-[100px] pt-[30px] md:pb-[140px] md:pt-[50px]`}>
        <nav aria-label="Ruta" className="mb-5 text-[12px] text-[#565A61]">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span aria-current="page">Carrito</span>
        </nav>

        <h1 className={`${nunito.className} text-[28px] uppercase leading-[1.35] md:text-[34px]`}>
          Tu carrito
          {cart.ready && cart.count > 0 && (
            <span className="ml-3 align-middle text-[14px] font-normal normal-case tracking-[0.14px] text-[#565A61] md:text-[16px]">
              ({cart.count} {plural(cart.count)})
            </span>
          )}
        </h1>

        {!cart.ready ? (
          // Пока читаем корзину из браузера — пустое место той же высоты, без мигания «пусто»
          <div className="min-h-[50vh]" aria-busy="true" />
        ) : cart.rows.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="mt-[30px] grid items-start gap-[50px] md:mt-[40px] lg:grid-cols-[minmax(0,61.25fr)_minmax(0,27.78fr)] lg:gap-[4.72vw]">
            <section aria-label="Productos en el carrito">
              <OfferProgress count={cart.count} freeItems={cart.freeItems} toNextFree={cart.toNextFree} />

              <div className="mt-[30px] hidden grid-cols-[minmax(0,1fr)_140px_130px] border-b border-[#DFE1F0] pb-3 text-[12px] font-medium uppercase tracking-[0.12px] text-[#565A61] md:grid">
                <span>Producto</span>
                <span className="text-center">Cantidad</span>
                <span className="text-right">Total</span>
              </div>
              <ul className="max-md:mt-[30px] max-md:border-t max-md:border-[#DFE1F0]">
                {cart.rows.map((row) => (
                  <CartItem key={row.id} row={row} />
                ))}
              </ul>

              <div className="mt-[30px] flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/joyas"
                  className="flex items-center gap-2 text-[14px] font-medium uppercase tracking-[0.14px] text-[#517EC1] hover:underline"
                >
                  ← Seguir comprando
                </Link>
                <button
                  type="button"
                  onClick={cart.clear}
                  className="text-[12px] text-[#565A61] underline underline-offset-4 hover:text-[#131314]"
                >
                  Vaciar carrito
                </button>
              </div>
            </section>

            <Summary />
          </div>
        )}
      </div>

      {cart.ready && <Suggestions exclude={cart.rows.map((r) => r.slug)} />}
    </>
  );
}

// ── Товар в корзине ───────────────────────────────────────────────
function CartItem({ row }: { row: CartRow }) {
  const { setQty, remove } = useCart();
  const { product } = row;
  const href = `/producto/${product.slug}`;

  return (
    <li className="grid grid-cols-[96px_minmax(0,1fr)] gap-x-4 border-b border-[#DFE1F0] py-6 md:grid-cols-[120px_minmax(0,1fr)_140px_130px] md:items-center md:gap-x-6">
      <Link href={href} className="relative block aspect-square overflow-hidden bg-[#F4F4F4]" tabIndex={-1} aria-hidden>
        <span
          className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
          style={{ width: `${product.imageScale * 100}%` }}
        >
          <Image src={product.image} alt="" fill sizes="120px" className="object-cover" />
        </span>
      </Link>

      <div className="flex min-w-0 flex-col gap-[6px]">
        <Link href={href} className="text-[16px] leading-[1.4] hover:underline">
          {product.name}
        </Link>
        {row.size && <span className="text-[12px] text-[#565A61]">Talla: {row.size}</span>}
        <span className="flex flex-wrap items-baseline gap-x-[7px] leading-[1.4]">
          <span className="text-[14px] font-medium">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <s className="text-[12px] text-[#717171]">
              <span className="sr-only">Antes: </span>
              {formatPrice(product.compareAtPrice)}
            </s>
          )}
        </span>

        {/* На телефоне количество и сумма — под названием */}
        <div className="mt-2 flex items-center justify-between gap-3 md:hidden">
          <QtyStepper row={row} onChange={(q) => setQty(row.id, q)} />
          <span className="text-[16px] font-medium">{formatPrice(row.lineTotal)}</span>
        </div>
        <button
          type="button"
          onClick={() => remove(row.id)}
          className="mt-1 self-start text-[12px] text-[#565A61] underline underline-offset-4 hover:text-[#131314]"
        >
          Eliminar<span className="sr-only"> {product.name}</span>
        </button>
      </div>

      <div className="hidden justify-center md:flex">
        <QtyStepper row={row} onChange={(q) => setQty(row.id, q)} />
      </div>
      <span className="hidden text-right text-[16px] font-medium md:block">{formatPrice(row.lineTotal)}</span>
    </li>
  );
}

function QtyStepper({ row, onChange }: { row: CartRow; onChange: (qty: number) => void }) {
  return (
    <div
      role="group"
      aria-label={`Cantidad de ${row.product.name}`}
      className="flex h-[44px] items-center gap-[14px] border border-[#DFE1F0] px-[10px]"
    >
      <button
        type="button"
        aria-label="Quitar uno"
        disabled={row.qty <= 1}
        onClick={() => onChange(row.qty - 1)}
        className="disabled:opacity-30"
      >
        <Image src="/icons/minus.svg" alt="" width={20} height={20} />
      </button>
      <output aria-live="polite" className="min-w-[2ch] text-center text-[16px] leading-none">
        {row.qty}
      </output>
      <button
        type="button"
        aria-label="Añadir uno"
        disabled={row.qty >= MAX_QTY}
        onClick={() => onChange(row.qty + 1)}
        className="disabled:opacity-30"
      >
        <Image src="/icons/plus.svg" alt="" width={20} height={20} />
      </button>
    </div>
  );
}

// ── Прогресс оферты «2+1 gratis» (стиль блока со страницы товара) ─────────
function OfferProgress({ count, freeItems, toNextFree }: { count: number; freeItems: number; toNextFree: number }) {
  const step = count % 3; // сколько штук уже в текущей «тройке»
  return (
    <div className="overflow-hidden rounded-[4px] border border-[#517EC1] bg-[#F4F5FB] px-5 py-4 shadow-[0_4px_12px_0_rgba(236,239,255,0.86)] md:px-[31px]">
      <div className="flex items-center gap-3">
        <Image src="/icons/offer-diamond.svg" alt="" width={18} height={24} className="shrink-0" />
        <p className="text-[18px] font-medium leading-none text-[#517EC1] md:text-[20px]">OFERTA 2+1 GRATIS</p>
      </div>
      <p className="mt-3 text-[14px] leading-[1.4] text-[#565A61]">
        {freeItems > 0 && (
          <strong className="font-medium text-[#1BAA7E]">
            ¡{freeItems} {plural(freeItems)} GRATIS en tu pedido!{" "}
          </strong>
        )}
        Añade <strong className="font-medium text-[#131314]">{toNextFree}</strong> {plural(toNextFree)} más y
        {freeItems > 0 ? " llévate otro" : " el de menor precio será"} <strong className="font-medium">GRATIS</strong>.
      </p>
      <div className="mt-3 grid grid-cols-3 gap-[6px]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-[4px] rounded-full ${i < step ? "bg-[#517EC1]" : "bg-[#DFE1F0]"}`} />
        ))}
      </div>
    </div>
  );
}

// ── Итог заказа + промокод ────────────────────────────────────────
function Summary() {
  const cart = useCart();
  const [checkoutNote, setCheckoutNote] = useState(false);
  const saved = cart.savedVsCompare + cart.offerDiscount + cart.couponDiscount;

  return (
    <aside
      aria-labelledby="resumen-title"
      className="bg-[#F4F5FB] px-5 py-[30px] md:px-[30px] lg:sticky lg:top-[88px]"
    >
      <h2 id="resumen-title" className="text-[16px] font-medium uppercase tracking-[0.16px]">
        Resumen del pedido
      </h2>

      <CouponForm />

      <dl className="mt-[26px] flex flex-col gap-3 border-t border-[#DFE1F0] pt-[22px] text-[14px] leading-[1.4]">
        <Row label={`Subtotal (${cart.count} ${plural(cart.count)})`} value={formatPrice(cart.subtotal)} />
        {cart.offerDiscount > 0 && (
          <Row
            label={`Oferta 2+1 (${cart.freeItems} gratis)`}
            value={`−${formatPrice(cart.offerDiscount)}`}
            accent
          />
        )}
        {cart.coupon && (
          <Row
            label={`Código ${cart.coupon} (−${COUPONS[cart.coupon].percent}%)`}
            value={`−${formatPrice(cart.couponDiscount)}`}
            accent
          />
        )}
        <Row label="Envío a todo México" value="Gratis" accent />
      </dl>

      <div className="mt-[22px] flex items-baseline justify-between gap-4 border-t border-[#DFE1F0] pt-[22px]">
        <span className="text-[16px] font-medium uppercase">Total</span>
        <span className="text-[22px] font-medium">{formatPrice(cart.total)}</span>
      </div>
      {saved > 0 && (
        <p className="mt-1 text-right text-[12px] font-medium text-[#1BAA7E]">Ahorras {formatPrice(saved)}</p>
      )}

      {/* TODO: подключить оплату (Shopify Checkout / Stripe / Mercado Pago) */}
      <button
        type="button"
        onClick={() => setCheckoutNote(true)}
        className="mt-[26px] w-full bg-[#517EC1] px-[30px] py-[22px] text-[16px] font-medium uppercase leading-none text-white transition-colors hover:bg-[#4570b0]"
      >
        Finalizar compra
      </button>
      <p aria-live="polite" className="mt-3 min-h-[1.4em] text-center text-[12px] leading-[1.4] text-[#565A61]">
        {checkoutNote && "El pago en línea estará disponible muy pronto. ¡Gracias por tu paciencia!"}
      </p>
      <div className="mt-2">
        <PaymentIcons />
      </div>

      <ul className="mt-[26px] flex flex-col gap-[11px] border-t border-[#DFE1F0] pt-[22px] text-[14px] leading-[1.35] text-[#565A61]">
        {[
          ["/icons/feature-gift.svg", "Incluye tarjeta y caja regalo"],
          ["/icons/feature-truck.svg", "Envío gratuito, 6-12 días laborables"],
          ["/icons/feature-warranty.svg", "Garantía de 30 días"],
        ].map(([icon, text]) => (
          <li key={text} className="flex items-center gap-[7px]">
            <Image src={icon} alt="" width={20} height={20} />
            {text}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Row({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-[#565A61]">{label}</dt>
      <dd className={accent ? "font-medium text-[#1BAA7E]" : "font-medium"}>{value}</dd>
    </div>
  );
}

function CouponForm() {
  const { coupon, couponPending, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const submit = (e?: FormEvent, value = code) => {
    e?.preventDefault();
    if (!value.trim()) return;
    if (applyCoupon(value)) {
      setCode("");
      setError("");
    } else {
      setError("Este código no es válido.");
    }
  };

  const active: CouponCode | null = coupon ?? couponPending?.code ?? null;

  return (
    <div className="mt-[22px]">
      <form onSubmit={submit} className="flex flex-col gap-2">
        <label htmlFor="cupon" className="text-[12px] font-medium uppercase">
          Código de descuento
        </label>
        <div className="flex">
          <input
            id="cupon"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError("");
            }}
            placeholder="Ej. TAKE10"
            autoComplete="off"
            aria-invalid={!!error}
            aria-describedby="cupon-msg"
            className="h-[44px] min-w-0 flex-1 border border-r-0 border-[#DFE1F0] bg-white px-4 text-[14px] uppercase placeholder:normal-case placeholder:text-[#9A9DA6] focus:outline-none focus-visible:border-[#517EC1]"
          />
          <button
            type="submit"
            className="h-[44px] shrink-0 bg-[#131314] px-5 text-[12px] font-medium uppercase tracking-[0.12px] text-white transition-colors hover:bg-[#517EC1]"
          >
            Aplicar
          </button>
        </div>
      </form>

      <div id="cupon-msg" aria-live="polite" className="text-[12px] leading-[1.4]">
        {error && <p className="mt-2 text-[#D04B3B]">{error}</p>}
        {active && (
          <div className="mt-3 flex items-center justify-between gap-3 border border-dashed border-[#517EC1] bg-white px-3 py-2">
            <span>
              <strong className="font-medium text-[#517EC1]">{active}</strong>{" "}
              {coupon ? (
                <span className="text-[#1BAA7E]">aplicado: −{COUPONS[active].percent}%</span>
              ) : (
                <span className="text-[#565A61]">
                  añade {couponPending!.missing} {plural(couponPending!.missing)} más para activarlo
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={removeCoupon}
              aria-label={`Quitar código ${active}`}
              className="text-[16px] leading-none text-[#565A61] hover:text-[#131314]"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Подсказка: коды из баннера «Compre más, ahorre más» — по клику применяются */}
      <div className="mt-4">
        <p className="text-[12px] text-[#565A61]">Ofertas disponibles:</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {(Object.keys(COUPONS) as CouponCode[]).map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => submit(undefined, c)}
                aria-pressed={active === c}
                className={`border px-2 py-[6px] text-[12px] leading-none transition-colors ${
                  active === c
                    ? "border-[#517EC1] bg-[#517EC1] text-white"
                    : "border-[#B7BEE2] bg-white text-[#131314] hover:border-[#517EC1]"
                }`}
              >
                <span className="font-medium">{c}</span> · {COUPONS[c].minItems}+ art. −{COUPONS[c].percent}%
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Пустая корзина ────────────────────────────────────────────────
function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-[480px] flex-col items-center py-[60px] text-center md:py-[90px]">
      <span
        aria-hidden
        className="block size-[64px] bg-[#B7BEE2] [-webkit-mask:url(/icons/header-bag.svg)_center/contain_no-repeat] [mask:url(/icons/header-bag.svg)_center/contain_no-repeat]"
      />
      <p className="mt-5 text-[20px] font-medium uppercase">Tu carrito está vacío</p>
      <p className="mt-2 text-[14px] leading-[1.4] text-[#565A61]">
        Cada joya cuenta una historia. Encuentra la tuya o elige el regalo perfecto para alguien especial.
      </p>
      <div className="mt-[30px] flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/joyas/mas-vendidos"
          className="bg-[#517EC1] px-[26px] py-[16px] text-[14px] font-medium uppercase leading-none text-white transition-colors hover:bg-[#4570b0]"
        >
          Ver más vendidos
        </Link>
        <Link
          href="/regalos"
          className="border border-[#517EC1] px-[26px] py-[15px] text-[14px] font-medium uppercase leading-none text-[#517EC1] transition-colors hover:bg-[#517EC1] hover:text-white"
        >
          Descubre los regalos
        </Link>
      </div>
    </div>
  );
}

// ── «Te podría gustar» ────────────────────────────────────────────
function Suggestions({ exclude }: { exclude: string[] }) {
  // Берём по одному товару каждого «шаблона», которых ещё нет в корзине
  const seen = new Set<string>();
  const items = PRODUCTS.filter((p) => {
    if (exclude.includes(p.slug) || seen.has(p.name)) return false;
    seen.add(p.name);
    return true;
  }).slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="sugerencias" className={`${pad} pb-[100px] md:pb-[140px]`}>
      <h2 id="sugerencias" className={`${nunito.className} text-[28px] uppercase leading-[1.35] md:text-[34px]`}>
        Te podría gustar
      </h2>
      <ul className="mt-[30px] grid grid-cols-2 gap-x-[2.78vw] gap-y-[30px] md:gap-x-[1.3vw] lg:grid-cols-4 lg:gap-x-[1.5vw]">
        {items.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
