import Image from "next/image";
import { nunito } from "@/app/fonts";

// «Únete a los más de 30.000…» в виде историй Instagram (374×664) с никами клиентов.
// Только на планшете и компьютере; на телефоне — обычный блок Instagram.
// Макеты: 475:5600 (1440), 490:7270 (768).
const INSTAGRAM_URL = "https://www.instagram.com/joyas_rodriguez_/";

const stories = [
  { src: "/dicen/story-1.png", user: "julia_boldo", pos: "50% 50%" },
  { src: "/dicen/story-2.png", user: "layet8", pos: "50% 50%" },
  { src: "/dicen/story-3.png", user: "esmeraldarivera834", pos: "50% 100%" },
  { src: "/dicen/story-4.png", user: "cuquis1007", pos: "50% 100%" },
];

export default function InstagramStories({ className = "" }: { className?: string }) {
  return (
    <section aria-labelledby="instagram-stories" className={className}>
      <div className="flex flex-col gap-[30px] px-4 lg:flex-row lg:justify-between lg:gap-[113px] lg:px-[22px]">
        <h2
          id="instagram-stories"
          className={`${nunito.className} text-[34px] font-semibold uppercase leading-[1.35] text-[#131314] lg:max-w-[590px]`}
        >
          Únete a los más de 30.000 de nuestra cuenta Instagram
        </h2>
        <div className="flex flex-col gap-[18px] lg:max-w-[693px]">
          <p className="text-[14px] leading-[1.4] tracking-[0.14px] text-[#2A2B2D]">
            Comparte los momentos en los cuales recibes o regalas una de nuestras Joyas.
            <br />
            Recibirás así las novedades y los mejores descuentos por adelantado.
            <br />A continuación, algunos de los preciosos clientes que nos han ayudado a construir esta pequeña
            familia 💘
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-[18px] font-medium uppercase tracking-[0.18px] text-[#131314] hover:underline"
          >
            @joyas_rodriguez_
          </a>
        </div>
      </div>

      <ul className="mt-[50px] flex snap-x snap-mandatory gap-[10px] overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] lg:mt-[71px] lg:scroll-px-[22px] lg:px-[22px] [&::-webkit-scrollbar]:hidden">
        {stories.map((s) => (
          <li key={s.user} className="w-[374px] shrink-0 snap-start">
            <a
              href={`https://www.instagram.com/${s.user}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-5"
            >
              <span className="relative block aspect-[374/664] overflow-hidden bg-[#F4F3F3]">
                <Image src={s.src} alt={`Historia de @${s.user}`} fill sizes="374px" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" style={{ objectPosition: s.pos }} />
              </span>
              <span className="flex items-center gap-[9px] text-[18px] font-medium uppercase leading-[1.4] tracking-[0.18px] text-[#2A2B2D]">
                <Image src="/icons/instagram-color.svg" alt="" width={24} height={24} />
                {s.user}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
