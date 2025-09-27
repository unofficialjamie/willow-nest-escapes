import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from "@/components/BookingForm";
import AmenityCard from "@/components/AmenityCard";
import { MapPin, Star, Wifi, Car, Coffee, Waves, Dumbbell, Shield, Users, Utensils } from "lucide-react";
import roomImage from "@/assets/room-elegant.jpg";
import poolImage from "@/assets/pool-area.jpg";
import restaurantImage from "@/assets/restaurant.jpg";
import heroImage from "@/assets/hero-luxury-hotel.jpg";

const LocationIbadanPage = () => {
  const amenities = [
    { icon: Wifi, title: "Free Wi-Fi", description: "High-speed internet throughout the property" },
    { icon: Car, title: "Valet Parking", description: "Complimentary valet and self-parking available" },
    { icon: Coffee, title: "24/7 Room Service", description: "Gourmet dining delivered to your room" },
    { icon: Utensils, title: "Fine Dining", description: "Local and international cuisine" },
    { icon: Dumbbell, title: "Fitness Center", description: "State-of-the-art gym with personal training" },
    { icon: Waves, title: "Swimming Pool", description: "Outdoor pool with poolside service" },
    { icon: Shield, title: "24/7 Security", description: "Round-the-clock security and concierge" },
    { icon: Users, title: "Conference Facilities", description: "Modern meeting rooms and event spaces" }
  ];

  const gallery = [
    { image: roomImage, title: "Elegant Rooms", description: "Contemporary designs with premium amenities" },
    { image: poolImage, title: "Swimming Pool", description: "Outdoor pool with poolside service" },
    { image: restaurantImage, title: "Fine Dining", description: "Local and international cuisine" },
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Ibadan Hotel - The Willow Nest Hotel | 81 Premium Rooms</title>
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative h-[80vh] flex items-center justify-center text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 15, 15, 0.6), rgba(30, 15, 15, 0.4)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-xl font-medium">Ibadan, Nigeria</span>
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
                The Willow Nest Ibadan
              </h1>
              <p className="text-xl md:text-2xl font-light text-white/90">
                81 Premium Rooms in the Heart of Ibadan
              </p>
              <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                Located in the heart of Ibadan, this branch is our largest property, offering 81 well-appointed rooms with contemporary designs and premium amenities.
              </p>
            </div>
          </div>
          
          {/* Booking Form Overlay */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
            <BookingForm variant="hero" />
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Ibadan Highlights
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover what makes our Ibadan location special
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <Card className="card-luxury hover-lift">
                <CardContent className="p-6 text-center">
                  <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">Rooftop Lounge</h3>
                  <p className="text-muted-foreground">Panoramic city views from our exclusive rooftop lounge</p>
                </CardContent>
              </Card>

              <Card className="card-luxury hover-lift">
                <CardContent className="p-6 text-center">
                  <Utensils className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">Multiple Dining Options</h3>
                  <p className="text-muted-foreground">Local and international cuisine at our restaurants</p>
                </CardContent>
              </Card>

              <Card className="card-luxury hover-lift">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">Conference Halls</h3>
                  <p className="text-muted-foreground">Spacious conference and meeting rooms</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-luxury-cream">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Facilities Gallery</h2>
              <p className="text-lg text-muted-foreground">
                Explore our premium facilities and amenities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {gallery.map((item, index) => (
                <Card key={index} className="card-luxury hover-lift overflow-hidden">
                  <div className="relative h-64">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-heading text-xl font-bold">{item.title}</h3>
                      <p className="text-white/80">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Premium Amenities</h2>
              <p className="text-lg text-muted-foreground">
                World-class facilities designed for your comfort
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {amenities.map((amenity, index) => (
                <AmenityCard
                  key={index}
                  icon={amenity.icon}
                  title={amenity.title}
                  description={amenity.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-16 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience Ibadan?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Book your stay at The Willow Nest Ibadan and discover comfort in Nigeria's largest city by area.
            </p>
            <Button size="lg" variant="luxury" className="text-lg px-8 py-4">
              Book Your Stay in Ibadan
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default LocationIbadanPage;