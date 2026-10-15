import BestSellersCarousel from "./BestSellersCarousel";
import CategoryStories from "@/components/CategoryStories";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Collections from "@/components/home/Collections";
import Stories from "@/components/home/Stories";
import Testimonials from "@/components/home/Testimonials";
import Categories from "@/components/home/Categories";
import About from "@/components/home/About";
import Experience from "@/components/home/Experience";
import InstagramSection from "@/components/home/InstagramSection";
import Newsletter from "@/components/home/Newsletter";
import { metropolis } from "./fonts";

// Главная. Макеты (Figma, страница «2. Preview»): 360 — 298:1164, 768 — 312:4606, 1440 — 302:6808.
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#131314]">
      <main id="home">
        <CategoryStories fontClassName={metropolis.className} />
        <Hero />
        <TrustStrip />
        <Collections />
        <Stories />
        <BestSellersCarousel fontClassName={metropolis.className} />
        <Testimonials />
        <Categories />
        <About />
        <Experience />
        <InstagramSection />
        <Newsletter />
      </main>
    </div>
  );
}
