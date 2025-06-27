
import StarRating from "./StarRating";
import { Button } from "./ui/button";
import { MapPin, Users, Heart, Share2 } from "lucide-react";

interface SchoolBannerProps {
  name?: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
}

const SchoolBanner = ({ 
  name = "Colegio Albamar", 
  location = "Camino El Alba 12357, Las Condes, Santiago",
  rating = 5.0,
  reviewCount = 142
}: SchoolBannerProps) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* School Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Verificado
              </span>
            </div>
            
            <div className="flex items-center gap-6 mb-4 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">Solo Mujeres</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <StarRating rating={rating} size="lg" />
              <span className="text-gray-500">({reviewCount} reseñas)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Guardar
            </Button>
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Compartir
            </Button>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Contactar Colegio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolBanner;