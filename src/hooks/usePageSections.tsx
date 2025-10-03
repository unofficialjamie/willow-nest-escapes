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
  const [sections, setSections] = useState<PageSection[]>([]);
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
      setSections(data || []);
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
