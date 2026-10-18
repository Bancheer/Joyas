import Image from "next/image";
import Link from "next/link";
import { Stars } from "@/components/home/TrustStrip";
import { parisienne } from "@/app/fonts";

// Большой отзыв: имя (Parisienne), звёзды, страна, текст в кавычках и ссылка на товар.
// С фото — фото слева (компьютер) или сверху (телефон, планшет). Макеты 447:1379 / 447:1418.
export default function Testimonio({
  name,
  text,
  href,
  image,
  className = "",
}: {
  name: string;
  text: string;
  href: string;
  image?: { src: string; alt: string };
  className?: string;
}) {
  const content = (
    <div className="flex flex-col items-center gap-[49px] px-[14px] text-center md:px-4">
      <div className="flex flex-col items-center gap-[30px]">
        <div className="flex flex-col items-center gap-[9px]">
          <div className="flex items-center gap-4">
            <h2 className={`${parisienne.className} text-[40px] leading-normal text-[#131314] md:text-[54px]`}>
              {name}
            </h2>
            <Image src="/icons/check-circle.svg" alt="Cliente verificado" width={34} height={34} />
          </div>
          <Stars />
          <p className="flex items-center gap-2 text-[14px] leading-[1.4] tracking-[0.14px] text-[#2A2B2D]">
            Mexico
            <Image src="/icons/flag-mx.svg" alt="" width={18} height={18} />
          </p>
        </div>

        <blockquote
          className={`relative pb-[21px] pt-[23px] md:px-[49px] md:pb-[33px] md:pt-[33px] ${
            image ? "max-w-[332px] md:max-w-[586px]" : "max-w-[332px] md:max-w-[736px] lg:max-w-[1118px]"
          }`}
        >
          <Image src="/icons/quote-open.svg" alt="" width={46} height={33} className="absolute left-0 top-0 h-[23px] w-[32px] md:h-[33px] md:w-[46px]" />
          <p className="text-[16px] leading-[1.4] tracking-[0.16px] text-[#2A2B2D] md:text-[18px] md:tracking-[0.18px]">{text}</p>
          <Image src="/icons/quote-close.svg" alt="" width={46} height={33} className="absolute bottom-0 right-0 h-[21px] w-[29px] md:h-[33px] md:w-[46px]" />
        </blockquote>
      </div>

      <Link
        href={href}
        className="group flex items-center gap-[10px] text-[16px] font-medium uppercase tracking-[0.16px] text-[#517EC1]"
      >
        Mira el producto
        <Image src="/icons/arrow-long-blue.svg" alt="" width={27} height={8} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );

  if (!image) return <section className={className}>{content}</section>;

  return (
    <section className={`grid bg-[#F4F5FB] lg:grid-cols-2 ${className}`}>
      <div className="relative aspect-square w-full">
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className="flex items-center justify-center py-[60px] md:py-20 lg:py-0">{content}</div>
    </section>
  );
}
