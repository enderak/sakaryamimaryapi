import fs from "fs";
import path from "path";
import { HomePageModulesConfig, defaultHomeModulesConfig } from "@/data/homeModules";

const DATA_DIR = path.join(process.cwd(), "data");
const CONFIG_FILE = path.join(DATA_DIR, "homepage-modules.json");

let memoryModulesCache: HomePageModulesConfig | null = null;

export function getHomeModulesConfig(): HomePageModulesConfig {
  if (memoryModulesCache) {
    return memoryModulesCache;
  }
  try {
    if (!fs.existsSync(CONFIG_FILE)) {
      // Ensure directory exists and write default
      if (!fs.existsSync(DATA_DIR)) {
        try {
          fs.mkdirSync(DATA_DIR, { recursive: true });
        } catch {}
      }
      try {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultHomeModulesConfig, null, 2), "utf-8");
      } catch {}
      memoryModulesCache = defaultHomeModulesConfig;
      return defaultHomeModulesConfig;
    }

    const fileContent = fs.readFileSync(CONFIG_FILE, "utf-8");
    const parsed = JSON.parse(fileContent);

    // Deep merge with default to prevent any missing keys
    return {
      sections: {
        ...defaultHomeModulesConfig.sections,
        ...(parsed.sections || {})
      },
      content: {
        hero: { ...defaultHomeModulesConfig.content.hero, ...(parsed.content?.hero || {}) },
        constructionSlider: { ...defaultHomeModulesConfig.content.constructionSlider, ...(parsed.content?.constructionSlider || {}) },
        services: { ...defaultHomeModulesConfig.content.services, ...(parsed.content?.services || {}) },
        projects: { ...defaultHomeModulesConfig.content.projects, ...(parsed.content?.projects || {}) },
        calculator: { ...defaultHomeModulesConfig.content.calculator, ...(parsed.content?.calculator || {}) },
        districts: { ...defaultHomeModulesConfig.content.districts, ...(parsed.content?.districts || {}) },
        testimonials: { ...defaultHomeModulesConfig.content.testimonials, ...(parsed.content?.testimonials || {}) },
        news: { ...defaultHomeModulesConfig.content.news, ...(parsed.content?.news || {}) },
        blog: { ...defaultHomeModulesConfig.content.blog, ...(parsed.content?.blog || {}) }
      }
    };
  } catch (err) {
    console.error("Error reading home modules config:", err);
    return defaultHomeModulesConfig;
  }
}

export function saveHomeModulesConfig(config: HomePageModulesConfig): boolean {
  try {
    memoryModulesCache = config;
    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch {}
    }
    try {
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
    } catch (writeErr) {
      console.warn("Could not write homepage-modules.json on serverless:", writeErr);
    }
    return true;
  } catch (err) {
    console.error("Error saving home modules config:", err);
    return false;
  }
}
