import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from "@/components/BookingForm";
import { MapPin, Wifi, Car, Coffee, Waves, Dumbbell, Shield, Users, Utensils, Phone, Mail, TreePine } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { usePageSections } from "@/hooks/usePageSections";
import deluxeKing from "@/assets/rooms/deluxe-king.jpg";
import executiveSuite from "@/assets/rooms/executive-suite.jpg";
import superiorTwin from "@/assets/rooms/superior-twin.jpg";
import premiumQueen from "@/assets/rooms/premium-queen.jpg";
import presidentialSuite from "@/assets/rooms/presidential-suite.jpg";
import standardDouble from "@/assets/rooms/standard-double.jpg";
import familyRoom from "@/assets/rooms/family-room.jpg";
import businessKing from "@/assets/rooms/business-king.jpg";

const iconMap: Record<string, any> = {
  Wifi, Car, Coffee, Waves, Dumbbell, Shield, Users, Utensils, Phone, Mail, MapPin, TreePine
};

const LocationOgbomoshoPage = () => {
  const { sections, loading, getSectionData } = usePageSections("location-ogbomosho");

  const rooms = [
    { image: deluxeKing, name: "Deluxe King Room", size: "35 sqm", occupancy: "2 Guests", price: "₦45,000" },
    { image: executiveSuite, name: "Executive Suite", size: "55 sqm", occupancy: "3 Guests", price: "₦85,000" },
    { image: superiorTwin, name: "Superior Twin Room", size: "32 sqm", occupancy: "2 Guests", price: "₦40,000" },
    { image: premiumQueen, name: "Premium Queen Room", size: "38 sqm", occupancy: "2 Guests", price: "₦50,000" },
    { image: presidentialSuite, name: "Presidential Suite", size: "85 sqm", occupancy: "4 Guests", price: "₦150,000" },
    { image: standardDouble, name: "Standard Double Room", size: "28 sqm", occupancy: "2 Guests", price: "₦35,000" },
    { image: familyRoom, name: "Family Room", size: "48 sqm", occupancy: "4 Guests", price: "₦65,000" },
    { image: businessKing, name: "Business King Room", size: "40 sqm", occupancy: "2 Guests", price: "₦55,000" }
  ];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const heroData = getSectionData("hero", {});
  const highlightsData = getSectionData("highlights", { items: [] });
  const galleryData = getSectionData("gallery", { items: [] });
  const amenitiesData = getSectionData("amenities", { items: [] });
  const contactData = getSectionData("contact", {});

  return (
    <>
      <title>Ogbomosho Hotel - The Willow Nest Hotel | 34 Cultural Rooms</title>
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative h-screen flex items-center text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 15, 15, 0.7), rgba(30, 15, 15, 0.5)), url(${heroData.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="max-w-2xl space-y-6">
                <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight">
                  {heroData.title}
                </h1>
                {heroData.subtitle && (
                  <h2 className="font-heading text-2xl text-white/90 font-semibold">
                    {heroData.subtitle}
                  </h2>
                )}
                <p className="text-lg text-white/80 leading-relaxed">
                  {heroData.description}
                </p>
                <Button className="bg-white hover:bg-white/90 text-black px-6 py-3 rounded-md font-semibold">
                  {heroData.ctaText}
                </Button>
              </div>
              
              <div className="absolute top-4 right-4 w-80 hidden lg:block">
                <BookingForm variant="hero" preselectedLocation="ogbomosho" showLocationSelector={false} />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        {highlightsData.items && highlightsData.items.length > 0 && (
          <section className="py-16 bg-luxury-cream">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {highlightsData.items.map((item: any, index: number) => {
                  const IconComponent = iconMap[item.icon] || MapPin;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Traditional Meets Modern Gallery */}
        {galleryData.items && galleryData.items.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  {galleryData.title || "Traditional Meets Modern"}
                </h2>
                {galleryData.description && (
                  <p className="text-lg text-muted-foreground">
                    {galleryData.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {galleryData.items.map((item: any, index: number) => (
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
        )}

        {/* Our Rooms Section */}
        <section className="py-16 bg-luxury-cream">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Our Rooms</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our selection of thoughtfully designed rooms and suites, each offering comfort, 
                style, and modern amenities for an unforgettable stay.
              </p>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {rooms.map((room, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                    <Card className="overflow-hidden h-full">
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img 
                            src={room.image} 
                            alt={room.name}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <h3 className="font-heading text-lg font-semibold mb-2">{room.name}</h3>
                          <div className="space-y-1 text-sm text-muted-foreground mb-4 flex-1">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{room.size}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{room.occupancy}</span>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">
                            View Room
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>

            <div className="text-center mt-8">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                View All Rooms
              </Button>
            </div>
          </div>
        </section>

        {/* Premium Amenities */}
        {amenitiesData.items && amenitiesData.items.length > 0 && (
          <section className="py-16 bg-luxury-cream">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  {amenitiesData.title || "Premium Amenities"}
                </h2>
                {amenitiesData.description && (
                  <p className="text-lg text-muted-foreground">
                    {amenitiesData.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {amenitiesData.items.map((amenity: any, index: number) => {
                  const IconComponent = iconMap[amenity.icon] || Users;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-heading text-lg font-semibold mb-2">{amenity.title}</h3>
                      <p className="text-sm text-muted-foreground">{amenity.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Contact Information */}
        {contactData.address && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  {contactData.title || "Visit Ogbomosho"}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    {contactData.address}
                  </p>
                </div>
                
                {contactData.phone && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">Phone</h3>
                    <p className="text-sm text-muted-foreground">
                      Call: {contactData.phone}<br/>
                      {contactData.whatsapp && `WhatsApp: ${contactData.whatsapp}`}
                    </p>
                  </div>
                )}
                
                {contactData.email && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      {contactData.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default LocationOgbomoshoPage;
