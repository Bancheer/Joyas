"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Размер + количество + кнопка «Agregar al carrito» + иконки оплаты (макет: 382:1056, 382:999)
export default function ProductPurchase({
  productName,
  sizes,
}: {
  productName: string;
  sizes?: string[];
}) {
  const [size, setSize] = useState(sizes?.[1] ?? sizes?.[0] ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(t);
  }, [added]);

  const addToCart = () => {
    // TODO: подключить настоящую корзину (Shopify и т.п.). Пока только визуальный отклик.
    setAdded(true);
  };

  return (
    <div className="flex flex-col gap-[29px]">
      <div className="flex items-end gap-[21px]">
        {sizes && sizes.length > 0 && (
          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:max-w-[261px]">
            <div className="flex items-baseline gap-3 text-[12px] font-medium">
              <label htmlFor="talla" className="text-[#131314]">
                TALLA
              </label>
              <Link href="/guia-de-tallas" className="text-[#2A2B2D] underline">
                Guía de Tallas
              </Link>
            </div>
            <div className="relative h-[44px] border border-[#DFE1F0]">
              <select
                id="talla"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="size-full cursor-pointer appearance-none bg-transparent pl-5 pr-12 text-[16px] leading-[1.35] text-[#131314] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#517EC1]"
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <Image
                src="/icons/chevron-select.svg"
                alt=""
                width={32}
                height={32}
                className="pointer-events-none absolute right-[10px] top-[5px]"
              />
            </div>
          </div>
        )}

        <div className="flex shrink-0 flex-col gap-2">
          <span id="cantidad-label" className="text-[12px] font-medium text-[#131314]">
            CANTIDAD
          </span>
          <div
            role="group"
            aria-labelledby="cantidad-label"
            className="flex items-center justify-center gap-[22px] border border-[#DFE1F0] p-[10px]"
          >
            <button
              type="button"
              aria-label="Quitar uno"
              disabled={qty <= 1}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="disabled:opacity-30"
            >
              <Image src="/icons/minus.svg" alt="" width={24} height={24} />
            </button>
            <output aria-live="polite" className="min-w-[1ch] text-center text-[16px] leading-[1.35]">
              {qty}
            </output>
            <button
              type="button"
              aria-label="Añadir uno"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
            >
              <Image src="/icons/plus.svg" alt="" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={addToCart}
          aria-label={`Agregar ${productName} al carrito`}
          className="w-full bg-[#517EC1] px-[30px] py-6 text-[16px] font-medium uppercase leading-none text-white transition-colors hover:bg-[#4570b0]"
        >
          {added ? "Añadido al carrito ✓" : "Agregar al carrito"}
        </button>
        <PaymentIcons />
      </div>
    </div>
  );
}

// Иконки оплаты в порядке макета: Mastercard, Visa, Apple Pay, Discover, Bancontact, Google Pay, Amex
function PaymentIcons() {
  const boxed = "relative h-[32px] w-[46px] rounded-[4px] border border-[#F2F4F7] bg-white";
  return (
    <ul className="flex flex-wrap justify-center gap-3" aria-label="Métodos de pago">
      <li className={`${boxed} rounded-[6px]`}>
        <span className="absolute inset-[21%_18%_23%_17%]">
          <Image src="/icons/payments/mastercard.svg" alt="Mastercard" fill sizes="30px" />
        </span>
      </li>
      <li>
        <Image src="/icons/payments/visa.svg" alt="Visa" width={46} height={32} />
      </li>
      <li>
        <Image src="/icons/payments/apple-pay.svg" alt="Apple Pay" width={46} height={32} />
      </li>
      <li>
        <Image src="/icons/payments/discover.svg" alt="Discover" width={46} height={32} />
      </li>
      <li className="overflow-hidden rounded-[4px]">
        <Image src="/icons/payments/bancontact.svg" alt="Bancontact" width={46} height={32} />
      </li>
      <li className={boxed}>
        <span className="absolute inset-[32%_63%_33%_14%]">
          <Image src="/icons/payments/gpay-g.svg" alt="" fill sizes="11px" />
        </span>
        <span className="absolute inset-[35%_16%_26%_44%]">
          <Image src="/icons/payments/gpay-pay.svg" alt="Google Pay" fill sizes="19px" />
        </span>
      </li>
      <li>
        <Image src="/icons/payments/amex.svg" alt="American Express" width={46} height={32} />
      </li>
    </ul>
  );
}
