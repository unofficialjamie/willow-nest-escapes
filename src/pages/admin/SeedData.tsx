import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const SeedData = () => {
  const [loading, setLoading] = useState(false);
  const [pageSeedLoading, setPageSeedLoading] = useState(false);
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

  const seedPageSections = async () => {
    setPageSeedLoading(true);
    try {
      const pageSectionsData = [
        // Locations Page
        { page_name: "locations", section_key: "hero", section_title: "Hero Section", content_type: "hero", display_order: 1, is_active: true, data: { title: "Our Locations", description: "Discover our premium hotel locations across Nigeria", image: "/assets/hero-luxury-hotel.jpg" }},
        { page_name: "locations", section_key: "locations_grid", section_title: "Locations Grid", content_type: "grid", display_order: 2, is_active: true, data: { title: "Where We Are", description: "Experience luxury hospitality in three vibrant Nigerian cities", locations: [{ name: "Ibadan", description: "Located in the heart of Oyo State", image: "/assets/ibadan-hero.jpg", link: "/locations/ibadan" }, { name: "Ogbomosho", description: "Experience traditional Yoruba hospitality", image: "/assets/ogbomosho-hero.jpg", link: "/locations/ogbomosho" }, { name: "Abuja", description: "Premium accommodation in Nigeria's capital", image: "/assets/abuja-hero.jpg", link: "/locations/abuja" }]}},
        
        // Ibadan Location
        { page_name: "locations_ibadan", section_key: "hero", section_title: "Hero Section", content_type: "hero", display_order: 1, is_active: true, data: { title: "Willow Nest Escapes Ibadan", description: "Experience luxury in the heart of Oyo State's capital city", image: "/assets/ibadan-hero.jpg" }},
        { page_name: "locations_ibadan", section_key: "overview", section_title: "Overview", content_type: "text", display_order: 2, is_active: true, data: { title: "Welcome to Ibadan", content: "Our Ibadan location offers the perfect blend of modern comfort and traditional hospitality. Located in the vibrant city center, we provide easy access to major business districts and cultural attractions." }},
        { page_name: "locations_ibadan", section_key: "amenities", section_title: "Amenities", content_type: "list", display_order: 3, is_active: true, data: { title: "Location Features", items: ["24/7 Security", "Swimming Pool", "Restaurant & Bar", "Conference Facilities", "Fitness Center", "Free WiFi", "Ample Parking", "Airport Transfer"] }},
        { page_name: "locations_ibadan", section_key: "contact", section_title: "Contact", content_type: "contact", display_order: 4, is_active: true, data: { title: "Contact Ibadan", address: "123 Premier Street, Bodija, Ibadan, Oyo State", phone: "+234 XXX XXX XXXX", email: "ibadan@willownest.com" }},
        
        // Ogbomosho Location
        { page_name: "locations_ogbomosho", section_key: "hero", section_title: "Hero Section", content_type: "hero", display_order: 1, is_active: true, data: { title: "Willow Nest Escapes Ogbomosho", description: "Traditional hospitality meets modern luxury in historic Ogbomosho", image: "/assets/ogbomosho-hero.jpg" }},
        { page_name: "locations_ogbomosho", section_key: "overview", section_title: "Overview", content_type: "text", display_order: 2, is_active: true, data: { title: "Welcome to Ogbomosho", content: "Discover authentic Yoruba hospitality at our Ogbomosho property. We combine cultural heritage with contemporary amenities to provide a unique and memorable stay." }},
        { page_name: "locations_ogbomosho", section_key: "amenities", section_title: "Amenities", content_type: "list", display_order: 3, is_active: true, data: { title: "Location Features", items: ["24/7 Security", "Local Cuisine Restaurant", "Event Spaces", "Business Center", "Free WiFi", "Garden Areas", "Parking", "Cultural Tours"] }},
        { page_name: "locations_ogbomosho", section_key: "contact", section_title: "Contact", content_type: "contact", display_order: 4, is_active: true, data: { title: "Contact Ogbomosho", address: "45 Heritage Avenue, Ogbomosho, Oyo State", phone: "+234 XXX XXX XXXX", email: "ogbomosho@willownest.com" }},
        
        // Abuja Location
        { page_name: "locations_abuja", section_key: "hero", section_title: "Hero Section", content_type: "hero", display_order: 1, is_active: true, data: { title: "Willow Nest Escapes Abuja", description: "Premium hospitality in Nigeria's capital city", image: "/assets/abuja-hero.jpg" }},
        { page_name: "locations_abuja", section_key: "overview", section_title: "Overview", content_type: "text", display_order: 2, is_active: true, data: { title: "Welcome to Abuja", content: "Our flagship Abuja location offers world-class accommodation in the heart of Nigeria's capital. Perfect for business travelers and tourists, with easy access to government offices, shopping, and entertainment." }},
        { page_name: "locations_abuja", section_key: "amenities", section_title: "Amenities", content_type: "list", display_order: 3, is_active: true, data: { title: "Location Features", items: ["Executive Floor", "Business Lounge", "Rooftop Bar", "Conference Centers", "Gym & Spa", "International Restaurant", "Concierge Service", "VIP Transport"] }},
        { page_name: "locations_abuja", section_key: "contact", section_title: "Contact", content_type: "contact", display_order: 4, is_active: true, data: { title: "Contact Abuja", address: "78 Diplomatic Drive, Maitama, Abuja FCT", phone: "+234 XXX XXX XXXX", email: "abuja@willownest.com" }},
        
        // Privacy Policy
        { page_name: "privacy_policy", section_key: "hero", section_title: "Hero Section", content_type: "hero", display_order: 1, is_active: true, data: { title: "Privacy Policy", description: "How we protect and use your personal information" }},
        { page_name: "privacy_policy", section_key: "content", section_title: "Policy Content", content_type: "legal", display_order: 2, is_active: true, data: { sections: [{ title: "Information Collection", content: "We collect information you provide directly to us when making reservations, including name, email, phone number, and payment details." }, { title: "Use of Information", content: "Your information is used to process bookings, provide customer service, send booking confirmations, and improve our services." }, { title: "Data Protection", content: "We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or disclosure." }, { title: "Third-Party Sharing", content: "We do not sell or rent your personal information to third parties. Information may be shared only with service providers necessary for booking fulfillment." }, { title: "Your Rights", content: "You have the right to access, correct, or delete your personal information. Contact us to exercise these rights." }]}},
        
        // Hotel Policies
        { page_name: "hotel_policies", section_key: "hero", section_title: "Hero Section", content_type: "hero", display_order: 1, is_active: true, data: { title: "Hotel Policies", description: "Important information for your stay with us" }},
        { page_name: "hotel_policies", section_key: "policies", section_title: "Policies", content_type: "policies", display_order: 2, is_active: true, data: { sections: [{ title: "Check-In / Check-Out", content: "Check-in: 2:00 PM | Check-out: 12:00 PM. Early check-in and late check-out available upon request (subject to availability and additional charges)." }, { title: "Cancellation Policy", content: "Free cancellation up to 48 hours before arrival. Cancellations within 48 hours will incur a charge of one night's stay." }, { title: "Payment Policy", content: "We accept cash, credit cards (Visa, Mastercard), and bank transfers. Full payment is required upon check-in unless prior arrangements have been made." }, { title: "Pet Policy", content: "Pets are not permitted in the hotel except for registered service animals." }, { title: "Smoking Policy", content: "All rooms and public areas are non-smoking. Designated smoking areas are available outdoors." }, { title: "Visitor Policy", content: "Visitors must register at reception. Overnight guests must be registered and additional charges will apply." }, { title: "Damage Policy", content: "Guests are responsible for any damage to hotel property during their stay. Charges for repairs will be billed accordingly." }]}},
      ];

      for (const section of pageSectionsData) {
        const { error } = await supabase.from("page_sections").insert(section);
        if (error) {
          console.error("Error inserting page section:", error);
        }
      }

      toast({
        title: "Success",
        description: "Page sections have been seeded successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setPageSeedLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Seed Page Sections</CardTitle>
          <CardDescription>
            Add default content for all missing pages (Locations, Ibadan, Ogbomosho, Abuja, Privacy Policy, Hotel Policies)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={seedPageSections} disabled={pageSeedLoading}>
            {pageSeedLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Seed Page Content
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            This will add default sections for all pages that currently have no content.
            You can edit this content later in the Pages Management section.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Seed Room Data</CardTitle>
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
