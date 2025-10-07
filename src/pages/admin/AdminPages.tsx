import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Edit2, Trash2, Image as ImageIcon, Save, X, Upload, CheckCircle2, XCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
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
  const [uploadingImages, setUploadingImages] = useState<Set<string>>(new Set());
  const [savingFields, setSavingFields] = useState<Set<string>>(new Set());

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
    const uploadKey = `${sectionId}.${imagePath}`;
    
    // Validate file
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploadingImages(prev => new Set(prev).add(uploadKey));
    
    try {
      // Convert image to base64
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string;
          
          // Update the section data with base64 image
          const section = pageSections.find(s => s.id === sectionId);
          if (!section) throw new Error("Section not found");

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
            title: "✓ Upload Successful",
            description: `Image uploaded successfully for ${imagePath.split('.').pop()}`,
          });
          
          if (selectedPage) await fetchPageSections(selectedPage);
        } catch (error: any) {
          toast({
            title: "✗ Upload Failed",
            description: error.message,
            variant: "destructive",
          });
        } finally {
          setUploadingImages(prev => {
            const next = new Set(prev);
            next.delete(uploadKey);
            return next;
          });
        }
      };
      
      reader.onerror = () => {
        setUploadingImages(prev => {
          const next = new Set(prev);
          next.delete(uploadKey);
          return next;
        });
        toast({
          title: "✗ Upload Failed",
          description: "Failed to read image file",
          variant: "destructive",
        });
      };
      
      reader.readAsDataURL(file);
    } catch (error: any) {
      setUploadingImages(prev => {
        const next = new Set(prev);
        next.delete(uploadKey);
        return next;
      });
      toast({
        title: "✗ Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSaveEdit = async (sectionId: string, path: string) => {
    const saveKey = `${sectionId}.${path}`;
    setSavingFields(prev => new Set(prev).add(saveKey));
    
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
        title: "✓ Saved Successfully",
        description: `Updated ${path.split('.').pop()}`,
      });
      
      setEditingPath(null);
      if (selectedPage) await fetchPageSections(selectedPage);
    } catch (error: any) {
      toast({
        title: "✗ Save Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSavingFields(prev => {
        const next = new Set(prev);
        next.delete(saveKey);
        return next;
      });
    }
  };

  const renderEditableText = (sectionId: string, path: string, value: string, isLarge = false) => {
    const editKey = `${sectionId}.${path}`;
    const isEditing = editingPath === editKey;
    const isSaving = savingFields.has(editKey);

    if (isEditing) {
      return (
        <div className="flex gap-2 items-start">
          {isLarge ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 transition-all"
              rows={4}
              disabled={isSaving}
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 transition-all"
              disabled={isSaving}
            />
          )}
          <Button 
            size="sm" 
            onClick={() => handleSaveEdit(sectionId, path)}
            disabled={isSaving}
            className="min-w-[80px]"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1" />
                Save
              </>
            )}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setEditingPath(null)}
            disabled={isSaving}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      );
    }

    return (
      <div 
        className="group relative cursor-pointer hover:bg-muted/50 p-3 rounded-lg transition-all hover:shadow-sm border border-transparent hover:border-border"
        onClick={() => {
          setEditingPath(editKey);
          setEditValue(value);
        }}
      >
        <span className="text-sm">{value || <span className="text-muted-foreground italic">(Click to edit)</span>}</span>
        <Edit2 className="w-4 h-4 absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
      </div>
    );
  };

  const renderEditableImage = (sectionId: string, path: string, imageUrl: string, large = false) => {
    const uploadKey = `${sectionId}.${path}`;
    const isUploading = uploadingImages.has(uploadKey);

    return (
      <div className="relative group">
        <div className={`relative overflow-hidden rounded-lg border-2 transition-all ${
          isUploading ? 'border-primary animate-pulse' : 'border-transparent group-hover:border-primary/50'
        }`}>
          <img 
            src={imageUrl} 
            alt="" 
            className={`w-full ${large ? 'h-96' : 'h-48'} object-cover transition-all ${
              isUploading ? 'opacity-50 blur-sm' : 'group-hover:scale-105'
            }`} 
          />
          
          {/* Upload Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center gap-2 transition-all ${
            isUploading 
              ? 'bg-black/70 opacity-100' 
              : 'bg-black/60 opacity-0 group-hover:opacity-100'
          }`}>
            {isUploading ? (
              <div className="flex flex-col items-center gap-3 text-white">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-sm font-medium">Uploading image...</span>
              </div>
            ) : (
              <Button
                size="lg"
                variant="default"
                className="shadow-lg hover:scale-105 transition-transform"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/jpeg,image/png,image/webp,image/jpg';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) handleImageUpload(file, sectionId, path);
                  };
                  input.click();
                }}
              >
                <Upload className="w-5 h-5 mr-2" />
                Replace Image
              </Button>
            )}
          </div>
        </div>
        
        {/* Image Info Badge */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          {path.split('.').pop()?.replace(/_/g, ' ')}
        </div>
      </div>
    );
  };

  const renderEditableIcon = (sectionId: string, path: string, iconValue: string) => {
    const uploadKey = `${sectionId}.${path}`;
    const isUploading = uploadingImages.has(uploadKey);
    const isImageUrl = iconValue && (iconValue.startsWith('http') || iconValue.startsWith('/') || iconValue.startsWith('data:'));
    
    return (
      <div className={`relative group border-2 rounded-lg p-4 transition-all ${
        isUploading ? 'border-primary bg-primary/5' : 'border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
      }`}>
        <Label className="text-xs font-semibold mb-3 block">Icon/Image</Label>
        
        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-6 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Uploading icon...</span>
          </div>
        ) : (
          <>
            {isImageUrl ? (
              <div className="relative mb-3">
                <img src={iconValue} alt="Icon" className="w-20 h-20 object-contain rounded-lg mx-auto border border-border" />
              </div>
            ) : (
              <div className="text-sm font-mono text-muted-foreground mb-3 p-2 bg-muted rounded text-center">
                Icon: {iconValue}
              </div>
            )}
            <Button
              size="sm"
              variant="outline"
              className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/png,image/jpeg,image/svg+xml,image/webp';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) handleImageUpload(file, sectionId, path);
                };
                input.click();
              }}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isImageUrl ? 'Replace Icon' : 'Upload Icon'}
            </Button>
          </>
        )}
      </div>
    );
  };

  const renderEditableButton = (sectionId: string, textPath: string, linkPath: string, textValue: string, linkValue: string) => {
    const textKey = `${sectionId}.${textPath}`;
    const linkKey = `${sectionId}.${linkPath}`;
    const isEditingText = editingPath === textKey;
    const isEditingLink = editingPath === linkKey;
    const isSavingText = savingFields.has(textKey);
    const isSavingLink = savingFields.has(linkKey);

    return (
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 space-y-3 hover:border-primary/50 transition-all hover:bg-muted/30">
        <Label className="text-xs font-semibold block">Button Configuration</Label>
        
        {/* Button Text */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Button Text</Label>
          {isEditingText ? (
            <div className="flex gap-2 items-center">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Button text"
                className="flex-1"
                disabled={isSavingText}
              />
              <Button 
                size="sm" 
                onClick={() => handleSaveEdit(sectionId, textPath)}
                disabled={isSavingText}
              >
                {isSavingText ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setEditingPath(null)}
                disabled={isSavingText}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div 
              className="group relative cursor-pointer hover:bg-muted/50 p-3 rounded-lg transition-all border border-transparent hover:border-border"
              onClick={() => {
                setEditingPath(textKey);
                setEditValue(textValue);
              }}
            >
              <span className="text-sm font-medium">{textValue || <span className="text-muted-foreground italic">(Click to edit)</span>}</span>
              <Edit2 className="w-4 h-4 absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
            </div>
          )}
        </div>

        {/* Button Link */}
        {linkPath && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Button Link</Label>
            {isEditingLink ? (
              <div className="flex gap-2 items-center">
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="Link URL (e.g., /booking, #contact)"
                  className="flex-1 font-mono text-sm"
                  disabled={isSavingLink}
                />
                <Button 
                  size="sm" 
                  onClick={() => handleSaveEdit(sectionId, linkPath)}
                  disabled={isSavingLink}
                >
                  {isSavingLink ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setEditingPath(null)}
                  disabled={isSavingLink}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div 
                className="group relative cursor-pointer hover:bg-muted/50 p-3 rounded-lg transition-all border border-transparent hover:border-border"
                onClick={() => {
                  setEditingPath(linkKey);
                  setEditValue(linkValue || '');
                }}
              >
                <code className="text-sm">{linkValue || <span className="text-muted-foreground italic">(No link)</span>}</code>
                <Edit2 className="w-4 h-4 absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderEditableArray = (sectionId: string, path: string, items: string[]) => {
    const editKey = `${sectionId}.${path}`;
    const isEditing = editingPath === editKey;
    const isSaving = savingFields.has(editKey);

    if (isEditing) {
      return (
        <div className="flex gap-2 items-start">
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 font-mono text-sm"
            rows={Math.min(items.length + 1, 8)}
            placeholder="One item per line"
            disabled={isSaving}
          />
          <Button 
            size="sm" 
            onClick={() => handleSaveEdit(sectionId, path)}
            disabled={isSaving}
            className="min-w-[80px]"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                Saving
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1" />
                Save
              </>
            )}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setEditingPath(null)}
            disabled={isSaving}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      );
    }

    return (
      <div 
        className="group relative cursor-pointer hover:bg-muted/50 p-4 rounded-lg transition-all border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:shadow-sm"
        onClick={() => {
          setEditingPath(editKey);
          setEditValue(items.join('\n'));
        }}
      >
        <Label className="text-xs font-semibold mb-3 block">List Items ({items.length})</Label>
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-sm flex items-start gap-2 p-1 rounded hover:bg-background/50">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
        <Edit2 className="w-4 h-4 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
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
          <div key={currentPath} className="mb-6">
            <Label className="text-xs font-semibold mb-3 block capitalize">{key.replace(/_/g, ' ')}</Label>
            {renderEditableImage(sectionId, currentPath, value, key.includes('hero'))}
          </div>
        );
      }

      // Handle icons
      if (key === 'icon' && typeof value === 'string') {
        return (
          <div key={currentPath} className="mb-6">
            {renderEditableIcon(sectionId, currentPath, value)}
          </div>
        );
      }

      // Handle arrays of objects (items, features, etc)
      if (Array.isArray(value)) {
        // Check if it's an array of strings (simple list)
        if (value.length > 0 && typeof value[0] === 'string') {
          return (
            <div key={currentPath} className="mb-6">
              <Label className="text-xs font-semibold mb-3 block capitalize">{key.replace(/_/g, ' ')}</Label>
              {renderEditableArray(sectionId, currentPath, value)}
            </div>
          );
        }

        // Array of objects
        return (
          <div key={currentPath} className="mb-6">
            <Label className="text-sm font-semibold mb-4 block capitalize">{key.replace(/_/g, ' ')}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {value.map((item: any, index: number) => (
                <Card key={index} className="p-4 space-y-4 hover:shadow-md transition-shadow border-2">
                  <div className="flex items-center justify-between pb-2 border-b">
                    <Label className="text-xs font-semibold text-muted-foreground">Item {index + 1}</Label>
                  </div>
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
          <div key={currentPath} className="mb-6 border-2 rounded-lg p-5 bg-card hover:shadow-sm transition-shadow">
            <Label className="text-sm font-semibold mb-4 block capitalize">{key.replace(/_/g, ' ')}</Label>
            <div className="space-y-4">
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
          <div key={currentPath} className="mb-6">
            <Label className="text-xs font-semibold mb-3 block capitalize">
              {baseCTAKey.replace(/_/g, ' ')}
            </Label>
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
          <div key={currentPath} className="mb-6">
            <Label className="text-xs font-semibold mb-3 block">Button</Label>
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
          <div key={currentPath} className="mb-6">
            <Label className="text-xs font-semibold mb-3 block">CTA Button</Label>
            {renderEditableButton(sectionId, currentPath, linkPath, value, linkValue)}
          </div>
        );
      }

      // Skip _link fields as they're handled with their button
      if (key.includes('_link') || key === 'button_link' || key === 'ctaLink') return null;

      // Handle regular text (short)
      if (typeof value === 'string' && value.length < 100) {
        return (
          <div key={currentPath} className="mb-5">
            <Label className="text-xs font-semibold mb-2 block capitalize">{key.replace(/_/g, ' ')}</Label>
            {renderEditableText(sectionId, currentPath, value)}
          </div>
        );
      }

      // Handle long text (descriptions, content)
      if (typeof value === 'string') {
        return (
          <div key={currentPath} className="mb-5">
            <Label className="text-xs font-semibold mb-2 block capitalize">{key.replace(/_/g, ' ')}</Label>
            {renderEditableText(sectionId, currentPath, value, true)}
        </div>
        );
      }

      // Handle numbers and booleans
      if (typeof value === 'number' || typeof value === 'boolean') {
        return (
          <div key={currentPath} className="mb-5">
            <Label className="text-xs font-semibold mb-2 block capitalize">{key.replace(/_/g, ' ')}</Label>
            {renderEditableText(sectionId, currentPath, String(value))}
          </div>
        );
      }

      return null;
    };

    return (
      <Card key={section.id} className="mb-6 shadow-sm hover:shadow-md transition-shadow border-2">
        <CardContent className="p-6">
          <div className="mb-6 pb-4 border-b-2">
            <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
              {section.section_title}
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded font-mono">{section.section_key}</span>
              <span>•</span>
              <span className="px-2 py-1 bg-muted rounded">{section.content_type}</span>
              <span>•</span>
              <span>Order: {section.display_order}</span>
            </p>
          </div>
          
          <div className="space-y-6">
            {Object.entries(data || {}).map(([key, value]) => 
              renderDataField(section.id, key, value)
            )}
            
            {(!data || Object.keys(data).length === 0) && (
              <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                <p className="text-sm">No content data available for this section</p>
              </div>
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
        <Button 
          variant="outline" 
          onClick={handleBackToList} 
          className="mb-4 hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pages
        </Button>
        <h1 className="text-4xl font-bold mb-2">
          Edit: {pageInfo?.title || selectedPage}
        </h1>
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <span className="flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Click on any text to edit
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Hover over images to replace
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading page sections...</p>
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