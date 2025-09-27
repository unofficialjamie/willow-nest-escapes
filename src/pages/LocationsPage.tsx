import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Star } from "lucide-react";
import roomImage from "@/assets/room-elegant.jpg";
import poolImage from "@/assets/pool-area.jpg";
import restaurantImage from "@/assets/restaurant.jpg";

const LocationsPage = () => {
  const locations = [
    {
      id: 'ibadan',
      name: 'Ibadan',
      subtitle: 'The Willow Nest (81 Rooms)',
      description: 'Located in the heart of Ibadan, this branch is our largest property, offering 81 well-appointed rooms with contemporary designs and premium amenities.',
      image: roomImage,
      highlights: [
        'Rooftop lounge with panoramic city views',
        'Multiple dining options, including local and international cuisine',
        'Spacious conference halls and meeting rooms',
        'Fitness center and spa services',
        'Outdoor swimming pool with poolside service'
      ]
    },
    {
      id: 'ogbomosho',
      name: 'Ogbomosho',
      subtitle: 'The Willow Nest (34 Rooms)',
      description: 'Nestled in the historic city of Ogbomosho, Oyo State, this branch blends traditional architecture with modern comfort. With 34 rooms, it offers a more intimate setting perfect for cultural travelers and business guests.',
      image: poolImage,
      highlights: [
        'Locally inspired interiors showcasing Oyo craftsmanship',
        'Garden terrace for relaxation and dining',
        'Authentic Yoruba and Nigerian cuisine at the restaurant',
        'Cozy conference and event spaces',
        'Fitness center and pool facilities'
      ]
    },
    {
      id: 'abuja',
      name: 'Abuja',
      subtitle: 'The Willow Nest (27 Rooms)',
      description: 'Located in Garki, Abuja, this property offers 27 elegant rooms tailored for business executives and leisure travelers. Its central location makes it ideal for accessing government buildings, embassies, and major attractions.',
      image: restaurantImage,
      highlights: [
        'Minutes from Nnamdi Azikiwe International Airport',
        'Premium fine dining restaurant',
        'Modern business and meeting facilities',
        'Outdoor pool and fitness center',
        'Exclusive concierge and 24/7 security'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-luxury-cream">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">Our Locations</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three distinctive properties across Nigeria, each offering unique experiences while maintaining our commitment to excellence
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {locations.map((location, index) => (
              <div key={location.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}>
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative overflow-hidden rounded-xl shadow-elegant hover-lift">
                    <img 
                      src={location.image} 
                      alt={location.name}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">{location.name}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">{location.subtitle}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">{location.description}</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-heading text-xl font-semibold flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Highlights
                    </h3>
                    <ul className="space-y-2">
                      {location.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to={`/locations/${location.id}`}>
                      <Button className="btn-luxury">
                        Explore {location.name}
                      </Button>
                    </Link>
                    <Button variant="outline">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Choose Your Perfect Location
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Each of our properties offers a unique experience while maintaining the highest standards of luxury and service.
          </p>
          <Button size="lg" className="btn-luxury">
            Make a Reservation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LocationsPage;