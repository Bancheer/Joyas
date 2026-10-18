"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Меню телефона и планшета (макеты: 360 — 303:9067 / 312:5721 открыт «Joyas», 768 — 312:7160 / 312:8534).
// Открывается под шапкой и занимает экран до низа; шапка с логотипом остаётся видна,
// бургер превращается в крестик.
// Шапка — sticky с backdrop-blur, а такой предок ломает position:fixed у потомков,
// поэтому панель позиционируется absolute от шапки, а высота считается от её нижнего края.

const JOYAS_LINKS = [
  { label: "Todos", href: "/joyas" },
  { label: "Anillos", href: "/joyas/anillos" },
  { label: "Pulseras", href: "/joyas/pulseras" },
  { label: "Pendientes", href: "/joyas/pendientes" },
  { label: "Collares", href: "/joyas/collares" },
  { label: "Más Vendidos", href: "/joyas/mas-vendidos" },
  { label: "Novedades", href: "/joyas/novedades" },
  { label: "Para hombre", href: "/regalos/hombres" },
];

const LINKS = [
  { label: "Regalos", href: "/regalos", arrow: true },
  { label: "Tendencias", href: "/#tendencias", arrow: true },
  { label: "Inicio", href: "/" },
  { label: "Contacto", href: "#contacto" },
  { label: "Sigue tu pedido", href: "#pedido" },
];

function Arrow() {
  return (
    <svg aria-hidden width="34" height="8" viewBox="0 0 34 8" fill="none" className="shrink-0">
      <path d="M33.35 4.35a.5.5 0 0 0 0-.7L30.17.46a.5.5 0 1 0-.7.71L32.29 4l-2.82 2.83a.5.5 0 1 0 .7.7l3.18-3.18ZM0 4.5h33v-1H0v1Z" fill="currentColor" />
    </svg>
  );
}

export default function MobileMenu({ fontClassName }: { fontClassName: string }) {
  const [open, setOpen] = useState(false);
  const [joyasOpen, setJoyasOpen] = useState(false);
  const [top, setTop] = useState(64);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    if (!open) {
      // Нижний край шапки в окне (над ней может быть промо-полоса)
      const header = buttonRef.current?.closest("header");
      setTop(header ? header.getBoundingClientRect().bottom : 64);
    }
    setOpen((v) => !v);
  };
  const close = () => setOpen(false);

  // Esc закрывает меню; пока меню открыто, страница под ним не прокручивается
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // На компьютере (≥1024px) меню не показывается — закрываем, чтобы не осталась блокировка прокрутки
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => desktop.matches && setOpen(false);
    desktop.addEventListener("change", onDesktop);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={toggle}
        className="flex size-[35px] items-center justify-center text-[#131314] transition-colors hover:text-[#517EC1] md:size-10"
      >
        {open ? (
          <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          <Image src="/icons/hamburger.svg" alt="" width={40} height={40} className="size-full" />
        )}
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Menú principal"
          style={{ height: `calc(100dvh - ${top}px)` }}
          className={`${fontClassName} absolute inset-x-0 top-full z-[60] overflow-y-auto overscroll-contain border-t border-[#F0F3FF] bg-white text-[#131314] lg:hidden`}
        >
          {/* Баннер «Más vendidos» */}
          <Link href="/joyas/mas-vendidos" onClick={close} className="group relative block h-[146px] overflow-hidden md:h-[220px]">
            <Image src="/joyas/mas-vendidos.png" alt="" fill sizes="100vw" className="object-cover object-[50%_72%]" />
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(rgba(39,48,96,0.2),rgba(39,48,96,0.2))]" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-[#131314] bg-white/40 px-[30px] py-[14px] text-[14px] font-medium uppercase leading-none tracking-[0.14px] transition-colors group-hover:bg-white/70">
              Más vendidos
            </span>
          </Link>

          <ul className="px-[14px] md:px-4">
            {/* Joyas — раскрывающийся список */}
            <li className="border-b border-[#C9CBD3]">
              <button
                type="button"
                aria-expanded={joyasOpen}
                onClick={() => setJoyasOpen((v) => !v)}
                className={`flex h-[57px] w-full items-center gap-[18px] text-[14px] uppercase tracking-[0.14px] transition-colors ${
                  joyasOpen ? "text-[#517EC1]" : "hover:text-[#517EC1]"
                }`}
              >
                Joyas
                <Arrow />
              </button>
              {joyasOpen && (
                <ul className="flex flex-col gap-[14px] pb-[22px] pt-1 text-[14px] leading-[1.3] tracking-[0.14px]">
                  {JOYAS_LINKS.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} onClick={close} className="hover:text-[#517EC1]">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {LINKS.map((l, i) => (
              <li key={l.label} className={i < LINKS.length - 1 ? "border-b border-[#C9CBD3]" : ""}>
                <Link
                  href={l.href}
                  onClick={close}
                  className="flex h-[57px] items-center gap-[18px] text-[14px] uppercase tracking-[0.14px] transition-colors hover:text-[#517EC1]"
                >
                  {l.label}
                  {l.arrow && <Arrow />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-[30px] flex flex-col gap-[6px] px-[14px] md:px-4">
            <Link
              href="/joyas/mas-vendidos"
              onClick={close}
              className="flex h-[46px] items-center justify-center border border-[#131314] text-[14px] font-medium uppercase tracking-[0.14px] transition-colors hover:bg-[#131314] hover:text-white"
            >
              Más vendidos
            </Link>
            <Link
              href="/joyas/novedades"
              onClick={close}
              className="flex h-[46px] items-center justify-center bg-[#131314] text-[14px] font-medium uppercase tracking-[0.14px] text-white transition-colors hover:bg-[#517EC1]"
            >
              Novedades
            </Link>
          </div>

          {/* ВРЕМЕННО: поиск ведёт в каталог с параметром q — сам поиск по товарам ещё не подключён */}
          <form action="/joyas" className="mt-[34px] flex items-end gap-3 px-[14px] md:px-4">
            <label htmlFor="menu-search" className="sr-only">
              Buscar
            </label>
            <input
              id="menu-search"
              name="q"
              type="search"
              placeholder="Search"
              className="h-8 min-w-0 flex-1 border-b border-[#2A2B2D] bg-transparent text-[14px] text-[#131314] placeholder:text-[#B5B5B5] focus:outline-none"
            />
            <button type="submit" className="pb-1 text-[14px] font-medium uppercase tracking-[0.14px] hover:text-[#517EC1]">
              Search
            </button>
          </form>

          <div className="flex gap-3 px-[14px] pb-8 pt-6 md:px-4">
            <a href="https://facebook.com/yourpage" aria-label="Facebook" className="hover:opacity-70">
              <Image src="/icons/footer-facebook.svg" alt="" width={28} height={28} />
            </a>
            <a href="https://www.instagram.com/joyas_rodriguez_/" aria-label="Instagram" className="hover:opacity-70">
              <Image src="/icons/footer-instagram.svg" alt="" width={28} height={28} />
            </a>
          </div>
        </nav>
      )}
    </>
  );
}
