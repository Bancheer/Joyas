import Image from "next/image";
import Link from "next/link";
import { metropolis } from "@/app/fonts";

const helpLinks = [
  { label: "Seguimiento", href: "#seguimiento" },
  { label: "Preguntas frecuentes", href: "#faq" },
  { label: "Mantenimiento de la plata", href: "#mantenimiento" },
  { label: "Referencias", href: "#referencias" },
  { label: "Contactos", href: "#contactos" },
  { label: "¿Quién Somos?", href: "/#sobre-nosotros" },
];

const policyLinks = [
  { label: "Política de Envío", href: "#envio" },
  { label: "Política de privacidad", href: "#privacidad" },
  { label: "Legislación aplicable", href: "#legislacion" },
  { label: "Política de Reembolso", href: "#reembolso" },
  { label: "Términos de servicio", href: "#terminos" },
];

// Иконки оплаты в порядке макета (файлы скачиваются скриптом scripts/fetch-figma-assets.mjs)
const payments = [
  { src: "/icons/payments/amex.svg", alt: "American Express" },
  { src: "/icons/payments/apple-pay.svg", alt: "Apple Pay" },
  { src: "/icons/payments/diners.svg", alt: "Diners Club" },
  { src: "/icons/payments/discover.svg", alt: "Discover" },
  { src: "/icons/payments/jcb.svg", alt: "JCB" },
  { src: "/icons/payments/mastercard.svg", alt: "Mastercard", boxed: true },
  { src: "/icons/payments/visa.svg", alt: "Visa" },
];

export default function SiteFooter() {
  return (
    <footer
      id="contacto"
      className={`${metropolis.className} bg-[#EBEFFF] text-[#2A2B2D]`}
    >
      <div className="mx-auto max-w-[1440px] px-4 pt-12 pb-8 sm:px-8 lg:px-[80px] lg:pt-[68px] lg:pb-[58px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[419fr_330fr_387fr_144fr] lg:gap-0">
          {/* Логотип, подписка, соцсети */}
          <div>
            <Link href="/" aria-label="Joyas Rodriguez" className="block">
              <Image
                src="/icons/logo.png"
                alt="Joyas Rodriguez"
                width={185}
                height={38}
                className="h-[38px] w-auto"
              />
            </Link>
            <div className="mt-8 flex flex-col gap-[30px]">
              <div className="flex flex-col gap-[15px]">
                <p className="w-[257px] max-w-full text-[13px] leading-[1.4]">
                  Descubre nuevos modelos, eventos especiales, ofertas únicas y
                  mucho más.
                </p>
                <form
                  className="flex w-[257px] max-w-full items-center justify-between border-b border-[#737EA8] pb-[5px]"
                  action="#"
                >
                  <label htmlFor="footer-email" className="sr-only">
                    E-mail
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className="min-w-0 flex-1 bg-transparent text-[13px] leading-[1.7] tracking-[-0.13px] text-[#131314] placeholder:text-[#535353] focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Suscribirse"
                    className="shrink-0 hover:opacity-70"
                  >
                    <Image
                      src="/icons/arrow-right.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                </form>
              </div>
              <div className="flex gap-[10px]">
                <a
                  href="https://facebook.com/yourpage"
                  aria-label="Facebook"
                  className="hover:opacity-70"
                >
                  <Image
                    src="/icons/footer-facebook.svg"
                    alt=""
                    width={28}
                    height={28}
                  />
                </a>
                <a
                  href="https://instagram.com/yourpage"
                  aria-label="Instagram"
                  className="hover:opacity-70"
                >
                  <Image
                    src="/icons/footer-instagram.svg"
                    alt=""
                    width={28}
                    height={28}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* AYUDA */}
          <nav aria-labelledby="footer-ayuda">
            <h3
              id="footer-ayuda"
              className="text-[14px] font-medium text-[#131314]"
            >
              AYUDA
            </h3>
            <ul className="mt-[18px] flex flex-col gap-[10px] text-[13px]">
              {helpLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CONTACTOS */}
          <div id="contactos">
            <h3 className="text-[14px] font-medium text-[#131314]">
              CONTACTOS
            </h3>
            <div className="mt-[18px] flex flex-col gap-[14px]">
              <p className="w-[203px] text-[13px] leading-[1.4]">
                No dudes en ponerse en contacto con nosotros:
              </p>
              <a
                href="mailto:infojoyasrodriguez@gmail.com"
                className="flex items-center gap-1 text-[13px] font-medium hover:underline"
              >
                <Image src="/icons/at.svg" alt="" width={18} height={18} />
                infojoyasrodriguez@gmail.com
              </a>
            </div>
          </div>

          {/* MENU FOOTER */}
          <nav aria-labelledby="footer-menu">
            <h3
              id="footer-menu"
              className="whitespace-nowrap text-[14px] font-medium text-[#131314]"
            >
              MENU FOOTER
            </h3>
            <ul className="mt-[18px] flex flex-col gap-[10px] whitespace-nowrap text-[13px]">
              {policyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Способы оплаты */}
        <ul className="mt-12 flex flex-wrap justify-center gap-[9px] lg:mt-[39px]">
          {payments.map((p) =>
            p.boxed ? (
              <li
                key={p.alt}
                className="relative h-[32px] w-[46px] rounded-[6px] border border-[#F2F4F7] bg-white"
              >
                <span className="absolute inset-[21%_18%_23%_17%]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="30px"
                    className="object-contain"
                  />
                </span>
              </li>
            ) : (
              <li key={p.alt}>
                <Image src={p.src} alt={p.alt} width={46} height={32} />
              </li>
            ),
          )}
        </ul>

        <p className="mt-[26px] text-center text-[12px] leading-[1.4]">
          © 2024 Joyería Rodriguez
        </p>
      </div>
    </footer>
  );
}
