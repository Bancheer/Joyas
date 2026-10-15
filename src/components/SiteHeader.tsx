import Image from "next/image";
import Link from "next/link";
import { metropolis } from "@/app/fonts";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS, SECONDARY_LINKS } from "./navLinks";

// Промо-полоса + шапка сайта (общие для всех страниц).
// Макеты: 1440 — 310:277, 768 — 310:629 (бургер), 360 — 310:880 (бургер, без поиска)
export default function SiteHeader() {
  return (
    <>
      {/* Промо-полоса */}
      <div
        className={`${metropolis.className} relative flex h-[34px] items-center overflow-hidden bg-[#B7BEE2] text-[12px] text-[#131314]`}
      >
        {/* Соцсети — только на планшете и компьютере */}
        <div className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-[10px] md:flex lg:left-[22px]">
          <a href="https://facebook.com/yourpage" aria-label="Facebook" className="hover:opacity-70">
            <Image src="/icons/facebook.svg" alt="" width={18} height={18} priority />
          </a>
          <a href="https://instagram.com/yourpage" aria-label="Instagram" className="hover:opacity-70">
            <Image src="/icons/instagram.svg" alt="" width={18} height={18} priority />
          </a>
        </div>

        {/* На телефоне текст не помещается — делаем бегущую строку */}
        <p className="w-full whitespace-nowrap text-center max-md:w-auto max-md:animate-marquee motion-reduce:max-md:w-full motion-reduce:max-md:animate-none motion-reduce:max-md:truncate">
          <span className="font-medium uppercase">Descuento Extra:</span> Aplicado al carrito
          sobre dos o más artículos
        </p>
      </div>

      {/* Шапка */}
      <header
        className={`${metropolis.className} sticky top-0 z-50 border-b border-slate-200 bg-white/90 text-[#131314] backdrop-blur`}
      >
        <div className="relative flex h-16 items-center justify-between px-[14px] md:px-4 lg:px-[22px]">
          {/* Слева: бургер (до 1024px) или меню (компьютер) */}
          <div className="lg:hidden">
            <MobileMenu fontClassName={metropolis.className} />
          </div>
          <nav aria-label="Menú principal" className="hidden items-center gap-[38px] text-[12px] lg:flex">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="uppercase hover:text-[#517EC1]">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* По центру: логотип */}
          <Link
            href="/"
            aria-label="Joyas Rodriguez — inicio"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/icons/logo.png"
              alt="Joyas Rodriguez"
              width={185}
              height={38}
              priority
              className="h-auto w-[142px] md:w-[185px]"
            />
          </Link>

          {/* Справа: доп. меню (компьютер) и иконки */}
          <div className="flex items-center gap-[38px]">
            <nav aria-label="Ayuda" className="hidden items-center gap-[38px] text-[12px] lg:flex">
              {SECONDARY_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="uppercase hover:text-[#517EC1]">
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-[14px] md:gap-4">
              <button type="button" aria-label="Cuenta" className="hover:opacity-70">
                <Image src="/icons/user.svg" alt="" width={24} height={24} />
              </button>
              <button type="button" aria-label="Buscar" className="hidden hover:opacity-70 md:block">
                <Image src="/icons/search.svg" alt="" width={24} height={24} />
              </button>
              <button type="button" aria-label="Carrito" className="hover:opacity-70">
                <Image src="/icons/bag.svg" alt="" width={24} height={24} />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
