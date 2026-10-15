"use client";

import { Children, useRef, useState, type ReactNode } from "react";

// Горизонтальная карусель на нативной прокрутке (свайп на телефоне) + точки-индикаторы.
// Раскладку на разных экранах задают классы: например, на компьютере трек можно
// превратить в обычную сетку (lg:grid …), а точки скрыть (lg:hidden).
export default function ScrollCarousel({
  children,
  label,
  trackClassName = "",
  itemClassName = "",
  dotsClassName = "",
}: {
  children: ReactNode;
  label: string;
  trackClassName?: string;
  itemClassName?: string;
  dotsClassName?: string;
}) {
  const items = Children.toArray(children);
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = first.offsetWidth + gap;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    const index = atEnd ? items.length - 1 : Math.round(el.scrollLeft / step);
    setActive(Math.max(0, Math.min(items.length - 1, index)));
  };

  const goTo = (i: number) => {
    const child = trackRef.current?.children[i] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  return (
    <>
      <ul
        ref={trackRef}
        onScroll={onScroll}
        aria-label={label}
        className={`snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${trackClassName}`}
      >
        {items.map((child, i) => (
          <li key={i} className={`shrink-0 snap-start ${itemClassName}`}>
            {child}
          </li>
        ))}
      </ul>

      {items.length > 1 && (
        <div className={`flex items-center justify-center gap-[10px] ${dotsClassName}`}>
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir al elemento ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all ${
                i === active ? "size-[10px] bg-[#B7BEE2]" : "size-[6px] bg-[#DCDDE3]"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
