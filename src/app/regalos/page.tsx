import type { Metadata } from "next";
import CategoryStories from "@/components/CategoryStories";
import PromoHero from "@/components/PromoHero";
import RegalosPara from "@/components/RegalosPara";
import { metropolis } from "../fonts";

// «PAGES OF COLLECTIONS — REGALOS». Макеты: 360 — 323:1210, 768 — 323:768, 1440 — 323:987.
export const metadata: Metadata = {
  title: "Regalos | Joyas Rodriguez",
  description: "Regalos de plata para madre e hija, mejores amigos, parejas y hombres.",
};

export default function RegalosPage() {
  return (
    <main className={`${metropolis.className} bg-white text-[#131314]`}>
      <CategoryStories />
      <PromoHero />
      <RegalosPara className="mt-[30px] md:mt-[60px]" />
      {/* Отступ до футера: 100 / 140 / 100 */}
      <div className="h-[100px] md:h-[140px] lg:h-[100px]" />
    </main>
  );
}
