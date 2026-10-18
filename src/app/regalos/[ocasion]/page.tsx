import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Catalog from "@/components/Catalog";
import PromoHero from "@/components/PromoHero";
import { GIFTS } from "@/components/RegalosPara";
import { PRODUCTS } from "@/data/products";
import { metropolis } from "../../fonts";

// Каталог подарков («Page with cards & filters — regalos»):
// баннер со скидочными кодами + общий каталог с фильтрами.
// Макеты: 360 — 323:8470, 768 — 323:7882, 1440 — 323:6644.

type Props = { params: Promise<{ ocasion: string }> };

const slugOf = (href: string) => href.split("/").pop()!;
const getGift = (slug: string) => GIFTS.find((g) => slugOf(g.href) === slug);

export function generateStaticParams() {
  return GIFTS.map((g) => ({ ocasion: slugOf(g.href) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const gift = getGift((await params).ocasion);
  if (!gift) return {};
  return {
    title: `Regalos para ${gift.name} | Joyas Rodriguez`,
    description: `Regalos de plata — ${gift.name}. Joyas Rodriguez.`,
  };
}

export default async function RegalosOcasionPage({ params }: Props) {
  const gift = getGift((await params).ocasion);
  if (!gift) notFound();

  return (
    <main className={`${metropolis.className} bg-white text-[#131314]`}>
      <h1 className="sr-only">Regalos — {gift.name}</h1>
      <PromoHero as="h2" />
      {/* ВРЕМЕННО: пока у товаров нет привязки к поводу подарка, показываем весь каталог */}
      <Catalog products={PRODUCTS} />
    </main>
  );
}
