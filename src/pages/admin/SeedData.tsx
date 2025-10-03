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
        { page_name: "location-ibadan", section_key: "hero", section_title: "Hero Section", content_type: "hero", display_order: 1, is_active: true, data: { title: "Ibadan - Oyo State", description: "Historic charm meets modern hospitality in Nigeria's largest city by area. Experience the perfect blend of cultural heritage and contemporary luxury.", image: "/assets/ibadan-hero.jpg", ctaText: "Get Address", ctaLink: "#contact", location: "ibadan" }},
        { page_name: "location-ibadan", section_key: "legacy", section_title: "Legacy of Excellence", content_type: "text_with_image", display_order: 2, is_active: true, data: { title: "A Legacy of Excellence", description: "Our Ibadan location stands as a testament to the city's rich history. From the bustling markets of Dugbe to the serene halls of the University of Ibadan, we're perfectly positioned to offer you the best of both worlds.", highlights: ["Historic District Access", "University Proximity", "Business Hub"], image: "/assets/room-elegant.jpg", imageCaption: "Modern Architecture", imageDescription: "Contemporary design blending with natural elements", ctaText: "Book Now", ctaLink: "/booking" }},
        { page_name: "location-ibadan", section_key: "gallery", section_title: "Gallery", content_type: "gallery", display_order: 3, is_active: true, data: { items: [{ image: "/assets/room-elegant.jpg", alt: "Elegant hotel room" }, { image: "/assets/pool-area.jpg", alt: "Swimming pool area" }, { image: "/assets/restaurant.jpg", alt: "Restaurant dining" }, { image: "/assets/ibadan-hero.jpg", alt: "Hotel exterior" }]}},
        { page_name: "location-ibadan", section_key: "amenities", section_title: "Premium Amenities", content_type: "amenities", display_order: 4, is_active: true, data: { title: "Premium Amenities", description: "Enjoy world-class facilities and services designed to make your stay unforgettable", items: [{ icon: "Wifi", title: "Free Wi-Fi", description: "High-speed internet throughout the property" }, { icon: "Car", title: "Free Parking", description: "Complimentary valet and self-parking available" }, { icon: "Coffee", title: "24/7 Room Service", description: "Gourmet dining delivered to your room" }, { icon: "Utensils", title: "Fine Dining", description: "Award-winning restaurant with local and international cuisine" }, { icon: "Dumbbell", title: "Fitness Center", description: "State-of-the-art gym with personal training" }, { icon: "Waves", title: "Swimming Pool", description: "Outdoor pool with poolside service" }, { icon: "Shield", title: "24/7 Security", description: "Round-the-clock security and concierge services" }, { icon: "Users", title: "Conference Facilities", description: "Modern meeting rooms and event spaces" }]}},
        { page_name: "location-ibadan", section_key: "contact", section_title: "Contact Information", content_type: "contact", display_order: 5, is_active: true, data: { title: "Ready to Experience Ibadan?", address: "Plot A, Osunjela Street, Off Adeoyo Street, Old Bodija, Ibadan, Oyo State", phone: "+234 802 266 6235", email: "reservations.ib@thewillowshotels.com" }},
        
        // Abuja Location
        { page_name: "location-abuja", section_key: "hero", section_title: "Hero Section", content_type: "hero", display_order: 1, is_active: true, data: { title: "Abuja – Federal Capital Territory", description: "Experience modern luxury in the heart of Nigeria's capital. Perfect for business travelers and those seeking sophisticated urban comfort.", image: "/assets/abuja-hero.jpg", ctaText: "Book Now", ctaLink: "/booking", location: "abuja" }},
        { page_name: "location-abuja", section_key: "experience", section_title: "Experience Abuja", content_type: "gallery", display_order: 2, is_active: true, data: { title: "Experience Abuja", description: "Discover our elegant accommodations and modern facilities.", items: [{ image: "/assets/restaurant.jpg", title: "Spacious Rooms", description: "Spacious rooms with city views and premium amenities." }, { image: "/assets/abuja-hero.jpg", title: "Modern Architecture", description: "Contemporary design blending with natural elements" }, { image: "/assets/pool-area.jpg", title: "Strategic Location", description: "Minutes from government buildings and business centers" }, { image: "/assets/room-elegant.jpg", title: "Comfort Redefined", description: "Immerse yourself in thoughtfully designed interiors" }, { image: "/assets/restaurant.jpg", title: "City Views & Nature", description: "Enjoy the perfect balance of luxury and practicality" }, { image: "/assets/pool-area.jpg", title: "Designed for Every Stay", description: "Business or leisure, our rooms offer the versatility you need" }]}},
        { page_name: "location-abuja", section_key: "amenities", section_title: "Premium Amenities", content_type: "amenities", display_order: 3, is_active: true, data: { title: "Premium Amenities", description: "Enjoy world-class facilities and services designed to make your stay unforgettable", items: [{ icon: "Wifi", title: "Free Wi-Fi", description: "High-speed internet throughout the property" }, { icon: "Car", title: "Free Parking", description: "Complimentary valet and self-parking available" }, { icon: "Coffee", title: "24/7 Room Service", description: "Gourmet dining delivered to your room" }, { icon: "Utensils", title: "Fine Dining", description: "Award-winning restaurant with local and international cuisine" }, { icon: "Dumbbell", title: "Fitness Center", description: "State-of-the-art gym with personal training" }, { icon: "Waves", title: "Swimming Pool", description: "Outdoor pool with poolside service" }, { icon: "Shield", title: "24/7 Security", description: "Round-the-clock security and concierge services" }, { icon: "Users", title: "Conference Facilities", description: "Modern meeting rooms and event spaces" }]}},
        { page_name: "location-abuja", section_key: "contact", section_title: "Contact Information", content_type: "contact", display_order: 4, is_active: true, data: { address: "34 Ubiqja Crescent off Ladoke Akintola Boulevard, Garki II, FCT", phone: "+234 (0) 813 111 1808", email: "reservations.abj@thewillowshotels.com" }},
        { page_name: "location-abuja", section_key: "why-choose", section_title: "Why Choose Abuja", content_type: "list", display_order: 5, is_active: true, data: { title: "Why Choose Abuja", items: ["Few minutes from Nnamdi Azikiwe International Airport", "Walking distance to major government offices", "Close to shopping malls and business centers", "Professional business services and meeting facilities"] }},
        
        // Ogbomosho Location
        { page_name: "location-ogbomosho", section_key: "hero", section_title: "Hero Section", content_type: "hero", display_order: 1, is_active: true, data: { title: "Ogbomosho", subtitle: "Traditional Elegance", description: "Immerse yourself in the rich cultural heritage of Oyo State while enjoying contemporary comfort. Our Ogbomosho location perfectly blends traditional architecture with modern luxury amenities.", image: "/assets/ogbomosho-hero.jpg", ctaText: "Get Address", ctaLink: "#contact", location: "ogbomosho" }},
        { page_name: "location-ogbomosho", section_key: "highlights", section_title: "Feature Highlights", content_type: "features", display_order: 2, is_active: true, data: { items: [{ icon: "TreePine", title: "Cultural Tours", description: "Guided tours to local markets, traditional sites and cultural sites" }, { icon: "MapPin", title: "Garden Terrace", description: "Beautiful outdoor spaces with traditional landscaping and dining" }, { icon: "Utensils", title: "Local Cuisine", description: "Authentic Yoruba dishes and contemporary Nigerian cuisine" }]}},
        { page_name: "location-ogbomosho", section_key: "gallery", section_title: "Traditional Meets Modern", content_type: "gallery", display_order: 3, is_active: true, data: { title: "Traditional Meets Modern", description: "Experience the perfect harmony of cultural authenticity and contemporary comfort", items: [{ image: "/assets/pool-area.jpg", title: "Spacious Rooms", description: "Spacious rooms with city views and premium amenities." }, { image: "/assets/room-elegant.jpg", title: "Elegant Interiors", description: "Sophisticated design inspired by local craftsmanship" }, { image: "/assets/restaurant.jpg", title: "Authentic Ambience", description: "Traditional decor and natural elements bring a sense of place" }, { image: "/assets/pool-area.jpg", title: "Modern Comforts", description: "Enjoy upgraded amenities, climate control and contemporary furniture" }, { image: "/assets/room-elegant.jpg", title: "Spacious Rooms", description: "Spacious rooms with city views and premium amenities." }, { image: "/assets/restaurant.jpg", title: "Serenity & Privacy", description: "Soundproofed walls and calming interiors create a peaceful haven" }]}},
        { page_name: "location-ogbomosho", section_key: "amenities", section_title: "Premium Amenities", content_type: "amenities", display_order: 4, is_active: true, data: { title: "Premium Amenities", description: "Enjoy world-class facilities and services designed to make your stay unforgettable", items: [{ icon: "Wifi", title: "Free Wi-Fi", description: "High-speed internet throughout the property" }, { icon: "Car", title: "Free Parking", description: "Complimentary valet and self-parking available" }, { icon: "Coffee", title: "24/7 Room Service", description: "Gourmet dining delivered to your room" }, { icon: "Utensils", title: "Fine Dining", description: "Award-winning restaurant with local and international cuisine" }, { icon: "Dumbbell", title: "Fitness Center", description: "State-of-the-art gym with personal training" }, { icon: "Waves", title: "Swimming Pool", description: "Outdoor pool with poolside service" }, { icon: "Shield", title: "24/7 Security", description: "Round-the-clock security and concierge services" }, { icon: "Users", title: "Conference Facilities", description: "Modern meeting rooms and event spaces" }]}},
        { page_name: "location-ogbomosho", section_key: "contact", section_title: "Visit Ogbomosho", content_type: "contact", display_order: 5, is_active: true, data: { title: "Visit Ogbomosho", address: "1 Diji Ogbomosho-Ilorin Road, Ogbomosho, Oyo State", phone: "+234 (0) 8763373", whatsapp: "+234 (0) 8763373", email: "reservations.ogb@thewillowshotels.com" }},
        
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
            Initialize or update content for location pages (Ibadan, Abuja, Ogbomosho), Privacy Policy, and Hotel Policies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={seedPageSections} disabled={pageSeedLoading}>
            {pageSeedLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Seed Page Content
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            <strong>IMPORTANT:</strong> If you have old location page data, this will ADD new data with updated structure.
            You may need to manually delete old entries via the Backend to avoid duplicates.
            After seeding, all location pages will match the frontend design.
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
