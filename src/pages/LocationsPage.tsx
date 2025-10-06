import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Star } from "lucide-react";
import { usePageSections } from "@/hooks/usePageSections";

const LocationsPage = () => {
  const { sections, loading, getSectionData } = usePageSections('locations');
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const heroData = getSectionData('hero', {});
  const locationsData = getSectionData('locations_list', { items: [] });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="py-24 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${heroData.image || ''})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white">{heroData.title || 'Our Locations'}</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {heroData.description || 'Three distinctive properties across Nigeria'}
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {locationsData.items?.map((location: any, index: number) => (
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
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">{location.subtitle || location.name}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">{location.description}</p>
                  </div>

                  {location.highlights && location.highlights.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        Highlights
                      </h3>
                      <ul className="space-y-2">
                        {location.highlights.map((highlight: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

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