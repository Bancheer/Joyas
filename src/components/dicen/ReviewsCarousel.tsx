"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Stars } from "@/components/home/TrustStrip";
import { nunito } from "@/app/fonts";

// «Reseñas»: карточки 420×493 со свайпом. Стрелки — на планшете и компьютере, точки — на телефоне.
// Макеты: 447:1584 (1440), 490:7165 (768), 490:7914 (360).
const reviews = [
  {
    name: "Carmen Pedraza",
    avatar: "/dicen/avatar-1.png",
    avatarPos: "50% 62%",
    photo: "/dicen/resena-1.png",
    photoPos: "50% 79%",
    text: "Hermoso anillo. Gran calidad y agradable material suave. Es un regalo de cumpleaños para mi hermana. Estoy realmente muy satisfecha con esto",
  },
  {
    name: "Sara Royal Prestige",
    avatar: "/dicen/avatar-2.png",
    avatarPos: "50% 0%",
    photo: "/dicen/resena-2.png",
    photoPos: "50% 61%",
    text: "Muy bonita hoy me llegó😍 esta padrisima. Llegó en 8 días .Muy satisfecha con mi compra, lo recomiendo. Muchas gracias❤️",
  },
  {
    name: "Pamella Diaz",
    avatar: "/dicen/avatar-3.png",
    avatarPos: "50% 25%",
    photo: "/dicen/resena-3.png",
    photoPos: "50% 72%",
    text: "Acabo de recibir mi anillo Girasol 🥰 Está precioso. Además ajustable y viene acompañado de su certificado y unas tarjetas llenas de detalles. Super recomendable",
  },
  {
    name: "Indhira Alvarado",
    avatar: "/dicen/avatar-4.png",
    avatarPos: "50% 25%",
    photo: "/dicen/resena-4.png",
    photoPos: "50% 54%",
    text: "Me encanto, súper buena calidad esta hermoso😍 Muchas gracias !!",
  },
];

export default function ReviewsCarousel({ className = "" }: { className?: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const step = () => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 1;
    return first.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const end = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(end);
    setActive(end ? reviews.length - 1 : Math.round(el.scrollLeft / step()));
  };

  const scrollBy = (dir: -1 | 1) => trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  const goTo = (i: number) =>
    (trackRef.current?.children[i] as HTMLElement | undefined)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });

  const arrow =
    "flex size-9 items-center justify-center rounded-full border border-[#517EC1] text-[#517EC1] transition-colors hover:bg-[#517EC1] hover:text-white disabled:border-[#DCDDE3] disabled:text-[#B7BEE2] disabled:hover:bg-transparent";

  return (
    <section aria-labelledby="resenas" className={className}>
      <div className="flex items-center justify-between px-[3.89vw] md:px-[2.08vw] lg:px-[1.53vw]">
        <h2 id="resenas" className={`${nunito.className} text-[28px] font-semibold uppercase leading-[1.35] text-[#131314] md:text-[34px]`}>
          Reseñas
        </h2>
        <div className="hidden gap-[10px] md:flex">
          <button type="button" aria-label="Reseña anterior" disabled={atStart} onClick={() => scrollBy(-1)} className={arrow}>
            <svg aria-hidden width="16" height="8" viewBox="0 0 16 8" fill="none">
              <path d="M.15 3.33a.5.5 0 0 0 0 .7l3.18 3.19a.5.5 0 1 0 .7-.71L1.21 3.68 4.04.85a.5.5 0 1 0-.71-.7L.15 3.32ZM15.5 3.18H.5v1h15v-1Z" fill="currentColor" />
            </svg>
          </button>
          <button type="button" aria-label="Reseña siguiente" disabled={atEnd} onClick={() => scrollBy(1)} className={arrow}>
            <svg aria-hidden width="16" height="8" viewBox="0 0 16 8" fill="none">
              <path d="M15.35 4.04a.5.5 0 0 0 0-.71L12.17.15a.5.5 0 1 0-.7.7l2.82 2.83-2.82 2.83a.5.5 0 1 0 .7.7l3.18-3.17ZM0 4.18h15v-1H0v1Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={onScroll}
        aria-label="Reseñas de clientes"
        className="mt-[30px] flex snap-x snap-mandatory gap-[2.78vw] overflow-x-auto scroll-px-[3.89vw] px-[3.89vw] [scrollbar-width:none] md:gap-[1.3vw] md:scroll-px-[2.08vw] md:px-[2.08vw] lg:gap-[0.69vw] lg:scroll-px-[1.53vw] lg:px-[1.53vw] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r) => (
          <li key={r.name} className="flex w-[92.22vw] shrink-0 snap-start flex-col rounded-[2px] bg-[#F4F5FB] md:w-[54.69vw] lg:w-[29.17vw]">
            <div className="flex items-center gap-[18px] p-[22px]">
              <span className="relative size-[66px] shrink-0 overflow-hidden rounded-full bg-white">
                <Image src={r.avatar} alt="" fill sizes="66px" className="object-cover" style={{ objectPosition: r.avatarPos }} />
              </span>
              <div className="flex flex-col gap-[3px]">
                <Stars />
                <p className="flex items-center gap-[5px] text-[18px] font-medium leading-[1.4] tracking-[0.18px] text-[#131314]">
                  {r.name}
                  <Image src="/icons/check-circle.svg" alt="Cliente verificado" width={28} height={28} />
                </p>
              </div>
            </div>
            <span className="relative mt-[20px] block aspect-[420/211] w-full shrink-0 overflow-hidden">
              <Image src={r.photo} alt="" fill sizes="(max-width: 767px) 92vw, (max-width: 1023px) 55vw, 30vw" className="object-cover" style={{ objectPosition: r.photoPos }} />
            </span>
            <p className="mt-auto px-[22px] pb-[23px] pt-[30px] text-[14px] leading-[1.4] tracking-[0.14px] text-[#131314]">{r.text}</p>
          </li>
        ))}
      </ul>

      {/* Точки — только на телефоне */}
      <div className="mt-6 flex items-center justify-center gap-[10px] md:hidden">
        {reviews.map((r, i) => (
          <button
            key={r.name}
            type="button"
            aria-label={`Reseña ${i + 1}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all ${i === active ? "size-[10px] bg-[#B7BEE2]" : "size-[6px] bg-[#DCDDE3]"}`}
          />
        ))}
      </div>
    </section>
  );
}
