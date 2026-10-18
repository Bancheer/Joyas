import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollCarousel from "@/components/ScrollCarousel";
import { metropolis, nunito } from "@/app/fonts";

// «La experiencia Joyas Rodriguez». Телефон: карусель по одному пункту с точками (298:1502),
// планшет: пункты столбиком (312:4944), компьютер: 4 в ряд (294:464).
const items = [
  {
    icon: "/icons/experiencia-envio.svg",
    title: "Envíos gratuitos",
    text: "Ofrecemos envíos gratuitos en todos los pedidos con un tiempo de entrega de 6-12 días laborables.",
    cta: "Para saber más",
    href: "#envio",
  },
  {
    icon: "/icons/experiencia-servicio.svg",
    title: "Joyas Rodriguez a tu servicio",
    text: "Nuestros expertos en atención al cliente están siempre a tu disposición para cualquier duda que tengas.",
    cta: "Contáctenos",
    href: "#contacto",
  },
  {
    icon: "/icons/experiencia-historias.svg",
    title: "Historias únicas",
    text: "Nuestras joyas cuentan historias únicas y cada una llega con su propia tarjeta de mensaje, lista para regalar.",
    cta: "Descubre las colecciones",
    href: "/joyas",
  },
  {
    icon: "/icons/experiencia-caja.svg",
    title: "La icónica Caja Azul",
    text: "Tu compra de Joyas Rodríguez siempre llega empaquetada en nuestra Caja Azul, elegante y refinada.",
    cta: "Descubre todos los regalos",
    href: "/regalos",
  },
];

type Item = (typeof items)[number];

function ExperienceItem({ item }: { item: Item }) {
  return (
    <div className="flex flex-col items-center gap-[18px] text-center">
      <div className="flex flex-col items-center gap-3">
        <Image src={item.icon} alt="" width={164} height={126} />
        <div className="flex max-w-[296px] flex-col gap-[13px] leading-[1.4]">
          <h3 className="text-[18px] font-medium tracking-[0.18px] text-[#131314]">{item.title}</h3>
          <p className="text-[12px] tracking-[0.12px] text-[#2A2B2D]">{item.text}</p>
        </div>
      </div>
      <Link
        href={item.href}
        className="group flex items-center gap-[3px] text-[14px] font-medium uppercase tracking-[0.14px] text-[#517EC1]"
      >
        {item.cta}
        <Image
          src="/icons/arrow-right-blue.svg"
          alt=""
          width={32}
          height={32}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}

// intro — абзац под заголовком (есть на странице «Quién somos»)
export default function Experience({ intro }: { intro?: ReactNode }) {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-title"
      className={`${metropolis.className} mt-[100px] bg-[#F4F5FB] py-[60px] md:mt-[140px] lg:px-[80px]`}
    >
      <h2
        id="experiencia-title"
        className={`${nunito.className} mx-auto max-w-[886px] px-[14px] text-center text-[28px] font-semibold uppercase leading-[1.35] text-[#131314] md:px-4 md:text-[34px]`}
      >
        La experiencia Joyas Rodriguez
      </h2>
      {intro && (
        <p className="mx-auto mt-2 max-w-[360px] px-[14px] text-center text-[12px] leading-[1.4] tracking-[0.12px] text-[#2A2B2D] md:max-w-[764px] md:px-4">
          {intro}
        </p>
      )}

      {/* Телефон — карусель */}
      <div className="md:hidden">
        <ScrollCarousel
          label="La experiencia Joyas Rodriguez"
          trackClassName="mt-[30px] flex"
          itemClassName="flex w-full justify-center px-[14px]"
          dotsClassName="mt-[50px]"
        >
          {items.map((item) => (
            <ExperienceItem key={item.title} item={item} />
          ))}
        </ScrollCarousel>
      </div>

      {/* Планшет — столбиком, компьютер — 4 в ряд */}
      <ul className="mx-auto mt-[50px] hidden max-w-[1280px] flex-col items-center gap-8 md:flex lg:grid lg:grid-cols-4 lg:items-start">
        {items.map((item) => (
          <li key={item.title}>
            <ExperienceItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
