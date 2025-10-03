import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Image as ImageIcon, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminContent = () => {
  const { loading: authLoading } = useAdminAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: string }>({});

  const handleImageUpload = async (file: File, category: string) => {
    setUploading(true);
    setUploadProgress({ ...uploadProgress, [category]: "Uploading..." });

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${category}-${Date.now()}.${fileExt}`;
      const filePath = `${category}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('website-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('website-images')
        .getPublicUrl(filePath);

      toast({
        title: "Success",
        description: `Image uploaded successfully! URL: ${publicUrl}`,
      });

      setUploadProgress({ ...uploadProgress, [category]: publicUrl });
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

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Content & Media Manager</h1>
        <p className="text-muted-foreground text-lg">
          Upload and manage images for your website across all locations
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upload">Upload Images</TabsTrigger>
          <TabsTrigger value="manage">Manage Content</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <ImageIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{category.label}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`file-${category.id}`}>Select Image</Label>
                    <Input
                      id={`file-${category.id}`}
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, category.id);
                      }}
                      className="mt-2"
                    />
                  </div>
                  {uploadProgress[category.id] && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Latest Upload:</p>
                      <p className="text-xs text-muted-foreground break-all">
                        {uploadProgress[category.id]}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Upload Instructions</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-800 space-y-2">
              <p>• <strong>Hero Images:</strong> Recommended size 1920x1080px for best quality</p>
              <p>• <strong>Room Images:</strong> Use 1200x800px for consistent display</p>
              <p>• <strong>Facilities:</strong> 800x600px works well for facility showcases</p>
              <p>• After upload, copy the URL and paste it in the Pages Management section</p>
              <p>• Supported formats: JPG, PNG, WebP (WebP recommended for faster loading)</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Management Tools</CardTitle>
              <CardDescription>
                Manage your website content across different sections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="/admin/pages">
                        Edit Page Content
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="/admin/rooms">
                        Manage Rooms
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="/admin/settings">
                        Site Settings
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Content Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>• Keep image file sizes under 2MB for faster loading</p>
                    <p>• Use descriptive file names for better organization</p>
                    <p>• Maintain consistent aspect ratios within each category</p>
                    <p>• Update room images seasonally to keep content fresh</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContent;
