"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS, SECONDARY_LINKS } from "./navLinks";

// Бургер + выезжающее меню (планшет и телефон, макет 310:880 / 310:629)
export default function MobileMenu({ fontClassName }: { fontClassName: string }) {
  const [open, setOpen] = useState(false);
  // Esc закрывает меню; пока меню открыто, страница под ним не прокручивается
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="flex size-[35px] items-center justify-center md:size-10"
      >
        <Image src="/icons/hamburger.svg" alt="" width={40} height={40} className="size-full" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/30"
          />
          <nav
            id="mobile-menu"
            aria-label="Menú principal"
            className={`${fontClassName} absolute inset-y-0 left-0 flex w-[85%] max-w-[360px] flex-col bg-white px-6 py-5 shadow-xl`}
          >
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="mb-6 self-end p-2 text-[28px] leading-none text-[#131314]"
            >
              ×
            </button>
            <ul className="flex flex-col gap-5 border-b border-[#DFE1F0] pb-6">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-[16px] font-medium uppercase tracking-[0.16px] text-[#131314]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-col gap-4">
              {SECONDARY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-[14px] uppercase tracking-[0.14px] text-[#2A2B2D]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
