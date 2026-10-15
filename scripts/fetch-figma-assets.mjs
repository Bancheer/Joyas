// Скачивает картинки и иконки страницы «Joyas» и футера из макета Figma в папку public/.
// Запуск из корня проекта:  node scripts/fetch-figma-assets.mjs
// Ссылки Figma временные (живут ~7 дней). Если скрипт пишет 403/404,
// попроси Claude выгрузить ассеты заново и обновить ссылки в этом файле.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base =
  "https://www.figma.com/api/mcp/asset/9dc20712-1dfd-4770-99fd-286bddff9e1a";

// [файл в public/, имя ассета в Figma]
const assets = [
  // Страница Joyas
  ["joyas/mas-vendidos.png", "0bef0.png"],
  ["joyas/novedades.png", "ed00a.png"],
  ["joyas/cat-pulseras.png", "53f99.png"],
  ["joyas/cat-anillos.png", "2c09c.png"],
  ["joyas/cat-pendientes.png", "b662b.png"],
  ["joyas/cat-collares.png", "240c3.png"],
  ["joyas/cat-collares-bottom.png", "2c7a2.png"],
  ["joyas/regalo-madre-hija.png", "3284c.png"],
  ["joyas/regalo-mejores-amigos.png", "283ec.png"],
  ["joyas/regalo-amor-compromiso.png", "178fd.png"],
  ["joyas/regalo-hombres.png", "be643.png"],
  // Футер
  ["icons/arrow-right.svg", "75b5b.svg"],
  ["icons/at.svg", "3efa5.svg"],
  ["icons/footer-facebook.svg", "a8fef.svg"],
  ["icons/footer-instagram.svg", "5033c.svg"],
  ["icons/payments/amex.svg", "7278a.svg"],
  ["icons/payments/apple-pay.svg", "19d93.svg"],
  ["icons/payments/diners.svg", "50f7e.svg"],
  ["icons/payments/discover.svg", "4c8b6.svg"],
  ["icons/payments/jcb.svg", "da900.svg"],
  ["icons/payments/mastercard.svg", "3886c.svg"],
  ["icons/payments/visa.svg", "35bad.svg"],
];

let failed = 0;
for (const [file, name] of assets) {
  const target = join(root, "public", file);
  try {
    const res = await fetch(`${base}/${name}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length === 0) throw new Error("пустой файл");
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, buf);
    console.log(`✓ public/${file} (${Math.round(buf.length / 1024)} KB)`);
  } catch (err) {
    failed++;
    console.error(`✗ public/${file}: ${err.message}`);
  }
}

console.log(
  failed
    ? `\nНе скачано: ${failed} из ${assets.length}.`
    : `\nГотово: ${assets.length} файлов.`,
);
process.exitCode = failed ? 1 : 0;
