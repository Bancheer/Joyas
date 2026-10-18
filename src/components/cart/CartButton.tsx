"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

// Иконка корзины в шапке со счётчиком товаров. При добавлении товара значок «подпрыгивает».
export default function CartButton() {
  const { count, ready, addedTick } = useCart();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (!addedTick) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [addedTick]);

  const shown = ready && count > 0;

  return (
    <Link
      href="/carrito"
      aria-label={shown ? `Carrito, ${count} ${count === 1 ? "artículo" : "artículos"}` : "Carrito"}
      className="relative text-[#131314] transition-colors hover:text-[#517EC1]"
    >
      <span
        aria-hidden
        className="block size-6 bg-current [-webkit-mask:url(/icons/header-bag.svg)_center/contain_no-repeat] [mask:url(/icons/header-bag.svg)_center/contain_no-repeat]"
      />
      {shown && (
        <span
          aria-hidden
          className={`absolute -right-[7px] -top-[5px] flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#517EC1] px-[4px] text-[10px] font-medium leading-none text-white transition-transform duration-300 motion-reduce:transition-none ${
            bump ? "scale-125" : "scale-100"
          }`}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
