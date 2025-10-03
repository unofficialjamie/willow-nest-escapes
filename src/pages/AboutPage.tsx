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
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">{whoWeAreData.title}</h2>
            <Card className="card-luxury">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {whoWeAreData.content}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-luxury-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="card-luxury">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-4 text-primary">{visionMissionData.vision_title}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {visionMissionData.vision}
                </p>
              </CardContent>
            </Card>

            <Card className="card-luxury">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-4 text-primary">{visionMissionData.mission_title}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {visionMissionData.mission}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{valuesData.title}</h2>
            <p className="text-lg text-muted-foreground">
              {valuesData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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

export default AboutPage;