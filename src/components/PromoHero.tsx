import Image from "next/image";
import CopyCode from "@/components/CopyCode";
import { metropolis, nunito } from "@/app/fonts";

// Баннер «Oferta de primavera — Compre más, ahorre más» со скидочными кодами.
// Страницы Regalos и каталог подарков. Макеты: 360 — 323:1417, 768 — 323:931, 1440 — 323:1186.
const codes = [
  { buy: "Buy 2", get: "Get 5%", code: "TAKE5" },
  { buy: "Buy 3", get: "Get 10%", code: "TAKE10" },
  { buy: "Buy 4", get: "Get 20%", code: "TAKE20" },
];

export default function PromoHero({ as: Heading = "h1" }: { as?: "h1" | "h2" }) {
  return (
    <section className={`${metropolis.className} relative h-[280px] overflow-hidden bg-[#7D8494] md:h-[281px]`}>
      {/* Фото в макете больше блока и сдвинуто: девушка слева, справа — фон для текста */}
      <span className="absolute left-[-527px] top-[-197px] h-[617px] w-[1850px] md:left-[-209px] lg:left-[-2px] lg:top-[-267px] lg:h-[757px] lg:w-[2269px]">
        <Image src="/regalos/promo.png" alt="" fill priority sizes="2269px" className="object-cover" />
      </span>

      <div className="absolute left-1/2 top-[33px] flex w-[332px] -translate-x-1/2 flex-col items-center gap-[22px] md:left-[67.2%] md:top-[42px] md:w-auto lg:left-[61.8%]">
        <div className="text-center text-[#F4F5FB]">
          <p className="text-[14px] leading-[1.4] tracking-[0.14px]">Oferta de primavera 2024:</p>
          <Heading
            className={`${nunito.className} text-[24px] font-semibold uppercase leading-[1.35] md:whitespace-nowrap md:text-[34px]`}
          >
            Compre más, ahorre más
          </Heading>
        </div>

        <ul className="flex flex-col gap-[9px]">
          {codes.map((c) => (
            <li key={c.code} className="flex items-center gap-[15px]">
              <p className="w-[178px] whitespace-nowrap text-[14px] leading-[1.4] text-white md:w-[234px] md:text-[18px] md:tracking-[0.16px]">
                <span className="font-medium">{c.buy}</span> - <span className="font-medium">{c.get}</span>, Use Cod
              </p>
              <div className="w-[106px]">
                <CopyCode code={c.code} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
