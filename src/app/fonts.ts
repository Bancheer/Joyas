import localFont from "next/font/local";
import { Nunito, Parisienne } from "next/font/google";

// Metropolis — замена шрифта Gotham из макета (Book = 400, Medium = 500)
export const metropolis = localFont({
  src: [
    { path: "./fonts/Metropolis-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Metropolis-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/Metropolis-SemiBold.otf", weight: "600", style: "normal" },
  ],
  display: "swap",
});

// Nunito SemiBold — заголовки (стиль h1 в макете: 34px / 1.35)
export const nunito = Nunito({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
});

// Parisienne — рукописные заголовки (баннеры коллекций, «El Regalo Perfecto»)
export const parisienne = Parisienne({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
