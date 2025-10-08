import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import deluxeKing from "@/assets/rooms/deluxe-king.jpg";
import executiveSuite from "@/assets/rooms/executive-suite.jpg";
import superiorTwin from "@/assets/rooms/superior-twin.jpg";
import premiumQueen from "@/assets/rooms/premium-queen.jpg";
import presidentialSuite from "@/assets/rooms/presidential-suite.jpg";
import standardDouble from "@/assets/rooms/standard-double.jpg";
import familyRoom from "@/assets/rooms/family-room.jpg";
import businessKing from "@/assets/rooms/business-king.jpg";

const roomImageMap: Record<string, string> = {
  "deluxe-king": deluxeKing,
  "executive-suite": executiveSuite,
  "superior-twin": superiorTwin,
  "premium-queen": premiumQueen,
  "presidential-suite": presidentialSuite,
  "standard-double": standardDouble,
  "family-room": familyRoom,
  "business-king": businessKing
};

interface Room {
  id: string;
  location: string;
  name: string;
  image_url: string | null;
  size: string | null;
  occupancy: string | null;
  description: string | null;
  button_link: string | null;
  display_order: number;
  is_active: boolean;
}

const AdminRooms = () => {
  const { loading: authLoading } = useAdminAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    location: "ibadan",
    name: "",
    image_url: "",
    size: "",
    occupancy: "",
    description: "",
    button_link: "",
    display_order: 0,
    is_active: true,
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, [selectedLocation]);

  const fetchRooms = async () => {
    let query = supabase
      .from("rooms")
      .select("*")
      .order("display_order", { ascending: true });

    if (selectedLocation !== "all") {
      query = query.eq("location", selectedLocation);
    }

    const { data, error } = await query;

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch rooms",
        variant: "destructive",
      });
    } else {
      // Map image URLs to imported images
      const roomsWithImages = (data || []).map(room => {
        const imageKey = room.image_url?.split('/').pop()?.replace('.jpg', '') || '';
        return {
          ...room,
          displayImage: roomImageMap[imageKey] || room.image_url || deluxeKing
        };
      });
      setRooms(roomsWithImages as any);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingRoom) {
      const { error } = await supabase
        .from("rooms")
        .update(formData)
        .eq("id", editingRoom.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update room",
          variant: "destructive",
        });
        return;
      }
      toast({ title: "Success", description: "Room updated successfully" });
    } else {
      const { error } = await supabase.from("rooms").insert(formData);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create room",
          variant: "destructive",
        });
        return;
      }
      toast({ title: "Success", description: "Room created successfully" });
    }

    setIsDialogOpen(false);
    resetForm();
    fetchRooms();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    const { error } = await supabase.from("rooms").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete room",
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Success", description: "Room deleted successfully" });
    fetchRooms();
  };

  const openEditDialog = (room: Room) => {
    setEditingRoom(room);
    setFormData({
      location: room.location,
      name: room.name,
      image_url: room.image_url || "",
      size: room.size || "",
      occupancy: room.occupancy || "",
      description: room.description || "",
      button_link: room.button_link || "",
      display_order: room.display_order,
      is_active: room.is_active,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingRoom(null);
    setFormData({
      location: "ibadan",
      name: "",
      image_url: "",
      size: "",
      occupancy: "",
      description: "",
      button_link: "",
      display_order: 0,
      is_active: true,
    });
  };

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Room Management</h1>
        <p className="text-muted-foreground text-lg">
          Add, edit, and manage rooms across all hotel locations
        </p>
      </div>

      <main>
        <div className="flex justify-between items-center mb-6">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="ibadan">Ibadan</SelectItem>
              <SelectItem value="abuja">Abuja</SelectItem>
              <SelectItem value="ogbomosho">Ogbomosho</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Room
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingRoom ? "Edit Room" : "Add New Room"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Location</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) =>
                      setFormData({ ...formData, location: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ibadan">Ibadan</SelectItem>
                      <SelectItem value="abuja">Abuja</SelectItem>
                      <SelectItem value="ogbomosho">Ogbomosho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Room Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Image Upload</Label>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        setUploadingImage(true);
                        
                        try {
                          const fileExt = file.name.split('.').pop();
                          const fileName = `${Date.now()}.${fileExt}`;
                          const filePath = `rooms/${formData.location}/${fileName}`;

                          const { error: uploadError } = await supabase.storage
                            .from('website-images')
                            .upload(filePath, file, {
                              cacheControl: '3600',
                              upsert: false
                            });

                          if (uploadError) {
                            console.error('Upload error:', uploadError);
                            toast({
                              title: "Error",
                              description: uploadError.message || "Failed to upload image",
                              variant: "destructive",
                            });
                            return;
                          }

                          const { data: { publicUrl } } = supabase.storage
                            .from('website-images')
                            .getPublicUrl(filePath);

                          setFormData({ ...formData, image_url: publicUrl });
                          toast({
                            title: "Success",
                            description: "Image uploaded successfully",
                          });
                        } catch (error: any) {
                          console.error('Upload error:', error);
                          toast({
                            title: "Error",
                            description: error.message || "Failed to upload image",
                            variant: "destructive",
                          });
                        } finally {
                          setUploadingImage(false);
                        }
                      }}
                    />
                    {uploadingImage && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                        Uploading image...
                      </div>
                    )}
                    {formData.image_url && !uploadingImage && (
                      <div className="mt-2">
                        <img 
                          src={formData.image_url} 
                          alt="Preview" 
                          className="w-full max-w-sm h-48 object-cover rounded border" 
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Size</Label>
                    <Input
                      value={formData.size}
                      onChange={(e) =>
                        setFormData({ ...formData, size: e.target.value })
                      }
                      placeholder="e.g., 35 sqm"
                    />
                  </div>
                  <div>
                    <Label>Occupancy</Label>
                    <Input
                      value={formData.occupancy}
                      onChange={(e) =>
                        setFormData({ ...formData, occupancy: e.target.value })
                      }
                      placeholder="e.g., 2 Guests"
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Button Link</Label>
                  <Input
                    value={formData.button_link}
                    onChange={(e) =>
                      setFormData({ ...formData, button_link: e.target.value })
                    }
                    placeholder="/rooms/deluxe-king"
                  />
                </div>

                <div>
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        display_order: parseInt(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>

                <Button type="submit" className="w-full" disabled={uploadingImage}>
                  {uploadingImage ? "Uploading..." : editingRoom ? "Update Room" : "Create Room"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id}>
              <CardHeader>
                {((room as any).displayImage || room.image_url) && (
                  <img
                    src={(room as any).displayImage || room.image_url}
                    alt={room.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <CardTitle className="flex justify-between items-start">
                  <span>{room.name}</span>
                  <span className="text-xs font-normal bg-primary/10 px-2 py-1 rounded">
                    {room.location}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {room.size && <p>Size: {room.size}</p>}
                  {room.occupancy && <p>Occupancy: {room.occupancy}</p>}
                  {room.description && (
                    <p className="text-muted-foreground">{room.description}</p>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(room)}
                    className="flex-1"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(room.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {rooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No rooms found. Add your first room to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminRooms;
