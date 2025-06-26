
import { useState } from "react";
import { MapPin, Users, GraduationCap, ArrowLeft, Filter, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "@/components/StarRating";
import SearchMap from "@/components/SearchMap";
import { Link, useSearchParams } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data for demonstration
const mockSchools = [
  {
    id: "albamar",
    name: "Colegio Albamar",
    type: "Privado",
    location: "Concón, Chile - V Región",
    gender: "Femenino",
    religion: "Católico",
    rating: 4.7,
    reviewCount: 142,
    image: "/placeholder.svg",
    description: "El Colegio Albamar busca la formación integral de sus alumnas, desarrollando al máximo sus capacidades intelectuales, humanas y espirituales, en un ambiente de libertad responsable y alegría.",
    distance: "2.3 km"
  },
  {
    id: "san-patricio",
    name: "Colegio San Patricio",
    type: "Privado",
    location: "Las Condes, Santiago",
    gender: "Mixto",
    religion: "Católico",
    rating: 4.5,
    reviewCount: 98,
    image: "/placeholder.svg",
    description: "Institución educativa comprometida con la excelencia académica y la formación en valores cristianos, ofreciendo una educación integral para el desarrollo pleno de nuestros estudiantes.",
    distance: "3.7 km"
  },
  {
    id: "villa-maria",
    name: "Colegio Villa María",
    type: "Privado",
    location: "Providencia, Santiago",
    gender: "Femenino",
    religion: "Católico",
    rating: 4.8,
    reviewCount: 156,
    image: "/placeholder.svg",
    description: "Educación de calidad centrada en la formación integral de la mujer, promoviendo el desarrollo académico, personal y espiritual en un ambiente de respeto y excelencia.",
    distance: "4.1 km"
  },
  {
    id: "los-andes",
    name: "Colegio Los Andes",
    type: "Privado",
    location: "Vitacura, Santiago",
    gender: "Masculino",
    religion: "Laico",
    rating: 4.6,
    reviewCount: 134,
    image: "/placeholder.svg",
    description: "Colegio que busca formar hombres íntegros, líderes con visión global y compromiso social, a través de una educación académica rigurosa y formación en valores universales.",
    distance: "5.2 km"
  }
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("relevancia");
  const [showMap, setShowMap] = useState(false);
  const isMobile = useIsMobile();
  const address = searchParams.get("direccion") || "";
  const range = searchParams.get("rango") || "10";

  const getSortedSchools = () => {
    let sorted = [...mockSchools];
    switch (sortBy) {
      case "distancia":
        sorted.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      case "calificacion":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default: // relevancia
        break;
    }
    return sorted;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Colegios cerca de "{address}"</h1>
              <p className="text-sm text-gray-600">Radio de búsqueda: {range} km</p>
            </div>
            {/* Mobile toggle button */}
            {isMobile && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowMap(!showMap)}
                className="flex items-center gap-2"
              >
                <Map className="w-4 h-4" />
                {showMap ? "Ver colegios" : "Ver mapa"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex h-[calc(100vh-120px)]">
        {/* Left Panel - Schools List */}
        <div className={`${isMobile ? (showMap ? 'hidden' : 'w-full') : 'w-1/2'} overflow-y-auto bg-white ${!isMobile ? 'border-r' : ''}`}>
          {/* Filter Bar */}
          <div className="sticky top-0 bg-white border-b p-4 z-20">
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">Ordenar por:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevancia">Relevancia</SelectItem>
                  <SelectItem value="distancia">Distancia</SelectItem>
                  <SelectItem value="calificacion">Calificación</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Schools List */}
          <div className="p-4 space-y-4">
            {getSortedSchools().map((school) => (
              <Link key={school.id} to={`/colegio/${school.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* School Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                            {school.type}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{school.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{school.gender}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            <span>{school.religion}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <StarRating rating={school.rating} size="sm" />
                          <span className="text-sm text-gray-600">({school.reviewCount} reseñas)</span>
                          <span className="text-sm text-blue-600 font-medium">{school.distance}</span>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-2">
                          {school.description.substring(0, 120)}...
                        </p>

                        <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                          Ver más
                        </Button>
                      </div>

                      {/* School Image */}
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
                        <img 
                          src={school.image} 
                          alt={school.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className={`${isMobile ? (showMap ? 'w-full' : 'hidden') : 'w-1/2'} bg-gray-100`}>
          <SearchMap address={address} schools={mockSchools} />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;