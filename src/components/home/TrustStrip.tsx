import Image from "next/image";
import { metropolis } from "@/app/fonts";

// «Más de 200.000 clientes satisfechos» + 3 преимущества.
// Макеты: 360 — 312:5435 (столбик, слева), 768 — 312:5263 (столбик по центру), 1440 — в ряд.
const items = [
  { icon: "/icons/trust-caja.svg", text: "Caja regalo incluida en todos los pedidos" },
  { icon: "/icons/trust-garantia.svg", text: "30 días de garantía" },
  { icon: "/icons/trust-envio.svg", text: "envío gratuito en todos los pedidos" },
];

export function Stars({ size = 16 }: { size?: number }) {
  return (
    <span className="flex gap-[2px]" role="img" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }, (_, i) => (
        <Image key={i} src="/icons/star-rating.svg" alt="" width={size} height={size} />
      ))}
    </span>
  );
}

export function SatisfiedClients({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-[7px] text-center ${className}`}>
      <p className="max-w-[332px] text-[16px] uppercase leading-[1.4] tracking-[0.16px] text-[#131314] md:max-w-none">
        más de <span className="font-semibold">200.000</span> clientes satisfechos
      </p>
      <Stars />
    </div>
  );
}

export default function TrustStrip() {
  return (
    <section className={`${metropolis.className} bg-[#FAFAFA]`}>
      <SatisfiedClients className="px-[14px] py-4" />
      <div className="h-px bg-white" />
      <ul className="flex flex-col gap-4 px-[14px] pb-4 md:mx-auto md:w-fit md:px-0 lg:mx-auto lg:w-full lg:max-w-[1156px] lg:flex-row lg:justify-between lg:pb-0">
        {items.map((item) => (
          <li key={item.text} className="flex items-center">
            <Image src={item.icon} alt="" width={92} height={70} className="shrink-0" />
            <span className="max-w-[240px] text-[14px] leading-[1.4] tracking-[0.14px] text-[#131314] md:max-w-none">
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
