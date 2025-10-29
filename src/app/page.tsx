import React from "react";
import Image from "next/image";
import { Parisienne } from "next/font/google";
import localFont from "next/font/local";

const parisienne = Parisienne({ weight: "400", subsets: ["latin"] });
const metropolis = localFont({
  src: [
    { path: "./fonts/Metropolis-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Metropolis-Medium.otf", weight: "500", style: "normal" },
    // { path: "./fonts/Metropolis-SemiBold.otf", weight: "600", style: "normal" },
  ],
  display: "swap",
});

// Home page layout matching the provided mockup (structure + placeholders only)
// — Texts are taken from the mockup; images are left as empty slots you can fill (SVG/PNG)
// — Tailwind CSS utility classes for spacing/typography; tweak as needed to match pixel specs
// — No external UI libs; pure HTML + Tailwind

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top promo bar */}
      <div className="relative w-full bg-[#B7BEE2] text-slate-900 py-2 px-3">
        {/* соц.иконки слева, центрированы по высоте */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-3 z-10">
          <a
            href="https://facebook.com/yourpage"
            aria-label="Facebook"
            className="p-0 hover:opacity-80 transition"
          >
            <Image
              src="/icons/facebook.svg"
              alt=""
              width={20}
              height={20}
              priority
            />
          </a>
          <a
            href="https://instagram.com/yourpage"
            aria-label="Instagram"
            className="p-0 hover:opacity-80 transition"
          >
            <Image
              src="/icons/instagram.svg"
              alt=""
              width={20}
              height={20}
              priority
            />
          </a>
        </div>

        {/* текст строго по центру */}
        <div className="text-center text-[13px] sm:text-[14px]">
          <span
            className={`${metropolis.className} font-medium tracking-[0.02em] uppercase`}
          >
            DESCUENTO EXTRA:
          </span>
          <span className={`${metropolis.className} font-normal`}>
            {" "}
            Aplicado al carrito sobre dos o más artículos
          </span>
        </div>
      </div>

      {/* Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: brand */}
          <div className="flex items-center gap-3">
            {/* Logo slot */}
            <div className="h-10 w-10 rounded bg-slate-200 grid place-items-center text-xs text-slate-500">
              LOGO
            </div>
            <span className="sr-only">Joyas Rodriguez</span>
          </div>
          {/* Center: nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:text-black" href="#home">
              INICIO
            </a>
            <a className="hover:text-black" href="#joyas">
              JOYAS
            </a>
            <a className="hover:text-black" href="#regalos">
              REGALOS
            </a>
            <a className="hover:text-black" href="#tendencias">
              TENDENCIAS
            </a>
            <a className="hover:text-black" href="#contacto">
              CONTACTO
            </a>
            <a className="hover:text-black" href="#tracking">
              SIGUE TU PEDIDO
            </a>
          </nav>
          {/* Right: utility buttons (placeholders) */}
          <div className="flex items-center gap-3">
            <button className="h-9 px-3 rounded border border-slate-300 text-sm">
              Buscar
            </button>
            <button className="h-9 px-3 rounded border border-slate-300 text-sm">
              Cuenta
            </button>
            <button className="h-9 px-3 rounded border border-slate-300 text-sm">
              Carrito
            </button>
          </div>
        </div>
      </header>

      <main id="home">
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* Лента на всю ширину окна */}
          <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            {/* Контейнер высоты баннера (как в макете — низкая панорама) */}
            <div className="relative h-[320px] sm:h-[380px] md:h-[460px] lg:h-[520px]">
              <Image
                src="/assets/hero.png"
                alt="Joyas Rodriguez — colección"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              {/* Нежная вуаль для читаемости текста */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>

          {/* Текст слева поверх (как в макете) */}
          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
              {/* Смещаем блок немного вниз, чтобы попасть в ту же вертикаль, что и макет */}
              <div className="h-full flex items-start pt-10 sm:pt-14 md:pt-16">
                <div className="max-w-2xl">
                  <div className="text-white">
                    <div className={`grid grid-cols-2`}>
                      {/* строка 1: занимает всю ширину */}
                      <div
                        className={`${parisienne.className} col-span-2 leading-none text-4xl sm:text-5xl md:text-6xl`}
                      >
                        Cada Joya cuenta
                      </div>
                      {/* строка 2: начинается со второй половины контейнера */}
                      <div
                        className={`${parisienne.className} col-start-2 inline-block leading-none mt-1 sm:mt-2 text-4xl sm:text-5xl md:text-6xl italic
              -translate-x-2 sm:-translate-x-10 md:-translate-x-12
              -translate-y-1 sm:-translate-y-2 md:-translate-y-3`}
                      >
                        una historia
                      </div>
                    </div>
                  </div>

                  <p
                    className={`${metropolis.className} mt-3 sm:mt-4 text-white/95 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[px] max-w-2xl `}
                  >
                    Joyas Rodriguez es más que una marca: es una fuente de
                    inspiración y<br /> empoderamiento. Cada pieza de Joyas
                    Rodriguez cuenta una historia
                    <br /> única y captura la esencia de la belleza y la gracia.
                  </p>

                  <div className="mt-6">
                    <a
                      href="#shop-collection"
                      className={`${metropolis.className}
                  inline-flex h-11 items-center px-6 rounded-none
              border border-white text-white bg-transparent font-medium tracking-wide
              cursor-pointer transition-colors duration-200
              hover:bg-white hover:text-brand
                  translate-x-58`}
                    >
                      SHOP COLLECTION
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Colecciones destacadas (3 cards) */}
        <section id="colecciones" className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: "Amor Propio",
                  text: "Piezas que te harán brillar, exaltando el amor hacía ti misma. Celebra tu autenticidad y empoderáte con un toque de elegancia.",
                },
                {
                  title: "Madre & Hija",
                  text: "Un reflejo brillante del amor eterno que compartís como madre & hija, capturado en diseños elegantes y atemporales.",
                },
                {
                  title: "Amor y Compromiso",
                  text: "Diseños únicos que reflejan la eternidad del amor. Encuentra la joya perfecta para tu otra mitad.",
                },
              ].map((c, i) => (
                <article
                  key={i}
                  className="rounded-2xl border border-slate-200 overflow-hidden"
                >
                  {/* Image slot */}
                  <div className="aspect-[4/3] bg-slate-100 grid place-items-center text-slate-400">
                    IMG
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{c.text}</p>
                    <div className="mt-4">
                      <a
                        href="#"
                        className="inline-flex h-10 items-center px-5 rounded bg-black text-white text-sm"
                      >
                        DESCUBRE MÁS
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Historias intro */}
        <section className="py-6">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-700">
              Historias — Cada una de nuestras piezas cuenta con su propia
              historia, un reflejo de momentos especiales que llevarás contigo
              para siempre.
            </p>
          </div>
        </section>

        {/* Los más vendidos */}
        <section id="best-sellers" className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold">
                LOS MÁS VENDIDOS
              </h2>
              <a href="#" className="text-sm underline">
                ver todo
              </a>
            </div>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Anillo Girasol",
                  priceOld: "$809,99 MXN",
                  priceNew: "$440,99 MXN",
                },
                {
                  name: "Anillo Lotus - Empieza de nuevo",
                  priceOld: "$909,99 MXN",
                  priceNew: "$490,99 MXN",
                },
                {
                  name: "Anillo Aventura",
                  priceOld: "$809,99 MXN",
                  priceNew: "$440,99 MXN",
                },
                {
                  name: "Anillo Elijo mi Paz",
                  priceOld: "$980,99 MXN",
                  priceNew: "$490,99 MXN",
                },
              ].map((p, i) => (
                <article
                  key={i}
                  className="group rounded-2xl border border-slate-200 overflow-hidden"
                >
                  {/* Product image slot */}
                  <div className="aspect-[4/5] bg-slate-100 grid place-items-center text-slate-400">
                    IMG
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                        OFERTA
                      </span>
                      <span className="text-slate-500">(42)</span>
                    </div>
                    <h3 className="mt-2 font-medium">{p.name}</h3>
                    <div className="mt-1 flex items-center gap-2 text-sm">
                      <span className="line-through text-slate-400">
                        {p.priceOld}
                      </span>
                      <span className="font-semibold">{p.priceNew}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="h-10 px-4 rounded border border-slate-300 text-sm">
                        Añadir
                      </button>
                      <button className="h-10 px-4 rounded bg-black text-white text-sm">
                        Comprar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section id="categorias" className="py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold">
              Descubre y compra por categorías
            </h2>
            <p className="mt-1 text-slate-600">
              Hermoso diseño y artesanía sin igual.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["ANILLOS", "PULSERAS", "PENDIENTES", "COLLARES"].map((cat) => (
                <a
                  key={cat}
                  href="#"
                  className="rounded-xl border border-slate-200 py-8 grid place-items-center text-sm font-medium"
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram / UGC */}
        <section
          id="instagram"
          className="py-12 bg-slate-50 border-y border-slate-200"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold">
              ÚNETE A LOS MÁS DE 30.000 DE NUESTRA CUENTA INSTAGRAM
            </h2>
            <p className="mt-2 text-slate-600 max-w-3xl mx-auto">
              Comparte los momentos en los cuales recibes o regalas una de
              nuestras Joyas. Recibirás así las novedades y los mejores
              descuentos por adelantado.
            </p>
            <p className="mt-2 text-slate-600">@joyas_rodriguez_</p>
            {/* Gallery slot */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-slate-100 border border-slate-200"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section id="newsletter" className="py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-xl sm:text-2xl font-semibold">
              INSCRÍBETE A NUESTRA NEWSLETTER
            </h3>
            <p className="mt-2 text-slate-600">
              Suscríbete para recibir ofertas especiales, sorteos gratuitos y
              ofertas únicas.
            </p>
            <form className="mt-6 grid sm:grid-cols-[1fr_auto] gap-3">
              <input
                type="email"
                placeholder="E-mail"
                className="h-11 rounded border border-slate-300 px-4"
              />
              <button
                type="submit"
                className="h-11 px-6 rounded bg-black text-white text-sm"
              >
                SUBSCRIBIR
              </button>
            </form>
          </div>
        </section>

        {/* Experience blocks */}
        <section
          id="experiencia"
          className="py-12 bg-slate-50 border-y border-slate-200"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="sr-only">La experiencia Joyas Rodriguez</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Envíos gratuitos",
                  text: "Ofrecemos envíos gratuitos en todos los pedidos con un tiempo de entrega de 6-12 días laborables.",
                  cta: "Para saber más",
                },
                {
                  title: "Joyas Rodriguez a tu servicio",
                  text: "Nuestros expertos en atención al cliente están siempre a tu disposición para cualquier duda que tengas.",
                  cta: "Contáctenos",
                },
                {
                  title: "Historias únicas",
                  text: "Nuestras joyas cuentan historias únicas y cada una llega con su propia tarjeta de mensaje, lista para regalar.",
                  cta: "Descubre las colecciones",
                },
                {
                  title: "La icónica Caja Azul",
                  text: "Tu compra de Joyas Rodríguez siempre llega empaquetada en nuestra Caja Azul, elegante y refinada.",
                  cta: "Descubre todos los regalos",
                },
              ].map((f, i) => (
                <article
                  key={i}
                  className="rounded-2xl border border-slate-200 p-5 bg-white"
                >
                  {/* Icon/image slot */}
                  <div className="h-12 w-12 rounded bg-slate-100 border border-slate-200" />
                  <h3 className="mt-3 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{f.text}</p>
                  <div className="mt-4">
                    <a href="#" className="text-sm underline">
                      {f.cta}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About us */}
        <section id="sobre-nosotros" className="py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
            {/* Image slot */}
            <div className="aspect-[4/3] rounded-xl bg-slate-100 border border-slate-200" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Sobre nosotros</h2>
              <p className="mt-4 text-slate-700">
                Felicidad y Paz — La mayoría de nuestras piezas de joyería están
                hechas de plata de ley 925. No sólo están hechas para brillar y
                relucir, sino también para durar. Cada Joya llega con su propia
                cajita y con su tarjeta con un mensaje significativo. Joyas
                Rodríguez encarna el espíritu de aventura y el valor para
                perseguir tus sueños.
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex h-11 items-center px-6 rounded bg-black text-white text-sm"
                >
                  MÁS ACERCA DE NOSOTROS
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Perks row */}
        <section className="py-8 border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center text-sm font-medium">
            <div className="py-3">
              Caja regalo incluida en todos los pedidos
            </div>
            <div className="py-3">30 días de garantía</div>
            <div className="py-3">Envío gratuito en todos los pedidos</div>
            <div className="py-3">Más de 200.000 clientes satisfechos</div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonios" className="py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Lo que dicen de nosotros
            </h2>
            <p className="mt-1 text-slate-600">
              más de 200.000 clientes satisfechos
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <blockquote
                  key={i}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <p className="text-slate-700">
                    Siempre compro productos en Joyas Rodriguez. La calidad es
                    muy buena y la atención al cliente perfecta. Además el hecho
                    de que cada producto llegue con su propia tarjeta hace que
                    los regalos sean todavía más únicos. Lo recomiendo
                  </p>
                  <footer className="mt-3 text-sm text-slate-500">
                    — Cliente verificado
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="bg-black text-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
          <div>
            {/* Footer logo slot */}
            <div className="h-10 w-10 rounded bg-slate-700" />
            <p className="mt-3 text-sm">2024 Joyería Rodriguez</p>
          </div>

          <div>
            <h3 className="font-semibold">AYUDA</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#tracking" className="hover:underline">
                  Seguimiento
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="#mantenimiento" className="hover:underline">
                  Mantenimiento de la plata
                </a>
              </li>
              <li>
                <a href="#referencias" className="hover:underline">
                  Referencias
                </a>
              </li>
              <li>
                <a href="#contactos" className="hover:underline">
                  Contactos
                </a>
              </li>
              <li>
                <a href="#quienes-somos" className="hover:underline">
                  ¿Quién Somos?
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">MENU FOOTER</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#envio" className="hover:underline">
                  Política de Envío
                </a>
              </li>
              <li>
                <a href="#privacidad" className="hover:underline">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#leyes" className="hover:underline">
                  Legislación aplicable
                </a>
              </li>
              <li>
                <a href="#reembolso" className="hover:underline">
                  Política de Reembolso
                </a>
              </li>
              <li>
                <a href="#terminos" className="hover:underline">
                  Términos de servicio
                </a>
              </li>
            </ul>
          </div>

          <div id="contactos">
            <h3 className="font-semibold">CONTACTOS</h3>
            <p className="mt-3 text-sm">
              No dudes en ponerse en contacto con nosotros:
            </p>
            <a
              href="mailto:infojoyasrodriguez@gmail.com"
              className="mt-2 inline-block text-sm underline"
            >
              infojoyasrodriguez@gmail.com
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
          © 2024 Joyería Rodriguez. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
