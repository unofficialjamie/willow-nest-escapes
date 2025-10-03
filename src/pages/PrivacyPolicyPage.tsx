import { Card, CardContent } from "@/components/ui/card";
import { usePageSections } from "@/hooks/usePageSections";

const PrivacyPolicyPage = () => {
  const { sections, loading, getSectionData } = usePageSections("privacy-policy");

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const heroData = getSectionData("hero", {
    title: "Privacy Policy",
    description: "Your privacy is important to us. Learn how we collect, use, and protect your personal information.",
    image: "/assets/hero-luxury-hotel.jpg"
  });

  const contentData = getSectionData("content", { sections: [] });

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

      {/* Privacy Policy Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="card-luxury">
              <CardContent className="p-8 space-y-8">
                {contentData.sections && contentData.sections.length > 0 ? (
                  contentData.sections.map((section: any, index: number) => (
                    <div key={index}>
                      <h2 className="font-heading text-2xl font-bold mb-4 text-primary">
                        {section.title}
                      </h2>
                      {section.description && (
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {section.description}
                        </p>
                      )}
                      {section.items && section.items.length > 0 && (
                        <ul className="space-y-2 text-muted-foreground">
                          {section.items.map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.contact && (
                        <div className="mt-4 p-4 bg-luxury-cream rounded-lg">
                          <p className="font-semibold">{section.contact.name}</p>
                          <p className="text-muted-foreground">Email: {section.contact.email}</p>
                          <p className="text-muted-foreground">Phone: {section.contact.phone}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">Privacy policy content will appear here.</p>
                )}

                {contentData.lastUpdated && (
                  <div className="text-center pt-8 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                      Last updated: {contentData.lastUpdated}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;