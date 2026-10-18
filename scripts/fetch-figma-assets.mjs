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

  // ── Страница товара (15.10) ──
  // Галерея Anillo Aventura (8 фото)
  ...["fb197", "883eb", "448fd", "74ab6", "b1635", "6b466", "5ad33", "82629"].map(
    (name, i) => [
      `productos/aventura/foto-${i + 1}.png`,
      figma("392c5380-5340-48a8-861e-dc77da05430f", `${name}.png`),
    ],
  ),
  ["icons/chevron-select.svg", figma("54270636-94b3-44b2-831e-ab64302b651f", "9bf4d.svg")],
  ["icons/minus.svg", figma("54270636-94b3-44b2-831e-ab64302b651f", "933f4.svg")],
  ["icons/plus.svg", figma("54270636-94b3-44b2-831e-ab64302b651f", "cac73.svg")],
  ["icons/feature-gift.svg", figma("2f3d2776-a0b7-48fc-98db-c787275eb56b", "ba944.svg")],
  ["icons/feature-silver.svg", figma("2f3d2776-a0b7-48fc-98db-c787275eb56b", "0d289.svg")],
  ["icons/feature-truck.svg", figma("2f3d2776-a0b7-48fc-98db-c787275eb56b", "71805.svg")],
  ["icons/feature-warranty.svg", figma("2f3d2776-a0b7-48fc-98db-c787275eb56b", "c3cf1.svg")],
  ["icons/offer-diamond.svg", figma("adb44ce5-1b4b-4502-a37d-2efdc12866f2", "5151e.svg")],
  ["icons/offer-arrow.svg", figma("adb44ce5-1b4b-4502-a37d-2efdc12866f2", "f0049.svg")],
  ["icons/chevron-accordion.svg", figma("68f23861-c1a9-4648-8dec-e0920711578b", "9728e.svg")],
  ["icons/chevron-accordion-blue.svg", figma("a27dd76a-260f-4851-a410-4ca9d673ca99", "4bb04.svg")],
  // Иконки оплаты, которых нет в футере
  ["icons/payments/bancontact.svg", figma("d4af81aa-759b-4289-ad92-e45d51fd4ab2", "70e24.svg")],
  ["icons/payments/gpay-g.svg", figma("d4af81aa-759b-4289-ad92-e45d51fd4ab2", "42554.svg")],
  ["icons/payments/gpay-pay.svg", figma("d4af81aa-759b-4289-ad92-e45d51fd4ab2", "49a3b.svg")],

  // ── Главная: «La experiencia» и Instagram (15.10) ──
  ["icons/experiencia-envio.svg", "https://www.figma.com/api/mcp/asset/587e5f08-5b96-4ecd-afa1-6c7c6abd2659.svg"],
  ["icons/experiencia-servicio.svg", "https://www.figma.com/api/mcp/asset/f6377635-e77d-4563-8551-e5dd80e44222.svg"],
  ["icons/experiencia-historias.svg", "https://www.figma.com/api/mcp/asset/c5d83fc8-e36e-46d3-bde7-ebc85cf8d3f4.svg"],
  ["icons/experiencia-caja.svg", "https://www.figma.com/api/mcp/asset/adf109e3-85d4-4f2e-90a7-0b41dbb63dc7.svg"],
  ["icons/arrow-right-blue.svg", figma("67fbc10d-21b2-45a6-b783-aa6a197dd931", "c4b4c.svg")],
  ["instagram/foto-1.png", figma("fdc1af84-714f-4551-b25d-03c14f83ac8b", "ec71f.png")],
  ["instagram/foto-2.png", figma("fdc1af84-714f-4551-b25d-03c14f83ac8b", "a523a.png")],
  ["instagram/foto-3.png", figma("fdc1af84-714f-4551-b25d-03c14f83ac8b", "44e5a.png")],
  ["instagram/foto-4.png", figma("fdc1af84-714f-4551-b25d-03c14f83ac8b", "6ee78.png")],

  // ── Мобильная версия (15.10) ──
  ["icons/hamburger.svg", figma("f41d971d-58fb-4fb9-8866-7fe439794a0a", "da68b.svg")],
  ["icons/story-ring.svg", figma("77b795dc-7948-46fd-9c60-c05418fa1e80", "c9885.svg")],
  ["joyas/story-anillos.png", figma("77b795dc-7948-46fd-9c60-c05418fa1e80", "61d5e.png")],
  ["joyas/story-pulseras.png", figma("77b795dc-7948-46fd-9c60-c05418fa1e80", "6199e.png")],
  ["joyas/story-pendientes.png", figma("77b795dc-7948-46fd-9c60-c05418fa1e80", "6430a.png")],
  ["joyas/story-collares.png", figma("77b795dc-7948-46fd-9c60-c05418fa1e80", "6c2b0.png")],
  ["assets/hero-mobile.png", figma("42cd0952-25fd-4707-8a6a-2d66d19956c2", "a033d.png")],
  ["assets/hero-tablet.png", figma("bf120182-5f6c-4cc1-83a8-a4372db06092", "02e57.png")],
  ["icons/trust-caja.svg", "https://www.figma.com/api/mcp/asset/0abe9def-9f61-4eec-8d73-870ec8d9c155.svg"],
  ["icons/trust-garantia.svg", "https://www.figma.com/api/mcp/asset/9a3a306e-f445-43c8-98d4-8728d9c74de3.svg"],
  ["icons/trust-envio.svg", "https://www.figma.com/api/mcp/asset/ee75dbbc-0616-440f-ac25-a88cfd81b47e.svg"],
  // ── Regalos (18.10) ──
  ["regalos/promo.png", figma("c81df125-54a6-4475-92d2-b383a71a8ea4", "f8998.png")],
  ["icons/copy.svg", figma("c81df125-54a6-4475-92d2-b383a71a8ea4", "ad36f.svg")],
  // ── Quién somos (18.10) ──
  ["quien-somos/hero.png", figma("860bd314-9558-48e2-b519-1d1ed704a2a6", "c40ac.png")],
  ["quien-somos/mision.png", figma("860bd314-9558-48e2-b519-1d1ed704a2a6", "07821.png")],
  ["icons/logo-diamond.svg", figma("860bd314-9558-48e2-b519-1d1ed704a2a6", "85e53.svg")],
  ["icons/mision.svg", figma("860bd314-9558-48e2-b519-1d1ed704a2a6", "ff9bf.svg")],
  // ── Dicen de nosotros (18.10) ──
  ["dicen/hero.png", figma("a13b3bf6-32fe-44c7-a344-1c2ec0b73c8e", "75d41.png")],
  ["dicen/diana.png", figma("1b44e6e6-fd9a-49a6-92f0-4c44964184de", "d14b3.png")],
  ["icons/check-circle.svg", figma("1b44e6e6-fd9a-49a6-92f0-4c44964184de", "e7447.svg")],
  ["icons/flag-mx.svg", figma("1b44e6e6-fd9a-49a6-92f0-4c44964184de", "dfa92.svg")],
  ["icons/arrow-long-blue.svg", figma("1b44e6e6-fd9a-49a6-92f0-4c44964184de", "3c5d4.svg")],
  ["dicen/perla.png", figma("e5e88015-f9e9-4306-bc86-40aa415e10a1", "b7e25.png")],
  ["dicen/video.png", figma("e5e88015-f9e9-4306-bc86-40aa415e10a1", "11d69.png")],
  ["icons/instagram-color.svg", figma("e5e88015-f9e9-4306-bc86-40aa415e10a1", "5b320.svg")],
  ["dicen/resena-1.png", figma("2e1f15f2-7802-4284-aa13-6d665c4f9452", "4e767.png")],
  ["dicen/avatar-1.png", figma("2e1f15f2-7802-4284-aa13-6d665c4f9452", "6b140.png")],
  ["dicen/resena-2.png", figma("2e1f15f2-7802-4284-aa13-6d665c4f9452", "98163.png")],
  ["dicen/avatar-2.png", figma("2e1f15f2-7802-4284-aa13-6d665c4f9452", "36659.png")],
  ["dicen/resena-3.png", figma("2e1f15f2-7802-4284-aa13-6d665c4f9452", "3628c.png")],
  ["dicen/avatar-3.png", figma("2e1f15f2-7802-4284-aa13-6d665c4f9452", "65633.png")],
  ["dicen/resena-4.png", figma("2e1f15f2-7802-4284-aa13-6d665c4f9452", "25f12.png")],
  ["dicen/avatar-4.png", figma("2e1f15f2-7802-4284-aa13-6d665c4f9452", "47a28.png")],
  ["dicen/story-1.png", figma("280007be-609e-4e4d-9388-c7c9a29188ee", "8d2b0.png")],
  ["dicen/story-2.png", figma("280007be-609e-4e4d-9388-c7c9a29188ee", "0bc87.png")],
  ["dicen/story-3.png", figma("280007be-609e-4e4d-9388-c7c9a29188ee", "2d1a3.png")],
  ["dicen/story-4.png", figma("280007be-609e-4e4d-9388-c7c9a29188ee", "49342.png")],
  // ── Cuidado de las joyas (18.10) ──
  ["cuidado/hero.png", figma("67132d7d-1745-4c38-bc7e-b57c413405f2", "7a077.png")],
  ["cuidado/como-cuidar.png", figma("67132d7d-1745-4c38-bc7e-b57c413405f2", "cc462.png")],
  ["cuidado/consejos.png", figma("67132d7d-1745-4c38-bc7e-b57c413405f2", "8c7d8.png")],
  ["icons/divider.svg", figma("67132d7d-1745-4c38-bc7e-b57c413405f2", "3bc18.svg")],
  ["icons/bullet-blue.svg", figma("67132d7d-1745-4c38-bc7e-b57c413405f2", "fdbab.svg")],
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
