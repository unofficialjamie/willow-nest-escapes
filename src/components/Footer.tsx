import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";
import logoFull from "@/assets/logo-full.jpg";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img 
              src={logoFull} 
              alt="The Willow Nest Hotel" 
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-sm text-secondary-foreground/80">
              Experience timeless elegance, modern luxury, and authentic cultural touches across Nigeria.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
              <Facebook className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/locations" className="text-sm hover:text-primary transition-colors">Locations</Link></li>
              <li><Link to="/facilities" className="text-sm hover:text-primary transition-colors">Facilities</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Our Locations</h3>
            <ul className="space-y-2">
              <li><Link to="/locations/ibadan" className="text-sm hover:text-primary transition-colors">Ibadan (81 Rooms)</Link></li>
              <li><Link to="/locations/ogbomosho" className="text-sm hover:text-primary transition-colors">Ogbomosho (34 Rooms)</Link></li>
              <li><Link to="/locations/abuja" className="text-sm hover:text-primary transition-colors">Abuja (27 Rooms)</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">+234 (0) 813 111 1808</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">reservations@thewillownest.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-secondary-foreground/60">
              © 2024 The Willow Nest Hotel. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/hotel-policies" className="text-sm hover:text-primary transition-colors">Hotel Policies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;