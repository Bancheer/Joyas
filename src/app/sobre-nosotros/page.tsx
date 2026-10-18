import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CategoryCards from "@/components/CategoryCards";
import ProductRow from "@/components/ProductRow";
import RegalosPara from "@/components/RegalosPara";
import Experience from "@/components/home/Experience";
import InstagramSection from "@/components/home/InstagramSection";
import Newsletter from "@/components/home/Newsletter";
import { PRODUCTS } from "@/data/products";
import { metropolis, parisienne } from "../fonts";

// «Quién somos». Макеты: 360 — 475:6621, 768 — 475:5601, 1440 — 440:314.
export const metadata: Metadata = {
  title: "Quién somos | Joyas Rodriguez",
  description:
    "Joyas Rodriguez: tienda online de joyas de plata de ley 925 elegantes y de alta calidad. Conoce nuestra historia y nuestra misión.",
};

const button =
  "inline-flex items-center justify-center border border-[#131314] px-[30px] py-4 text-[14px] font-medium uppercase leading-none tracking-[0.14px] text-[#131314] transition-colors hover:bg-[#131314] hover:text-white";

export default function QuienSomosPage() {
  return (
    <main className={`${metropolis.className} bg-white text-[#131314]`}>
      {/* ── Hero: фото с затемнением (чёрный 25% + синий 27%) ── */}
      <section className="relative h-[433px] overflow-hidden px-[14px] text-center text-white md:h-[526px] lg:h-[703px]">
        {/* Рамка фото в макете чуть шире экрана (2.05:1) и центрирована */}
        <span aria-hidden className="absolute left-1/2 top-0 aspect-[1443/703] h-full min-w-full -translate-x-1/2 overflow-hidden">
          <span className="absolute left-0 top-[-101.41%] h-[273.64%] w-full">
            <Image src="/quien-somos/hero.png" alt="" fill priority sizes="(max-width: 767px) 889px, (max-width: 1023px) 1079px, 100vw" className="object-cover" />
          </span>
          <span className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),linear-gradient(rgba(81,126,193,0.27),rgba(81,126,193,0.27))]" />
        </span>

        <div className="relative mx-auto flex max-w-[785px] flex-col items-center gap-[26px] pt-[104px] md:pt-[152px] lg:pt-[394px]">
          <h1 className={`${parisienne.className} max-w-[332px] text-[46px] leading-[1.1] md:max-w-[765px] md:text-[70px] lg:max-w-none lg:whitespace-nowrap`}>
            Cada joya tiene su propia historia.
          </h1>
          <div className="flex max-w-[331px] flex-col gap-[14px] text-[14px] leading-[1.4] tracking-[0.14px] md:max-w-[699px] md:text-[18px] md:tracking-[0.16px] lg:max-w-[785px]">
            <p>
              Nos apasionan las joyas y creemos que pueden ser <span className="font-medium">mucho más</span> que
              simples accesorios.
            </p>
            <p>
              Nuestras joyas están diseñadas para <span className="font-medium">expresar</span> la personalidad,
              elegancia y belleza de quien las lleva, añadiendo un toque de lujo y distinción a cualquier ocasión.
            </p>
          </div>
        </div>
      </section>

      {/* ── ¿Quién somos? ── */}
      <section className="flex h-[435px] flex-col items-center justify-center gap-[30px] bg-[#F4F5FB] px-[14px] text-center md:h-[510px]">
        <div className="flex flex-col items-center gap-[38px]">
          <p className="text-[12px] uppercase tracking-[0.96px]">¿Quién somos?</p>
          <div className="flex flex-col items-center gap-5">
            <h2 className={`${parisienne.className} max-w-[332px] text-[44px] leading-[1.1] md:max-w-none md:text-[54px] md:leading-normal`}>
              Bienvenido a Joya Rodriguez,
            </h2>
            <div className="flex max-w-[331px] flex-col gap-2 text-[12px] leading-[1.4] tracking-[0.12px] text-[#2A2B2D] md:max-w-[512px]">
              <p>
                tu tienda de confianza para comprar joyas <span className="font-medium">elegantes</span> y de alta{" "}
                <span className="font-medium">calidad</span>.
              </p>
              <p>
                Somos una tienda online especializada en la venta de joyas elaboradas con{" "}
                <span className="font-medium">materiales de alta calidad y diseños únicos.</span>
              </p>
            </div>
          </div>
        </div>
        <Image src="/icons/logo-diamond.svg" alt="" width={29} height={38} />
      </section>

      {/* ── Товары ── */}
      <section aria-label="Nuestras joyas" className="mt-[10px]">
        <ProductRow products={PRODUCTS.slice(0, 4)} label="Nuestras joyas" />
        <div className="mt-[50px] flex justify-center md:mt-20">
          <Link href="/joyas" className={button}>
            Ver nuestras colecciones
          </Link>
        </div>
      </section>

      {/* ── Nuestra misión ── */}
      <section className="mt-[130px] flex flex-col items-center gap-[50px] px-[14px] md:mt-[140px] md:gap-[104px] md:px-0 lg:flex-row lg:pr-[104px]">
        <div className="relative aspect-square w-full shrink-0 lg:w-1/2 lg:max-w-[720px]">
          <Image src="/quien-somos/mision.png" alt="Anillo de plata en la Caja Azul de Joyas Rodriguez" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-9 text-center">
          <Image src="/icons/mision.svg" alt="" width={31} height={40} />
          <div className="flex flex-col items-center gap-[68px]">
            <div className="flex flex-col items-center gap-5">
              <h2 className={`${parisienne.className} text-[54px] leading-normal`}>Nuestra misión</h2>
              <div className="flex max-w-[332px] flex-col gap-2 text-[12px] leading-[1.4] tracking-[0.12px] text-[#2A2B2D] md:max-w-[512px]">
                <p>
                  Nuestra misión es ofrecer a nuestros clientes una selección de joyas que combine estilo,
                  excelente artesanía y valor duradero.
                </p>
                <p>
                  Cada una de las piezas de nuestra colección está cuidada al detalle y elaborada con materiales
                  de alta calidad, como <span className="font-medium">plata de ley 925 y piedras preciosas.</span>
                </p>
              </div>
            </div>
            <Link href="/cuidado-de-las-joyas" className={button}>
              Aprender sobre el cuidado
            </Link>
          </div>
        </div>
      </section>

      <RegalosPara plain className="mt-[100px] md:mt-[140px]" />

      <Experience
        intro={
          <>
            En Joya Rodriguez, nos esforzamos por ofrecer una{" "}
            <span className="font-medium">
              experiencia de compra en línea sin complicaciones, garantizando un pago seguro y un envío rápido
            </span>
            . Nuestro equipo de expertos está siempre dispuesto a atenderle y proporcionarle asesoramiento y
            asistencia personalizados para ayudarle a encontrar la joya perfecta para usted o para alguien especial.
          </>
        }
      />

      {/* ── Muestra colección de Joyas Exclusivas ── */}
      <section aria-labelledby="exclusivas" className="mt-[100px] px-[14px] md:mt-[140px] md:px-[22px]">
        <header className="mx-auto mb-[50px] flex max-w-[512px] flex-col items-center gap-2 text-center">
          <h2 id="exclusivas" className={`${parisienne.className} text-[44px] leading-[1.1] md:text-[54px] md:leading-normal`}>
            Muestra colección de Joyas Exclusivas
          </h2>
          <p className="text-[12px] leading-[1.4] tracking-[0.12px] text-[#2A2B2D]">
            Nos complace compartir con usted nuestra pasión por las joyas y le{" "}
            <span className="font-medium">invitamos</span> a{" "}
            <span className="font-medium">explorar nuestra colección de joyas exclusivas</span>. Apueste por la
            calidad, el estilo y la elegancia con Joya Rodriguez, su tienda integral de joyas únicas y preciosas.
          </p>
        </header>
        <CategoryCards />
      </section>

      <InstagramSection />
      <Newsletter />
    </main>
  );
}
