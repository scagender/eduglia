import { useState, useEffect } from "react";
import { MapPin, Users, ArrowLeft, Filter, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "@/components/StarRating";
import SearchMap from "@/components/SearchMap";
import { Link, useSearchParams } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface ApiSchool {
  colegio: {
    id: number;
    rbd: string;
    nombre: string;
    direccion: string;
    comuna: string;
    region: string;
    telefono: string;
    email: string;
    pagina_web: string;
    dependencia: string;
    sostenedor: string;
    nivel_ensenanza: string;
    matricula_total: number;
    numero_docentes: number;
    google_place_id: string;
    google_rating_promedio: number;
    google_total_reviews: number;
    latitud: number;
    longitud: number;
  };
  distancia_km: number;
  composite_score: number;
}

interface ProcessedSchool {
  id: string;
  name: string;
  location: string;
  gender: string;
  religion: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  distance: string;
  latitude: number;
  longitude: number;
}

const staticAlbamar: ProcessedSchool = {
  id: "albamar",
  name: "Colegio Albamar",
  location: "Concón, Chile - V Región",
  gender: "Femenino",
  religion: "Católico",
  rating: 4.7,
  reviewCount: 142,
  image: "/placeholder.svg",
  description:
    "El Colegio Albamar busca la formación integral de sus alumnas, desarrollando al máximo sus capacidades intelectuales, humanas y espirituales, en un ambiente de libertad responsable y alegría.",
  distance: "2.3 km",
  latitude: -32.9365,
  longitude: -71.5225
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("relevancia");
  const [showMap, setShowMap] = useState(false);
  const [schools, setSchools] = useState<ProcessedSchool[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const address = sessionStorage.getItem("searchAddress") || "";
  const range = sessionStorage.getItem("searchRange") || "10";

  const filterSchools = (apiData: ApiSchool[]): ApiSchool[] => {
    return apiData.filter(item => {
      const colegio = item.colegio;
      // Filter by dependencia
      if (colegio.dependencia !== "Particular No Subvencionado") {
        return false;
      }
      
      // Filter out schools with excluded words in their name
      const excludedWords = ["Jardin", "Sala Cuna", "Escuela De Parvulos"];
      const nombreLower = colegio.nombre.toLowerCase();
      
      return !excludedWords.some(word => 
        nombreLower.includes(word.toLowerCase())
      );
    });
  };

  const fetchSchoolReviews = async (schoolId: number): Promise<{averageRating: number, reviewCount: number}> => {
    try {
      const response = await fetch(`https://tucolegioapi.onrender.com/api/colegios/${schoolId}/reviews`);
      if (!response.ok) {
        console.warn(`Failed to fetch reviews for school ${schoolId}`);
        return {averageRating: 0, reviewCount: 0};
      }
      
      const data = await response.json();
      const reviews = data.items || [];
      
      if (reviews.length === 0) {
        return {averageRating: 0, reviewCount: 0};
      }
      
      const totalRating = reviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0);
      const averageRating = totalRating / reviews.length;
      return {averageRating, reviewCount: reviews.length};
    } catch (error) {
      console.error(`Error fetching reviews for school ${schoolId}:`, error);
      return {averageRating: 0, reviewCount: 0};
    }
  };

  useEffect(() => {
    const loadSearchResults = async () => {
      try {
        const savedResults = sessionStorage.getItem("searchResults");
        if (savedResults) {
          const apiData: ApiSchool[] = JSON.parse(savedResults);
          const filteredData = filterSchools(apiData);
          
          // Fetch reviews for each school and process the data
          const processedSchools = await Promise.all(
            filteredData.map(async (item) => {
              const {averageRating, reviewCount} = await fetchSchoolReviews(item.colegio.id);
              
              return {
                id: item.colegio.id.toString(),
                name: item.colegio.nombre,
                location: `${item.colegio.direccion}, ${item.colegio.comuna}`,
                gender: "Mixto", // Default value as API doesn't provide this
                religion: "Laico", // Default value as API doesn't provide this
                rating: averageRating > 0 ? averageRating : 0,
                reviewCount: reviewCount || 0,
                image: "/placeholder.svg",
                description: `Página oficial: ${item.colegio.pagina_web}`,
                distance: `${item.distancia_km} km`,
                latitude: item.colegio.latitud,
                longitude: item.colegio.longitud,
              };
            })
          );
          
          setSchools(processedSchools);
        }
      } catch (error) {
        console.error("Error loading search results:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSearchResults();
  }, []);

  const getSortedSchools = () => {
    let sorted = [...schools];
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando resultados...</p>
        </div>
      </div>
    );
  }

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
              <p className="text-sm text-gray-600">
                Radio de búsqueda: {range} km • {schools.length} resultados encontrados
              </p>
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
            {schools.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No se encontraron colegios particulares no subvencionados en esta área.</p>
                <Link to="/">
                  <Button className="mt-4">Realizar nueva búsqueda</Button>
                </Link>
              </div>
            ) : (
              getSortedSchools().map((school) => (
                <Link key={school.id} to={`/colegio/${school.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* School Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                              {school.religion}
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
              ))
              
            )}
          </div>
          {/* Tarjeta estática de Colegio Albamar */}
<Link to="/colegio/prueba">
  <Card className="hover:shadow-md transition-shadow cursor-pointer">
    <CardContent className="p-6">
      <div className="flex gap-4">
        {/* School Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Colegio Albamar</h3>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
              Católico
            </span>
          </div>

          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Concón, Chile - V Región</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Femenino</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <StarRating rating={4.7} size="sm" />
            <span className="text-sm text-gray-600">(142 reseñas)</span>
            <span className="text-sm text-blue-600 font-medium">2.3 km</span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            El Colegio Albamar busca la formación integral de sus alumnas, desarrollando al máximo sus capacidades intelectuales, humanas y espirituales, en un ambiente de libertad responsable y alegría...
          </p>

          <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
            Ver más
          </Button>
        </div>

        {/* School Image */}
        <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
          <img 
            src="/placeholder.svg" 
            alt="Colegio Albamar"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</Link>
        </div>

        {/* Right Panel - Map */}
        <div className={`${isMobile ? (showMap ? 'w-full' : 'hidden') : 'w-1/2'} bg-gray-100`}>
          <SearchMap address={address} schools={schools} />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
