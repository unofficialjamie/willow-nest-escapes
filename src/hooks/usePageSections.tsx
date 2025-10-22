import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PageSection {
  id: string;
  page_name: string;
  section_key: string;
  section_title: string | null;
  content_type: string;
  data: any;
  display_order: number;
  is_active: boolean;
}

export const usePageSections = (pageName: string) => {
  // Load from localStorage immediately to prevent slow loading
  const getCachedSections = (): PageSection[] => {
    try {
      const cached = localStorage.getItem(`page_sections_${pageName}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        // Check if cache is less than 5 minutes old
        if (parsed.timestamp && Date.now() - parsed.timestamp < 5 * 60 * 1000) {
          return parsed.data;
        }
      }
    } catch (err) {
      console.error("Error loading cached page sections:", err);
    }
    return [];
  };

  const [sections, setSections] = useState<PageSection[]>(getCachedSections());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSections();
  }, [pageName]);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from("page_sections")
        .select("*")
        .eq("page_name", pageName)
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      
      const newSections = data || [];
      // Cache sections in localStorage for faster loading
      localStorage.setItem(`page_sections_${pageName}`, JSON.stringify({
        data: newSections,
        timestamp: Date.now()
      }));
      setSections(newSections);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSectionData = (sectionKey: string, fallback: any = {}) => {
    const section = sections.find(s => s.section_key === sectionKey);
    return section?.data || fallback;
  };

  return { sections, loading, error, getSectionData, refetch: fetchSections };
};
