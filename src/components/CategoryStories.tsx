import Image from "next/image";
import Link from "next/link";

// Круглые «сторис» категорий под шапкой — на телефоне и планшете (макеты: главная 298:1826, Joyas 310:1039).
// 5-я категория «Regalos» добавлена сверх макета (там их 4).
const stories = [
  { name: "Anillos", href: "/joyas/anillos", image: "/joyas/story-anillos.png" },
  { name: "Pulseras", href: "/joyas/pulseras", image: "/joyas/story-pulseras.png" },
  { name: "Pendientes", href: "/joyas/pendientes", image: "/joyas/story-pendientes.png" },
  { name: "Collares", href: "/joyas/collares", image: "/joyas/story-collares.png" },
  { name: "Regalos", href: "/regalos", image: "/joyas/story-regalos.png" },
];

export default function CategoryStories({ fontClassName = "" }: { fontClassName?: string }) {
  return (
    <nav
      aria-label="Categorías"
      className={`${fontClassName} flex justify-between border-t border-[#F0F2FF] px-[10px] pb-[18px] pt-[15px] text-[#131314] min-[400px]:px-[21px] md:justify-center md:gap-[48px] lg:hidden`}
    >
      {stories.map((st) => (
        <Link key={st.href} href={st.href} className="flex w-[62px] flex-col items-center gap-2">
          <span className="relative size-[60px]">
            <Image
              src={st.image}
              alt=""
              width={54}
              height={54}
              className="absolute left-[3px] top-[3px] rounded-full"
            />
            <Image
              src="/icons/story-ring.svg"
              alt=""
              width={64}
              height={64}
              className="absolute -inset-[2px] max-w-none"
            />
          </span>
          <span className="whitespace-nowrap text-[10px] uppercase min-[400px]:text-[11px]">{st.name}</span>
        </Link>
      ))}
    </nav>
  );
}
