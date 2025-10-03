import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logoFull from "@/assets/logo-full.jpg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileLocationsOpen, setIsMobileLocationsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Facilities", path: "/facilities" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  const locationItems = [
    { name: "Ibadan", path: "/locations/ibadan" },
    { name: "Abuja", path: "/locations/abuja" },
    { name: "Ogbomosho", path: "/locations/ogbomosho" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logoFull} 
              alt="The Willow Nest Hotel" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(item.path) 
                    ? "text-primary border-b-2 border-primary pb-1" 
                    : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    Locations
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-4 bg-background">
                      {locationItems.map((item) => (
                        <li key={item.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.path}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {item.name}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button variant="luxury" className="ml-4">
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-slide-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-medium transition-colors hover:text-primary px-4 py-2 ${
                    isActive(item.path) ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="px-4">
                <button
                  onClick={() => setIsMobileLocationsOpen(!isMobileLocationsOpen)}
                  className="flex items-center justify-between w-full font-medium py-2"
                >
                  <span>Locations</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMobileLocationsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileLocationsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {locationItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block py-2 text-sm font-medium hover:text-primary"
                        onClick={() => {
                          setIsOpen(false);
                          setIsMobileLocationsOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="px-4">
                <Button variant="luxury" className="w-full">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;