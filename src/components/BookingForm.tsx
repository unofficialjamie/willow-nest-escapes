import { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, Users, CalendarDays, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
interface BookingFormProps {
  className?: string;
  variant?: "default" | "hero";
  preselectedLocation?: string;
  showLocationSelector?: boolean;
}
const BookingForm = ({
  className = "",
  variant = "default",
  preselectedLocation = "",
  showLocationSelector = true
}: BookingFormProps) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [location, setLocation] = useState(preselectedLocation);
  const widgetRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (variant === "hero" && widgetRef.current) {
      // Create the widget div
      const widgetDiv = document.createElement('div');
      widgetDiv.id = 'quickbook-widget-223NTYKSXwsBVDOuDxMzk=-223NTYKSXwsBVDOuDxMzk=';
      widgetDiv.className = 'Configure-quickBook-Widget';
      
      // Create the script element
      const script = document.createElement('script');
      script.src = 'https://settings.swiftbook.io/displaywidget/preview/booking-service.min.js?propertyId=223NTYKSXwsBVDOuDxMzk=&scriptId=223NTYKSXwsBVDOuDxMzk=';
      script.id = 'propInfo';
      script.async = true;
      
      // Clear existing content and append new elements
      widgetRef.current.innerHTML = '';
      widgetRef.current.appendChild(widgetDiv);
      widgetRef.current.appendChild(script);
      
      // Cleanup function
      return () => {
        if (widgetRef.current) {
          widgetRef.current.innerHTML = '';
        }
      };
    }
  }, [variant]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || showLocationSelector && !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Booking Request Sent",
      description: "We'll contact you shortly to confirm your reservation"
    });
  };
  const cardClass = variant === "hero" ? "bg-background/95 backdrop-blur-sm shadow-luxury" : "card-luxury";

  // Horizontal layout for homepage with Quickbook widget
  if (variant === "hero") {
    return <Card className={`${cardClass} ${className} w-full mx-auto`}>
        <CardContent className="p-6">
          <div ref={widgetRef} className="quickbook-widget-wrapper min-h-[200px]"></div>
          <style>{`
            .quickbook-widget-wrapper {
              font-family: var(--font-heading) !important;
            }
            
            .quickbook-widget-wrapper * {
              border-radius: 8px !important;
            }
            
            .quickbook-widget-wrapper input,
            .quickbook-widget-wrapper select,
            .quickbook-widget-wrapper button {
              padding: 12px 16px !important;
              font-size: 14px !important;
              border: 1px solid hsl(var(--border)) !important;
              transition: all 0.3s ease !important;
            }
            
            .quickbook-widget-wrapper input:focus,
            .quickbook-widget-wrapper select:focus {
              outline: none !important;
              border-color: hsl(var(--primary)) !important;
              box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1) !important;
            }
            
            .quickbook-widget-wrapper button {
              background: hsl(var(--primary)) !important;
              color: hsl(var(--primary-foreground)) !important;
              font-weight: 600 !important;
              border: none !important;
              cursor: pointer !important;
              text-transform: uppercase !important;
              letter-spacing: 0.5px !important;
            }
            
            .quickbook-widget-wrapper button:hover {
              background: hsl(var(--primary) / 0.9) !important;
              transform: translateY(-1px) !important;
              box-shadow: 0 4px 12px hsl(var(--primary) / 0.3) !important;
            }
            
            .quickbook-widget-wrapper label {
              font-weight: 500 !important;
              color: hsl(var(--muted-foreground)) !important;
              margin-bottom: 8px !important;
              display: block !important;
              font-size: 13px !important;
              text-transform: uppercase !important;
              letter-spacing: 0.5px !important;
            }
            
            .Configure-quickBook-Widget {
              background: transparent !important;
              padding: 0 !important;
            }
          `}</style>
        </CardContent>
      </Card>;
  }

  // Vertical compact layout for location pages (no location selector)
  return <Card className={`${cardClass} ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-heading text-center">Book Your Stay</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Check-in */}
          <div className="space-y-2">
            <Label htmlFor="checkin" className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Check-in Date
            </Label>
            <Input id="checkin" type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required className="text-base p-3" />
          </div>

          {/* Check-out */}
          <div className="space-y-2">
            <Label htmlFor="checkout" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              Check-out Date
            </Label>
            <Input id="checkout" type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required className="text-base p-3" />
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Guests
            </Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="text-base p-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests</SelectItem>
                <SelectItem value="5">5 Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" variant="luxury" className="w-full">
            Check Availability
          </Button>
        </form>
      </CardContent>
    </Card>;
};
export default BookingForm;