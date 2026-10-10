import ConstructionSlider from "@/components/ConstructionSlider";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ProjectsGallery from "@/components/ProjectsGallery";
import CostCalculator from "@/components/CostCalculator";
import DistrictSection from "@/components/DistrictSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import RssNewsSection from "@/components/RssNewsSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import { getHomeModulesConfig } from "@/lib/modulesStorage";

export default function Home() {
  const config = getHomeModulesConfig();
  const { sections, content } = config;

  // Build sorted list of enabled sections
  const sectionList = [
    {
      id: "constructionSlider",
      enabled: sections.constructionSlider?.enabled ?? true,
      order: sections.constructionSlider?.order ?? 1,
      component: <ConstructionSlider key="constructionSlider" config={content.constructionSlider} />
    },
    {
      id: "hero",
      enabled: sections.hero?.enabled ?? true,
      order: sections.hero?.order ?? 2,
      component: <Hero key="hero" config={content.hero} />
    },
    {
      id: "services",
      enabled: sections.services?.enabled ?? true,
      order: sections.services?.order ?? 3,
      component: <ServicesSection key="services" config={content.services} />
    },
    {
      id: "projects",
      enabled: sections.projects?.enabled ?? true,
      order: sections.projects?.order ?? 4,
      component: <ProjectsGallery key="projects" config={content.projects} />
    },
    {
      id: "calculator",
      enabled: sections.calculator?.enabled ?? true,
      order: sections.calculator?.order ?? 5,
      component: <CostCalculator key="calculator" config={content.calculator} />
    },
    {
      id: "districts",
      enabled: sections.districts?.enabled ?? true,
      order: sections.districts?.order ?? 6,
      component: <DistrictSection key="districts" config={content.districts} />
    },
    {
      id: "testimonials",
      enabled: sections.testimonials?.enabled ?? true,
      order: sections.testimonials?.order ?? 7,
      component: <TestimonialsSection key="testimonials" config={content.testimonials} />
    },
    {
      id: "news",
      enabled: sections.news?.enabled ?? true,
      order: sections.news?.order ?? 8,
      component: <RssNewsSection key="news" config={content.news} />
    },
    {
      id: "blog",
      enabled: sections.blog?.enabled ?? true,
      order: sections.blog?.order ?? 9,
      component: <BlogPreviewSection key="blog" config={content.blog} />
    }
  ];

  // Filter only enabled modules and sort according to order
  const activeSections = sectionList
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {activeSections.map((s) => s.component)}
    </>
  );
}
