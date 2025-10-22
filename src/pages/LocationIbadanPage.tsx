import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Wifi, Car, Coffee, Waves, Dumbbell, Shield, Users, Utensils, Phone, Mail } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { usePageSections } from "@/hooks/usePageSections";
import { supabase } from "@/integrations/supabase/client";
import deluxeKing from "@/assets/rooms/deluxe-king.jpg";
import executiveSuite from "@/assets/rooms/executive-suite.jpg";
import superiorTwin from "@/assets/rooms/superior-twin.jpg";
import premiumQueen from "@/assets/rooms/premium-queen.jpg";
import presidentialSuite from "@/assets/rooms/presidential-suite.jpg";
import standardDouble from "@/assets/rooms/standard-double.jpg";
import familyRoom from "@/assets/rooms/family-room.jpg";
import businessKing from "@/assets/rooms/business-king.jpg";

const iconMap: Record<string, any> = {
  Wifi, Car, Coffee, Waves, Dumbbell, Shield, Users, Utensils, Phone, Mail, MapPin
};

const roomImageMap: Record<string, string> = {
  "deluxe-king": deluxeKing,
  "executive-suite": executiveSuite,
  "superior-twin": superiorTwin,
  "premium-queen": premiumQueen,
  "presidential-suite": presidentialSuite,
  "standard-double": standardDouble,
  "family-room": familyRoom,
  "business-king": businessKing
};

