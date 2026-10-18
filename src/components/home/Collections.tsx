import Image from "next/image";
import Link from "next/link";
import ScrollCarousel from "@/components/ScrollCarousel";
import { metropolis, nunito } from "@/app/fonts";

// «Elige la joya perfecta…» — коллекции.
// Телефон и планшет: карусель со свайпом и точками, компьютер: 3 карточки в ряд.
// Размеры в vw — пропорции макетов (карточка 294 из 360, 449 из 768, 449 из 1440),
// поэтому карточки привязаны к краям и не меняются относительно экрана при масштабировании.
// Макеты: 298:1214, 312:4661, collections (1440).
const collections = [
  {
    label: "Los más vendidos",
    color: "#6E7A94",
    href: "/joyas/mas-vendidos",
    image: "/collections/mas-vendidos.jpg",
    alt: "Anillo de plata con circonitas",
    position: "50% 30%",
  },
  {
    label: "San Valentín",
    color: "#FF688C",
    href: "/regalos",
    image: "/collections/san-valentin.jpg",
    alt: "Anillo de plata con forma de montañas",
    position: "50% 50%",
  },
  {
    label: "Regalos",
    color: "#B7BEE2",
    href: "/regalos",
    image: "/collections/regalos.jpg",
    alt: "Anillo con ojo turco azul",
    position: "45% 50%",
  },
];

export default function Collections() {
  return (
    <section
      aria-labelledby="colecciones-title"
      className={`${metropolis.className} mt-[100px] md:mt-[120px]`}
    >
      <header className="mx-auto flex max-w-[694px] flex-col gap-2 px-[14px] text-center">
        <h2
          id="colecciones-title"
          className={`${nunito.className} text-[28px] font-semibold uppercase leading-[1.35] text-[#131314] md:text-[34px]`}
        >
          Elige la joya perfecta para ti o para tus seres queridos.
        </h2>
        <p className="text-[14px] leading-[1.2] tracking-[0.14px] text-[#2A2B2D]">
          Hecha un vistazo a nuestras colecciones destacadas
        </p>
      </header>

      <ScrollCarousel
        label="Colecciones destacadas"
        trackClassName="mt-[30px] flex gap-[3.33vw] scroll-px-[3.89vw] px-[3.89vw] md:mt-[50px] md:gap-[3.26vw] md:scroll-px-[2.08vw] md:px-[2.08vw] lg:grid lg:grid-cols-3 lg:gap-[1.74vw] lg:overflow-visible lg:px-[1.49vw]"
        itemClassName="w-[81.67vw] md:w-[58.46vw] lg:w-auto"
        dotsClassName="mt-6 lg:hidden"
      >
        {collections.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group relative block aspect-[294/347] overflow-hidden md:aspect-[449/530]"
          >
            <Image
              src={c.image}
              alt={c.alt}
              fill
              sizes="(max-width: 767px) 82vw, (max-width: 1023px) 59vw, 31vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              style={{ objectPosition: c.position }}
            />
            <span
              className="absolute left-3 top-3 p-2 text-[10px] font-medium uppercase leading-none tracking-[0.1px] text-white"
              style={{ backgroundColor: c.color }}
            >
              {c.label}
            </span>
          </Link>
        ))}
      </ScrollCarousel>

      <div className="mt-[42px] flex justify-center md:mt-[50px]">
        <Link
          href="/joyas"
          className="border border-[#131314] px-[30px] py-4 text-[14px] font-medium uppercase leading-none tracking-[0.14px] text-[#131314] transition-colors hover:bg-[#131314] hover:text-white"
        >
          Ver las colecciones
        </Link>
      </div>
    </section>
  );
}
