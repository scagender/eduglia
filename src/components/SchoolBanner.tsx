
import { MapPin, Users, GraduationCap, Award } from "lucide-react";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";

const SchoolBanner = () => {
  return (
    <div className="bg-white shadow-sm border-b p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Colegio Albamar
              </h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Privado
              </span>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Concón, Chile - V Región</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Users className="w-4 h-4" />
                <span>Femenino</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <GraduationCap className="w-4 h-4" />
                <span>Católico</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <StarRating rating={4.7} />
                <span className="text-sm text-gray-600">(142 reseñas)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:min-w-[200px]">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Solicitar Información
            </Button>
            <Button variant="outline" className="w-full">
              Agendar Visita
            </Button>
            <Button variant="ghost" className="w-full text-blue-600">
              Ver Precios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolBanner;
