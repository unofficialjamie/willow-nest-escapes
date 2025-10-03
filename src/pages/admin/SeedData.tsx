import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const SeedData = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const seedRooms = async () => {
    setLoading(true);
    try {
      // Sample rooms data - 8 rooms per location
      const roomsData = [
        // Ibadan rooms
        { location: "ibadan", name: "Standard Double Room", image_url: "/assets/rooms/standard-double.jpg", size: "25 sqm", occupancy: "2 Guests", description: "Comfortable room with modern amenities", display_order: 1, is_active: true },
        { location: "ibadan", name: "Superior Twin Room", image_url: "/assets/rooms/superior-twin.jpg", size: "28 sqm", occupancy: "2 Guests", description: "Spacious twin room with city views", display_order: 2, is_active: true },
        { location: "ibadan", name: "Deluxe King Room", image_url: "/assets/rooms/deluxe-king.jpg", size: "32 sqm", occupancy: "2 Guests", description: "Luxurious king room with premium bedding", display_order: 3, is_active: true },
        { location: "ibadan", name: "Premium Queen Room", image_url: "/assets/rooms/premium-queen.jpg", size: "30 sqm", occupancy: "2 Guests", description: "Elegant queen room with sitting area", display_order: 4, is_active: true },
        { location: "ibadan", name: "Business King Room", image_url: "/assets/rooms/business-king.jpg", size: "35 sqm", occupancy: "2 Guests", description: "Perfect for business travelers with workspace", display_order: 5, is_active: true },
        { location: "ibadan", name: "Family Room", image_url: "/assets/rooms/family-room.jpg", size: "45 sqm", occupancy: "4 Guests", description: "Spacious family accommodation", display_order: 6, is_active: true },
        { location: "ibadan", name: "Executive Suite", image_url: "/assets/rooms/executive-suite.jpg", size: "55 sqm", occupancy: "2 Guests", description: "Separate living area and bedroom", display_order: 7, is_active: true },
        { location: "ibadan", name: "Presidential Suite", image_url: "/assets/rooms/presidential-suite.jpg", size: "75 sqm", occupancy: "4 Guests", description: "Ultimate luxury experience", display_order: 8, is_active: true },
        
        // Abuja rooms
        { location: "abuja", name: "Standard Double Room", image_url: "/assets/rooms/standard-double.jpg", size: "25 sqm", occupancy: "2 Guests", description: "Comfortable room in the capital", display_order: 1, is_active: true },
        { location: "abuja", name: "Superior Twin Room", image_url: "/assets/rooms/superior-twin.jpg", size: "28 sqm", occupancy: "2 Guests", description: "Twin room with capital views", display_order: 2, is_active: true },
        { location: "abuja", name: "Deluxe King Room", image_url: "/assets/rooms/deluxe-king.jpg", size: "32 sqm", occupancy: "2 Guests", description: "Premium king room", display_order: 3, is_active: true },
        { location: "abuja", name: "Premium Queen Room", image_url: "/assets/rooms/premium-queen.jpg", size: "30 sqm", occupancy: "2 Guests", description: "Elegant queen accommodation", display_order: 4, is_active: true },
        { location: "abuja", name: "Business King Room", image_url: "/assets/rooms/business-king.jpg", size: "35 sqm", occupancy: "2 Guests", description: "Executive business room", display_order: 5, is_active: true },
        { location: "abuja", name: "Family Room", image_url: "/assets/rooms/family-room.jpg", size: "45 sqm", occupancy: "4 Guests", description: "Family comfort in Abuja", display_order: 6, is_active: true },
        { location: "abuja", name: "Executive Suite", image_url: "/assets/rooms/executive-suite.jpg", size: "55 sqm", occupancy: "2 Guests", description: "Premier suite experience", display_order: 7, is_active: true },
        { location: "abuja", name: "Presidential Suite", image_url: "/assets/rooms/presidential-suite.jpg", size: "75 sqm", occupancy: "4 Guests", description: "Top-tier luxury suite", display_order: 8, is_active: true },
        
        // Ogbomosho rooms
        { location: "ogbomosho", name: "Standard Double Room", image_url: "/assets/rooms/standard-double.jpg", size: "25 sqm", occupancy: "2 Guests", description: "Traditional comfort", display_order: 1, is_active: true },
        { location: "ogbomosho", name: "Superior Twin Room", image_url: "/assets/rooms/superior-twin.jpg", size: "28 sqm", occupancy: "2 Guests", description: "Twin room with local charm", display_order: 2, is_active: true },
        { location: "ogbomosho", name: "Deluxe King Room", image_url: "/assets/rooms/deluxe-king.jpg", size: "32 sqm", occupancy: "2 Guests", description: "King room with cultural touches", display_order: 3, is_active: true },
        { location: "ogbomosho", name: "Premium Queen Room", image_url: "/assets/rooms/premium-queen.jpg", size: "30 sqm", occupancy: "2 Guests", description: "Premium queen accommodation", display_order: 4, is_active: true },
        { location: "ogbomosho", name: "Business King Room", image_url: "/assets/rooms/business-king.jpg", size: "35 sqm", occupancy: "2 Guests", description: "Business-ready room", display_order: 5, is_active: true },
        { location: "ogbomosho", name: "Family Room", image_url: "/assets/rooms/family-room.jpg", size: "45 sqm", occupancy: "4 Guests", description: "Family-friendly space", display_order: 6, is_active: true },
        { location: "ogbomosho", name: "Executive Suite", image_url: "/assets/rooms/executive-suite.jpg", size: "55 sqm", occupancy: "2 Guests", description: "Executive accommodation", display_order: 7, is_active: true },
        { location: "ogbomosho", name: "Presidential Suite", image_url: "/assets/rooms/presidential-suite.jpg", size: "75 sqm", occupancy: "4 Guests", description: "Premier luxury suite", display_order: 8, is_active: true },
      ];

      for (const room of roomsData) {
        const { error } = await supabase.from("rooms").insert(room);
        if (error) {
          console.error("Error inserting room:", error);
        }
      }

      toast({
        title: "Success",
        description: "Sample room data has been seeded successfully!",
      });
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

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Seed Sample Data</CardTitle>
          <CardDescription>
            This will add 8 sample rooms for each location (Ibadan, Abuja, Ogbomosho) - 24 rooms total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={seedRooms} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Seed Room Data
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Note: This is a one-time operation to populate your database with sample room data.
            You can edit or delete these rooms later in the Rooms Management section.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeedData;
