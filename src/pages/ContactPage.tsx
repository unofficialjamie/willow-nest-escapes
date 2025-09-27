import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      subject: "",
      message: ""
    });
  };

  const locations = [
    {
      name: "Head Office",
      email: "reservations@thewillowshotels.com",
      phone: "+234 (0) 813 111 1808",
      address: "Nigeria"
    },
    {
      name: "Ibadan Branch",
      email: "reservations.ib@thewillowshotels.com",
      phone: "+234 (0) 813 111 1808",
      address: "Ibadan, Oyo State"
    },
    {
      name: "Ogbomosho Branch", 
      email: "reservations.ogb@thewillowshotels.com",
      phone: "+234 (0) 813 111 1808",
      address: "Ogbomosho, Oyo State"
    },
    {
      name: "Abuja Branch",
      email: "reservations.abj@thewillowshotels.com",
      phone: "+234 (0) 813 111 1808",
      address: "Garki, Abuja"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-luxury-cream">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with us for reservations, inquiries, or any assistance you need
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Location</Label>
                      <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ibadan">Ibadan</SelectItem>
                          <SelectItem value="ogbomosho">Ogbomosho</SelectItem>
                          <SelectItem value="abuja">Abuja</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full btn-luxury">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            {locations.map((location, index) => (
              <Card key={index} className="card-luxury">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-primary">
                    {location.name}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>{location.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>{location.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>{location.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Social Media */}
            <Card className="card-luxury">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-4 text-primary">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <Instagram className="h-6 w-6 text-primary hover:text-primary-glow cursor-pointer transition-colors" />
                  <Facebook className="h-6 w-6 text-primary hover:text-primary-glow cursor-pointer transition-colors" />
                  <Linkedin className="h-6 w-6 text-primary hover:text-primary-glow cursor-pointer transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Stay connected with us for updates, special offers, and behind-the-scenes content.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;