import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePageSections } from "@/hooks/usePageSections";

const HotelPoliciesPage = () => {
  const { sections, loading, getSectionData } = usePageSections("hotel-policies");

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const heroData = getSectionData("hero", {
    title: "Hotel Policies",
    description: "Important information about our policies to ensure a pleasant stay for all guests",
    image: "/assets/hero-luxury-hotel.jpg"
  });

  const policiesData = getSectionData("policies", { items: [] });
  const contactData = getSectionData("contact", {});

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="py-24 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${heroData.image})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white">
            {heroData.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {heroData.description}
          </p>
        </div>
      </section>

      {/* Policies Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {policiesData.items && policiesData.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {policiesData.items.map((policy: any, index: number) => (
                  <Card key={index} className="card-luxury">
                    <CardContent className="p-6">
                      <h3 className="font-heading text-xl font-semibold mb-4 text-primary">
                        {policy.title}
                      </h3>
                      <div className="space-y-3 text-muted-foreground">
                        {policy.items && policy.items.map((item: any, itemIndex: number) => (
                          <p key={itemIndex}>
                            {item.label && <strong>{item.label}: </strong>}
                            {item.value || item}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Hotel policies content will appear here.</p>
            )}

            {/* Contact for Questions */}
            {contactData.email && (
              <div className="text-center mt-8">
                <p className="text-muted-foreground mb-4">
                  {contactData.description || "Questions about our policies? We're here to help."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {contactData.email && (
                    <a href={`mailto:${contactData.email}`} className="btn-luxury inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105">
                      Email Us
                    </a>
                  )}
                  {contactData.phone && (
                    <a href={`tel:${contactData.phone.replace(/\s/g, '')}`} className="btn-outline-luxury inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      Call Us
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelPoliciesPage;