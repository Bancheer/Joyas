import Image from "next/image";
import { metropolis, nunito } from "@/app/fonts";

// «Únete a los más de 30.000…» (макет: homepage 294:439)
// Ссылка на профиль — по нику из макета; проверь, что адрес верный.
const INSTAGRAM_URL = "https://www.instagram.com/joyas_rodriguez_/";

// Кадрирование как в макете: objectPosition подобран под рамку 420×444
const photos = [
  { src: "/instagram/foto-1.png", position: "44% 50%", mirrored: true },
  { src: "/instagram/foto-2.png", position: "50% 41%" },
  { src: "/instagram/foto-3.png", position: "31% 100%" },
  { src: "/instagram/foto-4.png", position: "50% 0%" },
];

export default function InstagramSection() {
  return (
    <section
      id="instagram"
      aria-labelledby="instagram-title"
      className={`${metropolis.className} mt-[100px] overflow-hidden md:mt-[140px]`}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-[14px] md:gap-[30px] md:px-4 lg:flex-row lg:px-[22px] lg:justify-between lg:gap-[113px]">
        <h2
          id="instagram-title"
          className={`${nunito.className} text-[28px] font-semibold uppercase leading-[1.35] text-[#131314] md:text-[34px] lg:max-w-[590px]`}
        >
          Únete a los más de 30.000 de nuestra cuenta Instagram
        </h2>
        <div className="flex flex-col gap-[18px] lg:max-w-[693px]">
          <p className="text-[14px] leading-[1.4] tracking-[0.14px] text-[#2A2B2D]">
            Comparte los momentos en los cuales recibes o regalas una de nuestras Joyas.
            Recibirás así las novedades y los mejores descuentos por adelantado. A
            continuación, algunos de los preciosos clientes que nos han ayudado a construir
            esta pequeña familia
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-[18px] font-medium uppercase text-[#131314] hover:underline"
          >
            @joyas_rodriguez_
          </a>
        </div>
      </div>

      {/* В макете ряд фото шире экрана и обрезан по краям: на телефоне видно два фото 200×211,
          на планшете — два 420×444, на компьютере — четыре (ряд 1710px) */}
      <ul className="-ml-[29px] mt-[54px] flex w-[calc(100%+29px)] snap-x snap-mandatory gap-[10px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-ml-[138px] md:w-[calc(100%+138px)] lg:-ml-[9.375%] lg:mt-[50px] lg:grid lg:w-[118.75%] lg:grid-cols-4 lg:overflow-visible">
        {photos.map((p, i) => (
          <li
            key={p.src}
            className="relative aspect-[200/211] w-[200px] shrink-0 snap-start overflow-hidden md:aspect-[420/444] md:w-[420px] lg:w-auto"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Foto ${i + 1} de clientes en Instagram`}
              className="block size-full"
            >
              {/* Первое фото в макете отзеркалено */}
              <span className={`absolute inset-0 ${p.mirrored ? "-scale-x-100" : ""}`}>
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 200px, (max-width: 1023px) 420px, 30vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  style={{ objectPosition: p.position }}
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
