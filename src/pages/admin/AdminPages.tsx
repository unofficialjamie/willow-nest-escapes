import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Edit, Trash2, Copy, ArrowLeft, Save, Upload } from "lucide-react";
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
  created_at: string;
  updated_at: string;
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
  { name: "hotel-policies", title: "Hotel Policies", route: "/hotel-policies" },
  { name: "privacy-policy", title: "Privacy Policy", route: "/privacy-policy" },
  { name: "locations", title: "Locations Page", route: "/locations" },
  { name: "location-abuja", title: "Abuja Location", route: "/locations/abuja" },
  { name: "location-ibadan", title: "Ibadan Location", route: "/locations/ibadan" },
  { name: "location-ogbomosho", title: "Ogbomosho Location", route: "/locations/ogbomosho" },
];

const CONTENT_TYPES = ["text", "heading", "image", "hero", "section_header", "button_text", "button_link", "description", "json"];

const AdminPages = () => {
  const { loading: authLoading } = useAdminAuth();
  const { toast } = useToast();
  const [view, setView] = useState<"list" | "edit">("list");
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [pageSections, setPageSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [uploading, setUploading] = useState(false);

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
    setEditingSection(null);
  };

  const handleDuplicatePage = async (pageName: string) => {
    if (!confirm(`Duplicate ${pageName} page?`)) return;

    try {
      const { data: sections, error: fetchError } = await supabase
        .from("page_sections")
        .select("*")
        .eq("page_name", pageName);

      if (fetchError) throw fetchError;

      const newPageName = `${pageName}-copy`;
      const duplicatedSections = sections?.map(({ id, ...rest }) => ({
        ...rest,
        page_name: newPageName,
      }));

      const { error: insertError } = await supabase
        .from("page_sections")
        .insert(duplicatedSections || []);

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: `Page duplicated as ${newPageName}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeletePage = async (pageName: string) => {
    if (!confirm(`Delete all content for ${pageName}? This cannot be undone.`)) return;

    try {
      const { error } = await supabase
        .from("page_sections")
        .delete()
        .eq("page_name", pageName);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (file: File, sectionId: string) => {
    setUploading(true);
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

      const { error: updateError } = await supabase
        .from("page_sections")
        .update({ data: { url: publicUrl } })
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
    } finally {
      setUploading(false);
    }
  };

  const handleSaveSection = async () => {
    if (!editingSection) return;

    try {
      if (editingSection.id) {
        const { error } = await supabase
          .from("page_sections")
          .update({
            section_key: editingSection.section_key,
            section_title: editingSection.section_title,
            content_type: editingSection.content_type,
            data: editingSection.data,
            display_order: editingSection.display_order,
          })
          .eq("id", editingSection.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("page_sections").insert({
          page_name: selectedPage,
          section_key: editingSection.section_key,
          section_title: editingSection.section_title,
          content_type: editingSection.content_type,
          data: editingSection.data,
          display_order: editingSection.display_order,
          is_active: true,
        });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: editingSection.id ? "Section updated" : "Section created",
      });
      
      setEditingSection(null);
      if (selectedPage) fetchPageSections(selectedPage);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm("Delete this section?")) return;

    try {
      const { error } = await supabase
        .from("page_sections")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Section deleted successfully",
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

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // List View - WordPress Style
  if (view === "list") {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Pages</h1>
          <p className="text-muted-foreground text-lg">
            Manage all your website pages in one place
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Pages</CardTitle>
            <CardDescription>
              Click Edit to modify page content, or use Duplicate to create a copy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page Title</TableHead>
                  <TableHead>Page Name</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PAGES.map((page) => (
                  <TableRow key={page.name}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>{page.name}</TableCell>
                    <TableCell className="text-muted-foreground">{page.route}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditPage(page.name)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDuplicatePage(page.name)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Duplicate
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeletePage(page.name)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
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

  // Edit View - Elementor Style Page Builder
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
          Arrange and edit all content sections for this page
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Sections List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Page Sections</CardTitle>
                  <CardDescription>
                    Sections are displayed in order from top to bottom
                  </CardDescription>
                </div>
                <Button
                  onClick={() => {
                    setEditingSection({
                      id: "",
                      page_name: selectedPage || "",
                      section_key: "",
                      section_title: "",
                      content_type: "text",
                      data: {},
                      display_order: pageSections.length + 1,
                      is_active: true,
                      created_at: "",
                      updated_at: "",
                    });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : pageSections.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No sections yet. Click "Add Section" to start building your page.
                </div>
              ) : (
                <div className="space-y-3">
                  {pageSections.map((section, index) => (
                    <Card key={section.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded">
                                #{index + 1}
                              </span>
                              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                                {section.content_type}
                              </span>
                              <span className="text-sm font-semibold">
                                {section.section_key}
                              </span>
                            </div>
                            {section.content_type === "image" ? (
                              <div className="space-y-2">
                                {section.data?.url && (
                                  <img
                                    src={section.data.url}
                                    alt={section.section_key}
                                    className="w-full max-w-xs h-32 object-cover rounded"
                                  />
                                )}
                                <Input
                                  type="file"
                                  accept="image/*"
                                  disabled={uploading}
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload(file, section.id);
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="text-xs text-muted-foreground line-clamp-4 font-mono bg-muted p-2 rounded">
                                {typeof section.data === "object" 
                                  ? JSON.stringify(section.data, null, 2).substring(0, 200) + "..."
                                  : String(section.data || "No content").substring(0, 200)}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingSection(section)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteSection(section.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Section Editor Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>
                {editingSection?.id ? "Edit Section" : "New Section"}
              </CardTitle>
              <CardDescription>
                {editingSection ? "Modify the section details below" : "Select a section to edit"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {editingSection ? (
                <div className="space-y-4">
                  <div>
                    <Label>Section Key</Label>
                    <Input
                      value={editingSection.section_key}
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          section_key: e.target.value,
                        })
                      }
                      placeholder="e.g., hero_title, about_description"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use underscores, e.g.: hero_title, section_image
                    </p>
                  </div>

                  <div>
                    <Label>Section Title (Display Name)</Label>
                    <Input
                      value={editingSection.section_title}
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          section_title: e.target.value,
                        })
                      }
                      placeholder="e.g., Hero Title, About Description"
                    />
                  </div>

                  <div>
                    <Label>Content Type</Label>
                    <Select
                      value={editingSection.content_type}
                      onValueChange={(value) =>
                        setEditingSection({
                          ...editingSection,
                          content_type: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CONTENT_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Content Value</Label>
                    {editingSection.content_type === "image" ? (
                      <div className="space-y-2">
                        <Input
                          value={
                            typeof editingSection.data === "string"
                              ? editingSection.data
                              : editingSection.data?.url || ""
                          }
                          onChange={(e) =>
                            setEditingSection({
                              ...editingSection,
                              data: { url: e.target.value },
                            })
                          }
                          placeholder="Image URL"
                        />
                        <p className="text-xs text-muted-foreground">
                          Use Upload button in sections list to upload files
                        </p>
                      </div>
                    ) : editingSection.content_type === "hero" || 
                       editingSection.content_type === "section_header" ||
                       editingSection.content_type === "json" ? (
                      <Textarea
                        value={
                          typeof editingSection.data === "object"
                            ? JSON.stringify(editingSection.data, null, 2)
                            : String(editingSection.data || "{}")
                        }
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            setEditingSection({
                              ...editingSection,
                              data: parsed,
                            });
                          } catch {
                            // Keep current value if JSON is invalid
                          }
                        }}
                        rows={15}
                        className="font-mono text-xs"
                        placeholder='{"key": "value"}'
                      />
                    ) : editingSection.content_type === "text" ||
                       editingSection.content_type === "description" ? (
                      <Textarea
                        value={
                          typeof editingSection.data === "string"
                            ? editingSection.data
                            : editingSection.data?.text || editingSection.data?.value || ""
                        }
                        onChange={(e) =>
                          setEditingSection({
                            ...editingSection,
                            data: { text: e.target.value },
                          })
                        }
                        rows={5}
                        placeholder="Enter your content here..."
                      />
                    ) : (
                      <Input
                        value={
                          typeof editingSection.data === "string"
                            ? editingSection.data
                            : editingSection.data?.value || ""
                        }
                        onChange={(e) =>
                          setEditingSection({
                            ...editingSection,
                            data: { value: e.target.value },
                          })
                        }
                        placeholder="Enter content"
                      />
                    )}
                  </div>

                  <div>
                    <Label>Display Order</Label>
                    <Input
                      type="number"
                      value={editingSection.display_order || 0}
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          display_order: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Lower numbers appear first
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={handleSaveSection}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingSection(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Click on a section or "Add Section" to start editing
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPages;
