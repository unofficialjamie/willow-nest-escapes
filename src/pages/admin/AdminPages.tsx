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
  { name: "locations", title: "Locations Page", route: "/locations" },
  { name: "location-ibadan", title: "Ibadan Location", route: "/locations/ibadan" },
  { name: "location-ogbomosho", title: "Ogbomosho Location", route: "/locations/ogbomosho" },
  { name: "location-abuja", title: "Abuja Location", route: "/locations/abuja" },
  { name: "facilities", title: "Facilities Page", route: "/facilities" },
  { name: "contact", title: "Contact Page", route: "/contact" },
  { name: "faq", title: "FAQ Page", route: "/faq" },
  { name: "privacy-policy", title: "Privacy Policy", route: "/privacy-policy" },
  { name: "hotel-policies", title: "Hotel Policies", route: "/hotel-policies" },
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

    const renderDataField = (sectionId: string, key: string, value: any, path: string = ''): JSX.Element | null => {
      const currentPath = path ? `${path}.${key}` : key;

      // Skip rendering if value is null or undefined
      if (value === null || value === undefined) return null;

      // Handle images
      if (key === 'image' && typeof value === 'string' && (value.startsWith('http') || value.startsWith('/') || value.startsWith('data:'))) {
        return (
          <div key={currentPath} className="mb-4">
            <div className="text-xs font-semibold text-muted-foreground mb-2 capitalize">{key.replace(/_/g, ' ')}</div>
            {renderEditableImage(sectionId, currentPath, value, key.includes('hero'))}
          </div>
        );
      }

      // Handle icons
      if (key === 'icon' && typeof value === 'string') {
        return (
          <div key={currentPath} className="mb-4">
            {renderEditableIcon(sectionId, currentPath, value)}
          </div>
        );
      }

      // Handle arrays of objects (items, features, etc)
      if (Array.isArray(value)) {
        // Check if it's an array of strings (simple list)
        if (value.length > 0 && typeof value[0] === 'string') {
          return (
            <div key={currentPath} className="mb-4">
              <div className="text-xs font-semibold text-muted-foreground mb-2 capitalize">{key.replace(/_/g, ' ')}</div>
              {renderEditableArray(sectionId, currentPath, value)}
            </div>
          );
        }

        // Array of objects
        return (
          <div key={currentPath} className="mb-6">
            <div className="text-sm font-semibold text-muted-foreground mb-3 capitalize">{key.replace(/_/g, ' ')}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {value.map((item: any, index: number) => (
                <Card key={index} className="p-4 space-y-3">
                  <div className="text-xs font-semibold text-muted-foreground mb-2">Item {index + 1}</div>
                  {Object.entries(item).map(([itemKey, itemValue]) => 
                    renderDataField(sectionId, itemKey, itemValue, `${currentPath}.${index}`)
                  )}
                </Card>
              ))}
            </div>
          </div>
        );
      }

      // Handle nested objects
      if (typeof value === 'object' && !Array.isArray(value)) {
        return (
          <div key={currentPath} className="mb-4 border rounded-lg p-4 bg-card">
            <div className="text-sm font-semibold text-muted-foreground mb-3 capitalize">{key.replace(/_/g, ' ')}</div>
            <div className="space-y-3">
              {Object.entries(value).map(([subKey, subValue]) => 
                renderDataField(sectionId, subKey, subValue, currentPath)
              )}
            </div>
          </div>
        );
      }

      // Handle button CTAs (look for _text or _link pattern)
      if (key.includes('cta_') && key.includes('_text') && typeof value === 'string') {
        const baseCTAKey = key.replace('_text', '');
        const linkKey = `${baseCTAKey}_link`;
        const parentPath = path || '';
        
        // Get the link value from the same level
        let linkValue = '';
        if (parentPath) {
          const parentObj = parentPath.split('.').reduce((obj: any, k: string) => obj?.[k], data);
          linkValue = parentObj?.[linkKey] || '';
        } else {
          linkValue = data[linkKey] || '';
        }
        
        const textPath = currentPath;
        const linkPath = parentPath ? `${parentPath}.${linkKey}` : linkKey;
        
        return (
          <div key={currentPath} className="mb-4">
            <div className="text-xs font-semibold text-muted-foreground mb-2 capitalize">
              {baseCTAKey.replace(/_/g, ' ')}
            </div>
            {renderEditableButton(sectionId, textPath, linkPath, value, linkValue)}
          </div>
        );
      }

      // Handle button_text and button_link pattern
      if (key === 'button_text' && typeof value === 'string') {
        const parentPath = path || '';
        let linkValue = '';
        if (parentPath) {
          const parentObj = parentPath.split('.').reduce((obj: any, k: string) => obj?.[k], data);
          linkValue = parentObj?.['button_link'] || '';
        } else {
          linkValue = data['button_link'] || '';
        }
        
        const linkPath = parentPath ? `${parentPath}.button_link` : 'button_link';
        
        return (
          <div key={currentPath} className="mb-4">
            <div className="text-xs font-semibold text-muted-foreground mb-2 capitalize">Button</div>
            {renderEditableButton(sectionId, currentPath, linkPath, value, linkValue)}
          </div>
        );
      }

      // Handle ctaText and ctaLink pattern (for location pages)
      if (key === 'ctaText' && typeof value === 'string') {
        const parentPath = path || '';
        let linkValue = '';
        if (parentPath) {
          const parentObj = parentPath.split('.').reduce((obj: any, k: string) => obj?.[k], data);
          linkValue = parentObj?.['ctaLink'] || '';
        } else {
          linkValue = data['ctaLink'] || '';
        }
        
        const linkPath = parentPath ? `${parentPath}.ctaLink` : 'ctaLink';
        
        return (
          <div key={currentPath} className="mb-4">
            <div className="text-xs font-semibold text-muted-foreground mb-2 capitalize">CTA Button</div>
            {renderEditableButton(sectionId, currentPath, linkPath, value, linkValue)}
          </div>
        );
      }

      // Skip _link fields as they're handled with their button
      if (key.includes('_link') || key === 'button_link' || key === 'ctaLink') return null;

      // Handle regular text (short)
      if (typeof value === 'string' && value.length < 100) {
        return (
          <div key={currentPath} className="mb-4">
            <div className="text-xs font-semibold text-muted-foreground mb-2 capitalize">{key.replace(/_/g, ' ')}</div>
            {renderEditableText(sectionId, currentPath, value)}
          </div>
        );
      }

      // Handle long text (descriptions, content)
      if (typeof value === 'string') {
        return (
          <div key={currentPath} className="mb-4">
            <div className="text-xs font-semibold text-muted-foreground mb-2 capitalize">{key.replace(/_/g, ' ')}</div>
            {renderEditableText(sectionId, currentPath, value, true)}
        </div>
        );
      }

      // Handle numbers and booleans
      if (typeof value === 'number' || typeof value === 'boolean') {
        return (
          <div key={currentPath} className="mb-4">
            <div className="text-xs font-semibold text-muted-foreground mb-2 capitalize">{key.replace(/_/g, ' ')}</div>
            {renderEditableText(sectionId, currentPath, String(value))}
          </div>
        );
      }

      return null;
    };

    return (
      <Card key={section.id} className="mb-6">
        <CardContent className="p-6">
          <div className="mb-6 pb-4 border-b">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {section.section_title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {section.section_key} • {section.content_type} • Order: {section.display_order}
            </p>
          </div>
          
          <div className="space-y-4">
            {Object.entries(data || {}).map(([key, value]) => 
              renderDataField(section.id, key, value)
            )}
            
            {(!data || Object.keys(data).length === 0) && (
              <p className="text-muted-foreground text-center py-8">No content data available</p>
            )}
          </div>
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