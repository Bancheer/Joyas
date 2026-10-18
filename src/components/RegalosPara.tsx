import Image from "next/image";
import Link from "next/link";
import { nunito } from "@/app/fonts";

// «Regalos para...» — общий блок страниц Joyas и Regalos.
// 1 колонка на телефоне, 2 на планшете (695px по центру), 4 на компьютере.
// Макеты: Joyas 310:3618, Regalos 459:6539 / 459:6569 / 459:6601.
export const GIFTS = [
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

// plain — вариант со страницы «Quién somos»: без серого фона, отступов и цветных плашек.
export default function RegalosPara({
  className = "",
  plain = false,
}: {
  className?: string;
  plain?: boolean;
}) {
  return (
    <section
      aria-labelledby="regalos-para"
      className={`px-[14px] md:px-[22px] ${plain ? "" : "bg-[#FAFAFA] py-20 lg:pb-[84px]"} ${className}`}
    >
      <div className="mx-auto max-w-[695px] lg:max-w-[1396px]">
        <h2
          id="regalos-para"
          className={`${nunito.className} text-[28px] font-semibold uppercase leading-[1.35] md:text-[34px]`}
        >
          REGALOS PARA...
        </h2>
        <div className="mt-[30px] grid gap-x-[5px] gap-y-[26px] md:grid-cols-2 lg:grid-cols-4">
          {GIFTS.map((gift) => (
            <Link key={gift.name} href={gift.href} className="group flex flex-col items-center gap-[6px]">
              <span className="relative block aspect-[345/356] w-full overflow-hidden">
                <Image
                  src={gift.image}
                  alt={gift.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {!plain && (
                <span
                  className={`absolute left-3 top-3 p-2 text-[10px] font-medium uppercase leading-none text-white ${gift.labelColor}`}
                >
                  {gift.label}
                </span>
                )}
              </span>
              <span className="text-center text-[20px] uppercase">{gift.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
