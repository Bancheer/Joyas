import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";

// Ряд товаров, уходящий за правый край экрана (свайп/прокрутка).
// Карточки 294×364 / 420×520 / 420×520 из макетов, в vw — не меняются относительно экрана при масштабировании.
// Макеты «Quién somos»: 475:7160 (360), 475:6227 (768), 459:9329 (1440).
export default function ProductRow({ products, label }: { products: Product[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="flex snap-x snap-mandatory gap-[2.78vw] overflow-x-auto scroll-px-[3.89vw] px-[3.89vw] [scrollbar-width:none] md:gap-[1.3vw] md:scroll-px-[2.08vw] md:px-[2.08vw] lg:gap-[0.69vw] lg:scroll-px-[1.53vw] lg:px-[1.53vw] [&::-webkit-scrollbar]:hidden"
    >
      {products.map((p) => (
        <li key={p.slug} className="w-[81.67vw] shrink-0 snap-start md:w-[54.69vw] lg:w-[29.17vw]">
          <Link href={`/producto/${p.slug}`} className="group flex flex-col gap-2 text-[#131314]">
            <span className="relative block aspect-[420/520] overflow-hidden bg-[#F4F4F4]">
              {/* Квадратное фото высотой с карточку, по центру */}
              <span className="absolute left-1/2 top-0 aspect-square h-full -translate-x-1/2 transition-transform duration-700 group-hover:scale-[1.04]">
                <Image src={p.image} alt={p.name} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 68vw, 36vw" className="object-cover" />
              </span>
              {p.badge && (
                <span className="absolute left-3 top-3 bg-[#E38465] p-2 text-[10px] font-medium uppercase leading-none tracking-[0.1px] text-white">
                  {p.badge}
                </span>
              )}
            </span>
            <span className="flex flex-col gap-[14px]">
              <span className="flex items-center gap-[6px]">
                <span className="flex gap-[2px]" role="img" aria-label={`${p.rating} de 5 estrellas`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Image key={i} src="/icons/star-rating.svg" alt="" width={16} height={16} />
                  ))}
                </span>
                <span className="text-[14px] leading-[1.4] tracking-[0.14px]">({p.reviews})</span>
              </span>
              <span className="flex flex-col gap-1 leading-[1.4]">
                <span className="text-[16px] tracking-[0.16px] group-hover:underline">{p.name}</span>
                <span className="flex items-baseline gap-[7px] whitespace-nowrap">
                  {p.compareAtPrice && (
                    <s className="text-[12px] tracking-[0.12px] text-[#717171]">
                      <span className="sr-only">Antes: </span>
                      {formatPrice(p.compareAtPrice)}
                    </s>
                  )}
                  <span className="text-[16px] font-medium tracking-[0.16px]">{formatPrice(p.price)}</span>
                </span>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
