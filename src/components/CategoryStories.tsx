import Image from "next/image";
import Link from "next/link";

// Круглые «сторис» категорий под шапкой — только на телефоне
// (макеты: главная 298:1826, Joyas 310:1039)
const stories = [
  { name: "Anillos", href: "/joyas/anillos", image: "/joyas/story-anillos.png" },
  { name: "Pulseras", href: "/joyas/pulseras", image: "/joyas/story-pulseras.png" },
  { name: "Pendientes", href: "/joyas/pendientes", image: "/joyas/story-pendientes.png" },
  { name: "Collares", href: "/joyas/collares", image: "/joyas/story-collares.png" },
];

export default function CategoryStories({ fontClassName = "" }: { fontClassName?: string }) {
  return (
    <nav
      aria-label="Categorías"
      className={`${fontClassName} flex justify-between border-t border-[#F0F2FF] px-[21px] pb-[18px] pt-[15px] text-[#131314] md:hidden`}
    >
      {stories.map((st) => (
        <Link key={st.href} href={st.href} className="flex w-[60px] flex-col items-center gap-2">
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
          <span className="whitespace-nowrap text-[11px] uppercase">{st.name}</span>
        </Link>
      ))}
    </nav>
  );
}
