import { useState } from "react";
import { Calendar, MapPin, Users, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface BookingFormProps {
  className?: string;
  variant?: "default" | "hero";
}

const BookingForm = ({ className = "", variant = "default" }: BookingFormProps) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [location, setLocation] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Request Sent",
      description: "We'll contact you shortly to confirm your reservation",
    });
  };

  const cardClass = variant === "hero" ? "bg-background/95 backdrop-blur-sm shadow-luxury" : "card-luxury";

  return (
    <Card className={`${cardClass} ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-heading text-center">Book Your Stay</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Check-in Date */}
            <div className="space-y-2">
              <Label htmlFor="checkin" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Check-in Date
              </Label>
              <Input
                id="checkin"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>

            {/* Check-out Date */}
            <div className="space-y-2">
              <Label htmlFor="checkout" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                Check-out Date
              </Label>
              <Input
                id="checkout"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Location
              </Label>
              <Select value={location} onValueChange={setLocation} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ibadan">Ibadan (81 Rooms)</SelectItem>
                  <SelectItem value="ogbomosho">Ogbomosho (34 Rooms)</SelectItem>
                  <SelectItem value="abuja">Abuja (27 Rooms)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Guests
              </Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                  <SelectItem value="5">5+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" variant="luxury">
            Check Availability
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;