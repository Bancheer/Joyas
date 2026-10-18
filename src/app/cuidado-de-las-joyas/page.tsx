import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { metropolis, parisienne } from "../fonts";

// «Cuidado de las joyas» — уход за серебром 925. Макеты: 360 — 508:7409, 768 — 508:6958, 1440 — 478:9772.
export const metadata: Metadata = {
  title: "Mantenimiento de la plata de ley 925 | Joyas Rodriguez",
  description: "Por qué se deslustra la plata de ley y cómo cuidar tus joyas para que duren muchos años.",
};

const tips = [
  "Aplica cosméticos, productos para el cabello, lociones, perfumes y polvos antes de ponerse sus joyas.",
  "Evita que tus piezas estén expuestas a la humedad.",
  "Quítate las piezas antes de ducharte, nadar, tomar el sol y hacer ejercicio.",
  "No exponga sus piezas a la luz directa del sol.",
];

function Heading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <>
      <h2 className={`${parisienne.className} max-w-[332px] text-center text-[44px] leading-[1.1] text-[#131314] md:max-w-[840px] md:text-[54px] ${className}`}>
        {children}
      </h2>
      <Image src="/icons/divider.svg" alt="" width={600} height={1} className="h-px w-full max-w-[333px] md:max-w-[600px]" />
    </>
  );
}

export default function CuidadoPage() {
  return (
    <main className={`${metropolis.className} bg-white pb-[100px] text-[#2A2B2D] md:pb-[140px]`}>
      {/* ── Hero: фото + затемнение (чёрный 32% + синий 37%); на компьютере справа серая полоса ── */}
      <section className="relative flex h-[317px] items-end justify-center overflow-hidden bg-[#F7F7F7] pb-5 md:h-[452px] md:pb-9 lg:h-[583px] lg:pb-[81px]">
        <span aria-hidden className="absolute left-1/2 top-0 aspect-[1080/583] h-full -translate-x-1/2 overflow-hidden lg:left-0 lg:translate-x-0">
          <span className="absolute left-0 top-[-18.52%] h-[185.25%] w-full">
            <Image src="/cuidado/hero.png" alt="" fill priority sizes="(max-width: 1023px) 840px, 75vw" className="object-cover" />
          </span>
        </span>
        <span aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.32),rgba(0,0,0,0.32)),linear-gradient(rgba(81,126,193,0.37),rgba(81,126,193,0.37))]" />
        <h1 className={`${parisienne.className} relative max-w-[290px] text-center text-[46px] leading-[1.1] text-white md:max-w-[685px] md:text-[70px]`}>
          Mantenimiento de la plata de ley 925
        </h1>
      </section>

      {/* ── ¿Por qué se deslustra…? ── */}
      <section className="mt-[100px] flex flex-col items-center gap-[34px] px-[14px] md:px-4">
        <Heading>¿Por qué se deslustra la plata de ley?</Heading>
        <div className="flex max-w-[840px] flex-col gap-7 text-center text-[18px] leading-[1.4] tracking-[0.16px]">
          <p>
            La plata de ley es un metal aleado, compuesto normalmente por un <span className="font-medium">92,5%</span> de
            plata pura y un <span className="font-medium">7,5%</span> de cobre. El <span className="font-medium">99,9%</span>{" "}
            de plata pura es bastante maleable, por lo que la plata suele combinarse con otros metales para aumentar su
            dureza y resistencia.
          </p>
          <p>
            En Joyas Rodríguez, chapamos todas nuestras joyas con platino para{" "}
            <span className="font-medium">aumentar su brillo y durabilidad</span>. El platino es extremadamente
            resistente a la oxidación, por lo que evita que nuestras joyas se empañen.
          </p>
        </div>
      </section>

      {/* ── Cómo cuidar tus joyas: фото слева / сверху ── */}
      <section className="mt-[100px] flex flex-col items-center gap-[78px] bg-[#F4F5FB] pb-[78px] lg:flex-row lg:pb-0">
        <div className="relative aspect-square w-full shrink-0 lg:w-1/2 lg:max-w-[720px]">
          <Image src="/cuidado/como-cuidar.png" alt="Mano con anillo de plata y piedra azul" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="flex flex-col items-center gap-[34px] px-[14px] md:px-4 lg:px-0">
          <Heading>Cómo cuidar tus joyas</Heading>
          <div className="flex max-w-[588px] flex-col gap-7 text-center text-[18px] leading-[1.4] tracking-[0.18px]">
            <p>
              Si observas una pieza de joyería que está oscurecida o parece sucia, significa que tu plata se ha
              deslustrado; pero, esto no quiere decir que la tengas que tirar
            </p>
            <p>
              El deslustre es simplemente el resultado de una reacción química con el oxígeno o las partículas de azufre
              del aire. Con unos cuantos consejos fáciles de seguir, puedes cuidar tus joyas de plata de ley y hacer que
              duren muchos años.
            </p>
          </div>
        </div>
      </section>

      {/* ── Consejos para evitar el deslustre: фото справа / снизу ── */}
      <section className="flex flex-col items-center gap-[78px] pt-[78px] lg:flex-row lg:justify-end lg:gap-[30px] lg:pt-0">
        <div className="flex flex-col items-center gap-[34px] px-[14px] md:px-4 lg:px-0">
          <Heading className="md:max-w-[610px]">Consejos para evitar el deslustre</Heading>
          <ul className="flex max-w-[332px] flex-col gap-[15px] text-[18px] leading-[1.4] tracking-[0.18px] md:max-w-[609px]">
            {tips.map((tip) => (
              <li key={tip} className="flex items-start gap-[15px]">
                <Image src="/icons/bullet-blue.svg" alt="" width={6} height={25} className="shrink-0" />
                {tip}
              </li>
            ))}
            <li className="flex items-start gap-[15px]">
              <Image src="/icons/bullet-blue.svg" alt="" width={6} height={25} className="shrink-0" />
              <span>
                Los metales pueden deslustrarse con el tiempo debido al oxígeno y a los aceites naturales del cuerpo.
                <br />
                Para reducir el deslustre, guarda las joyas en una bolsa o caja hermética en un lugar seco, oscuro y fresco
              </span>
            </li>
          </ul>
        </div>
        <div className="relative aspect-square w-full shrink-0 lg:aspect-[720/721] lg:w-1/2 lg:max-w-[720px]">
          <Image src="/cuidado/consejos.png" alt="Mujer con anillo Girasol" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
        </div>
      </section>
    </main>
  );
}
