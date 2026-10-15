import Image from "next/image";
import { metropolis, nunito } from "@/app/fonts";
import { SatisfiedClients } from "./TrustStrip";

// «Lo que dicen de nosotros». Макеты: 360 — 312:5589, 768 — 312:5417, 1440 — testimonials.
export default function Testimonials() {
  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-title"
      className={`${metropolis.className} mt-[100px] bg-[#FAFAFA] px-[14px] pb-[62px] pt-[62px] md:mt-[140px] md:px-4`}
    >
      <div className="mx-auto max-w-[1000px] text-center">
        <h2
          id="testimonios-title"
          className={`${nunito.className} mx-auto max-w-[332px] text-[28px] font-semibold uppercase leading-[1.35] text-[#131314] md:max-w-none md:text-[34px]`}
        >
          Lo que dicen de nosotros
        </h2>

        <blockquote className="relative mx-auto mt-6 max-w-[332px] pb-[36px] pt-[29px] md:mt-[50px] md:max-w-[736px] md:px-14 md:pb-[33px] md:pt-[33px] lg:max-w-[950px] lg:px-[60px]">
          <Image
            src="/icons/quote-open.svg"
            alt=""
            width={46}
            height={33}
            className="absolute left-0 top-0 h-[27px] w-[39px] md:h-[33px] md:w-[46px]"
          />
          <p className="text-[14px] leading-[1.4] tracking-[0.14px] text-[#2A2B2D] lg:mx-auto lg:max-w-[699px] lg:text-[18px] lg:tracking-[0.18px]">
            Siempre compro productos en Joyas Rodriguez. La calidad es muy buena y la atención al
            cliente perfecta. Además el hecho de que cada producto llegue con su propia tarjeta
            hace que los regalos sean todavía más únicos. Lo recomiendo
          </p>
          <Image
            src="/icons/quote-close.svg"
            alt=""
            width={46}
            height={33}
            className="absolute bottom-0 right-0 h-[27px] w-[39px] md:h-[33px] md:w-[46px]"
          />
        </blockquote>

        <SatisfiedClients className="mt-[9px] md:mt-[19px] lg:mt-[50px]" />
      </div>
    </section>
  );
}