const LocationIbadanPage = () => {
  const { sections, loading, getSectionData } = usePageSections("location-ibadan");
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    // Add styles to head
    const style = document.createElement('style');
    style.id = 'quickbook-widget-styles-ibadan';
    style.innerHTML = `
      .Configure-quickBook-Widget * {
        max-width: 100vw !important;
      }
      
      .Configure-quickBook-Widget [class*="calendar"],
      .Configure-quickBook-Widget [class*="date-picker"],
      .Configure-quickBook-Widget [class*="dropdown"],
      .Configure-quickBook-Widget [class*="popup"],
      .Configure-quickBook-Widget [class*="popover"] {
        position: fixed !important;
        max-width: calc(100vw - 2rem) !important;
        max-height: calc(100vh - 2rem) !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        z-index: 9999 !important;
        overflow: auto !important;
      }
      
      @media (min-width: 768px) {
        .Configure-quickBook-Widget [class*="calendar"],
        .Configure-quickBook-Widget [class*="date-picker"],
        .Configure-quickBook-Widget [class*="dropdown"],
        .Configure-quickBook-Widget [class*="popup"],
        .Configure-quickBook-Widget [class*="popover"] {
          position: absolute !important;
          left: auto !important;
          transform: none !important;
        }
      }
    `;
    
    // Defer widget loading until page is fully loaded
    const loadWidget = () => {
      document.head.appendChild(style);

      // Optimized widget initialization with retry limit
      let retryCount = 0;
      const maxRetries = 50;
      
      const initWidget = () => {
        if (!widgetRef.current) {
          retryCount++;
          if (retryCount < maxRetries) {
            setTimeout(initWidget, 200);
          }
          return;
        }

        const widgetDiv = document.createElement('div');
        widgetDiv.id = 'quickbook-widget-223NTYKSXwsBVDOuDxMzk=-223NTYKSXwsBVDOuDxMzk=';
        widgetDiv.className = 'Configure-quickBook-Widget';
        widgetRef.current.appendChild(widgetDiv);

        const script = document.createElement('script');
        script.src = 'https://settings.swiftbook.io/displaywidget/preview/booking-service.min.js?propertyId=223NTYKSXwsBVDOuDxMzk=&scriptId=223NTYKSXwsBVDOuDxMzk=';
        script.id = 'propInfo-ibadan';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      };

      // Delay initial widget load to improve perceived performance
      setTimeout(initWidget, 100);
    };

    // Wait for page to fully load before initializing widget
    if (document.readyState === 'complete') {
      setTimeout(loadWidget, 1500);
    } else {
      window.addEventListener('load', () => setTimeout(loadWidget, 1500));
    }
    
    return () => {
      const existingStyle = document.getElementById('quickbook-widget-styles-ibadan');
      if (existingStyle) existingStyle.remove();
      
      const existingScript = document.getElementById('propInfo-ibadan');
      if (existingScript) existingScript.remove();
    };
  }, []);

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("location", "ibadan")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .limit(8);

    if (!error && data) {
      const roomsWithImages = data.map(room => {
        const imageKey = room.image_url?.split('/').pop()?.replace('.jpg', '') || '';
        return {
          ...room,
          image: roomImageMap[imageKey] || room.image_url || deluxeKing
        };
      });
      setRooms(roomsWithImages);
    }
    setRoomsLoading(false);
  };

  if (loading || roomsLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const heroData = getSectionData("hero", {});
  const legacyData = getSectionData("legacy", {});
  const galleryData = getSectionData("gallery", { items: [] });
  const amenitiesData = getSectionData("amenities", { items: [] });
  const contactData = getSectionData("contact", {});

  return (
    <>
      <title>Ibadan Hotel - The Willow Nest Hotel | 81 Premium Rooms</title>
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative h-screen flex flex-col justify-between text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 15, 15, 0.7), rgba(30, 15, 15, 0.5)), url(${heroData.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4 flex-1 flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight">
                {heroData.title}
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                {heroData.description}
              </p>
              <div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-md font-semibold">
                  {heroData.ctaText}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 pb-8">
            <div ref={widgetRef} className="min-h-[100px] max-w-[1000px] mx-auto hidden md:block"></div>
          </div>
        </section>

        {/* Legacy of Excellence Section */}
        {legacyData.title && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                    {legacyData.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {legacyData.description}
                  </p>
                  
                  {legacyData.highlights && (
                    <div className="space-y-4">
                      {legacyData.highlights.map((highlight: string, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {legacyData.ctaText && (
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-semibold">
                      {legacyData.ctaText}
                    </Button>
                  )}
                </div>
                
                {legacyData.image && (
                  <div className="w-full lg:w-1/2">
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src={legacyData.image} 
                        alt={legacyData.imageCaption || "Hotel image"}
                        loading="lazy"
                        className="w-full h-96 object-cover"
                      />
                      {legacyData.imageCaption && (
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="font-heading text-xl font-bold mb-2">{legacyData.imageCaption}</h3>
                          {legacyData.imageDescription && (
                            <p className="text-white/90">{legacyData.imageDescription}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {galleryData.items.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryData.items.map((item: any, index: number) => (
                  <div key={index} className="relative overflow-hidden rounded-lg aspect-square hover-lift">
                    <img 
                      src={item.image} 
                      alt={item.alt || item.title || "Gallery image"}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
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

            {rooms.length > 0 ? (
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {rooms.map((room, index) => (
                    <CarouselItem key={room.id || index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                      <Card className="overflow-hidden h-full">
                        <CardContent className="p-0 flex flex-col h-full">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img 
                              src={room.image} 
                              alt={room.name}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-heading text-lg font-semibold mb-2">{room.name}</h3>
                            <div className="space-y-1 text-sm text-muted-foreground mb-4 flex-1">
                              {room.size && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{room.size}</span>
                                </div>
                              )}
                              {room.occupancy && (
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  <span>{room.occupancy}</span>
                                </div>
                              )}
                              {room.description && (
                                <p className="text-xs line-clamp-2">{room.description}</p>
                              )}
                            </div>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => room.button_link && window.open(room.button_link, '_blank')}
                              disabled={!room.button_link}
                            >
                              {room.button_link ? 'View Details' : 'View Room'}
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
            ) : (
              <p className="text-center text-muted-foreground">No rooms available at this location.</p>
            )}

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
                  {contactData.title || "Ready to Experience Ibadan?"}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">Location</h3>
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
                      Call: {contactData.phone}
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

export default LocationIbadanPage;
