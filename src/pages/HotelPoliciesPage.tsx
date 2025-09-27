import { Card, CardContent } from "@/components/ui/card";

const HotelPoliciesPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-luxury-cream">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">Hotel Policies</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Important information about our policies to ensure a pleasant stay for all guests
          </p>
        </div>
      </section>

      {/* Policies Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Check-in/Check-out */}
              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-primary">Check-In/Check-Out</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>Check-in:</strong> 2:00 PM</p>
                    <p><strong>Check-out:</strong> 12:00 PM</p>
                    <p className="text-sm">Early check-in and late check-out are subject to availability and may incur additional charges.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Cancellation Policy */}
              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-primary">Cancellation Policy</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>Free cancellation:</strong> Up to 24 hours before arrival</p>
                    <p><strong>Late cancellation:</strong> May incur charges equivalent to one night's stay</p>
                    <p className="text-sm">Cancellation policies may vary for special events and peak seasons.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Smoking Policy */}
              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-primary">Smoking Policy</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>All rooms are non-smoking</strong></p>
                    <p>Designated outdoor smoking areas are available</p>
                    <p className="text-sm">Violation of smoking policy may result in cleaning fees.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Children Policy */}
              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-primary">Children Policy</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>Children under 12:</strong> Stay free when sharing with adults</p>
                    <p><strong>Extra beds:</strong> Available upon request</p>
                    <p className="text-sm">Cribs and rollaway beds are subject to availability.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Options */}
              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-primary">Payment Options</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>• Major credit cards (Visa, MasterCard, etc.)</p>
                    <p>• Debit cards</p>
                    <p>• Bank transfers</p>
                    <p>• Cash payments in Nigerian Naira</p>
                  </div>
                </CardContent>
              </Card>

              {/* Pet Policy */}
              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-primary">Pet Policy</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>Pets are not permitted</strong> at any of our locations</p>
                    <p className="text-sm">We apologize for any inconvenience this may cause and appreciate your understanding.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Policies */}
            <Card className="card-luxury mt-8">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-6 text-primary text-center">Additional Policies</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-heading text-lg font-semibold mb-3">Security & Safety</h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Valid photo ID required at check-in</li>
                      <li>• 24/7 security surveillance</li>
                      <li>• Safe deposit boxes available</li>
                      <li>• Emergency procedures posted in all rooms</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading text-lg font-semibold mb-3">Guest Conduct</h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Quiet hours: 10 PM - 6 AM</li>
                      <li>• Respectful behavior expected</li>
                      <li>• No illegal activities permitted</li>
                      <li>• Damage to property will be charged</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading text-lg font-semibold mb-3">Amenity Usage</h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Pool and gym hours may vary</li>
                      <li>• Proper attire required in public areas</li>
                      <li>• Equipment usage at own risk</li>
                      <li>• Children must be supervised</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading text-lg font-semibold mb-3">Liability</h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Hotel not liable for personal items</li>
                      <li>• Use of facilities at own risk</li>
                      <li>• Travel insurance recommended</li>
                      <li>• Report damages immediately</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact for Questions */}
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">
                Questions about our policies? We're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:reservations@thewillowshotels.com" className="btn-luxury inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105">
                  Email Us
                </a>
                <a href="tel:+2348131111808" className="btn-outline-luxury inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelPoliciesPage;