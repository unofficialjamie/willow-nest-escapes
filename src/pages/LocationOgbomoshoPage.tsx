import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from "@/components/BookingForm";
import { MapPin, Wifi, Car, Coffee, Waves, Dumbbell, Shield, Users, Utensils, Phone, Mail, TreePine } from "lucide-react";
import roomImage from "@/assets/room-elegant.jpg";
import poolImage from "@/assets/pool-area.jpg";
import restaurantImage from "@/assets/restaurant.jpg";
import heroImage from "@/assets/ogbomosho-hero.jpg";

const LocationOgbomoshoPage = () => {
  const amenities = [
    { icon: Wifi, title: "Free Wi-Fi", description: "High-speed internet throughout the property" },
    { icon: Car, title: "Free Parking", description: "Complimentary valet and self-parking available" },
    { icon: Coffee, title: "24/7 Room Service", description: "Gourmet dining delivered to your room" },
    { icon: Utensils, title: "Fine Dining", description: "Award-winning restaurant with local and international cuisine" },
    { icon: Dumbbell, title: "Fitness Center", description: "State-of-the-art gym with personal training" },
    { icon: Waves, title: "Swimming Pool", description: "Outdoor pool with poolside service" },
    { icon: Shield, title: "24/7 Security", description: "Round-the-clock security and concierge services" },
    { icon: Users, title: "Conference Facilities", description: "Modern meeting rooms and event spaces" }
  ];

  const galleryImages = [
    { image: poolImage, title: "Spacious Rooms", description: "Spacious rooms with city views and premium amenities." },
    { image: roomImage, title: "Elegant Interiors", description: "Sophisticated design inspired by local craftsmanship" },
    { image: restaurantImage, title: "Authentic Ambience", description: "Traditional decor and natural elements bring a sense of place" },
    { image: poolImage, title: "Modern Comforts", description: "Enjoy upgraded amenities, climate control and contemporary furniture" },
    { image: roomImage, title: "Spacious Rooms", description: "Spacious rooms with city views and premium amenities." },
    { image: restaurantImage, title: "Serenity & Privacy", description: "Soundproofed walls and calming interiors create a peaceful haven" }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Ogbomosho Hotel - The Willow Nest Hotel | 34 Cultural Rooms</title>
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative h-screen flex items-center text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 15, 15, 0.7), rgba(30, 15, 15, 0.5)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Left Content */}
              <div className="max-w-2xl space-y-6">
                <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight">
                  Ogbomosho
                </h1>
                <h2 className="font-heading text-2xl text-white/90 font-semibold">
                  Traditional Elegance
                </h2>
                <p className="text-lg text-white/80 leading-relaxed">
                  Immerse yourself in the rich cultural heritage of Oyo State while enjoying contemporary
                  comfort. Our Ogbomosho location perfectly blends traditional architecture with modern 
                  luxury amenities.
                </p>
                <Button className="bg-white hover:bg-white/90 text-black px-6 py-3 rounded-md font-semibold">
                  Get Address
                </Button>
              </div>
              
              {/* Right Booking Widget */}
              <div className="absolute top-4 right-4 w-80 hidden lg:block">
                <BookingForm variant="hero" preselectedLocation="ogbomosho" showLocationSelector={false} />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-16 bg-luxury-cream">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TreePine className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">Cultural Tours</h3>
                <p className="text-sm text-muted-foreground">
                  Guided tours to local markets, traditional sites and cultural sites
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">Garden Terrace</h3>
                <p className="text-sm text-muted-foreground">
                  Beautiful outdoor spaces with traditional landscaping and dining
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">Local Cuisine</h3>
                <p className="text-sm text-muted-foreground">
                  Authentic Yoruba dishes and contemporary Nigerian cuisine
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Traditional Meets Modern Gallery */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Traditional Meets Modern</h2>
              <p className="text-lg text-muted-foreground">
                Experience the perfect harmony of cultural authenticity and contemporary comfort
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((item, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg aspect-square hover-lift">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-heading text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-xs text-white/90">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Amenities */}
        <section className="py-16 bg-luxury-cream">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Premium Amenities</h2>
              <p className="text-lg text-muted-foreground">
                Enjoy world-class facilities and services designed to make your stay unforgettable
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {amenities.map((amenity, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <amenity.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{amenity.title}</h3>
                  <p className="text-sm text-muted-foreground">{amenity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Visit Ogbomosho
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">Address</h3>
                <p className="text-sm text-muted-foreground">
                  1 Diji Ogbomosho-Ilorin Road, Ogbomosho, Oyo State
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">Phone</h3>
                <p className="text-sm text-muted-foreground">
                  Call: +234 (0) 8763373<br/>
                  WhatsApp: +234 (0) 8763373
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">
                  reservations.ogb@thewillowshotels.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LocationOgbomoshoPage;