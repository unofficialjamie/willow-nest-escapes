import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Image as ImageIcon, Save, Plus, Edit, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PageSection {
  id?: string;
  page_name: string;
  section_key: string;
  section_title: string;
  content_type: string;
  data: any;
  display_order: number;
  is_active: boolean;
}

const AdminContent = () => {
  const { loading: authLoading } = useAdminAuth();
  const { toast } = useToast();
  const [sections, setSections] = useState<PageSection[]>([]);
  const [selectedPage, setSelectedPage] = useState("home");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<PageSection>({
    page_name: "home",
    section_key: "",
    section_title: "",
    content_type: "hero",
    data: {},
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchSections();
  }, [selectedPage]);

  const fetchSections = async () => {
    console.log("=== FETCHING SECTIONS FOR PAGE:", selectedPage, "===");
    const { data, error } = await supabase
      .from("page_sections")
      .select("*")
      .eq("page_name", selectedPage)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("ERROR FETCHING SECTIONS:", error);
      toast({
        title: "Error",
        description: "Failed to fetch sections",
        variant: "destructive",
      });
    } else {
      console.log("=== FETCHED SECTIONS DATA ===", data);
      console.log("=== NUMBER OF SECTIONS:", data?.length);
      data?.forEach((section, idx) => {
        console.log(`Section ${idx + 1}:`, section.section_key, "| Keys in data:", Object.keys(section.data || {}));
      });
      setSections(data || []);
    }
  };

  const handleImageUpload = async (file: File, path: string) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('website-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('website-images')
        .getPublicUrl(filePath);

      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });

      return publicUrl;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSection?.id) {
      const { error } = await supabase
        .from("page_sections")
        .update(formData)
        .eq("id", editingSection.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update section",
          variant: "destructive",
        });
        return;
      }
      toast({ title: "Success", description: "Section updated successfully" });
    } else {
      const { error } = await supabase
        .from("page_sections")
        .insert(formData);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create section",
          variant: "destructive",
        });
        return;
      }
      toast({ title: "Success", description: "Section created successfully" });
    }

    setIsDialogOpen(false);
    resetForm();
    fetchSections();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;

    const { error } = await supabase
      .from("page_sections")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete section",
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Success", description: "Section deleted successfully" });
    fetchSections();
  };

  const openEditDialog = (section: PageSection) => {
    setEditingSection(section);
    setFormData(section);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingSection(null);
    setFormData({
      page_name: selectedPage,
      section_key: "",
      section_title: "",
      content_type: "hero",
      data: {},
      display_order: 0,
      is_active: true,
    });
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const categories = [
    { id: "hero", label: "Hero Images", description: "Large banner images for page headers" },
    { id: "facilities", label: "Facilities", description: "Images of hotel facilities and amenities" },
    { id: "rooms", label: "Room Images", description: "Individual room photos" },
    { id: "gallery", label: "Gallery", description: "General hotel and location photos" },
    { id: "logos", label: "Logos & Icons", description: "Brand assets and icons" },
  ];

  const pages = [
    { value: "home", label: "Home Page" },
    { value: "about", label: "About Page" },
    { value: "facilities", label: "Facilities Page" },
    { value: "ibadan", label: "Ibadan Location" },
    { value: "abuja", label: "Abuja Location" },
    { value: "ogbomosho", label: "Ogbomosho Location" },
    { value: "contact", label: "Contact Page" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Content Management</h1>
        <p className="text-muted-foreground text-lg">
          Manage all page sections, images, and content across your website
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Select value={selectedPage} onValueChange={setSelectedPage}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select page" />
          </SelectTrigger>
          <SelectContent>
            {pages.map((page) => (
              <SelectItem key={page.value} value={page.value}>
                {page.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSection ? "Edit Section" : "Add New Section"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Section Key (unique identifier)</Label>
                <Input
                  value={formData.section_key}
                  onChange={(e) => setFormData({ ...formData, section_key: e.target.value })}
                  placeholder="hero_section"
                  required
                />
              </div>

              <div>
                <Label>Section Title</Label>
                <Input
                  value={formData.section_title}
                  onChange={(e) => setFormData({ ...formData, section_title: e.target.value })}
                  placeholder="Hero Section"
                  required
                />
              </div>

              <div>
                <Label>Content Type</Label>
                <Select
                  value={formData.content_type}
                  onValueChange={(value) => setFormData({ ...formData, content_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero Section</SelectItem>
                    <SelectItem value="text">Text Content</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Content Data (JSON)</Label>
                <Textarea
                  value={JSON.stringify(formData.data, null, 2)}
                  onChange={(e) => {
                    try {
                      setFormData({ ...formData, data: JSON.parse(e.target.value) });
                    } catch (err) {
                      // Invalid JSON, don't update
                    }
                  }}
                  placeholder='{"title": "Welcome", "description": "...", "image": "url"}'
                  rows={10}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter JSON data. Example: {`{"title": "Welcome", "subtitle": "...", "image": "url"}`}
                </p>
              </div>

              <div>
                <Label>Image Upload</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = await handleImageUpload(file, selectedPage);
                    if (url) {
                      setFormData({
                        ...formData,
                        data: { ...formData.data, image: url }
                      });
                    }
                  }}
                  disabled={uploading}
                />
                {formData.data?.image && (
                  <img src={formData.data.image} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />
                )}
              </div>

              <div>
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <Button type="submit" className="w-full" disabled={uploading}>
                {editingSection ? "Update Section" : "Create Section"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sections.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No sections found for this page. Add your first section to get started.</p>
            </CardContent>
          </Card>
        ) : (
          sections.map((section) => {
            console.log("=== RENDERING SECTION:", section.section_key, "| Data keys:", Object.keys(section.data || {}));
            return (
            <Card key={section.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{section.section_title}</CardTitle>
                    <CardDescription>
                      {section.section_key} • {section.content_type} • Order: {section.display_order}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(section)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(section.id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Show image if exists */}
                  {section.data?.image && (
                    <div className="border rounded-lg p-4 bg-card">
                      <p className="text-sm font-semibold mb-3 text-foreground">Image:</p>
                      <img
                        src={section.data.image}
                        alt={section.section_title}
                        className="w-full max-w-md h-48 object-cover rounded border"
                      />
                    </div>
                  )}
                  
                  {/* Display all content fields */}
                  {Object.entries(section.data || {}).map(([key, value]) => {
                    // Skip image as it's already shown
                    if (key === 'image') return null;
                    
                    // Handle arrays (like testimonial items, values array)
                    if (Array.isArray(value)) {
                      return (
                        <div key={key} className="border rounded-lg p-4 bg-card">
                          <p className="text-base font-semibold mb-3 text-foreground capitalize">
                            {key.replace(/_/g, ' ')}
                          </p>
                          <div className="space-y-4">
                            {value.map((item: any, idx: number) => (
                              <div key={idx} className="bg-muted/70 p-4 rounded-lg border">
                                {typeof item === 'object' ? (
                                  <div className="space-y-2">
                                    {Object.entries(item).map(([itemKey, itemValue]) => (
                                      <div key={itemKey} className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold capitalize text-foreground">
                                          {itemKey.replace(/_/g, ' ')}:
                                        </span>
                                        <span className="text-sm text-muted-foreground pl-2">
                                          {typeof itemValue === 'string' && itemValue.startsWith('data:image') 
                                            ? '[Image Data]' 
                                            : String(itemValue)}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-sm">{String(item)}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    
                    // Handle nested objects
                    if (typeof value === 'object' && value !== null) {
                      return (
                        <div key={key} className="border rounded-lg p-4 bg-card">
                          <p className="text-base font-semibold mb-3 text-foreground capitalize">
                            {key.replace(/_/g, ' ')}
                          </p>
                          <div className="bg-muted/70 p-4 rounded-lg border space-y-2">
                            {Object.entries(value).map(([subKey, subValue]) => (
                              <div key={subKey} className="flex flex-col gap-1">
                                <span className="text-sm font-semibold capitalize text-foreground">
                                  {subKey.replace(/_/g, ' ')}:
                                </span>
                                <span className="text-sm text-muted-foreground pl-2">
                                  {String(subValue)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    
                    // Skip base64 image strings
                    if (typeof value === 'string' && value.startsWith('data:image')) {
                      return null;
                    }
                    
                    // Display primitive values (strings, numbers, etc)
                    return (
                      <div key={key} className="border rounded-lg p-4 bg-card">
                        <span className="text-sm font-semibold capitalize text-foreground block mb-2">
                          {key.replace(/_/g, ' ')}:
                        </span>
                        <span className="text-sm text-muted-foreground block pl-2">
                          {String(value)}
                        </span>
                      </div>
                    );
                  })}
                  
                  {/* Collapsible raw JSON for advanced users */}
                  <details className="mt-4">
                    <summary className="text-sm font-medium cursor-pointer text-muted-foreground hover:text-foreground">
                      View Raw JSON
                    </summary>
                    <div className="bg-muted p-4 rounded-lg mt-2">
                      <pre className="text-xs overflow-auto max-h-96">
                        {JSON.stringify(section.data, null, 2)}
                      </pre>
                    </div>
                  </details>
                </div>
              </CardContent>
            </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminContent;
