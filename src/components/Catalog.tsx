"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import {
  FILTER_GROUPS,
  type Category,
  type FilterKey,
  type Product,
} from "@/data/products";

const PAGE_SIZE = 16; // 4 ряда по 4 карточки, как в макете

const SORT_OPTIONS = [
  { value: "destacados", label: "Destacados" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "valoracion", label: "Más valorados" },
] as const;
type SortValue = (typeof SORT_OPTIONS)[number]["value"];

type Selected = Record<FilterKey, string[]>;
const emptySelection = (): Selected => ({
  category: [],
  material: [],
  size: [],
  color: [],
});

function matches(product: Product, selected: Selected) {
  const { category, material, size, color } = selected;
  if (category.length && !category.includes(product.category)) return false;
  if (material.length && !product.materials.some((m) => material.includes(m)))
    return false;
  if (size.length && !size.includes(product.size)) return false;
  if (color.length && !product.colors.some((c) => color.includes(c)))
    return false;
  return true;
}

function sortProducts(list: Product[], sort: SortValue) {
  const sorted = [...list];
  if (sort === "precio-asc") sorted.sort((a, b) => a.price - b.price);
  if (sort === "precio-desc") sorted.sort((a, b) => b.price - a.price);
  if (sort === "valoracion")
    sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  return sorted;
}

