"use client";

import Image from "next/image";
import { useState } from "react";

// Плашка с промокодом: по клику копирует код в буфер обмена.
export default function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // буфер обмена недоступен (например, http) — просто ничего не делаем
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copiar código ${code}`}
      className="flex w-full items-center justify-between gap-[13px] bg-[#517EC1] p-2 text-[16px] font-medium uppercase leading-none tracking-[0.16px] text-white transition-colors hover:bg-[#3F68A6]"
    >
      <span aria-live="polite">{copied ? "¡Copiado!" : code}</span>
      <Image src="/icons/copy.svg" alt="" width={14} height={14} className="shrink-0" />
    </button>
  );
}
