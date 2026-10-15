import Image from "next/image";
import Link from "next/link";
import { metropolis, parisienne } from "@/app/fonts";

// «Sobre nosotros — Felicidad y Paz». Телефон и планшет: фото сверху, текст снизу;
// компьютер: две половины. Макеты: 360 — 298:1478, 768 — 312:4920, 1440 — about.
export default function About() {
  return (
    <section id="sobre-nosotros" className={`${metropolis.className} grid w-full lg:grid-cols-2`}>
      <div className="relative aspect-[720/717] w-full overflow-hidden">
        <Image
          src="/about.jpg"
          alt="Tarjeta Amor Propio y anillo en una caja de regalo"
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover object-left"
        />
      </div>

      <div className="flex h-[496px] flex-col items-center justify-center bg-[#F4F5FB] px-[14px] text-center md:h-[595px] lg:aspect-[720/717] lg:h-auto lg:px-12">
        <p className="text-[12px] uppercase tracking-[0.96px] text-[#131314]">Sobre nosotros</p>

        <h2 className={`${parisienne.className} mt-[22px] text-[44px] leading-none text-[#131314] md:mt-[38px] md:text-[56px]`}>
          Felicidad y Paz
        </h2>

        <div className="mt-5 flex max-w-[332px] flex-col gap-2 text-[12px] leading-[1.4] tracking-[0.12px] text-[#2A2B2D] md:max-w-[512px]">
          <p>
            La mayoría de nuestras piezas de joyería están hechas de plata de ley 925. No sólo están
            hechas para brillar y relucir, sino también para durar.
          </p>
          <p>Cada Joya llega con su propia cajita y con su tarjeta con un mensaje significativo.</p>
          <p>
            Joyas Rodríguez encarna el espíritu de aventura y el valor para perseguir tus sueños.
          </p>
        </div>

        <div className="mt-5 flex gap-[10px]">
          <a href="https://facebook.com/yourpage" aria-label="Facebook" className="hover:opacity-70">
            <Image src="/icons/footer-facebook.svg" alt="" width={28} height={28} />
          </a>
          <a href="https://www.instagram.com/joyas_rodriguez_/" aria-label="Instagram" className="hover:opacity-70">
            <Image src="/icons/footer-instagram.svg" alt="" width={28} height={28} />
          </a>
        </div>

        <Link
          href="/sobre-nosotros"
          className="mt-11 border border-[#131314] px-[30px] py-4 text-[14px] font-medium uppercase leading-none tracking-[0.14px] text-[#131314] transition-colors hover:bg-[#131314] hover:text-white md:mt-[66px] lg:mt-[70px]"
        >
          Más acerca de nosotros
        </Link>
      </div>
    </section>
  );
}
