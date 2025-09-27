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
import facilityRestaurant from "@/assets/facility-restaurant.jpg";
import facilityGym from "@/assets/facility-gym.jpg";
import facilityConference from "@/assets/facility-conference.jpg";
import facilityRooftop from "@/assets/facility-rooftop.jpg";

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

  const featuredFacilities = [
    {
      title: "Fine Dining Restaurant",
      description: "Award-winning cuisine with local and international flavors, crafted by expert chefs in an elegant atmosphere.",
      image: facilityRestaurant,
      features: ["Local & International Cuisine", "Expert Chefs", "Elegant Atmosphere", "Room Service Available"]
    },
    {
      title: "State-of-the-Art Fitness Center",
      description: "Premium gym facilities with modern equipment, personal training, and wellness programs for all fitness levels.",
      image: facilityGym,
      features: ["Modern Equipment", "Personal Training", "Wellness Programs", "Flexible Hours"]
    },
    {
      title: "Executive Conference Facilities", 
      description: "Professional meeting rooms and event spaces equipped with cutting-edge audio-visual technology for business success.",
      image: facilityConference,
      features: ["Audio-Visual Technology", "Flexible Layouts", "Business Services", "Catering Available"]
    },
    {
      title: "Rooftop Lounge & Pool",
      description: "Exclusive rooftop experience with panoramic city views, poolside service, and sophisticated ambiance for relaxation.",
      image: facilityRooftop,
      features: ["Panoramic Views", "Poolside Service", "Evening Ambiance", "VIP Experience"]
    }
  ];

  const testimonials = [
    {
      name: "Adebayo Johnson",
      location: "Lagos, Nigeria",
      rating: 5,
      comment: "Exceptional service and stunning facilities. The rooftop lounge in Ibadan offers breathtaking views, and the staff went above and beyond to make our stay memorable."
    },
    {
      name: "Dr. Fatima Aliyu",
      location: "Abuja, Nigeria", 
      rating: 5,
      comment: "Perfect location for business meetings. The conference facilities are world-class, and being minutes from the airport made our corporate event seamless."
    },
    {
      name: "Michael Thompson",
      location: "London, UK",
      rating: 5,
      comment: "An authentic taste of Nigerian hospitality with international standards. The cultural touches in Ogbomosho combined with modern luxury created an unforgettable experience."
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>The Willow Nest Hotel - Luxury Hotels in Nigeria | Ibadan, Ogbomosho, Abuja</title>
      
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-7xl px-4">
          <BookingForm variant="hero" showLocationSelector={true} />
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

        {/* Featured Facilities */}
        <section className="py-16 bg-luxury-cream">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Featured Facilities</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Experience world-class amenities designed to exceed your expectations at every location
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredFacilities.map((facility, index) => (
                <Card key={index} className="card-luxury hover-lift overflow-hidden">
                  <div className="relative h-80">
                    <img 
                      src={facility.image} 
                      alt={facility.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="font-heading text-2xl font-bold mb-2">{facility.title}</h3>
                      <p className="text-white/90 mb-4 leading-relaxed">{facility.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {facility.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                            <span className="text-white/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/facilities">
                <Button variant="luxury" size="lg">
                  Explore All Facilities
                </Button>
              </Link>
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

        {/* About Preview Section */}
        <section className="py-16 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                  About The Willow Nest Hotel
                </h2>
                <p className="text-xl text-secondary-foreground/90 leading-relaxed mb-8">
                  A proudly Nigerian hospitality brand setting new standards of luxury and convenience
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
                {/* Left Content */}
                <div className="space-y-6">
                  <h3 className="font-heading text-2xl font-bold">Who We Are</h3>
                  <p className="text-secondary-foreground/90 leading-relaxed">
                    The Willow Nest Hotel is a proudly Nigerian hospitality brand created to set a new standard of luxury and convenience. With locations in Ibadan, Ogbomosho, and Abuja, we provide personalized service, elegant accommodations, and thoughtfully designed spaces for business, leisure, and cultural exploration.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div>
                      <h4 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Our Vision
                      </h4>
                      <p className="text-sm text-secondary-foreground/80">
                        To be Nigeria's leading hotel group, offering unforgettable stays through exceptional service, modern facilities, and authentic cultural experiences.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-primary" />
                        Our Mission
                      </h4>
                      <p className="text-sm text-secondary-foreground/80">
                        We are committed to delivering comfort, convenience, and class in every detail. From our beautifully designed rooms to our state-of-the-art amenities.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Right Content - Values */}
                <div className="space-y-6">
                  <h3 className="font-heading text-2xl font-bold">Our Core Values</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Star className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">Excellence in Service</h5>
                        <p className="text-sm text-secondary-foreground/80">Personalized attention and world-class hospitality standards</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Heart className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">Authenticity and Culture</h5>
                        <p className="text-sm text-secondary-foreground/80">Rich Nigerian heritage blended with modern luxury</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">Comfort and Elegance</h5>
                        <p className="text-sm text-secondary-foreground/80">Elegantly designed spaces for ultimate relaxation</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">Innovation and Growth</h5>
                        <p className="text-sm text-secondary-foreground/80">Continuous improvement and expanding our reach</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/about">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">
                    Learn More About Our Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Guest Testimonials */}
        <section className="py-16 bg-luxury-cream">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">What Our Guests Say</h2>
              <p className="text-lg text-muted-foreground">
                Discover why travelers choose The Willow Nest Hotel for their Nigerian adventures
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-luxury">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4 italic">
                      "{testimonial.comment}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
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

        {/* Special Offers */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Special Offers & Packages
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Discover exclusive deals and create unforgettable memories with our carefully curated packages
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card className="bg-background/95 backdrop-blur-sm">
                  <CardContent className="p-6 text-left">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3">Business Traveler Package</h3>
                    <p className="text-muted-foreground mb-4">
                      Perfect for executives: Airport transfers, meeting room access, and premium Wi-Fi included.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                      <li>• Complimentary airport shuttle</li>
                      <li>• 4 hours of meeting room access</li>
                      <li>• Premium business center access</li>
                      <li>• Late checkout until 2 PM</li>
                    </ul>
                    <Button variant="luxury" className="w-full">
                      Book Business Package
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-background/95 backdrop-blur-sm">
                  <CardContent className="p-6 text-left">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3">Cultural Explorer Package</h3>
                    <p className="text-muted-foreground mb-4">
                      Immerse yourself in Nigerian culture with guided tours and authentic dining experiences.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                      <li>• Local cultural tour guide</li>
                      <li>• Traditional Nigerian breakfast</li>
                      <li>• Artisan craft workshop</li>
                      <li>• Complimentary cultural souvenirs</li>
                    </ul>
                    <Button variant="luxury" className="w-full">
                      Book Cultural Package
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading text-3xl font-bold mb-4">
                Stay Connected with The Willow Nest
              </h2>
              <p className="text-lg mb-8">
                Subscribe to receive exclusive offers, travel tips, and updates about our luxury accommodations across Nigeria.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-md border-0 text-foreground"
                />
                <Button variant="luxury" className="px-6">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-secondary-foreground/70 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
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
    </>
  );
};

export default HomePage;