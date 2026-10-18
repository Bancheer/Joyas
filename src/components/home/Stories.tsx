import Image from "next/image";
import Link from "next/link";
import ScrollCarousel from "@/components/ScrollCarousel";
import { metropolis, nunito } from "@/app/fonts";

// «Historias». Телефон: горизонтальные карточки столбиком (298:1242),
// планшет: карусель вертикальных карточек (312:4686), компьютер: 3 в ряд.
// Ширины и отступы в vw (404 из 768 / 404 из 1440) — карточки привязаны к краям экрана.
const stories = [
  {
    title: "Amor Propio",
    text: "Piezas que te harán brillar, exaltando el amor hacia ti misma. Celebra tu autenticidad y empodérate con un toque de elegancia.",
    image: "/stories/amor-propio.jpg",
    alt: "Mano con anillo de plata sobre el rostro",
    href: "/joyas",
  },
  {
    title: "Madre & Hija",
    text: "Un reflejo brillante del amor eterno que compartís como madre & hija, capturado en diseños elegantes y atemporales.",
    image: "/stories/madre-hija.jpg",
    alt: "Caja de Joyas Rodriguez con anillo",
    href: "/regalos",
  },
  {
    title: "Amor y Compromiso",
    text: "Diseños únicos que reflejan la eternidad del amor. Encuentra la joya perfecta para tu otra mitad.",
    image: "/stories/amor-compromiso.jpg",
    alt: "Collar con colgante en el cuello",
    href: "/regalos",
  },
];

function MoreLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="group flex w-fit items-center gap-[3px] text-[14px] font-medium uppercase leading-none tracking-[0.14px] text-[#517EC1]"
    >
      Descubre más
      <Image
        src="/icons/arrow-right-blue.svg"
        alt=""
        width={32}
        height={32}
        className="transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}

export default function Stories() {
  return (
    <section
      id="historias"
      aria-labelledby="historias-title"
      className={`${metropolis.className} mt-[100px] bg-[#FAFAFA] py-[60px] md:mt-[140px] md:py-[62px]`}
    >
      <header className="mx-auto flex max-w-[908px] flex-col gap-2 px-[14px] text-center md:px-4">
        <h2
          id="historias-title"
          className={`${nunito.className} text-[28px] font-semibold uppercase leading-[1.35] text-[#131314] md:text-[34px]`}
        >
          Historias
        </h2>
        <p className="text-[14px] leading-[1.2] tracking-[0.14px] text-[#2A2B2D]">
          Cada una de nuestras piezas cuenta con su propia historia, un reflejo de momentos
          especiales que llevarás contigo para siempre.
        </p>
      </header>

      {/* Телефон */}
      <ul className="mt-[30px] flex flex-col gap-[18px] px-[3.89vw] md:hidden">
        {stories.map((s) => (
          <li key={s.title} className="flex gap-[10px] border border-[#E9EEF5] bg-white p-[9px]">
            <span className="relative h-[156px] w-[117px] shrink-0 overflow-hidden">
              <Image src={s.image} alt={s.alt} fill sizes="117px" className="object-cover" />
            </span>
            <div className="flex min-w-0 flex-col pb-[9px]">
              <h3 className="text-[18px] font-medium leading-[1.4] tracking-[0.18px] text-[#131314]">
                {s.title}
              </h3>
              <p className="mt-[22px] text-[14px] leading-[1.4] tracking-[0.14px] text-[#2A2B2D]">
                {s.text}
              </p>
              <div className="mt-[28px]">
                <MoreLink href={s.href} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Планшет — карусель, компьютер — 3 в ряд */}
      <div className="hidden md:block">
        <ScrollCarousel
          label="Historias"
          trackClassName="mt-10 flex gap-[5.21vw] scroll-px-[2.08vw] px-[2.08vw] lg:grid lg:grid-cols-3 lg:gap-[2.78vw] lg:overflow-visible lg:px-[5.14vw]"
          itemClassName="w-[52.6vw] lg:w-auto"
          dotsClassName="hidden"
        >
          {stories.map((s) => (
            <article key={s.title} className="h-full border border-[#E9EEF5] bg-white p-[2.47vw] lg:p-[1.32vw]">
              <span className="relative block aspect-[364/486] overflow-hidden">
                <Image src={s.image} alt={s.alt} fill sizes="(max-width: 1023px) 48vw, 26vw" className="object-cover" />
              </span>
              <h3 className="mt-5 text-[18px] font-medium leading-[1.4] tracking-[0.18px] text-[#131314]">
                {s.title}
              </h3>
              <p className="mt-[22px] min-h-[60px] text-[14px] leading-[1.4] tracking-[0.14px] text-[#2A2B2D]">
                {s.text}
              </p>
              <div className="mt-7">
                <MoreLink href={s.href} />
              </div>
            </article>
          ))}
        </ScrollCarousel>
      </div>
    </section>
  );
}
