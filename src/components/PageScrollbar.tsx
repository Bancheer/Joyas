"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

// Бегунок прокрутки страницы в цветах бренда.
// Обычная полоса прокрутки скрыта (globals.css), поэтому показываем свой бегунок справа:
// на компьютере виден всегда, на сенсорных экранах появляется при прокрутке и прячется через секунду.
// Мышью его можно тянуть, клик по дорожке листает на экран вверх/вниз.
// На сенсорных экранах — тонкий индикатор без перетаскивания (листают пальцем).
const MARGIN = 4; // отступ дорожки от верха и низа окна
const MIN_THUMB = 40;

export default function PageScrollbar() {
  const [thumb, setThumb] = useState({ top: 0, height: 0, show: false });
  const [active, setActive] = useState(false); // недавно прокручивали / тянут / навели
  const [dragging, setDragging] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hovered = useRef(false);
  const drag = useRef<{ startY: number; startScroll: number } | null>(null);
  const frame = useRef(0);

  // Геометрия: сколько можно прокрутить и сколько пикселей бегунка приходится на пиксель страницы
  const metrics = () => {
    const doc = document.documentElement;
    const view = window.innerHeight;
    const max = doc.scrollHeight - view;
    const track = view - MARGIN * 2;
    const height = Math.max(MIN_THUMB, (track * view) / doc.scrollHeight);
    return { max, track, height };
  };

  const scheduleHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!hovered.current && !drag.current) setActive(false);
    }, 1000);
  };

  useEffect(() => {
    const update = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const { max, track, height } = metrics();
        if (max <= 0) {
          setThumb((t) => ({ ...t, show: false }));
          return;
        }
        const top = MARGIN + (window.scrollY / max) * (track - height);
        setThumb({ top, height, show: true });
      });
    };
    const onScroll = () => {
      update();
      setActive(true);
      scheduleHide();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    // Высота страницы меняется при подгрузке картинок, фильтрах и т.п.
    const observer = new ResizeObserver(update);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      observer.disconnect();
      cancelAnimationFrame(frame.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const onThumbDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startY: e.clientY, startScroll: window.scrollY };
    setDragging(true);
    setActive(true);
  };

  const onThumbMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const { max, track, height } = metrics();
    const ratio = max / Math.max(1, track - height);
    window.scrollTo({ top: drag.current.startScroll + (e.clientY - drag.current.startY) * ratio });
  };

  const onThumbUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    drag.current = null;
    setDragging(false);
    scheduleHide();
  };

  // Клик по дорожке выше/ниже бегунка — прокрутка на экран
  const onTrackDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const dir = e.clientY < thumb.top ? -1 : 1;
    window.scrollBy({ top: dir * window.innerHeight * 0.9, behavior: "smooth" });
  };

  if (!thumb.show) return null;

  return (
    <div
      aria-hidden
      onPointerDown={onTrackDown}
      onPointerEnter={() => {
        hovered.current = true;
        setActive(true);
      }}
      onPointerLeave={() => {
        hovered.current = false;
        scheduleHide();
      }}
      className="group fixed inset-y-0 right-0 z-[70] w-[14px] transition-colors hover:bg-[#F4F5FB]/80 pointer-coarse:pointer-events-none"
    >
      <div
        onPointerDown={onThumbDown}
        onPointerMove={onThumbMove}
        onPointerUp={onThumbUp}
        onPointerCancel={onThumbUp}
        style={{ top: thumb.top, height: thumb.height }}
        className={`absolute right-[3px] rounded-full transition-[opacity,width,background-color] duration-300 motion-reduce:transition-none pointer-coarse:right-[2px] pointer-coarse:w-[3px] ${
          dragging
            ? "w-[8px] cursor-grabbing bg-[#517EC1]"
            : "w-[6px] cursor-grab bg-[#B7BEE2] group-hover:w-[8px] group-hover:bg-[#517EC1]"
        } ${active || dragging ? "opacity-100" : "opacity-0 pointer-fine:opacity-100"}`}
      />
    </div>
  );
}
