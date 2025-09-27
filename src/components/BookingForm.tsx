import { useState } from "react";
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { toast } = useToast();
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

  // Horizontal layout for homepage
  if (variant === "hero") {
    return <Card className={`${cardClass} ${className} w-full mx-auto`}>
        <CardContent className="p-4">
          {/* Desktop Layout - unchanged */}
          <div className="hidden lg:block">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
                {/* Location */}
                {showLocationSelector && <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      Location
                    </Label>
                    <Select value={location} onValueChange={setLocation} required>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Find location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ibadan">Ibadan (81 Rooms)</SelectItem>
                        <SelectItem value="ogbomosho">Ogbomosho (34 Rooms)</SelectItem>
                        <SelectItem value="abuja">Abuja (27 Rooms)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>}

                {/* Check-in and Check-out Date */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Check-in and Check-out Date
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required className="h-12 text-base" placeholder="Check-in" />
                    <Input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required className="h-12 text-base" placeholder="Check-out" />
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Guests
                  </Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="1 Guest" />
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
              </div>

              {/* Search Button */}
              <div className="flex justify-end pt-2">
                <Button type="submit" className="px-8 bg-black text-white hover:bg-gray-800">
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Mobile Layout - collapsible */}
          <div className="lg:hidden">
            <Collapsible open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex items-center justify-between">
                  {/* Always visible location on mobile */}
                  {showLocationSelector && (
                    <div className="flex-1 space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        Location
                      </Label>
                      <Select value={location} onValueChange={setLocation} required>
                        <SelectTrigger className="h-10 text-sm">
                          <SelectValue placeholder="Find location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ibadan">Ibadan (81 Rooms)</SelectItem>
                          <SelectItem value="ogbomosho">Ogbomosho (34 Rooms)</SelectItem>
                          <SelectItem value="abuja">Abuja (27 Rooms)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="ml-2">
                      {isMobileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="space-y-3">
                  {/* Check-in Date */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Check-in Date
                    </Label>
                    <Input 
                      type="date" 
                      value={checkIn} 
                      onChange={e => setCheckIn(e.target.value)} 
                      required 
                      className="h-10 text-sm" 
                    />
                  </div>

                  {/* Check-out Date */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      Check-out Date
                    </Label>
                    <Input 
                      type="date" 
                      value={checkOut} 
                      onChange={e => setCheckOut(e.target.value)} 
                      required 
                      className="h-10 text-sm" 
                    />
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Guests
                    </Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger className="h-10 text-sm">
                        <SelectValue placeholder="1 Guest" />
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

                  {/* Search Button */}
                  <div className="flex justify-end pt-2">
                    <Button type="submit" className="px-8 bg-black text-white hover:bg-gray-800">
                      Search
                    </Button>
                  </div>
                </CollapsibleContent>
              </form>
            </Collapsible>
          </div>
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