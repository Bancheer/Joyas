import type { Metadata } from "next";
import Image from "next/image";
import { Stars } from "@/components/home/TrustStrip";
import InstagramSection from "@/components/home/InstagramSection";
import Testimonio from "@/components/dicen/Testimonio";
import ReviewsCarousel from "@/components/dicen/ReviewsCarousel";
import InstagramStories from "@/components/dicen/InstagramStories";
import { metropolis, parisienne } from "../fonts";

// «Dicen de nosotros» — отзывы клиентов. Макеты: 360 — 490:7325, 768 — 490:6472, 1440 — 446:971.
export const metadata: Metadata = {
  title: "Lo que dicen de nosotros | Joyas Rodriguez",
  description: "Más de 200.000 clientes satisfechos: opiniones y reseñas de quienes eligieron Joyas Rodriguez.",
};

export default function DicenDeNosotrosPage() {
  return (
    <main className={`${metropolis.className} bg-white pb-[100px] text-[#131314] md:pb-[140px]`}>
      {/* ── Hero: фото с затемнением (чёрный 14% + синий 27%) ── */}
      <section className="relative flex h-[545px] flex-col items-center justify-end overflow-hidden px-[14px] pb-[50px] text-center text-white md:pb-20 lg:h-[48.82vw] lg:pb-[10.97vw]">
        <span aria-hidden className="absolute left-1/2 top-0 aspect-[1440/703] h-full min-w-full -translate-x-1/2 overflow-hidden">
          <span className="absolute left-0 top-[-87.52%] h-[273.34%] w-full">
            <Image src="/dicen/hero.png" alt="" fill priority sizes="(max-width: 1023px) 1116px, 100vw" className="object-cover" />
          </span>
          <span className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.14),rgba(0,0,0,0.14)),linear-gradient(rgba(81,126,193,0.27),rgba(81,126,193,0.27))]" />
        </span>
        <h1 className={`${parisienne.className} relative max-w-[332px] text-[46px] leading-[1.1] md:max-w-none md:text-[70px]`}>
          Lo que dicen de nosotros
        </h1>
        <div className="relative mt-[26px] flex flex-col items-center gap-[7px]">
          <p className="max-w-[332px] text-[16px] uppercase leading-[1.4] tracking-[0.16px] md:max-w-[694px] md:text-[18px]">
            más de <span className="font-semibold">200.000</span> clientes satisfechos
          </p>
          <Stars />
        </div>
      </section>

      <Testimonio
        className="mt-[34px] md:mt-[50px]"
        name="Diana Monotoya"
        image={{ src: "/dicen/diana.png", alt: "Diana Monotoya con su madre" }}
        href="/joyas/anillos"
        text="Yo y mi madre vivimos en ciudades diferentes y así he decido regalarle el Anillo Abrazo, para que sienta que la estoy abrazando aunque no estemos cerca. Su reacción ha sido conmovedora y ahora no se lo quiere quitar ni para ir a dormir 🥹 Muchas gracias Joyas Rodriguez, ha sido un regalo perfecto."
      />

      <Testimonio
        className="mt-[100px] md:mt-[140px]"
        name="Nancy Madrigal"
        href="/joyas/anillos"
        text="No se ni por donde comenzar, compré este anillo para mi mamá, ella a sufrido depresión por muchos años, y hace unas semanas me dijo que quería darse así misma un anillo en símbolo de su amor propio, lo cual me pareció algo increíble, más tarde ese día me aparece en Fb un anuncio sobre este anillo, y sin dudarlo procedí a comprarlo como un obsequio para mi mamá, cometí un error durante la compra por lo cual tuve que adquirir otro, pero el servicio al cliente me apoyó increíblemente con esta confusión, mi pedido llego el día de hoy (31-05-23) en cuanto abrí el paquete quede enamorada de lo hermoso que el anillo es, como viene envuelto perfectamente para evitar daño, el anillo viene en su estuche, y trae un mensaje que la primera vez que lo leí supe que mi mamá amaría, y no me equivoque, lloramos de felicidad ambas, Gracias Joyas Rodríguez por tener un anillo tan especial, por su atención e increíble servicio, 5 estrellas no son suficientes para evaluarlos, de corazón, Gracias ♥️"
      />

      {/* ── Cada joya cuenta una historia… (видеоотзыв) ── */}
      <section className="mt-[100px] flex flex-col items-center gap-[50px] bg-[#F4F5FB] px-[14px] py-20 md:mt-[140px] md:gap-[50px] md:px-4 lg:flex-row lg:items-start lg:justify-between lg:gap-[4vw] lg:pl-[5.69vw] lg:pr-[1.53vw]">
        {/* Текст может сжиматься, иначе вместе с видео блок шире экрана и видео вылезает за правый край */}
        <div className="flex flex-col items-center gap-5 text-center lg:min-w-0 lg:flex-1">
          <div className="flex flex-col items-center gap-6">
            <h2 className={`${parisienne.className} max-w-[331px] text-[44px] leading-[1.1] md:max-w-none md:whitespace-nowrap md:text-[54px] lg:whitespace-normal md:leading-normal`}>
              Cada joya cuenta una historia...
            </h2>
            <a
              href="https://www.instagram.com/peela_aguauo/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-[18px]"
            >
              <span className="relative size-[66px] overflow-hidden rounded-full bg-white">
                <Image src="/dicen/perla.png" alt="" fill sizes="66px" className="object-cover object-[50%_62%]" />
              </span>
              <span className="flex flex-col items-center gap-1">
                <span className="flex items-center gap-[9px] text-[18px] font-medium uppercase leading-[1.4] tracking-[0.18px] text-[#2A2B2D]">
                  <Image src="/icons/instagram-color.svg" alt="" width={24} height={24} />
                  peela_aguauo
                </span>
                <span className="pl-2">
                  <Stars />
                </span>
              </span>
            </a>
          </div>
          <blockquote className="relative max-w-[332px] pb-[21px] pt-[21px] md:max-w-[586px] md:px-[49px] md:pb-[33px] md:pt-[33px]">
            <Image src="/icons/quote-open.svg" alt="" width={46} height={33} className="absolute left-0 top-0 h-[21px] w-[29px] md:left-[50px] md:h-[33px] md:w-[46px]" />
            <p className="text-[18px] leading-[1.4] tracking-[0.18px] text-[#2A2B2D]">
              La experiencia de Perla....
              <br />
              Encuentra tu historia con Joyas Rodriguez
            </p>
            <Image src="/icons/quote-close.svg" alt="" width={46} height={33} className="absolute bottom-0 right-0 h-[21px] w-[29px] md:h-[33px] md:w-[46px]" />
          </blockquote>
        </div>
        {/* ВРЕМЕННО: кадр из видео. Когда будет файл ролика — заменить на <video controls poster=…> */}
        <div className="relative aspect-[644/363] w-[92.5vw] shrink-0 overflow-hidden bg-black md:w-[83.85vw] lg:w-[44.72vw]">
          <Image src="/dicen/video.png" alt="Video de Perla con su tarjeta de Joyas Rodriguez" fill sizes="(max-width: 767px) 93vw, (max-width: 1023px) 84vw, 45vw" className="object-cover" />
        </div>
      </section>

      <ReviewsCarousel className="mt-[100px] md:mt-[140px]" />

      {/* Instagram: истории на планшете и компьютере, обычный блок на телефоне */}
      <InstagramStories className="mt-[140px] hidden md:block" />
      <div className="md:hidden">
        <InstagramSection />
      </div>
    </main>
  );
}
