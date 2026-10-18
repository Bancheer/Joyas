import Image from "next/image";
import Link from "next/link";
import { metropolis, nunito } from "@/app/fonts";

// «Descubre y compra por categorías». 2×2 на телефоне и планшете, 4 в ряд на компьютере.
// Отступы по краям в vw (14 из 360, 16 из 768, 22 из 1440) — сетка растягивается
// от края до края и не меняется относительно экрана при масштабировании.
// Макеты: 360 — 298:1455, 768 — 312:4897, 1440 — categories.
const categories = [
  { name: "Anillos", href: "/joyas/anillos", image: "/categories/anillos.jpg", alt: "Anillo de plata en una mano" },
  { name: "Pulseras", href: "/joyas/pulseras", image: "/categories/pulsears.jpg", alt: "Pulsera dorada en una muñeca" },
  { name: "Pendientes", href: "/joyas/pendientes", image: "/categories/pensientes.jpg", alt: "Pendientes dorados en una oreja" },
  { name: "Collares", href: "/joyas/collares", image: "/categories/collares.jpg", alt: "Collar con colgante azul" },
];

export default function Categories() {
  return (
    <section
      id="categorias"
      aria-labelledby="categorias-title"
      className={`${metropolis.className} px-[3.89vw] py-[100px] md:px-[2.15vw] md:py-[140px] lg:px-[1.56vw]`}
    >
      <header className="mx-auto flex max-w-[886px] flex-col gap-2 text-center">
        <h2
          id="categorias-title"
          className={`${nunito.className} text-[28px] font-semibold uppercase leading-[1.35] text-[#131314] md:text-[34px]`}
        >
          Descubre y compra por categorías
        </h2>
        <p className="text-[14px] leading-[1.2] tracking-[0.14px] text-[#2A2B2D]">
          Hermoso diseño y artesanía sin igual.
        </p>
      </header>

      <ul className="mt-[30px] grid grid-cols-2 gap-x-[1.11vw] gap-y-[18px] md:mt-[50px] md:gap-x-[0.65vw] md:gap-y-[2.34vw] lg:grid-cols-4 lg:gap-x-[0.35vw]">
        {categories.map((c) => (
          <li key={c.name}>
            <Link href={c.href} className="group flex flex-col items-center gap-[6px]">
              <span className="relative block aspect-[345/356] w-full overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 1023px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </span>
              <span className="text-[16px] uppercase tracking-[0.16px] text-[#131314] md:text-[18px] lg:text-[20px]">
                {c.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
