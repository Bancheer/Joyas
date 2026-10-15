// Скачивает картинки и иконки из макета Figma в папку public/.
// Запуск из корня проекта:  node scripts/fetch-figma-assets.mjs
// Уже скачанные файлы пропускаются. Чтобы перекачать всё заново: --force
//
// Ссылки Figma временные (живут ~7 дней). Если скрипт пишет 403/404 для
// новых файлов, попроси Claude выгрузить ассеты заново и обновить ссылки.

import { access, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const force = process.argv.includes("--force");
const figma = (id, name) => `https://www.figma.com/api/mcp/asset/${id}/${name}`;

// [файл в public/, ссылка Figma]
const assets = [
  // ── Страница Joyas (14.10) ──
  ...[
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
  ].map(([file, name]) => [
    file,
    figma("9dc20712-1dfd-4770-99fd-286bddff9e1a", name),
  ]),

  // ── Каталог (15.10) ──
  ["catalogo/hero.png", figma("f39c1ea4-4caa-4bfa-b932-71911c7f6ee1", "33b23.png")],
  ["icons/star-rating.svg", figma("8b5eb3bf-2170-4c2b-ad36-d74dc0067f03", "f4054.svg")],
  ["icons/check.svg", figma("67bbac5e-4388-400f-8ed0-0e0dc0bb4ac6", "c9ac7.svg")],
  ["icons/chevron-down-blue.svg", figma("c17e9a57-4aa2-4256-b97f-44e82eaad159", "4263b.svg")],
  ["icons/chevron-down.svg", figma("c17e9a57-4aa2-4256-b97f-44e82eaad159", "33528.svg")],
  ["icons/chevron-pagination.svg", figma("8ed5930e-5d11-4bf7-93b9-3b0670adcfc7", "07808.svg")],
  // Фото товаров: 4 ряда по 4 карточки
  ...[
    ["8b5eb3bf-2170-4c2b-ad36-d74dc0067f03", ["f3909", "ce4bf", "3b2d4", "31ebc"]],
    ["1ad4f2b3-7b16-4ad2-ac21-bd71ddc56ef9", ["dc728", "782d3", "7ea6a", "1c497"]],
    ["fe41d745-fa5a-4d37-b75d-bb5e70c770f7", ["8adb9", "85584", "d7b56", "05cf8"]],
    ["651cdb69-7f9f-496a-a389-467eac4ad629", ["8bb40", "3c300", "2accd", "e897c"]],
  ].flatMap(([id, names], row) =>
    names.map((name, col) => [
      `productos/producto-${String(row * 4 + col + 1).padStart(2, "0")}.png`,
      figma(id, `${name}.png`),
    ]),
  ),
];

const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  );

let failed = 0;
let skipped = 0;
for (const [file, url] of assets) {
  const target = join(root, "public", file);
  if (!force && (await exists(target))) {
    skipped++;
    continue;
  }
  try {
    const res = await fetch(url);
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
  `\nСкачано: ${assets.length - skipped - failed}, уже были: ${skipped}, ошибок: ${failed}.`,
);
process.exitCode = failed ? 1 : 0;
