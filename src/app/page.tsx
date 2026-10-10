import Hero from "@/components/Hero";
import ConstructionSlider from "@/components/ConstructionSlider";
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
      <Hero />
      <ConstructionSlider />
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
