import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SiteSettings {
  header_logo: string;
  footer_logo: string;
  favicon: string;
  site_name: string;
}

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    header_logo: "/logo-full.jpg",
    footer_logo: "/logo-full.jpg",
    favicon: "/favicon.ico",
    site_name: "The Willow Nest Hotel",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");

      if (!error && data) {
        const settingsMap = data.reduce((acc, setting) => {
          acc[setting.setting_key] = setting.setting_value;
          return acc;
        }, {} as any);

        setSettings({
          header_logo: settingsMap.site_logo || settingsMap.header_logo || "/logo-full.jpg",
          footer_logo: settingsMap.footer_logo || settingsMap.site_logo || "/logo-full.jpg",
          favicon: settingsMap.site_favicon || settingsMap.favicon || "/favicon.ico",
          site_name: settingsMap.site_name || "The Willow Nest Hotel",
        });

        // Update favicon dynamically
        if (settingsMap.site_favicon || settingsMap.favicon) {
          const faviconUrl = settingsMap.site_favicon || settingsMap.favicon;
          const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
          if (link) {
            link.href = faviconUrl;
          } else {
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            newLink.href = faviconUrl;
            document.head.appendChild(newLink);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching site settings:", err);
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading, refetch: fetchSettings };
};
