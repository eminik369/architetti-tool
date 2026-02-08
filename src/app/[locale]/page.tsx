import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import HowWeWork from "@/components/sections/HowWeWork";
import ImpactSection from "@/components/sections/ImpactSection";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SolutionsSection />
        <HowWeWork />
        <ImpactSection />
      </main>
      <Footer />
    </>
  );
}
