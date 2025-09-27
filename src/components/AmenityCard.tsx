import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AmenityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const AmenityCard = ({ icon: Icon, title, description }: AmenityCardProps) => {
  return (
    <Card className="card-luxury hover-lift text-center border-none">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-heading font-semibold text-lg">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmenityCard;