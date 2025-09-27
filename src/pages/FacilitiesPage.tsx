import { Card, CardContent } from "@/components/ui/card";
import AmenityCard from "@/components/AmenityCard";
import { 
  Bed, 
  Utensils, 
  Users, 
  Dumbbell, 
  Waves, 
  Coffee, 
  Shield, 
  Wifi,
  Car,
  Phone,
  Sparkles,
  Building
} from "lucide-react";

const FacilitiesPage = () => {
  const facilities = [
    {
      icon: Bed,
      title: "Luxury Accommodations",
      description: "Elegant rooms with modern décor, premium bedding, and city or garden views across all locations."
    },
    {
      icon: Utensils,
      title: "Fine Dining Restaurants",
      description: "Local and international cuisine prepared by expert chefs, showcasing the best of Nigerian and global flavors."
    },
    {
      icon: Users,
      title: "Conference & Event Facilities",
      description: "Spacious halls and meeting rooms equipped with modern audio-visual technology for business and social events."
    },
    {
      icon: Dumbbell,
      title: "Fitness Centers",
      description: "Fully equipped gyms with state-of-the-art equipment and personal training services available."
    },
    {
      icon: Waves,
      title: "Swimming Pools",
      description: "Outdoor pools with poolside service, perfect for relaxation and recreation in all our properties."
    },
    {
      icon: Coffee,
      title: "Concierge & Room Service",
      description: "24/7 concierge services, room service, and valet parking to ensure your comfort at all times."
    },
    {
      icon: Shield,
      title: "Security & Connectivity",
      description: "24-hour surveillance systems and complimentary high-speed Wi-Fi throughout all properties."
    },
    {
      icon: Wifi,
      title: "High-Speed Internet",
      description: "Complimentary Wi-Fi access in all rooms, public areas, and business facilities."
    },
    {
      icon: Car,
      title: "Parking Services",
      description: "Complimentary valet and self-parking options available at all locations."
    },
    {
      icon: Phone,
      title: "Business Services",
      description: "Full business center with printing, copying, and secretarial services for corporate guests."
    },
    {
      icon: Sparkles,
      title: "Spa & Wellness",
      description: "Relaxation and wellness services to rejuvenate your body and mind during your stay."
    },
    {
      icon: Building,
      title: "Rooftop Lounges",
      description: "Exclusive rooftop spaces with panoramic views, perfect for evening relaxation and social gatherings."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-luxury-cream">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">Facilities & Amenities</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            World-class facilities and premium services designed to exceed your expectations across all our locations
          </p>
        </div>
      </section>

      {/* Main Facilities */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Premium Amenities</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every facility is carefully designed to provide comfort, convenience, and luxury throughout your stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <AmenityCard
                key={index}
                icon={facility.icon}
                title={facility.title}
                description={facility.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-luxury-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">Additional Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-primary">Business & Corporate</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Professional meeting rooms with AV equipment</li>
                    <li>• High-speed internet and Wi-Fi</li>
                    <li>• Business center with printing and copying</li>
                    <li>• Corporate event planning services</li>
                    <li>• Executive lounge access</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-primary">Leisure & Recreation</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Swimming pools with poolside service</li>
                    <li>• Fitness centers with modern equipment</li>
                    <li>• Spa and wellness treatments</li>
                    <li>• Rooftop lounges with city views</li>
                    <li>• Cultural tour arrangements</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-primary">Dining & Entertainment</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Fine dining restaurants</li>
                    <li>• Local and international cuisine</li>
                    <li>• 24/7 room service</li>
                    <li>• Private dining arrangements</li>
                    <li>• Bar and lounge facilities</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-primary">Guest Services</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 24/7 concierge services</li>
                    <li>• Airport shuttle arrangements</li>
                    <li>• Laundry and dry cleaning</li>
                    <li>• Currency exchange assistance</li>
                    <li>• Tour and activity bookings</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Experience Premium Hospitality
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            From luxury accommodations to world-class amenities, we provide everything you need for an exceptional stay.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FacilitiesPage;