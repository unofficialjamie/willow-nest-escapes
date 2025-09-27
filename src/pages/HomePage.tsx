import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from "@/components/BookingForm";
import AmenityCard from "@/components/AmenityCard";
import { 
  Wifi, 
  Car, 
  Coffee, 
  Waves, 
  Dumbbell, 
  Shield, 
  Users, 
  Utensils,
  MapPin,
  Star,
  Award,
  Heart
} from "lucide-react";
import heroImage from "@/assets/hero-luxury-hotel.jpg";
import roomImage from "@/assets/room-elegant.jpg";
import poolImage from "@/assets/pool-area.jpg";
import restaurantImage from "@/assets/restaurant.jpg";

const HomePage = () => {
  const highlights = [
    {
      icon: MapPin,
      title: "142 Premium Rooms",
      description: "81 rooms in Ibadan, 34 rooms in Ogbomosho, and 27 rooms in Abuja"
    },
    {
      icon: Utensils,
      title: "Fine Dining",
      description: "Restaurants serving international and local cuisines"
    },
    {
      icon: Waves,
      title: "Luxury Amenities",
      description: "Swimming pools, fitness centers, and rooftop lounges"
    },
    {
      icon: Users,
      title: "Event Facilities",
      description: "Conference and event facilities with modern equipment"
    },
    {
      icon: Shield,
      title: "Premium Service",
      description: "24/7 security, free Wi-Fi, and professional concierge services"
    }
  ];

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

  const locations = [
    {
      name: "Ibadan",
      rooms: "81 Rooms",
      description: "Historic charm meets modern hospitality in Nigeria's largest city by area.",
      image: roomImage,
      link: "/locations/ibadan"
    },
    {
      name: "Ogbomosho",
      rooms: "34 Rooms", 
      description: "Traditional elegance in the rich cultural heritage of Oyo State.",
      image: poolImage,
      link: "/locations/ogbomosho"
    },
    {
      name: "Abuja",
      rooms: "27 Rooms",
      description: "Modern luxury in the heart of Nigeria's capital.",
      image: restaurantImage,
      link: "/locations/abuja"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-white hero-gradient"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 15, 15, 0.7), rgba(30, 15, 15, 0.5)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight">
              The Willow Nest Hotel
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/90">
              Redefining Hospitality in Nigeria
            </p>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Experience timeless elegance, modern luxury, and authentic cultural touches across our locations in Ibadan, Ogbomosho, and Abuja — with more destinations coming soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" variant="luxury" className="text-lg px-8 py-6">
                Book Your Stay
              </Button>
              <Button variant="outline-luxury" size="lg" className="text-lg px-8 py-6">
                Explore Locations
              </Button>
            </div>
          </div>
        </div>
        
        {/* Booking Form Overlay */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
          <BookingForm variant="hero" />
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Discover Comfort, Culture, and Class
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              At The Willow Nest Hotel, we blend sophistication with comfort to create unforgettable stays for business travelers, leisure guests, and families.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {highlights.map((highlight, index) => (
              <AmenityCard
                key={index}
                icon={highlight.icon}
                title={highlight.title}
                description={highlight.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Locations */}
      <section className="py-16 bg-luxury-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Our Locations</h2>
            <p className="text-lg text-muted-foreground">
              Three distinctive properties across Nigeria, each offering unique experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <Card key={index} className="card-luxury hover-lift overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-heading text-2xl font-bold">{location.name}</h3>
                    <p className="text-white/80">{location.rooms}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{location.description}</p>
                  <Link to={location.link}>
                    <Button variant="outline" className="w-full">
                      Explore {location.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Amenities */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Premium Amenities</h2>
            <p className="text-lg text-muted-foreground">
              Enjoy world-class facilities and services designed to make your stay unforgettable
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

      {/* Call to Action */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Excellence?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Plan your next stay with us and discover comfort, culture, and class at The Willow Nest Hotel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="luxury" className="text-lg px-8 py-4">
              Book Now
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;