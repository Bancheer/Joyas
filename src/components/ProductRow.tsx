import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";

// Ряд товаров, уходящий за правый край экрана (свайп/прокрутка).
// Карточки 294×364 на телефоне и 420×520 на планшете и компьютере.
// Макеты «Quién somos»: 475:7160 (360), 475:6227 (768), 459:9329 (1440).
export default function ProductRow({ products, label }: { products: Product[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="flex snap-x snap-mandatory gap-[10px] overflow-x-auto scroll-px-[14px] px-[14px] [scrollbar-width:none] md:scroll-px-4 md:px-4 lg:scroll-px-[22px] lg:px-[22px] [&::-webkit-scrollbar]:hidden"
    >
      {products.map((p) => (
        <li key={p.slug} className="w-[294px] shrink-0 snap-start md:w-[420px]">
          <Link href={`/producto/${p.slug}`} className="group flex flex-col gap-2 text-[#131314]">
            <span className="relative block aspect-[420/520] overflow-hidden bg-[#F4F4F4]">
              {/* Квадратное фото высотой с карточку, по центру */}
              <span className="absolute left-1/2 top-0 aspect-square h-full -translate-x-1/2 transition-transform duration-700 group-hover:scale-[1.04]">
                <Image src={p.image} alt={p.name} fill sizes="(max-width: 767px) 364px, 520px" className="object-cover" />
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
