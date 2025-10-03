import { Card, CardContent } from "@/components/ui/card";
import AmenityCard from "@/components/AmenityCard";
import { 
  Bed, 
  Utensils, 
  Users, 
  Dumbbell, 
  Waves, 
  Coffee, 
  Shield, 
  Wifi,
  Car,
  Phone,
  Sparkles,
  Building,
  LucideIcon
} from "lucide-react";
import { usePageSections } from "@/hooks/usePageSections";

const iconMap: Record<string, LucideIcon> = {
  Bed, Utensils, Users, Dumbbell, Waves, Coffee, Shield, Wifi, Car, Phone, Sparkles, Building
};

const FacilitiesPage = () => {
  const { sections, loading, getSectionData } = usePageSections('facilities');
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const heroData = getSectionData('hero', {});
  const facilitiesData = getSectionData('main_facilities', {});
  const additionalData = getSectionData('additional_services', {});
  const ctaData = getSectionData('cta', {});

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="py-24 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${heroData.image || ''})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white">{heroData.title}</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {heroData.description}
          </p>
        </div>
      </section>

      {/* Main Facilities */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{facilitiesData.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {facilitiesData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilitiesData.items?.map((facility: any, index: number) => (
              <AmenityCard
                key={index}
                icon={iconMap[facility.icon] || Bed}
                title={facility.title}
                description={facility.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-luxury-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">{additionalData.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {additionalData.categories?.map((category: any, index: number) => (
                <Card key={index} className="card-luxury">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-semibold mb-4 text-primary">{category.title}</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      {category.items.map((item: string, idx: number) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            {ctaData.title}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {ctaData.description}
          </p>
        </div>
      </section>
    </div>
  );
};

export default FacilitiesPage;