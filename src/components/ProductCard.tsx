import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";

// Карточка товара из макета: фото 1:1 на сером фоне, бейдж, звёзды, название, цены
export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const stars = Math.round(product.rating);

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex min-w-0 flex-col gap-2 text-[#131314]"
    >
      <span className="relative block aspect-square overflow-hidden bg-[#F4F4F4]">
        <span
          className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ width: `${product.imageScale * 100}%` }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 767px) 60vw, (max-width: 1023px) 40vw, 30vw"
            className="object-cover"
          />
        </span>
        {product.badge && (
          <span className="absolute left-3 top-3 bg-[#E38465] p-2 text-[10px] font-medium uppercase leading-none text-white">
            {product.badge}
          </span>
        )}
      </span>

      <span className="flex flex-col gap-[14px]">
        <span className="flex items-center gap-[6px]">
          <span
            className="flex items-center gap-[2px]"
            role="img"
            aria-label={`${product.rating} de 5 estrellas`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Image
                key={i}
                src="/icons/star-rating.svg"
                alt=""
                width={16}
                height={16}
                className={i < stars ? "" : "opacity-25"}
              />
            ))}
          </span>
          <span className="text-[14px] leading-[1.4]">({product.reviews})</span>
        </span>

        <span className="flex flex-col gap-1 leading-[1.4]">
          <span className="text-[14px] sm:text-[16px] group-hover:underline">
            {product.name}
          </span>
          <span className="flex flex-wrap items-baseline gap-x-[7px]">
            {product.compareAtPrice && (
              <s className="text-[12px] text-[#717171]">
                <span className="sr-only">Antes: </span>
                {formatPrice(product.compareAtPrice)}
              </s>
            )}
            <span className="text-[14px] font-medium sm:text-[16px]">
              {formatPrice(product.price)}
            </span>
          </span>
        </span>
      </span>
    </Link>
  );
}
