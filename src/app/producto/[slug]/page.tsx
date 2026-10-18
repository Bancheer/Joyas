import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductPurchase from "@/components/ProductPurchase";
import { metropolis } from "../../fonts";
import {
  PRODUCTS,
  formatPrice,
  getProduct,
  getProductDetails,
  type Product,
} from "@/data/products";

// Макет Figma: страница товара (382:798) — верхний блок: галерея + информация

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: `${product.name} | Joyas Rodriguez`,
    description: `${product.name} de plata de ley 925. ${formatPrice(product.price)}.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const details = getProductDetails(product);
  const look = details.lookSlug ? getProduct(details.lookSlug) : undefined;
  const singleImage = details.gallery.length === 1;

  return (
    <main className={`${metropolis.className} bg-white text-[#131314]`}>
      <div className="grid gap-8 px-[3.89vw] pb-16 md:px-[2.08vw] lg:grid-cols-[minmax(0,61.25fr)_minmax(0,27.78fr)] lg:gap-[4.72vw] lg:px-[1.53vw] lg:pb-[140px]">
        {/* ── Галерея: на телефоне листается свайпом, на компьютере сетка 2×4.
               Если фото одно — оно на всю ширину и ничего не листается ── */}
        <section aria-label="Fotos del producto" className="-mx-[3.89vw] md:mx-0">
          <ul
            className={
              singleImage
                ? "block"
                : "flex snap-x snap-mandatory scroll-pl-[3.89vw] gap-2 overflow-x-auto px-[3.89vw] [scrollbar-width:none] md:scroll-pl-0 md:px-0 lg:grid lg:grid-cols-2 lg:gap-[14px] lg:overflow-visible [&::-webkit-scrollbar]:hidden"
            }
          >
            {details.gallery.map((src, i) => (
              <li
                key={src}
                className={`relative aspect-square shrink-0 overflow-hidden bg-[#F3F3F3] ${
                  singleImage ? "w-full" : "w-[85%] snap-start sm:w-[60%] lg:w-auto"
                }`}
              >
                {singleImage ? (
                  <span
                    className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
                    style={{ width: `${product.imageScale * 100}%` }}
                  >
                    <Image src={src} alt={product.name} fill priority sizes="(max-width: 1023px) 100vw, 60vw" className="object-cover" />
                  </span>
                ) : (
                  <Image
                    src={src}
                    alt={`${product.name}, foto ${i + 1}`}
                    fill
                    priority={i < 2}
                    sizes="(max-width: 639px) 85vw, (max-width: 1023px) 60vw, 434px"
                    className="object-cover"
                  />
                )}
                {i === 0 && details.labels.length > 0 && (
                  <span className="absolute left-4 top-4 flex gap-[7px]">
                    {details.labels.map((l) => (
                      <Label key={l.text} {...l} />
                    ))}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Информация о товаре ── */}
        <div className="flex flex-col lg:pt-[30px]">
          {details.labels[0] && (
            <div className="mb-[30px] hidden lg:flex">
              <Label {...details.labels[0]} />
            </div>
          )}

          <div className="flex flex-col gap-[26px]">
            <div>
              <h1 className="text-[22px] font-medium uppercase leading-[1.2] lg:text-[26px]">
                {product.name}
              </h1>
              <Stars rating={product.rating} reviews={product.reviews} size={14} />
            </div>
            <div className="flex flex-col gap-[6px] border-b border-[#DFE1F0] pb-[6px]">
              <p className="flex flex-wrap items-baseline gap-x-[10px]">
                <span className="text-[16px] font-medium uppercase leading-[1.35]">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <s className="text-[12px] leading-[1.4] text-[#2A2B2D]">
                    <span className="sr-only">Antes: </span>
                    {formatPrice(product.compareAtPrice)}
                  </s>
                )}
              </p>
            </div>
          </div>

          <div className="mt-[30px]">
            <ProductPurchase productName={product.name} sizes={details.sizes} />
          </div>

          <ul className="mt-[30px] flex flex-col gap-[11px] text-[14px] leading-[1.35] text-[#565A61]">
            {[
              ["/icons/feature-gift.svg", "Incluye tarjeta y caja regalo"],
              ["/icons/feature-silver.svg", "Plata de ley 925"],
              ["/icons/feature-truck.svg", "Envío Gratuito a todo México"],
              ["/icons/feature-warranty.svg", "Garantía de 30 días"],
            ].map(([icon, text]) => (
              <li key={text} className="flex items-center gap-[7px]">
                <Image src={icon} alt="" width={20} height={20} />
                {text}
              </li>
            ))}
          </ul>

          <OfferBox />

          {/* Аккордеоны: первый открыт, как в макете */}
          <div className="mt-10 border-b border-[#DFE1F0]">
            {details.story && (
              <Accordion title="Historia de la decoración" defaultOpen>
                <p className="text-[14px] font-medium leading-[1.4] text-[#2A2B2D]">
                  {details.story.title}
                </p>
                <div className="mt-[6px] text-[14px] leading-[1.4] text-[#565A61]">
                  {details.story.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Accordion>
            )}
            <Accordion title="Qué incluye">
              <ul className="list-disc pl-5 text-[14px] leading-[1.6] text-[#565A61]">
                {details.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </Accordion>
            <Accordion title="Especificaciones">
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[14px] leading-[1.6] text-[#565A61]">
                {details.specs.map((s) => (
                  <div key={s.label} className="contents">
                    <dt className="font-medium text-[#2A2B2D]">{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Accordion>
            <Accordion title="Garantía de 30 días">
              {/* TODO: заменить текстом с условиями гарантии от магазина */}
              <p className="text-[14px] leading-[1.4] text-[#565A61]">
                Todas nuestras joyas tienen garantía de 30 días.
              </p>
            </Accordion>
          </div>

          {look && <CompleteTheLook product={look} />}
        </div>
      </div>
    </main>
  );
}

function Label({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="p-[6px] text-[10px] font-medium uppercase leading-none text-white"
      style={{ backgroundColor: color }}
    >
      {text}
    </span>
  );
}

function Stars({
  rating,
  reviews,
  size,
}: {
  rating: number;
  reviews: number;
  size: number;
}) {
  const full = Math.round(rating);
  return (
    <span className="flex items-center gap-[6px]">
      <span className="flex gap-[2px]" role="img" aria-label={`${rating} de 5 estrellas`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Image
            key={i}
            src="/icons/star-rating.svg"
            alt=""
            width={size}
            height={size}
            className={i < full ? "" : "opacity-25"}
          />
        ))}
      </span>
      <span className={size < 16 ? "text-[12px] leading-[1.4]" : "text-[14px] leading-[1.4]"}>
        ({reviews})
      </span>
    </span>
  );
}

// «Oferta 2+1 gratis» (макет 382:1286). Опечатки макета исправлены.
function OfferBox() {
  return (
    <div className="mt-[30px] overflow-hidden rounded-[4px] border border-[#517EC1] bg-[#F4F5FB] shadow-[0_4px_12px_0_rgba(236,239,255,0.86)]">
      <div className="flex items-center justify-between gap-2 px-[31px] pb-[14px] pt-5">
        <Image src="/icons/offer-diamond.svg" alt="" width={23} height={30} />
        <p className="text-center text-[20px] font-medium leading-none text-[#517EC1] sm:text-[24px]">
          OFERTA 2+1 GRATIS
        </p>
        <Image src="/icons/offer-diamond.svg" alt="" width={23} height={30} />
      </div>
      <p className="border-y border-[#B7BEE2] px-[31px] py-[14px] text-[16px] leading-[1.4] text-[#565A61]">
        <strong className="font-medium">Añade 3 artículos</strong> (los que quieras) a tu carrito
        y recibirás <strong className="font-medium">GRATIS</strong> el artículo de menor precio.
      </p>
      <ul className="px-[31px] pb-5 pt-[14px] text-[16px] leading-[1.4] text-[#517EC1] sm:text-[18px]">
        {[
          ["3", "Paga 2"],
          ["6", "Paga 4"],
        ].map(([n, pay]) => (
          <li key={n} className="flex items-center gap-[14px]">
            <span>
              <span className="font-medium">{n}</span> artículos en tu carrito
            </span>
            <Image src="/icons/offer-arrow.svg" alt="" width={30} height={8} />
            <span className="font-medium">{pay}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group border-t border-[#DFE1F0]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[11px] text-[16px] font-medium uppercase leading-[1.4] text-[#2A2B2D] group-open:text-[#517EC1] [&::-webkit-details-marker]:hidden">
        {title}
        <Image
          src="/icons/chevron-accordion.svg"
          alt=""
          width={32}
          height={32}
          className="shrink-0 -scale-x-100 group-open:hidden"
        />
        <Image
          src="/icons/chevron-accordion-blue.svg"
          alt=""
          width={32}
          height={32}
          className="hidden shrink-0 -scale-y-100 group-open:block"
        />
      </summary>
      <div className="pb-[30px] pt-[19px]">{children}</div>
    </details>
  );
}

// «Completa el look» (макет 382:1122)
function CompleteTheLook({ product }: { product: Product }) {
  return (
    <section className="mt-10 bg-[#F4F5FB] px-[18px] pb-5 pt-5" aria-labelledby="completa-el-look">
      <h2 id="completa-el-look" className="text-[16px] font-medium">
        COMPLETA EL LOOK
      </h2>
      <Link href={`/producto/${product.slug}`} className="group mt-5 flex gap-2">
        <span className="relative aspect-square w-[57%] shrink-0 overflow-hidden bg-[#F4F4F4]">
          <span
            className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
            style={{ width: `${product.imageScale * 100}%` }}
          >
            <Image src={product.image} alt={product.name} fill sizes="209px" className="object-cover" />
          </span>
          {product.badge && (
            <span className="absolute left-3 top-3 bg-[#E38465] p-2 text-[10px] font-medium uppercase leading-none text-white">
              {product.badge}
            </span>
          )}
        </span>
        <span className="flex min-w-0 flex-col gap-[14px]">
          <Stars rating={product.rating} reviews={product.reviews} size={16} />
          <span className="text-[16px] leading-[1.4] group-hover:underline">{product.name}</span>
          <span className="flex flex-col gap-[2px] leading-[1.4]">
            <span className="text-[16px] font-medium">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <s className="text-[12px] text-[#717171]">{formatPrice(product.compareAtPrice)}</s>
            )}
          </span>
        </span>
      </Link>
      {/* TODO: добавить в корзину, когда появится корзина */}
      <button
        type="button"
        className="mt-5 h-[49px] w-full bg-[#517EC1] text-[14px] font-medium uppercase text-white transition-colors hover:bg-[#4570b0]"
      >
        Añadir al carrito
      </button>
    </section>
  );
}
