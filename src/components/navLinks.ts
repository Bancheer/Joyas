// Пункты меню шапки (общие для десктопного меню и бургер-меню)
export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Joyas", href: "/joyas" },
  { label: "Regalos", href: "/regalos" },
  { label: "Tendencias", href: "/#tendencias" },
];

export const SECONDARY_LINKS = [
  { label: "Contacto", href: "#contacto" },
  { label: "Sigue tu pedido", href: "#pedido" },
];

// Выпадающее меню «Joyas» на компьютере (макет 452:746).
// ВРЕМЕННО: подкатегорий пока нет как отдельных страниц — пункты ведут в каталог категории.
export const JOYAS_MENU = [
  {
    title: "Anillos",
    href: "/joyas/anillos",
    items: ["Todos", "Más Vendidos", "Élite® Anillos de Cadena", "Amor Propio", "Religiosos", "Amuleto", "Ansiedad", "Personalizados"],
  },
  {
    title: "Pulseras",
    href: "/joyas/pulseras",
    items: ["Todos", "Pulseras Feel Good®", "Más Vendidos", "Religiosos", "Amuleto", "Personalizados"],
  },
  {
    title: "Pendientes",
    href: "/joyas/pendientes",
    items: ["Todos", "Más Vendidos", "Novedades", "Set y Combinaciones", "Aretes", "Huggies Abiertos", "De Caida", "De Punto"],
  },
  { title: "Collares", href: "/joyas/collares", items: ["Todos", "Más Vendidos", "Personalizados"] },
  { title: "Para hombre", href: "/regalos/hombres", items: ["Todos", "Collares y Colgantes", "Pulseras"] },
];

export function joyasMenuHref(columnHref: string, item: string) {
  if (item === "Más Vendidos") return "/joyas/mas-vendidos";
  if (item === "Novedades") return "/joyas/novedades";
  if (item === "Pulseras") return "/joyas/pulseras";
  return columnHref;
}
