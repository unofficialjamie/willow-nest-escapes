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
        <CardContent className="p-4">
          <div ref={widgetRef} className="min-h-[200px]"></div>
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