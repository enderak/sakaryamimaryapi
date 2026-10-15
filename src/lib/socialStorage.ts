import fs from "fs";
import path from "path";
import { SocialMediaConfig, defaultSocialMediaConfig, extractYouTubeId } from "@/data/socialMedia";

const DATA_DIR = path.join(process.cwd(), "data");
const SOCIAL_CONFIG_FILE = path.join(DATA_DIR, "social-media-config.json");

let memorySocialCache: SocialMediaConfig | null = null;

export function getSocialMediaConfig(): SocialMediaConfig {
  try {
    if (!fs.existsSync(SOCIAL_CONFIG_FILE)) {
      if (!fs.existsSync(DATA_DIR)) {
        try {
          fs.mkdirSync(DATA_DIR, { recursive: true });
        } catch {}
      }
      try {
        fs.writeFileSync(SOCIAL_CONFIG_FILE, JSON.stringify(defaultSocialMediaConfig, null, 2), "utf-8");
      } catch {}
      memorySocialCache = defaultSocialMediaConfig;
      return defaultSocialMediaConfig;
    }

    const content = fs.readFileSync(SOCIAL_CONFIG_FILE, "utf-8");
    const parsed = JSON.parse(content);

    return {
      channels: {
        instagram: {
          ...defaultSocialMediaConfig.channels.instagram,
          ...(parsed.channels?.instagram || {})
        },
        tiktok: {
          ...defaultSocialMediaConfig.channels.tiktok,
          ...(parsed.channels?.tiktok || {})
        },
        youtube: {
          ...defaultSocialMediaConfig.channels.youtube,
          ...(parsed.channels?.youtube || {}),
          featuredVideoId: parsed.channels?.youtube?.featuredVideoId || extractYouTubeId(parsed.channels?.youtube?.featuredVideoUrl || "") || defaultSocialMediaConfig.channels.youtube.featuredVideoId
        },
        facebook: {
          ...defaultSocialMediaConfig.channels.facebook,
          ...(parsed.channels?.facebook || {})
        },
        linkedin: {
          ...defaultSocialMediaConfig.channels.linkedin,
          ...(parsed.channels?.linkedin || {})
        },
        pinterest: {
          ...defaultSocialMediaConfig.channels.pinterest,
          ...(parsed.channels?.pinterest || {})
        }
      },
      showcaseSection: {
        ...defaultSocialMediaConfig.showcaseSection,
        ...(parsed.showcaseSection || {}),
        posts: parsed.showcaseSection?.posts || defaultSocialMediaConfig.showcaseSection.posts
      }
    };
  } catch (err) {
    console.error("Error reading social media config:", err);
    return defaultSocialMediaConfig;
  }
}

export function saveSocialMediaConfig(config: SocialMediaConfig): boolean {
  try {
    memorySocialCache = config;
    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch {}
    }
    try {
      fs.writeFileSync(SOCIAL_CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
    } catch (writeErr) {
      console.warn("Could not write social-media-config.json on serverless:", writeErr);
    }
    return true;
  } catch (err) {
    console.error("Error saving social media config:", err);
    return false;
  }
}
