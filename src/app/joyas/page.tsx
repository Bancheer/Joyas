import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CategoryStories from "@/components/CategoryStories";
import CategoryCards from "@/components/CategoryCards";
import RegalosPara from "@/components/RegalosPara";
import { metropolis } from "../fonts";

export const metadata: Metadata = {
  title: "Joyas | Joyas Rodriguez",
  description:
    "Descubre nuestras joyas: pulseras, anillos, pendientes y collares de plata.",
};

// Макет Figma: «PAGES OF COLLECTIONS - JOYAS» (node 310:272), ширина 1440px.
// Изображения скачиваются скриптом: node scripts/fetch-figma-assets.mjs

// Две большие плитки сверху (694×431, квадратное фото обрезано снизу)
const featured = [
  {
    label: "Más Vendidos",
    href: "/joyas/mas-vendidos",
    image: "/joyas/mas-vendidos.png",
    alt: "Manos con anillos y pulsera de plata",
    // Кадрирование по макетам 360 / 768 / 1440 (фото сдвинуто вверх на 99 / 252 / 231px)
    crop: "object-[50%_72%] md:object-[50%_82%] lg:object-[50%_88%]",
  },
  {
    label: "Novedades",
    href: "/joyas/novedades",
    image: "/joyas/novedades.png",
    alt: "Anillo en una caja de regalo azul",
    // Сдвиг 109 / 242 / 221px
    crop: "object-[50%_79%] lg:object-[50%_84%]",
    minWidth: true,
  },
];

export default function JoyasPage() {
  return (
    <main className={`${metropolis.className} bg-white text-[#131314]`}>
      {/* Сторис категорий — только на телефоне */}
      <CategoryStories />

      {/* Más vendidos / Novedades: 1 колонка до 1024px, 2 — на компьютере */}
      <section className="px-[3.89vw] md:px-[1.95vw] md:pt-6 lg:px-[1.53vw] lg:pt-0">
        <div className="grid gap-2 lg:grid-cols-2">
          {featured.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative block aspect-[332/194] overflow-hidden lg:aspect-[694/431]"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${item.crop}`}
              />
              {/* Затемнение из макета: чёрный 20% + синий rgba(39,48,96,.2) */}
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(rgba(39,48,96,0.2),rgba(39,48,96,0.2))]"
              />
              <span
                className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white bg-white/20 px-[30px] py-4 text-[14px] font-medium uppercase whitespace-nowrap text-white transition-colors group-hover:bg-white/35 ${
                  item.minWidth ? "w-[175px]" : ""
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Категории */}
      <section
        aria-label="Categorías"
        className="px-[3.89vw] pt-20 md:px-0 md:pt-[100px] lg:px-[1.53vw]"
      >
        <CategoryCards />
      </section>

      {/* Regalos para... */}
      <RegalosPara className="mt-[100px] md:mt-[140px]" />

      {/* Отступ до футера: 100px на телефоне, 140px на планшете и компьютере */}
      <div className="h-[100px] md:h-[140px]" />
    </main>
  );
}
