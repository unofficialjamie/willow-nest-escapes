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
import { Loader2, Plus, Edit, Trash2, Image as ImageIcon, Save } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PageContent {
  id: string;
  page_name: string;
  section_key: string;
  content_type: string;
  content_value: string | null;
  display_order: number | null;
}

const PAGES = [
  "home", "about", "contact", "facilities", "faq", 
  "hotel-policies", "privacy-policy", "locations",
  "location-abuja", "location-ibadan", "location-ogbomosho"
];

const CONTENT_TYPES = ["text", "heading", "image", "button_text", "button_link", "description"];

const AdminPages = () => {
  const { loading: authLoading } = useAdminAuth();
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState("home");
  const [pageContent, setPageContent] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<PageContent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (selectedPage) {
      fetchPageContent();
    }
  }, [selectedPage]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .eq("page_name", selectedPage)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setPageContent(data || []);
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

  const handleImageUpload = async (file: File, itemId: string) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${selectedPage}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('website-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('website-images')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("page_content")
        .update({ content_value: publicUrl })
        .eq("id", itemId);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
      fetchPageContent();
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

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      const { error } = await supabase
        .from("page_content")
        .update({
          content_value: editingItem.content_value,
          section_key: editingItem.section_key,
          content_type: editingItem.content_type,
          display_order: editingItem.display_order,
        })
        .eq("id", editingItem.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      setIsDialogOpen(false);
      fetchPageContent();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreate = async () => {
    if (!editingItem) return;

    try {
      const { error } = await supabase
        .from("page_content")
        .insert({
          page_name: selectedPage,
          section_key: editingItem.section_key,
          content_type: editingItem.content_type,
          content_value: editingItem.content_value,
          display_order: editingItem.display_order,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content created successfully",
      });
      setIsDialogOpen(false);
      fetchPageContent();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return;

    try {
      const { error } = await supabase
        .from("page_content")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content deleted successfully",
      });
      fetchPageContent();
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

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Pages Management</h1>
        <p className="text-muted-foreground">Manage all website content like a CMS</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Select Page</CardTitle>
            <CardDescription>Choose a page to edit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {PAGES.map((page) => (
              <Button
                key={page}
                variant={selectedPage === page ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedPage(page)}
              >
                {page.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Button>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedPage.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</CardTitle>
                  <CardDescription>Edit content sections for this page</CardDescription>
                </div>
                <Button
                  onClick={() => {
                    setEditingItem({
                      id: "",
                      page_name: selectedPage,
                      section_key: "",
                      content_type: "text",
                      content_value: "",
                      display_order: pageContent.length + 1,
                    });
                    setIsDialogOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Content
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : pageContent.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No content yet. Click "Add Content" to start.
                </div>
              ) : (
                <div className="space-y-4">
                  {pageContent.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                                {item.content_type}
                              </span>
                              <span className="text-sm font-semibold">{item.section_key}</span>
                            </div>
                            {item.content_type === "image" ? (
                              <div className="space-y-2">
                                {item.content_value && (
                                  <img 
                                    src={item.content_value} 
                                    alt={item.section_key}
                                    className="w-48 h-32 object-cover rounded"
                                  />
                                )}
                                <Input
                                  type="file"
                                  accept="image/*"
                                  disabled={uploading}
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload(file, item.id);
                                  }}
                                />
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {item.content_value || "No content"}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => {
                                setEditingItem(item);
                                setIsDialogOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleDelete(item.id)}
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
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingItem?.id ? "Edit Content" : "Add Content"}</DialogTitle>
            <DialogDescription>
              {editingItem?.id ? "Update the content below" : "Create new content section"}
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div>
                <Label>Section Key</Label>
                <Input
                  value={editingItem.section_key}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, section_key: e.target.value })
                  }
                  placeholder="e.g., hero-title, about-description"
                />
              </div>
              <div>
                <Label>Content Type</Label>
                <Select
                  value={editingItem.content_type}
                  onValueChange={(value) =>
                    setEditingItem({ ...editingItem, content_type: value })
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
                {editingItem.content_type === "text" || 
                 editingItem.content_type === "heading" || 
                 editingItem.content_type === "description" ? (
                  <Textarea
                    value={editingItem.content_value || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, content_value: e.target.value })
                    }
                    rows={5}
                  />
                ) : (
                  <Input
                    value={editingItem.content_value || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, content_value: e.target.value })
                    }
                    placeholder={editingItem.content_type === "image" ? "Image URL" : "Content"}
                  />
                )}
              </div>
              <div>
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={editingItem.display_order || 0}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      display_order: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <Button
                className="w-full"
                onClick={editingItem.id ? handleSave : handleCreate}
              >
                <Save className="w-4 h-4 mr-2" />
                {editingItem.id ? "Save Changes" : "Create Content"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPages;
