import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Edit2, Trash2, Image as ImageIcon, Save, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PageSection {
  id: string;
  page_name: string;
  section_key: string;
  section_title: string;
  content_type: string;
  data: any;
  display_order: number;
  is_active: boolean;
}

interface PageInfo {
  name: string;
  title: string;
  route: string;
}

const PAGES: PageInfo[] = [
  { name: "home", title: "Home Page", route: "/" },
  { name: "about", title: "About Page", route: "/about" },
  { name: "contact", title: "Contact Page", route: "/contact" },
  { name: "facilities", title: "Facilities Page", route: "/facilities" },
  { name: "faq", title: "FAQ Page", route: "/faq" },
];

const AdminPages = () => {
  const { loading: authLoading } = useAdminAuth();
  const { toast } = useToast();
  const [view, setView] = useState<"list" | "edit">("list");
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [pageSections, setPageSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPath, setEditingPath] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<any>("");

  const fetchPageSections = async (pageName: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("page_sections")
        .select("*")
        .eq("page_name", pageName)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setPageSections(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditPage = (pageName: string) => {
    setSelectedPage(pageName);
    setView("edit");
    fetchPageSections(pageName);
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedPage(null);
    setPageSections([]);
    setEditingPath(null);
  };

  const handleImageUpload = async (file: File, sectionId: string, imagePath: string) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${selectedPage}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("website-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("website-images").getPublicUrl(filePath);

      // Update the section data with new image URL
      const section = pageSections.find(s => s.id === sectionId);
      if (!section) return;

      const newData = { ...section.data };
      const pathParts = imagePath.split('.');
      let current = newData;
      for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]];
      }
      current[pathParts[pathParts.length - 1]] = publicUrl;

      const { error: updateError } = await supabase
        .from("page_sections")
        .update({ data: newData })
        .eq("id", sectionId);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
      
      if (selectedPage) fetchPageSections(selectedPage);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSaveEdit = async (sectionId: string, path: string) => {
    try {
      const section = pageSections.find(s => s.id === sectionId);
      if (!section) return;

      const newData = { ...section.data };
      const pathParts = path.split('.');
      let current = newData;
      for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]];
      }
      current[pathParts[pathParts.length - 1]] = editValue;

      const { error } = await supabase
        .from("page_sections")
        .update({ data: newData })
        .eq("id", sectionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      
      setEditingPath(null);
      if (selectedPage) fetchPageSections(selectedPage);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const renderEditableText = (sectionId: string, path: string, value: string, isLarge = false) => {
    const editKey = `${sectionId}.${path}`;
    const isEditing = editingPath === editKey;

    if (isEditing) {
      return (
        <div className="flex gap-2 items-start">
          {isLarge ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1"
              rows={4}
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1"
            />
          )}
          <Button size="sm" onClick={() => handleSaveEdit(sectionId, path)}>
            <Save className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => setEditingPath(null)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      );
    }

    return (
      <div 
        className="group relative cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors"
        onClick={() => {
          setEditingPath(editKey);
          setEditValue(value);
        }}
      >
        {value || "(Empty)"}
        <Edit2 className="w-4 h-4 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  const renderEditableImage = (sectionId: string, path: string, imageUrl: string) => {
    return (
      <div className="relative group">
        <img src={imageUrl} alt="" className="w-full h-48 object-cover rounded" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="sm"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) handleImageUpload(file, sectionId, path);
              };
              input.click();
            }}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Replace
          </Button>
        </div>
      </div>
    );
  };

  const renderSection = (section: PageSection) => {
    const { data } = section;

    // Hero Section
    if (section.content_type === 'hero') {
      return (
        <Card key={section.id} className="mb-6">
          <CardContent className="p-0">
            <div className="relative h-64 bg-gradient-to-r from-primary/20 to-primary/10">
              {data.image && renderEditableImage(section.id, 'image', data.image)}
              <div className="absolute inset-0 bg-black/50 p-8 text-white flex flex-col justify-center">
                <div className="text-4xl font-bold mb-4">
                  {renderEditableText(section.id, 'title', data.title)}
                </div>
                <div className="text-xl">
                  {renderEditableText(section.id, 'description', data.description, true)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Section Header (complex JSON sections)
    if (section.content_type === 'section_header') {
      return (
        <Card key={section.id} className="mb-6">
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                {section.section_title}
              </h3>
            </div>
            
            {data.title && (
              <div className="text-2xl font-bold mb-4">
                {renderEditableText(section.id, 'title', data.title)}
              </div>
            )}
            
            {data.description && (
              <div className="text-lg mb-4">
                {renderEditableText(section.id, 'description', data.description, true)}
              </div>
            )}

            {data.content && (
              <div className="mb-4">
                {renderEditableText(section.id, 'content', data.content, true)}
              </div>
            )}

            {/* Items array (highlights, facilities, etc) */}
            {data.items && Array.isArray(data.items) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {data.items.map((item: any, index: number) => (
                  <Card key={index} className="p-4">
                    {item.image && renderEditableImage(section.id, `items.${index}.image`, item.image)}
                    {item.title && (
                      <div className="font-semibold mt-2">
                        {renderEditableText(section.id, `items.${index}.title`, item.title)}
                      </div>
                    )}
                    {item.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {renderEditableText(section.id, `items.${index}.description`, item.description, true)}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {/* FAQ items */}
            {data.items && Array.isArray(data.items) && data.items[0]?.question && (
              <div className="space-y-4 mt-4">
                {data.items.map((item: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="font-semibold">
                      {renderEditableText(section.id, `items.${index}.question`, item.question)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {renderEditableText(section.id, `items.${index}.answer`, item.answer, true)}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      );
    }

    // Default fallback
    return (
      <Card key={section.id} className="mb-6">
        <CardContent className="p-6">
          <div className="text-sm text-muted-foreground mb-2">{section.section_title}</div>
          <pre className="text-xs bg-muted p-4 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      </Card>
    );
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // List View
  if (view === "list") {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Pages</h1>
          <p className="text-muted-foreground text-lg">
            Select a page to edit its content visually
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page Title</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PAGES.map((page) => (
                  <TableRow key={page.name}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell className="text-muted-foreground">{page.route}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        onClick={() => handleEditPage(page.name)}
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit Page
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Visual Editor View
  const pageInfo = PAGES.find((p) => p.name === selectedPage);

  return (
    <div className="p-8">
      <div className="mb-6">
        <Button variant="outline" onClick={handleBackToList} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pages
        </Button>
        <h1 className="text-4xl font-bold mb-2">
          Edit: {pageInfo?.title || selectedPage}
        </h1>
        <p className="text-muted-foreground text-lg">
          Click on any text to edit, click on images to replace
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="max-w-5xl">
          {pageSections.map(section => renderSection(section))}
        </div>
      )}
    </div>
  );
};

export default AdminPages;