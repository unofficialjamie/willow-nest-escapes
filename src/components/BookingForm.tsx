import { useState } from "react";
import { Calendar, MapPin, Users, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [currentStep, setCurrentStep] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [location, setLocation] = useState(preselectedLocation);
  const { toast } = useToast();

  const steps = [
    { label: "Check-in", field: "checkIn" },
    { label: "Check-out", field: "checkOut" },
    ...(showLocationSelector ? [{ label: "Location", field: "location" }] : []),
    { label: "Guests", field: "guests" }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut || (showLocationSelector && !location)) {
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

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.field) {
      case "checkIn":
        return (
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
              className="text-lg p-4"
            />
          </div>
        );
      case "checkOut":
        return (
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
              className="text-lg p-4"
            />
          </div>
        );
      case "location":
        return (
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Location
            </Label>
            <Select value={location} onValueChange={setLocation} required>
              <SelectTrigger className="text-lg p-4">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ibadan">Ibadan (81 Rooms)</SelectItem>
                <SelectItem value="ogbomosho">Ogbomosho (34 Rooms)</SelectItem>
                <SelectItem value="abuja">Abuja (27 Rooms)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "guests":
        return (
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Guests
            </Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="text-lg p-4">
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
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`${cardClass} ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-heading text-center">Book Your Stay</CardTitle>
        {/* Step Indicator */}
        <div className="flex justify-center space-x-2 mt-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-colors ${
                index === currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Step Content */}
          <div className="min-h-[120px] flex items-center">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            {currentStep === steps.length - 1 ? (
              <Button type="submit" variant="luxury" className="flex items-center gap-2">
                Check Availability
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                variant="luxury"
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;