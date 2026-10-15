import Image from "next/image";
import Link from "next/link";
import { metropolis } from "@/app/fonts";

// Промо-полоса + шапка сайта (общие для всех страниц)
export default function SiteHeader() {
  return (
    <>
      {/* Top promo bar */}
      <div className="relative w-full bg-[#B7BEE2] text-slate-900 py-2 px-3">
        {/* соц.иконки слева, центрированы по высоте */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-3 z-10">
          <a
            href="https://facebook.com/yourpage"
            aria-label="Facebook"
            className="p-0 hover:opacity-80 transition"
          >
            <Image
              src="/icons/facebook.svg"
              alt=""
              width={20}
              height={20}
              priority
            />
          </a>
          <a
            href="https://instagram.com/yourpage"
            aria-label="Instagram"
            className="p-0 hover:opacity-80 transition"
          >
            <Image
              src="/icons/instagram.svg"
              alt=""
              width={20}
              height={20}
              priority
            />
          </a>
        </div>

        {/* текст строго по центру */}
        <div className="text-center text-[13px] sm:text-[14px]">
          <span
            className={`${metropolis.className} font-medium tracking-[0.02em] uppercase`}
          >
            DESCUENTO EXTRA:
          </span>
          <span className={`${metropolis.className} font-normal`}>
            {" "}
            Aplicado al carrito sobre dos o más artículos
          </span>
        </div>
      </div>

      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 text-slate-900 backdrop-blur">
        {/* полоса на 100vw */}
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          {/* строка хедера, фиксируем высоту */}
          <div className="relative h-16">
            {/* LEFT — прижат к левому краю окна */}
            <nav className="absolute inset-y-0 left-3 sm:left-4 lg:left-6 flex items-center gap-5 text-sm">
              <Link href="/" className="hover:text-black">
                INICIO
              </Link>
              <Link href="/joyas" className="hover:text-black">
                JOYAS
              </Link>
              <Link href="/regalos" className="hover:text-black">
                REGALOS
              </Link>
              <a href="#tendencias" className="hover:text-black">
                TENDENCIAS
              </a>
            </nav>

            {/* CENTER — логотип строго по центру */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center">
              <Link
                href="/"
                aria-label="Joyas Rodriguez – logo"
                className="block"
              >
                <Image
                  src="/icons/logo.png"
                  alt="Joyas Rodriguez"
                  width={300}
                  height={64}
                  priority
                  className="w-[120px] sm:w-[140px] md:w-[170px] lg:w-[200px] h-auto object-contain"
                  sizes="(max-width:640px) 140px, (max-width:768px) 160px, (max-width:1024px) 200px, 240px"
                />
              </Link>
            </div>

            {/* RIGHT — прижат к правому краю окна */}
            <div className="absolute inset-y-0 right-3 sm:right-4 lg:right-6 flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wide">
                <a href="#contacto" className="hover:text-slate-700">
                  CONTACTO
                </a>
                <a href="#pedido" className="hover:text-slate-700">
                  SIGUE TU PEDIDO
                </a>
              </nav>
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  aria-label="Cuenta"
                  className="inline-flex h-8 w-8 items-center justify-center hover:opacity-80"
                >
                  <Image src="/icons/user.svg" alt="" width={20} height={20} />
                </button>
                <button
                  aria-label="Buscar"
                  className="inline-flex h-8 w-8 items-center justify-center hover:opacity-80"
                >
                  <Image
                    src="/icons/search.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </button>
                <button
                  aria-label="Carrito"
                  className="inline-flex h-8 w-8 items-center justify-center hover:opacity-80"
                >
                  <Image src="/icons/bag.svg" alt="" width={20} height={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
