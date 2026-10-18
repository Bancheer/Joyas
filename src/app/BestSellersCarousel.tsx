"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { nunito } from "./fonts";

const products = [
  {
    name: "Anillo Girasol",
    src: "/carousel/Anillo Girasol.jpg",
    priceOld: "$809,99 MXN",
    priceNew: "$440,99 MXN",
  },
  {
    name: "Anillo Lotus - Empieza de nuevo",
    src: "/carousel/Anillo Lotus - Empieza de nuevo.jpg",
    priceOld: "$909,99 MXN",
    priceNew: "$490,99 MXN",
  },
  {
    name: "Anillo Aventura",
    src: "/carousel/Anillo Aventura.jpg",
    priceOld: "$809,99 MXN",
    priceNew: "$440,99 MXN",
  },
  {
    name: "Anillo Elijo mi Paz",
    src: "/carousel/Anillo Elijo mi Paz.jpg",
    priceOld: "$980,99 MXN",
    priceNew: "$490,99 MXN",
  },
  {
    name: "A mi Hija - Anillo Universo",
    src: "/carousel/Anillo Universo.jpg",
    priceOld: "$980,99 MXN",
    priceNew: "$490,99 MXN",
  },
];

export default function BestSellersCarousel({
  fontClassName,
}: {
  fontClassName: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Активность стрелок: «назад» выключена в начале, «вперёд» — в конце
  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateArrows);
    observer.observe(track);
    updateArrows();
    return () => observer.disconnect();
  }, [updateArrows]);

  // Листаем на одну карточку: ищем текущую первую видимую и прокручиваем
  // точно к началу соседней (с учётом отступа трека) — так прокрутка не спорит с привязкой.
  const scrollProducts = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-product-card]")) as HTMLElement[];
    if (!cards.length) return;
    const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const positions = cards.map((c) => c.offsetLeft - padding);
    const current = positions.findIndex((p) => p >= track.scrollLeft - 2);
    const index = Math.max(0, Math.min(cards.length - 1, (current === -1 ? cards.length - 1 : current) + direction));
    const max = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: Math.min(max, Math.max(0, positions[index])), behavior: "smooth" });
  };

  return (
    <section
      id="best-sellers"
      className="mt-[100px] w-full bg-white md:mt-[140px]"
    >
      <div className="mb-[30px] flex items-end justify-between px-[3.89vw] md:px-[2.08vw] lg:px-[1.53vw]">
        <div>
          <h2
            className={`${nunito.className} text-[28px] font-semibold uppercase leading-[1.35] text-[#131314] md:text-[34px]`}
          >
            LOS MÁS VENDIDOS
          </h2>
          <a
            href="#categorias"
            className={`${fontClassName} mt-2 inline-flex items-center gap-2 text-[16px] font-medium uppercase tracking-[0.16px] text-[#517EC1] hover:underline`}
          >
            VER TODO <span aria-hidden="true">⟶</span>
          </a>
        </div>

        <div className="hidden gap-2 md:flex" aria-label="Controles del carrusel">
          <button
            type="button"
            aria-label="Ver productos anteriores"
            disabled={atStart}
                        onClick={() => scrollProducts(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#517EC1] text-[#517EC1] transition-colors hover:bg-[#517EC1] hover:text-white disabled:cursor-default disabled:border-[#DCDDE3] disabled:text-[#B7BEE2] disabled:hover:bg-transparent disabled:hover:text-[#B7BEE2]"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="9"
              viewBox="0 0 16 8"
              fill="none"
            >
              <path
                d="M0.146445 3.32845C-0.0488167 3.52371 -0.0488167 3.8403 0.146445 4.03556L3.32843 7.21754C3.52369 7.4128 3.84027 7.4128 4.03553 7.21754C4.23079 7.02228 4.23079 6.7057 4.03553 6.51043L1.20711 3.68201L4.03553 0.853579C4.2308 0.658317 4.2308 0.341734 4.03553 0.146472C3.84027 -0.0487903 3.52369 -0.0487903 3.32843 0.146472L0.146445 3.32845ZM15.5 3.18201L0.499999 3.18201L0.499999 4.18201L15.5 4.18201L15.5 3.18201Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Ver siguientes productos"
            disabled={atEnd}
                        onClick={() => scrollProducts(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#517EC1] text-[#517EC1] transition-colors hover:bg-[#517EC1] hover:text-white disabled:cursor-default disabled:border-[#DCDDE3] disabled:text-[#B7BEE2] disabled:hover:bg-transparent disabled:hover:text-[#B7BEE2]"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="9"
              viewBox="0 0 16 8"
              fill="none"
            >
              <path
                d="M15.3536 4.03556C15.5488 3.8403 15.5488 3.52372 15.3536 3.32845L12.1716 0.146473C11.9763 -0.0487893 11.6597 -0.0487893 11.4645 0.146473C11.2692 0.341735 11.2692 0.658318 11.4645 0.85358L14.2929 3.68201L11.4645 6.51043C11.2692 6.7057 11.2692 7.02228 11.4645 7.21754C11.6597 7.4128 11.9763 7.4128 12.1716 7.21754L15.3536 4.03556ZM0 4.18201H15V3.18201H0V4.18201Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateArrows}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Productos más vendidos"
        tabIndex={0}
        className="relative flex snap-x snap-mandatory gap-[2.78vw] overflow-x-auto scroll-pl-[3.89vw] px-[3.89vw] pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-[1.3vw] md:scroll-pl-[2.08vw] md:px-[2.08vw] lg:gap-[1.5vw] lg:scroll-pl-[1.53vw] lg:px-[1.53vw]"
      >
        {products.map((product) => (
          <article
            key={product.name}
            data-product-card
            className="w-[81.67vw] min-w-0 shrink-0 snap-start md:w-[54.69vw] lg:w-[29vw]"
          >
            <div className="relative grid aspect-[420/520] w-full place-items-center overflow-hidden bg-[#FBFAFB]">
              <Image
                src={product.src}
                alt={product.name}
                fill
                sizes="(max-width: 767px) 82vw, (max-width: 1023px) 55vw, 29vw"
                className="object-cover object-center"
              />
              <span
                className={`${fontClassName} absolute top-[3vw] left-[3vw] bg-[#EC856A] px-2 py-1 text-[10px] text-white uppercase sm:top-[1.5vw] sm:left-[1.5vw] lg:top-[1vw] lg:left-[1vw]`}
              >
                OFERTA
              </span>
            </div>

            <div className="pt-3">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5" aria-label="5 estrellas de 5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image
                      key={index}
                      src="/icons/star.svg"
                      alt=""
                      width={13}
                      height={13}
                    />
                  ))}
                </div>
                <span className="text-[12px] text-slate-600">(42)</span>
              </div>
              <h3
                className={`${fontClassName} mt-2 text-[14px] text-slate-900`}
              >
                {product.name}
              </h3>
              <div
                className={`${fontClassName} mt-1 flex flex-wrap items-center gap-x-3 text-[13px]`}
              >
                <span className="text-slate-400 line-through">
                  {product.priceOld}
                </span>
                <span className="font-medium text-slate-900">
                  {product.priceNew}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
