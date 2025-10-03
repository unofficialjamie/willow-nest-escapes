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
      // Convert image to base64 as temporary workaround for storage issue
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        
        // Update the section data with base64 image
        const section = pageSections.find(s => s.id === sectionId);
        if (!section) return;

        const newData = { ...section.data };
        const pathParts = imagePath.split('.');
        let current = newData;
        for (let i = 0; i < pathParts.length - 1; i++) {
          current = current[pathParts[i]];
        }
        current[pathParts[pathParts.length - 1]] = base64String;

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
      };
      
      reader.onerror = () => {
        throw new Error("Failed to read image file");
      };
      
      reader.readAsDataURL(file);
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
      
      // Handle array values (for features lists)
      const lastKey = pathParts[pathParts.length - 1];
      if (Array.isArray(current[lastKey]) && typeof editValue === 'string') {
        // Convert newline-separated text to array
        current[lastKey] = editValue.split('\n').filter((line: string) => line.trim());
      } else {
        current[lastKey] = editValue;
      }

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

  const renderEditableImage = (sectionId: string, path: string, imageUrl: string, large = false) => {
    return (
      <div className="relative group">
        <img src={imageUrl} alt="" className={`w-full ${large ? 'h-96' : 'h-48'} object-cover rounded`} />
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
            Replace Image
          </Button>
        </div>
      </div>
    );
  };

  const renderEditableIcon = (sectionId: string, path: string, iconValue: string) => {
    // Check if it's an image URL or icon name
    const isImageUrl = iconValue && (iconValue.startsWith('http') || iconValue.startsWith('/') || iconValue.startsWith('data:'));
    
    return (
      <div className="relative group border border-dashed rounded p-3">
        <div className="text-xs font-semibold text-muted-foreground mb-2">Icon/Image</div>
        {isImageUrl ? (
          <div className="relative">
            <img src={iconValue} alt="Icon" className="w-16 h-16 object-contain rounded" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                <ImageIcon className="w-3 h-3 mr-1" />
                Replace
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-sm font-mono text-muted-foreground mb-2">
            Icon Name: {iconValue}
          </div>
        )}
        <Button
          size="sm"
          variant="outline"
          className="w-full mt-2"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/png,image/jpeg,image/svg+xml';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) handleImageUpload(file, sectionId, path);
            };
            input.click();
          }}
        >
          <ImageIcon className="w-3 h-3 mr-1" />
          Upload Icon Image
        </Button>
      </div>
    );
  };

  const renderEditableButton = (sectionId: string, textPath: string, linkPath: string, textValue: string, linkValue: string) => {
    const textKey = `${sectionId}.${textPath}`;
    const linkKey = `${sectionId}.${linkPath}`;
    const isEditingText = editingPath === textKey;
    const isEditingLink = editingPath === linkKey;

    return (
      <div className="border border-dashed rounded p-3 space-y-2">
        <div className="text-xs font-semibold text-muted-foreground mb-2">Button</div>
        
        {/* Text */}
        {isEditingText ? (
          <div className="flex gap-2 items-center">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Button text"
              className="flex-1"
            />
            <Button size="sm" onClick={() => handleSaveEdit(sectionId, textPath)}>
              <Save className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditingPath(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div 
            className="group relative cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors"
            onClick={() => {
              setEditingPath(textKey);
              setEditValue(textValue);
            }}
          >
            <div className="text-sm">Text: <span className="font-medium">{textValue || "(Empty)"}</span></div>
            <Edit2 className="w-3 h-3 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* Link */}
        {linkPath && (isEditingLink ? (
          <div className="flex gap-2 items-center">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Link URL (e.g., /booking, #contact)"
              className="flex-1"
            />
            <Button size="sm" onClick={() => handleSaveEdit(sectionId, linkPath)}>
              <Save className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditingPath(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div 
            className="group relative cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors"
            onClick={() => {
              setEditingPath(linkKey);
              setEditValue(linkValue || '');
            }}
          >
            <div className="text-sm">Link: <span className="font-mono text-xs">{linkValue || "(No link)"}</span></div>
            <Edit2 className="w-3 h-3 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    );
  };

  const renderEditableArray = (sectionId: string, path: string, items: string[]) => {
    const editKey = `${sectionId}.${path}`;
    const isEditing = editingPath === editKey;

    if (isEditing) {
      return (
        <div className="flex gap-2 items-start">
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1"
            rows={Math.min(items.length + 1, 6)}
            placeholder="One item per line"
          />
          <Button size="sm" onClick={() => {
            const lines = editValue.split('\n').filter((l: string) => l.trim());
            handleSaveEdit(sectionId, path);
          }}>
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
        className="group relative cursor-pointer hover:bg-muted/50 p-3 rounded transition-colors border border-dashed"
        onClick={() => {
          setEditingPath(editKey);
          setEditValue(items.join('\n'));
        }}
      >
        <div className="text-xs font-semibold text-muted-foreground mb-2">List Items</div>
        <ul className="space-y-1">
          {items.map((item, idx) => (
            <li key={idx} className="text-sm flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              {item}
            </li>
          ))}
        </ul>
        <Edit2 className="w-4 h-4 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
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
            <div className="space-y-4">
              {/* Hero Image */}
              {data.image && renderEditableImage(section.id, 'image', data.image, true)}
              
              <div className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-2">Hero Title</div>
                  <div className="text-3xl font-bold">
                    {renderEditableText(section.id, 'title', data.title)}
                  </div>
                </div>

                {/* Subtitle */}
                {data.subtitle && (
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-2">Subtitle</div>
                    <div className="text-xl">
                      {renderEditableText(section.id, 'subtitle', data.subtitle)}
                    </div>
                  </div>
                )}

                {/* Description */}
                {data.description && (
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-2">Description</div>
                    {renderEditableText(section.id, 'description', data.description, true)}
                  </div>
                )}

                {/* Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {data.cta_primary && (
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-2">Primary Button</div>
                      {renderEditableButton(section.id, 'cta_primary', 'cta_primary_link', data.cta_primary, data.cta_primary_link)}
                    </div>
                  )}
                  {data.cta_secondary && (
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-2">Secondary Button</div>
                      {renderEditableButton(section.id, 'cta_secondary', 'cta_secondary_link', data.cta_secondary, data.cta_secondary_link)}
                    </div>
                  )}
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
            {data.items && Array.isArray(data.items) && !data.items[0]?.question && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {data.items.map((item: any, index: number) => (
                  <Card key={index} className="p-4 space-y-3">
                    {/* Icon (for highlights) */}
                    {item.icon && (
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Icon</div>
                        {renderEditableIcon(section.id, `items.${index}.icon`, item.icon)}
                      </div>
                    )}

                    {/* Image (for facilities/locations) */}
                    {item.image && renderEditableImage(section.id, `items.${index}.image`, item.image)}
                    
                    {/* Title */}
                    {item.title && (
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Title</div>
                        <div className="font-semibold">
                          {renderEditableText(section.id, `items.${index}.title`, item.title)}
                        </div>
                      </div>
                    )}
                    
                    {/* Description */}
                    {item.description && (
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Description</div>
                        <div className="text-sm text-muted-foreground">
                          {renderEditableText(section.id, `items.${index}.description`, item.description, true)}
                        </div>
                      </div>
                    )}

                    {/* Features list (for facilities) */}
                    {item.features && Array.isArray(item.features) && (
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Features</div>
                        {renderEditableArray(section.id, `items.${index}.features`, item.features)}
                      </div>
                    )}

                    {/* Link (for locations) */}
                    {item.link && (
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Link</div>
                        {renderEditableText(section.id, `items.${index}.link`, item.link)}
                      </div>
                    )}

                    {/* Room count (for locations) */}
                    {item.rooms && (
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Rooms Info</div>
                        {renderEditableText(section.id, `items.${index}.rooms`, item.rooms)}
                      </div>
                    )}

                    {/* Name (for locations) */}
                    {item.name && (
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Location Name</div>
                        {renderEditableText(section.id, `items.${index}.name`, item.name)}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            {data.cta_text && (
              <div className="mt-6">
                <div className="text-xs font-semibold text-muted-foreground mb-2">Call to Action Button</div>
                {renderEditableButton(section.id, 'cta_text', 'cta_link', data.cta_text, data.cta_link)}
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