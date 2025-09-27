import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Star, Users, Lightbulb } from "lucide-react";
import AmenityCard from "@/components/AmenityCard";

const AboutPage = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence in Service",
      description: "We strive to exceed expectations in every guest interaction"
    },
    {
      icon: Heart,
      title: "Authenticity and Culture",
      description: "Celebrating Nigerian heritage with modern hospitality"
    },
    {
      icon: Star,
      title: "Comfort and Elegance",
      description: "Luxurious accommodations designed for your wellbeing"
    },
    {
      icon: Lightbulb,
      title: "Innovation and Growth",
      description: "Continuously evolving to serve you better"
    },
    {
      icon: Users,
      title: "Community and Sustainability",
      description: "Building lasting relationships with our communities"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-luxury-cream">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the story behind Nigeria's premier hospitality brand
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">Who We Are</h2>
            <Card className="card-luxury">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The Willow Nest Hotel is a proudly Nigerian hospitality brand created to set a new standard of luxury and convenience. With locations in Ibadan, Ogbomosho, and Abuja, we provide personalized service, elegant accommodations, and thoughtfully designed spaces for business, leisure, and cultural exploration.
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
                <h3 className="font-heading text-2xl font-bold mb-4 text-primary">Our Vision</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  To be Nigeria's leading hotel group, offering unforgettable stays through exceptional service, modern facilities, and authentic cultural experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="card-luxury">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-4 text-primary">Our Mission</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We are committed to delivering comfort, convenience, and class in every detail. From our beautifully designed rooms to our state-of-the-art amenities, we ensure each guest feels at home while enjoying the best of Nigerian hospitality.
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <AmenityCard
                key={index}
                icon={value.icon}
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
            Experience Our Hospitality
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Discover what makes The Willow Nest Hotel special. Book your stay today and become part of our story.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;