import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Catalog from "@/components/Catalog";
import { metropolis, parisienne } from "../../fonts";
import {
  COLLECTIONS,
  PRODUCTS,
  type Category,
  type CollectionSlug,
} from "@/data/products";

// Макет Figma: «Page with cards & filters» (303:10044 — фильтры закрыты, 306:12687 — открыты)

type Props = { params: Promise<{ coleccion: string }> };

function getCollection(slug: string) {
  return slug in COLLECTIONS
    ? COLLECTIONS[slug as CollectionSlug]
    : undefined;
}

export function generateStaticParams() {
  return Object.keys(COLLECTIONS).map((coleccion) => ({ coleccion }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = getCollection((await params).coleccion);
  if (!collection) return {};
  return {
    title: `${collection.title} | Joyas Rodriguez`,
    description: `${collection.title}: joyas de plata de Joyas Rodriguez.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const collection = getCollection((await params).coleccion);
  if (!collection) notFound();

  const category =
    "category" in collection ? (collection.category as Category) : undefined;

  return (
    <main className={`${metropolis.className} bg-white text-[#131314]`}>
      {/* Баннер: фото 2925×531 в макете показано в натуральную величину,
          поэтому обёртка шире экрана (203%) и центрирована по высоте */}
      <section className="relative h-[96px] overflow-hidden bg-[#7D8494] md:h-[128px]">
        <span className="absolute left-0 top-1/2 block aspect-[2925/531] w-[203.125%] min-w-[900px] -translate-y-[48.4%]">
          <Image
            src="/catalogo/hero.png"
            alt=""
            fill
            priority
            sizes="203vw"
            className="object-cover"
          />
        </span>
        <h1
          className={`${parisienne.className} absolute left-[34%] top-1/2 -translate-y-1/2 whitespace-nowrap text-[36px] leading-[1.2] text-white md:left-[26.67%] md:text-[54px]`}
        >
          {collection.title}
        </h1>
      </section>

      <Catalog products={PRODUCTS} initialCategory={category} />
    </main>
  );
}
