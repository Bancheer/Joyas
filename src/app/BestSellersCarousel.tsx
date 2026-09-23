
          <a
            href="#categorias"
            className={`${fontClassName} mt-2 inline-flex items-center gap-2 text-[12px] font-medium tracking-wide text-[#517EC1] hover:underline`}
          >
            VER TODO <span aria-hidden="true">⟶</span>
          </a>
        </div>

        <div className="flex gap-2" aria-label="Controles del carrusel">
          <button
            type="button"
            aria-label="Ver productos anteriores"
            disabled={!canGoBack}
            onClick={() => scrollProducts(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#517EC1] text-[#517EC1] transition-colors hover:bg-[#517EC1] hover:text-white disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300 disabled:hover:bg-transparent"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Ver siguientes productos"
            disabled={!canGoForward}
            onClick={() => scrollProducts(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#517EC1] text-[#517EC1] transition-colors hover:bg-[#517EC1] hover:text-white disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300 disabled:hover:bg-transparent"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Productos más vendidos"
        tabIndex={0}
        onScroll={updateArrows}
        className="flex snap-x snap-mandatory gap-[3vw] overflow-x-auto scroll-smooth scroll-pl-[4vw] px-[4vw] pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-[2vw] sm:scroll-pl-[2vw] sm:px-[2vw] lg:gap-[1.5vw] lg:scroll-pl-[1.5vw] lg:px-[1.5vw]"
      >
        {products.map((product) => (
          <article
            key={product.name}
            data-product-card
            className="w-[78vw] min-w-0 shrink-0 snap-start sm:w-[43vw] lg:w-[29vw]"
          >
            <div className="relative grid aspect-[4/5] w-full place-items-center overflow-hidden bg-[#FBFAFB]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 43vw, 29vw"
                className="object-contain"
              />
              <span
                className={`${fontClassName} absolute top-[3vw] left-[3vw] bg-[#EC856A] px-2 py-1 text-[10px] text-white uppercase sm:top-[1.5vw] sm:left-[1.5vw] lg:top-[1vw] lg:left-[1vw]`}
              >
                OFERTA
              </span>
            </div>

            <div className="pt-3">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5" aria-label="5 estrellas de 5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image
                      key={index}
                      src="/icons/star.svg"
                      alt=""
                      width={13}
                      height={13}
                    />
                  ))}
                </div>
                <span className="text-[12px] text-slate-600">(42)</span>
              </div>
              <h3 className={`${fontClassName} mt-2 text-[14px] text-slate-900`}>
                {product.name}
              </h3>
              <div className={`${fontClassName} mt-1 flex flex-wrap items-center gap-x-3 text-[13px]`}>
                <span className="text-slate-400 line-through">{product.priceOld}</span>
                <span className="font-medium text-slate-900">{product.priceNew}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}