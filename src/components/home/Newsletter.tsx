import { metropolis, nunito } from "@/app/fonts";

// «Inscríbete a nuestra newsletter» (макет: homepage 294:455)
// TODO: подключить отправку формы (Shopify / Mailchimp и т.п.)
export default function Newsletter() {
  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-title"
      className={`${metropolis.className} mx-auto mt-16 max-w-[796px] px-4 pb-16 text-center lg:mt-[130px] lg:pb-[130px]`}
    >
      <h2
        id="newsletter-title"
        className={`${nunito.className} text-[24px] font-semibold uppercase leading-[1.35] text-[#131314] sm:text-[28px] lg:text-[34px]`}
      >
        Inscríbete a nuestra newsletter
      </h2>
      <p className="mt-2 text-[14px] leading-[1.2] tracking-[0.14px] text-[#2A2B2D]">
        Suscríbete para recibir ofertas especiales, sorteos gratuitos y ofertas únicas.
      </p>
      <form action="#" className="mx-auto mt-[30px] flex max-w-[542px] items-end gap-3">
        <label htmlFor="newsletter-email" className="sr-only">
          E-mail
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          placeholder="E-mail"
          className="h-9 min-w-0 flex-1 border-b border-[#2A2B2D] bg-transparent text-[14px] leading-[1.7] tracking-[-0.14px] text-[#131314] placeholder:text-[#535353] focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 pb-2 text-[14px] font-medium uppercase tracking-[0.14px] text-[#2A2B2D] hover:text-[#517EC1]"
        >
          Subscribir
        </button>
      </form>
    </section>
  );
}
