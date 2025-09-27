import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from "@/components/BookingForm";
import AmenityCard from "@/components/AmenityCard";
import { MapPin, Star, Wifi, Car, Coffee, Waves, Dumbbell, Shield, Users, Utensils, Plane } from "lucide-react";
import roomImage from "@/assets/room-elegant.jpg";
import poolImage from "@/assets/pool-area.jpg";
import restaurantImage from "@/assets/restaurant.jpg";

const LocationAbujaPage = () => {
  const amenities = [
    { icon: Wifi, title: "Free Wi-Fi", description: "High-speed business internet access" },
    { icon: Car, title: "Executive Parking", description: "Valet parking for business executives" },
    { icon: Coffee, title: "24/7 Room Service", description: "Premium dining service around the clock" },
    { icon: Utensils, title: "Fine Dining", description: "Premium fine dining restaurant" },
    { icon: Dumbbell, title: "Executive Fitness", description: "Premium fitness center with modern equipment" },
    { icon: Waves, title: "Executive Pool", description: "Exclusive outdoor pool for guests" },
    { icon: Shield, title: "Premium Security", description: "Exclusive concierge and 24/7 security" },
    { icon: Users, title: "Business Facilities", description: "Modern business and meeting facilities" }
  ];

  const gallery = [
    { image: restaurantImage, title: "Fine Dining", description: "Premium restaurant with international cuisine" },
    { image: poolImage, title: "Executive Pool", description: "Exclusive outdoor pool and fitness center" },
    { image: roomImage, title: "Business Suites", description: "Elegant rooms for executives and diplomats" },
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Abuja Hotel - The Willow Nest Hotel | 27 Executive Rooms in Capital</title>
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative h-[80vh] flex items-center justify-center text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 15, 15, 0.6), rgba(30, 15, 15, 0.4)), url(${restaurantImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-xl font-medium">Garki, Abuja FCT</span>
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
                The Willow Nest Abuja
              </h1>
              <p className="text-xl md:text-2xl font-light text-white/90">
                27 Executive Rooms in Nigeria's Capital
              </p>
              <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                Located in Garki, Abuja, this property offers elegant rooms tailored for business executives and leisure travelers. Minutes from the airport and government buildings.
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
                Abuja Highlights
              </h2>
              <p className="text-lg text-muted-foreground">
                Executive luxury in the heart of Nigeria's capital city
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <Card className="card-luxury hover-lift">
                <CardContent className="p-6 text-center">
                  <Plane className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">Airport Proximity</h3>
                  <p className="text-muted-foreground">Minutes from Nnamdi Azikiwe International Airport</p>
                </CardContent>
              </Card>

              <Card className="card-luxury hover-lift">
                <CardContent className="p-6 text-center">
                  <Utensils className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">Premium Dining</h3>
                  <p className="text-muted-foreground">Fine dining restaurant with international cuisine</p>
                </CardContent>
              </Card>

              <Card className="card-luxury hover-lift">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">Business Hub</h3>
                  <p className="text-muted-foreground">Modern business and meeting facilities</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-luxury-cream">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Executive Facilities</h2>
              <p className="text-lg text-muted-foreground">
                Premium amenities designed for the discerning traveler
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Executive Amenities</h2>
              <p className="text-lg text-muted-foreground">
                Business-class facilities for the modern executive
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
              Experience Executive Luxury
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Book your stay at The Willow Nest Abuja and enjoy premium hospitality in Nigeria's capital.
            </p>
            <Button size="lg" variant="luxury" className="text-lg px-8 py-4">
              Book Your Executive Stay
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default LocationAbujaPage;