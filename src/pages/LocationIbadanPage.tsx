import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from "@/components/BookingForm";
import { MapPin, Wifi, Car, Coffee, Waves, Dumbbell, Shield, Users, Utensils, Phone, Mail } from "lucide-react";
import roomImage from "@/assets/room-elegant.jpg";
import poolImage from "@/assets/pool-area.jpg";
import restaurantImage from "@/assets/restaurant.jpg";
import heroImage from "@/assets/hero-luxury-hotel.jpg";

const LocationIbadanPage = () => {
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

  const gallery = [
    { image: roomImage, alt: "Elegant hotel room" },
    { image: poolImage, alt: "Swimming pool area" },
    { image: restaurantImage, alt: "Restaurant dining" },
    { image: heroImage, alt: "Hotel exterior" }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Ibadan Hotel - The Willow Nest Hotel | 81 Premium Rooms</title>
      
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
                  Ibadan - Oyo State
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Historic charm meets modern hospitality in Nigeria's largest city by area. Experience 
                  the perfect blend of cultural heritage and contemporary luxury.
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-md font-semibold">
                  Get Address
                </Button>
              </div>
              
              {/* Right Booking Form */}
              <div className="w-full max-w-md">
                <BookingForm variant="hero" />
              </div>
            </div>
          </div>
        </section>

        {/* Legacy of Excellence Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  A Legacy of Excellence
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our Ibadan location stands as a testament to the city's rich history. From the bustling 
                  markets of Dugbe to the serene halls of the University of Ibadan, we're perfectly positioned 
                  to offer you the best of both worlds.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground">Historic District Access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground">University Proximity</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground">Business Hub</span>
                  </div>
                </div>
                
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-semibold">
                  Book Now
                </Button>
              </div>
              
              {/* Right Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={roomImage} 
                    alt="Modern Architecture"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-heading text-xl font-bold mb-2">Modern Architecture</h3>
                    <p className="text-white/90">Contemporary design blending with natural elements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((item, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg aspect-square hover-lift">
                  <img 
                    src={item.image} 
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
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
                Ready to Experience Ibadan?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">Location</h3>
                <p className="text-sm text-muted-foreground">
                  Plot A, Osunjela Street, Off Adeoyo Street, Old Bodija, Ibadan, Oyo State
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">Phone</h3>
                <p className="text-sm text-muted-foreground">
                  Call: +234 802 266 6235
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">
                  reservations.ib@thewillowshotels.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LocationIbadanPage;