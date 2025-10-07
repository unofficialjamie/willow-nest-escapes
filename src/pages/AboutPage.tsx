import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Star, Users, Lightbulb, LucideIcon } from "lucide-react";
import AmenityCard from "@/components/AmenityCard";
import { usePageSections } from "@/hooks/usePageSections";

const iconMap: Record<string, LucideIcon> = {
  Award, Heart, Star, Users, Lightbulb
};

const AboutPage = () => {
  const { sections, loading, getSectionData } = usePageSections('about');
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const heroData = getSectionData('hero', {});
  const whoWeAreData = getSectionData('who_we_are', {});
  const visionMissionData = getSectionData('vision_mission', {});
  const valuesData = getSectionData('values', {});
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

      {/* Who We Are */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">{whoWeAreData.title}</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img 
                  src={whoWeAreData.image || '/assets/hero-luxury-hotel.jpg'} 
                  alt="About Us"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {whoWeAreData.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-luxury-cream">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-luxury overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={visionMissionData.vision_image || '/assets/facility-rooftop.jpg'} 
                  alt="Our Vision"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold mb-3 text-primary">{visionMissionData.vision_title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {visionMissionData.vision}
                </p>
              </CardContent>
            </Card>

            <Card className="card-luxury overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={visionMissionData.mission_image || '/assets/facility-conference.jpg'} 
                  alt="Our Mission"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold mb-3 text-primary">{visionMissionData.mission_title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {visionMissionData.mission}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">{valuesData.title}</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {valuesData.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {valuesData.items?.map((value: any, index: number) => (
              <AmenityCard
                key={index}
                icon={iconMap[value.icon] || Star}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
            {ctaData.title}
          </h2>
          <p className="text-base max-w-2xl mx-auto">
            {ctaData.description}
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;