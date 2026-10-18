import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Разрешаем открывать dev-сервер по адресу в локальной сети (например, с телефона).
  // Без этого Next.js блокирует свои скрипты и страница не «оживает»: не работают
  // карусели, бургер-меню и бегунок прокрутки.
  allowedDevOrigins: ["192.168.5.6"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "joyasrodriguez.es",
        pathname: "/cdn/shop/files/**",
      },
    ],
  },
};

export default nextConfig;