export default function Catalog({
  products,
  initialCategory,
}: {
  products: Product[];
  initialCategory?: Category;
}) {
  const [selected, setSelected] = useState<Selected>(() => ({
    ...emptySelection(),
    category: initialCategory ? [initialCategory] : [],
  }));
  const [sort, setSort] = useState<SortValue>("destacados");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const toolbarRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const gridTopRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => sortProducts(products.filter((p) => matches(p, selected)), sort),
    [products, selected, sort],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const activeCount = Object.values(selected).flat().length;

  // Закрываем выпадашки по клику снаружи и по Escape
  useEffect(() => {
    if (!filtersOpen && !sortOpen) return;
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (toolbarRef.current?.contains(t) || panelRef.current?.contains(t))
        return;
      setFiltersOpen(false);
      setSortOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setFiltersOpen(false);
      setSortOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [filtersOpen, sortOpen]);

  const toggle = (key: FilterKey, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
    setPage(1);
  };

  const clearFilters = () => {
    setSelected(emptySelection());
    setPage(1);
  };

  const goToPage = (p: number) => {
    setPage(p);
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section aria-label="Productos" className="pt-6 pb-16 lg:pt-[35px] lg:pb-[130px]">
      {/* Кол-во товаров + FILTERS / SORT BY */}
      <div
        ref={gridTopRef}
        className="mx-auto flex max-w-[1440px] scroll-mt-24 flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 sm:px-[22px]"
      >
        <p className="text-[14px] leading-[1.4] text-[#131314]" aria-live="polite">
          <span className="font-semibold">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "producto encontrado" : "productos encontrados"}
        </p>

        <div ref={toolbarRef} className="relative flex items-center gap-[39px]">
          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls="catalog-filters"
            onClick={() => {
              setFiltersOpen((o) => !o);
              setSortOpen(false);
            }}
            className={`flex items-center gap-2 text-[14px] font-medium uppercase tracking-[0.14px] ${
              filtersOpen ? "text-[#517EC1]" : "text-[#131314]"
            }`}
          >
            Filters
            {activeCount > 0 && (
              <span className="-ml-1 text-[12px]">({activeCount})</span>
            )}
            <Image
              src={filtersOpen ? "/icons/chevron-down-blue.svg" : "/icons/chevron-down.svg"}
              alt=""
              width={15}
              height={15}
              className={filtersOpen ? "-scale-y-100" : ""}
            />
          </button>

          <div className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={sortOpen}
              onClick={() => {
                setSortOpen((o) => !o);
                setFiltersOpen(false);
              }}
              className={`flex items-center gap-2 text-[14px] font-medium uppercase tracking-[0.14px] ${
                sortOpen ? "text-[#517EC1]" : "text-[#131314]"
              }`}
            >
              Sort by
              <Image
                src={sortOpen ? "/icons/chevron-down-blue.svg" : "/icons/chevron-down.svg"}
                alt=""
                width={15}
                height={15}
                className={sortOpen ? "-scale-y-100" : ""}
              />
            </button>
            {sortOpen && (
              <ul
                role="menu"
                className="absolute right-0 top-full z-30 mt-3 min-w-[230px] border border-[#B7BEE2] bg-white py-2"
              >
                {SORT_OPTIONS.map((o) => (
                  <li key={o.value} role="none">
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={sort === o.value}
                      onClick={() => {
                        setSort(o.value);
                        setPage(1);
                        setSortOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-[14px] tracking-[0.14px] hover:bg-[#EBEFFF] ${
                        sort === o.value ? "text-[#517EC1]" : "text-[#2A2B2D]"
                      }`}
                    >
                      {o.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Сетка товаров; панель фильтров открывается поверх неё на всю ширину */}
      <div className="relative mt-3">
        {filtersOpen && (
          <div
            id="catalog-filters"
            ref={panelRef}
            className="absolute inset-x-0 top-0 z-20 border border-[#B7BEE2] bg-white px-4 py-6 sm:px-[22px] lg:py-[33px]"
          >
            <div className="mx-auto grid max-w-[1141px] grid-cols-2 gap-x-6 gap-y-8 lg:flex lg:justify-between">
              {FILTER_GROUPS.map((group) => (
                <fieldset key={group.key} className="lg:w-[211px]">
                  <legend className="text-[16px] font-medium leading-[1.4] tracking-[0.18px] text-[#131314] lg:text-[18px]">
                    {group.title}
                  </legend>
                  <div className="mt-4 flex flex-col gap-[14px] lg:mt-[22px] lg:pl-[17px]">
                    {group.options.map((opt) => {
                      const id = `f-${group.key}-${opt.value}`;
                      return (
                        <label
                          key={opt.value}
                          htmlFor={id}
                          className="flex cursor-pointer items-center gap-2 text-[14px] leading-[1.4] tracking-[0.14px] text-[#2A2B2D]"
                        >
                          <span className="relative flex size-[18px] shrink-0">
                            <input
                              id={id}
                              type="checkbox"
                              checked={selected[group.key].includes(opt.value)}
                              onChange={() => toggle(group.key, opt.value)}
                              className="peer size-[18px] cursor-pointer appearance-none rounded-[2px] border border-[#B7BEE2] checked:bg-[#B7BEE2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#517EC1]"
                            />
                            <Image
                              src="/icons/check.svg"
                              alt=""
                              width={12}
                              height={12}
                              className="pointer-events-none absolute left-[3px] top-[3px] hidden peer-checked:block"
                            />
                          </span>
                          {opt.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
            {activeCount > 0 && (
              <div className="mx-auto mt-6 max-w-[1141px] text-right">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="border-b border-[#2A2B2D] text-[12px] uppercase leading-[15px] text-[#2A2B2D]"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mx-auto max-w-[1440px] px-4 sm:px-[22px]">
          {visible.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 md:gap-x-3 lg:grid-cols-4 lg:gap-y-[50px]">
              {visible.map((p, i) => (
                <ProductCard key={p.slug} product={p} priority={i < 4} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="text-[16px] text-[#2A2B2D]">
                No encontramos productos con estos filtros.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="border-b border-[#2A2B2D] text-[12px] uppercase leading-[15px] text-[#2A2B2D]"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <nav
              aria-label="Paginación"
              className="mt-16 flex items-start justify-center gap-[10px] lg:mt-[100px]"
            >
              {currentPage > 1 && (
                <button
                  type="button"
                  aria-label="Página anterior"
                  onClick={() => goToPage(currentPage - 1)}
                  className="flex size-8 items-center justify-center bg-[#B7BEE2]"
                >
                  <Image
                    src="/icons/chevron-pagination.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="rotate-90"
                  />
                </button>
              )}
              <div className="flex">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-current={n === currentPage ? "page" : undefined}
                    onClick={() => goToPage(n)}
                    className={`w-8 p-[5px] text-center text-[16px] leading-[1.4] ${
                      n === currentPage ? "text-[#B7BEE2]" : "text-[#131314] hover:text-[#517EC1]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {currentPage < totalPages && (
                <button
                  type="button"
                  aria-label="Página siguiente"
                  onClick={() => goToPage(currentPage + 1)}
                  className="flex size-8 items-center justify-center bg-[#B7BEE2]"
                >
                  <Image
                    src="/icons/chevron-pagination.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="-rotate-90"
                  />
                </button>
              )}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
