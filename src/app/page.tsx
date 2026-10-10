import ConstructionSlider from "@/components/ConstructionSlider";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ProjectsGallery from "@/components/ProjectsGallery";
import CostCalculator from "@/components/CostCalculator";
import DistrictSection from "@/components/DistrictSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import RssNewsSection from "@/components/RssNewsSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";

export default function Home() {
  return (
    <>
      {/* Menünün hemen ardından gelen İnşaat Projeleri Slider'ı */}
      <ConstructionSlider />
      <Hero />
      <ServicesSection />
      <ProjectsGallery />
      <CostCalculator />
      <DistrictSection />
      <TestimonialsSection />
      <RssNewsSection />
      <BlogPreviewSection />
    </>
  );
}
