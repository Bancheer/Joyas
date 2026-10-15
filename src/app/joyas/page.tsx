import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { metropolis, nunito } from "../fonts";

export const metadata: Metadata = {
  title: "Joyas | Joyas Rodriguez",
  description:
    "Descubre nuestras joyas: pulseras, anillos, pendientes y collares de plata.",
};

// Макет Figma: «PAGES OF COLLECTIONS - JOYAS» (node 310:272), ширина 1440px.
// Изображения скачиваются скриптом: node scripts/fetch-figma-assets.mjs

// Две большие плитки сверху (694×431, квадратное фото обрезано снизу)
const featured = [
  {
    label: "Más Vendidos",
    href: "/joyas/mas-vendidos",
    image: "/joyas/mas-vendidos.png",
    alt: "Manos con anillos y pulsera de plata",
    objectY: "88%", // в макете фото сдвинуто на -231px
  },
  {
    label: "Novedades",
    href: "/joyas/novedades",
    image: "/joyas/novedades.png",
    alt: "Anillo en una caja de regalo azul",
    objectY: "84%", // в макете фото сдвинуто на -221px
    minWidth: true,
  },
];

// Категории (карточки 694×295 на сером фоне #F6F6F6).
// width/top — размер и сдвиг фото в процентах от карточки, как в макете.
const categories = [
  {
    name: "PULSERAS",
    href: "/joyas/pulseras",
    image: "/joyas/cat-pulseras.png",
    alt: "Pulsera de plata con circonita",
    width: "63.11%", // 438 / 694
    top: "-37.29%", // -110 / 295
  },
  {
    name: "ANILLOS",
    href: "/joyas/anillos",
    image: "/joyas/cat-anillos.png",
    alt: "Anillo de plata con forma de montañas",
    width: "79.68%", // 553 / 694
    top: "-61.69%", // -182 / 295
  },
  {
    name: "PENDIENTES",
    href: "/joyas/pendientes",
    image: "/joyas/cat-pendientes.png",
    alt: "Pendientes de aro con circonitas",
    width: "53.75%", // 373 / 694
    top: "-26.44%", // -78 / 295
  },
  {
    name: "COLLARES",
    href: "/joyas/collares",
    image: "/joyas/cat-collares.png",
    alt: "Collar con colgante de corazón",
    width: "63.11%",
    top: "-37.29%",
    // В макете поверх нижней части фото лежит отдельный фрагмент (438×89)
    bottomPatch: "/joyas/cat-collares-bottom.png",
  },
];

const gifts = [
  {
    name: "Madre & Hija",
    href: "/regalos/madre-hija",
    image: "/joyas/regalo-madre-hija.png",
    alt: "Anillo con tarjeta «A mi hija»",
    label: "Tendencia",
    labelColor: "bg-[#FF4242]",
  },
  {
    name: "Mejores amigos",
    href: "/regalos/mejores-amigos",
    image: "/joyas/regalo-mejores-amigos.png",
    alt: "Dos amigas con una caja de regalo",
    label: "Promociones",
    labelColor: "bg-[#8665E3]",
  },
  {
    name: "Amor y compromiso",
    href: "/regalos/amor-compromiso",
    image: "/joyas/regalo-amor-compromiso.png",
    alt: "Anillo con tarjeta «Amor propio»",
    label: "Últimas unidades",
    labelColor: "bg-[#E38465]",
  },
  {
    name: "Hombres",
    href: "/regalos/hombres",
    image: "/joyas/regalo-hombres.png",
    alt: "Caja de regalo con certificado de autenticidad",
    label: "Nuevo",
    labelColor: "bg-[#6E7A94]",
  },
];

export default function JoyasPage() {
  return (
    <main className={`${metropolis.className} bg-white text-[#131314]`}>
      {/* Más vendidos / Novedades */}
      <section className="px-[22px]">
        <div className="mx-auto grid max-w-[1396px] gap-2 md:grid-cols-2">
          {featured.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative block aspect-[694/431] overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ objectPosition: `50% ${item.objectY}` }}
              />
              {/* Затемнение из макета: чёрный 20% + синий rgba(39,48,96,.2) */}
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(rgba(39,48,96,0.2),rgba(39,48,96,0.2))]"
              />
              <span
                className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white bg-white/20 px-[30px] py-4 text-[14px] font-medium uppercase whitespace-nowrap text-white transition-colors group-hover:bg-white/35 ${
                  item.minWidth ? "w-[175px]" : ""
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Категории */}
      <section
        aria-label="Categorías"
        className="px-[22px] pt-16 lg:pt-[100px]"
      >
        <div className="mx-auto grid max-w-[1396px] gap-2 md:grid-cols-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative block aspect-[694/295] overflow-hidden bg-[#F6F6F6]"
            >
              <span
                className="absolute left-1/2 aspect-square -translate-x-1/2 transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ width: cat.width, top: cat.top }}
              >
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="(max-width: 767px) 80vw, 40vw"
                  className="object-cover"
                />
              </span>
              {cat.bottomPatch && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-[66.1%] aspect-[438/89] w-[63.11%] -translate-x-1/2"
                >
                  <Image
                    src={cat.bottomPatch}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 80vw, 40vw"
                    className="object-cover object-bottom"
                  />
                </span>
              )}
              <span className="absolute left-1/2 top-[69.15%] flex -translate-x-1/2 flex-col items-center gap-2">
                <span className="text-[22px] leading-none whitespace-nowrap sm:text-[26px] lg:text-[32px]">
                  {cat.name}
                </span>
                <span className="border-b border-[#2A2B2D] text-[12px] leading-[15px] whitespace-nowrap text-[#2A2B2D]">
                  DISCOVER MORE
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Regalos para... */}
      <section
        aria-labelledby="regalos-para"
        className="mt-16 bg-[#FAFAFA] px-[22px] pt-12 pb-14 lg:mt-[140px] lg:pt-[80px] lg:pb-[84px]"
      >
        <div className="mx-auto max-w-[1396px]">
          <h2
            id="regalos-para"
            className={`${nunito.className} text-[26px] font-semibold uppercase leading-[1.35] sm:text-[30px] lg:text-[34px]`}
          >
            REGALOS PARA...
          </h2>
          <div className="mt-[30px] grid grid-cols-2 gap-x-[5px] gap-y-6 lg:grid-cols-4">
            {gifts.map((gift) => (
              <Link
                key={gift.name}
                href={gift.href}
                className="group flex flex-col items-center gap-[6px]"
              >
                <span className="relative block aspect-[345/356] w-full overflow-hidden">
                  <Image
                    src={gift.image}
                    alt={gift.alt}
                    fill
                    sizes="(max-width: 1023px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span
                    className={`absolute left-3 top-3 p-2 text-[10px] font-medium uppercase leading-none text-white ${gift.labelColor}`}
                  >
                    {gift.label}
                  </span>
                </span>
                <span className="text-center text-[16px] uppercase sm:text-[18px] lg:text-[20px]">
                  {gift.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Отступ до футера — 140px, как в макете */}
      <div className="h-16 lg:h-[140px]" />
    </main>
  );
}
