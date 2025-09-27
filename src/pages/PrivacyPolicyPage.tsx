import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-luxury-hotel.jpg";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="py-24 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white">Privacy Policy</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="card-luxury">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="font-heading text-2xl font-bold mb-4 text-primary">Our Commitment to Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your privacy is important to us. The Willow Nest Hotel collects only the information necessary to process bookings, provide services, and enhance guest experiences. We do not share personal information with third parties except where required by law.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold mb-4 text-primary">Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Information collected may include:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Name, email, and phone number during booking process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Payment details for reservations and services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Preferences and special requirements to personalize your stay</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Communication history for service improvement</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold mb-4 text-primary">How We Use Your Information</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Processing and confirming your reservations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Providing personalized services during your stay</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Sending important updates about your booking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Improving our services based on feedback and preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Complying with legal and regulatory requirements</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold mb-4 text-primary">Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use secure technology to safeguard your data and ensure confidentiality at all times. Our security measures include encrypted data transmission, secure servers, and regular security audits. Access to personal information is limited to authorized personnel only.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold mb-4 text-primary">Data Sharing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell, trade, or rent your personal information to third parties. Information may only be shared with trusted service providers who assist in operating our business, or as required by law enforcement or legal proceedings.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold mb-4 text-primary">Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Access your personal information we hold</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Request corrections to your personal data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Request deletion of your personal information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Opt-out of marketing communications</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold mb-4 text-primary">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-luxury-cream rounded-lg">
                    <p className="font-semibold">The Willow Nest Hotel</p>
                    <p className="text-muted-foreground">Email: privacy@thewillowshotels.com</p>
                    <p className="text-muted-foreground">Phone: +234 (0) 813 111 1808</p>
                  </div>
                </div>

                <div className="text-center pt-8 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    Last updated: December 2024
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;