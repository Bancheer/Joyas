import Image from "next/image";
import Link from "next/link";
import { metropolis, parisienne } from "@/app/fonts";

// Первый экран главной. Макеты: 360 — 298:1206, 768 — 312:4654, 1440 — hero-sec.
// На телефоне отдельное вертикальное фото (обе девушки в кадре) и фон, продолжающий его вверх.
export default function Hero() {
  const button = (
    <Link
      href="/joyas"
      className="inline-flex items-center justify-center border border-white px-[26px] py-[14px] text-[14px] font-medium uppercase leading-none tracking-[0.14px] text-white transition-colors hover:bg-white hover:text-[#517EC1]"
    >
      Shop collection
    </Link>
  );
  const text =
    "Joyas Rodriguez es más que una marca: es una fuente de inspiración y empoderamiento. Cada pieza de Joyas Rodriguez cuenta una historia única y captura la esencia de la belleza y la gracia.";

  return (
    <section className={`${metropolis.className} relative overflow-hidden bg-[#7D8494] text-white`}>
      {/* ── Телефон ── */}
      <div className="relative aspect-[360/688] md:hidden">
        {/* Отзеркаленная копия фото — продолжает фон над основным кадром */}
        <span aria-hidden className="absolute left-[-27.78%] top-[-66.28%] h-[82.7%] w-[130.83%] -scale-y-100 overflow-hidden">
          <span className="absolute left-[-70.66%] top-[1.41%] h-[98.59%] w-[186.06%]">
            <Image src="/assets/hero-mobile.png" alt="" fill sizes="250vw" className="object-cover" />
          </span>
        </span>
        <span className="absolute left-[-27.78%] top-[15.26%] h-[85.76%] w-[130.83%] overflow-hidden">
          <span className="absolute left-[-70.66%] top-0 h-full w-[186.06%]">
            <Image
              src="/assets/hero-mobile.png"
              alt="Dos amigas con una caja de Joyas Rodriguez"
              fill
              priority
              sizes="250vw"
              className="object-cover"
            />
          </span>
        </span>

        <div className="absolute inset-x-[14px] top-[50px]">
          <h1 className={`${parisienne.className} text-[46px] leading-[1.2]`}>
            Cada Joya cuenta
            <br />
            una historia
          </h1>
          <p className="mt-[8px] max-w-[332px] text-[14px] leading-[1.4] tracking-[0.14px]">{text}</p>
          <div className="mt-[30px]">{button}</div>
        </div>
      </div>

      {/* ── Планшет и компьютер ── */}
      <div className="relative hidden h-[590px] md:block">
        <Image
          src="/assets/hero-tablet.png"
          alt="Dos amigas con una caja de Joyas Rodriguez"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 1px"
          className="object-cover object-[70%_100%] lg:hidden"
        />
        <Image
          src="/assets/hero.png"
          alt="Dos amigas con una caja de Joyas Rodriguez"
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 1px"
          className="hidden object-cover lg:block"
        />

        <div className="absolute left-4 top-[120px] lg:left-20">
          <p aria-hidden className={`${parisienne.className} whitespace-nowrap text-[68px] leading-[1.2]`}>
            Cada Joya cuenta
          </p>
          <p
            aria-hidden
            className={`${parisienne.className} -mt-[21px] ml-[5px] whitespace-nowrap text-[68px] leading-[1.2] lg:ml-[225px]`}
          >
            una historia
          </p>
          <h1 className="sr-only">Cada Joya cuenta una historia</h1>
          <p className="mt-[8px] w-[355px] text-[14px] leading-[1.4] tracking-[0.14px] lg:w-[510px]">
            {text}
          </p>
          <div className="mt-16 lg:mt-9 lg:ml-[321px]">{button}</div>
        </div>
      </div>
    </section>
  );
}
