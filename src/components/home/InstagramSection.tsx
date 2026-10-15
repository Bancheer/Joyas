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
      className={`${metropolis.className} mt-16 overflow-hidden lg:mt-[140px]`}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 sm:px-[22px] lg:flex-row lg:justify-between lg:gap-[113px]">
        <h2
          id="instagram-title"
          className={`${nunito.className} text-[24px] font-semibold uppercase leading-[1.35] text-[#131314] sm:text-[28px] lg:max-w-[590px] lg:text-[34px]`}
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

      {/* В макете ряд из 4 фото шире экрана (1710px) и обрезан по краям */}
      <ul className="mt-8 flex snap-x snap-mandatory gap-[10px] overflow-x-auto px-4 lg:-ml-[9.375%] lg:mt-[50px] lg:grid lg:w-[118.75%] lg:grid-cols-4 lg:overflow-visible lg:px-0">
        {photos.map((p, i) => (
          <li
            key={p.src}
            className="relative aspect-[420/444] w-[75%] shrink-0 snap-start overflow-hidden sm:w-[45%] lg:w-auto"
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
                  sizes="(max-width: 639px) 75vw, (max-width: 1023px) 45vw, 30vw"
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
