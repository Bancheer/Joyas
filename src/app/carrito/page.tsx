import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";
import { metropolis } from "../fonts";

export const metadata: Metadata = {
  title: "Carrito | Joyas Rodriguez",
  description: "Tu carrito de Joyas Rodriguez: revisa tus joyas, aplica códigos de descuento y finaliza tu compra.",
};

// Страница корзины. Отдельного макета в Figma нет — собрана из элементов страницы товара
// (блок «Oferta 2+1», цвета, кнопки, иконки оплаты и преимуществ).
export default function CarritoPage() {
  return (
    <main className={`${metropolis.className} bg-white text-[#131314]`}>
      <CartView />
    </main>
  );
}
