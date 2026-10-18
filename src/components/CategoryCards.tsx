import Image from "next/image";
import Link from "next/link";

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

// Плитки категорий: 1 колонка до 1024px (на планшете 694px по центру), 2 — на компьютере.
// Используются на страницах Joyas и Quién somos.
export default function CategoryCards() {
  return (
    <div className="mx-auto grid max-w-[694px] gap-2 lg:max-w-[1396px] lg:grid-cols-2">
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
              sizes="(max-width: 1023px) 60vw, 40vw"
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
                sizes="(max-width: 1023px) 60vw, 40vw"
                className="object-cover object-bottom"
              />
            </span>
          )}
          <span className="absolute left-1/2 top-[67.4%] flex -translate-x-1/2 flex-col items-center md:top-[69.15%] md:gap-2">
            <span className="whitespace-nowrap text-[18px] leading-[22px] md:text-[32px] md:leading-none">
              {cat.name}
            </span>
            <span className="whitespace-nowrap border-b border-[#2A2B2D] text-[10px] leading-[12px] text-[#2A2B2D] md:text-[12px] md:leading-[15px]">
              DISCOVER MORE
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
