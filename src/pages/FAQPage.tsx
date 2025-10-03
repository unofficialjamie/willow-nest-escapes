import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePageSections } from "@/hooks/usePageSections";

const FAQPage = () => {
  const { sections, loading, getSectionData } = usePageSections('faq');
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const heroData = getSectionData('hero', {});
  const faqsData = getSectionData('faqs', {});
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

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="card-luxury">
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqsData.items?.map((faq: any, index: number) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                      <AccordionTrigger className="font-heading text-left hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-luxury-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">{ctaData.title}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {ctaData.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`mailto:${ctaData.email}`} className="btn-luxury inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105">
              Email Us
            </a>
            <a href={`tel:${ctaData.phone}`} className="btn-outline-luxury inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;