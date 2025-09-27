import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from "@/components/BookingForm";
import { MapPin, Wifi, Car, Coffee, Waves, Dumbbell, Shield, Users, Utensils, Phone, Mail, Plane } from "lucide-react";
import roomImage from "@/assets/room-elegant.jpg";
import poolImage from "@/assets/pool-area.jpg";
import restaurantImage from "@/assets/restaurant.jpg";
import heroImage from "@/assets/abuja-hero.jpg";

const LocationAbujaPage = () => {
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

  const experienceCards = [
    { image: restaurantImage, title: "Spacious Rooms", description: "Spacious rooms with city views and premium amenities." },
    { image: heroImage, title: "Modern Architecture", description: "Contemporary design blending with natural elements" },
    { image: poolImage, title: "Strategic Location", description: "Minutes from government buildings and business centers" },
    { image: roomImage, title: "Comfort Redefined", description: "Immerse yourself in thoughtfully designed interiors" },
    { image: restaurantImage, title: "City Views & Nature", description: "Enjoy the perfect balance of luxury and practicality" },
    { image: poolImage, title: "Designed for Every Stay", description: "Business or leisure, our rooms offer the versatility you need" }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Abuja Hotel - The Willow Nest Hotel | 27 Executive Rooms in Capital</title>
      
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
                  Abuja – Federal Capital Territory
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Experience modern luxury in the heart of Nigeria's capital. Perfect for business 
                  travelers and those seeking sophisticated urban comfort.
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-md font-semibold">
                  Book Now
                </Button>
              </div>
              
              {/* Right Booking Form */}
              <div className="w-full max-w-md ml-auto">
                <BookingForm variant="hero" preselectedLocation="abuja" showLocationSelector={false} />
              </div>
            </div>
          </div>
        </section>

        {/* Experience Abuja Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Experience Abuja</h2>
              <p className="text-lg text-muted-foreground">
                Discover our elegant accommodations and modern facilities.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {experienceCards.map((item, index) => (
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

        {/* Contact and Why Choose Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="font-heading text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        34 Ubiqja Crescent off Ladoke Akintola Boulevard, Garki II, FCT
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">+234 (0) 813 111 1808</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">reservations.abj@thewillowshotels.com</p>
                    </div>
                  </div>
                </div>
                
                <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-semibold">
                  Get Direction
                </Button>
              </div>
              
              {/* Why Choose Abuja */}
              <div>
                <h2 className="font-heading text-2xl font-bold mb-6">Why Choose Abuja</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Few minutes from Nnamdi Azikiwe International Airport
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Walking distance to major government offices
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Close to shopping malls and business centers
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Professional business services and meeting facilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LocationAbujaPage;