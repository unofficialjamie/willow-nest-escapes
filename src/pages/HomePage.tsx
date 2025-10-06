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
  Heart,
  LucideIcon
} from "lucide-react";
import { usePageSections } from "@/hooks/usePageSections";

// Icon mapping helper
const iconMap: Record<string, LucideIcon> = {
  Wifi, Car, Coffee, Waves, Dumbbell, Shield, Users, Utensils, MapPin, Star, Award, Heart
};

const HomePage = () => {
  const { sections, loading, getSectionData } = usePageSections('home');
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Get section data
  const heroData = getSectionData('hero', {});
  const highlightsData = getSectionData('highlights', {});
  const facilitiesData = getSectionData('facilities', {});
  const locationsData = getSectionData('locations', {});
  const aboutData = getSectionData('about', {});
  const testimonialsData = getSectionData('testimonials', {});
  const amenitiesData = getSectionData('amenities', {});
  const offersData = getSectionData('special_offers', {});
  const newsletterData = getSectionData('newsletter', {});
  const ctaData = getSectionData('cta', {});

  return (
    <>
      {/* SEO Meta Tags */}
      <title>The Willow Nest Hotel - Luxury Hotels in Nigeria | Ibadan, Ogbomosho, Abuja</title>
      
      <div className="min-h-screen">
        {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-white hero-gradient"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 15, 15, 0.7), rgba(30, 15, 15, 0.5)), url(${heroData.image || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight">
              {heroData.title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/90">
              {heroData.subtitle}
            </p>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {heroData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 -mb-8">
              <Button size="lg" variant="luxury" className="text-lg px-8 py-6">
                {heroData.cta_primary}
              </Button>
              <Button variant="outline-luxury" size="lg" className="text-lg px-8 py-6">
                {heroData.cta_secondary}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Booking Form Overlay */}
        <div className="absolute -bottom-12 md:-bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-7xl px-4">
          <BookingForm variant="hero" showLocationSelector={true} />
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="py-16 pt-24 md:pt-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {highlightsData.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {highlightsData.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {highlightsData.items?.map((highlight: any, index: number) => {
              // Check if icon is an image URL or icon name
              const isImageUrl = highlight.icon && (highlight.icon.startsWith('http') || highlight.icon.startsWith('/') || highlight.icon.startsWith('data:'));
              const IconComponent = !isImageUrl && iconMap[highlight.icon] ? iconMap[highlight.icon] : null;
              
              return (
                <Card key={index} className="card-luxury p-6 text-center hover-lift">
                  <div className="mb-4 flex justify-center">
                    {isImageUrl ? (
                      <img src={highlight.icon} alt="" className="w-12 h-12 object-contain" />
                    ) : IconComponent ? (
                      <IconComponent className="h-12 w-12 text-primary" />
                    ) : (
                      <MapPin className="h-12 w-12 text-primary" />
                    )}
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
        </section>

        {/* Featured Facilities */}
        <section className="py-16 bg-luxury-cream">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{facilitiesData.title}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {facilitiesData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {facilitiesData.items?.map((facility: any, index: number) => (
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
                        {facility.features.map((feature: string, idx: number) => (
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
              <Link to={facilitiesData.cta_link || "/facilities"}>
                <Button variant="luxury" size="lg">
                  {facilitiesData.cta_text}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Our Locations */}
      <section className="py-16 bg-luxury-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{locationsData.title}</h2>
            <p className="text-lg text-muted-foreground">
              {locationsData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locationsData.items?.map((location: any, index: number) => (
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
                  {aboutData.title}
                </h2>
                <p className="text-xl text-secondary-foreground/90 leading-relaxed mb-8">
                  {aboutData.subtitle}
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
                {/* Left Content */}
                <div className="space-y-6">
                  <h3 className="font-heading text-2xl font-bold">Who We Are</h3>
                  <p className="text-secondary-foreground/90 leading-relaxed">
                    {aboutData.who_we_are}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div>
                      <h4 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Our Vision
                      </h4>
                      <p className="text-sm text-secondary-foreground/80">
                        {aboutData.vision}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-primary" />
                        Our Mission
                      </h4>
                      <p className="text-sm text-secondary-foreground/80">
                        {aboutData.mission}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Right Content - Values */}
                <div className="space-y-6">
                  <h3 className="font-heading text-2xl font-bold">Our Core Values</h3>
                  
                  <div className="space-y-4">
                    {aboutData.values?.map((value: any, index: number) => {
                      // Check if icon is an image URL or icon name
                      const isImageUrl = value.icon && (value.icon.startsWith('http') || value.icon.startsWith('/') || value.icon.startsWith('data:'));
                      const IconComponent = !isImageUrl && iconMap[value.icon] ? iconMap[value.icon] : null;
                      
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            {isImageUrl ? (
                              <img src={value.icon} alt="" className="w-4 h-4 object-contain" />
                            ) : IconComponent ? (
                              <IconComponent className="h-4 w-4 text-primary" />
                            ) : (
                              <Star className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div>
                            <h5 className="font-semibold mb-1">{value.title}</h5>
                            <p className="text-sm text-secondary-foreground/80">{value.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link to={aboutData.cta_link || "/about"}>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">
                    {aboutData.cta_text}
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{testimonialsData.title}</h2>
              <p className="text-lg text-muted-foreground">
                {testimonialsData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonialsData.items?.map((testimonial: any, index: number) => (
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{amenitiesData.title}</h2>
              <p className="text-lg text-muted-foreground">
                {amenitiesData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {amenitiesData.items?.map((amenity: any, index: number) => {
                // Check if icon is an image URL or icon name
                const isImageUrl = amenity.icon && (amenity.icon.startsWith('http') || amenity.icon.startsWith('/') || amenity.icon.startsWith('data:'));
                const IconComponent = !isImageUrl && iconMap[amenity.icon] ? iconMap[amenity.icon] : null;
                
                return (
                  <Card key={index} className="card-luxury p-6 text-center hover-lift">
                    <div className="mb-4 flex justify-center">
                      {isImageUrl ? (
                        <img src={amenity.icon} alt="" className="w-12 h-12 object-contain" />
                      ) : IconComponent ? (
                        <IconComponent className="h-12 w-12 text-primary" />
                      ) : (
                        <Wifi className="h-12 w-12 text-primary" />
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{amenity.title}</h3>
                    <p className="text-sm text-muted-foreground">{amenity.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Special Offers */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                {offersData.title}
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                {offersData.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {offersData.packages?.map((pkg: any, index: number) => (
                  <Card key={index} className="bg-background/95 backdrop-blur-sm">
                    <CardContent className="p-6 text-left">
                      <h3 className="font-heading text-xl font-bold text-foreground mb-3">{pkg.title}</h3>
                      <p className="text-muted-foreground mb-4">
                        {pkg.description}
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                        {pkg.features.map((feature: string, idx: number) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                      <Button variant="luxury" className="w-full">
                        {pkg.cta}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading text-3xl font-bold mb-4">
                {newsletterData.title}
              </h2>
              <p className="text-lg mb-8">
                {newsletterData.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-md border-0 text-foreground"
                />
                <Button variant="luxury" className="px-6">
                  {newsletterData.cta}
                </Button>
              </div>
              <p className="text-sm text-secondary-foreground/70 mt-4">
                {newsletterData.privacy_text}
              </p>
            </div>
          </div>
        </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {ctaData.title}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {ctaData.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="luxury" className="text-lg px-8 py-4">
              {ctaData.cta_primary}
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">
              {ctaData.cta_secondary}
            </Button>
          </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;