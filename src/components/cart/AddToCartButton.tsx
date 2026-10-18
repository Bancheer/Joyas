"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

// Простая кнопка «Añadir al carrito» (1 шт., без выбора размера) — для «Completa el look» и т.п.
export default function AddToCartButton({
  slug,
  productName,
  className = "",
}: {
  slug: string;
  productName: string;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <button
      type="button"
      aria-label={`Añadir ${productName} al carrito`}
      onClick={() => {
        add(slug);
        setAdded(true);
      }}
      className={className}
    >
      <span aria-live="polite">{added ? "Añadido ✓" : "Añadir al carrito"}</span>
    </button>
  );
}
