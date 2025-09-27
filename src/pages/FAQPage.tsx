import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@/assets/hero-luxury-hotel.jpg";

const FAQPage = () => {
  const faqs = [
    {
      question: "What time is check-in and check-out?",
      answer: "Check-in starts at 2:00 PM and check-out is at 12:00 PM. Early check-in and late check-out may be available upon request, subject to availability."
    },
    {
      question: "Do you offer airport shuttle services?",
      answer: "Yes, shuttle services are available at selected branches. Please contact the front desk to arrange transportation. Additional charges may apply."
    },
    {
      question: "Are pets allowed?",
      answer: "Currently, pets are not permitted at any of our locations. We apologize for any inconvenience this may cause."
    },
    {
      question: "Do you host weddings and events?",
      answer: "Yes, we offer event spaces and banquet halls for weddings, conferences, and private events. Our dedicated events team can help you plan the perfect celebration."
    },
    {
      question: "Is parking available?",
      answer: "Yes, we provide complimentary valet and self-parking across all branches. Parking is available on a first-come, first-served basis."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards, debit cards, and bank transfers. Cash payments are also accepted in Nigerian Naira."
    },
    {
      question: "Do you offer room service?",
      answer: "Yes, we provide 24/7 room service at all our locations. Our extensive menu features both local and international cuisine."
    },
    {
      question: "Is Wi-Fi available?",
      answer: "Complimentary high-speed Wi-Fi is available throughout all our properties, including guest rooms, public areas, and business facilities."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Free cancellation up to 24 hours before arrival. Later cancellations may incur charges equivalent to one night's stay."
    },
    {
      question: "Do you have fitness facilities?",
      answer: "Yes, all our locations feature fully equipped fitness centers with modern equipment. Some locations also offer personal training services."
    },
    {
      question: "Can you arrange local tours and activities?",
      answer: "Our concierge team can help arrange local tours, cultural experiences, and activities. We're happy to help you explore the best of each destination."
    },
    {
      question: "Do you offer conference facilities?",
      answer: "Yes, we have modern conference halls and meeting rooms equipped with audio-visual technology at all locations. Perfect for business meetings and corporate events."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="py-24 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Find answers to common questions about our services, policies, and amenities
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
                  {faqs.map((faq, index) => (
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
          <h2 className="font-heading text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our friendly staff is always ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:reservations@thewillowshotels.com" className="btn-luxury inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105">
              Email Us
            </a>
            <a href="tel:+2348131111808" className="btn-outline-luxury inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;