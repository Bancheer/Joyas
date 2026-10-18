"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  MAX_QTY,
  computeTotals,
  lineId,
  normalizeCoupon,
  type CartLine,
  type CartTotals,
  type CouponCode,
} from "@/data/cart";

// Корзина хранится в браузере (localStorage), поэтому переживает перезагрузку страницы
// и синхронизируется между вкладками. Когда подключим настоящий магазин (Shopify и т.п.),
// поменяется только этот файл — компоненты работают через useCart().
const STORAGE_KEY = "joyas-cart-v1";

type Stored = { lines: CartLine[]; coupon: CouponCode | null };

type CartContextValue = CartTotals & {
  /** false до чтения localStorage — чтобы не мигал «пустой» значок/страница */
  ready: boolean;
  lines: CartLine[];
  /** Увеличивается при каждом добавлении — значок в шапке по нему «подпрыгивает» */
  addedTick: number;
  add: (slug: string, qty?: number, size?: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  /** Возвращает false, если такого кода нет */
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function read(): Stored {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lines: [], coupon: null };
    const data = JSON.parse(raw) as Partial<Stored>;
    const lines = Array.isArray(data.lines)
      ? data.lines.filter((l) => l && typeof l.slug === "string" && Number.isFinite(l.qty) && l.qty > 0)
      : [];
    return { lines, coupon: data.coupon ? normalizeCoupon(data.coupon) : null };
  } catch {
    return { lines: [], coupon: null };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Stored>({ lines: [], coupon: null });
  const [ready, setReady] = useState(false);
  const [addedTick, setAddedTick] = useState(0);
  const skipSave = useRef(true);

  useEffect(() => {
    setState(read());
    setReady(true);
    // Другая вкладка поменяла корзину — подтягиваем
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      skipSave.current = true;
      setState(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // приватный режим / хранилище недоступно — корзина просто живёт до перезагрузки
    }
  }, [state, ready]);

  const add = useCallback((slug: string, qty = 1, size?: string) => {
    const id = lineId(slug, size);
    setState((s) => {
      const existing = s.lines.find((l) => l.id === id);
      const lines = existing
        ? s.lines.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
        : [...s.lines, { id, slug, size, qty: Math.min(MAX_QTY, qty) }];
      return { ...s, lines };
    });
    setAddedTick((t) => t + 1);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setState((s) => ({
      ...s,
      lines:
        qty <= 0
          ? s.lines.filter((l) => l.id !== id)
          : s.lines.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    }));
  }, []);

  const remove = useCallback((id: string) => {
    setState((s) => ({ ...s, lines: s.lines.filter((l) => l.id !== id) }));
  }, []);

  const clear = useCallback(() => setState({ lines: [], coupon: null }), []);

  const applyCoupon = useCallback((code: string) => {
    const c = normalizeCoupon(code);
    if (!c) return false;
    setState((s) => ({ ...s, coupon: c }));
    return true;
  }, []);

  const removeCoupon = useCallback(() => setState((s) => ({ ...s, coupon: null })), []);

  const value = useMemo<CartContextValue>(
    () => ({
      ...computeTotals(state.lines, state.coupon),
      ready,
      lines: state.lines,
      addedTick,
      add,
      setQty,
      remove,
      clear,
      applyCoupon,
      removeCoupon,
    }),
    [state, ready, addedTick, add, setQty, remove, clear, applyCoupon, removeCoupon],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart() нужно вызывать внутри <CartProvider>");
  return ctx;
}
