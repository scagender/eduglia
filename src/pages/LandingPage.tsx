import { useState, useEffect  } from "react";
import { MapPin, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const LandingPage = () => {
  const [address, setAddress] = useState("");
  const [range, setRange] = useState("10");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  
  useEffect(() => {
  const fetchAndFilterColegios = async () => {
    try {
      const response = await fetch("https://tucolegioapi.onrender.com/api/colegios");

      if (!response.ok) {
        throw new Error(`Error al obtener colegios: ${response.status}`);
      }

      const data = await response.json();
      const colegios = data.items || [];

      // Filtrado frontend
      const filtered = colegios.filter((colegio) => {
        const region = colegio.region?.toLowerCase()
        const nombreLower = colegio.nombre?.toLowerCase() || "";
        const excludedWords = ["jardin", "sala cuna", "escuela de parvulos"];

        return (
          !excludedWords.some(word => nombreLower.includes(word))
        );
      });

      console.log("Colegios filtrados:", filtered.length);
      filtered.forEach(colegio => console.log(colegio.nombre));

    } catch (error) {
      console.error("Error al obtener colegios:", error);
    }
  };

  fetchAndFilterColegios();
}, []);
  
  
  const handleSearch = async () => {
    if (!address.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa una dirección",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://tucolegioapi.onrender.com/api/buscar-por-direccion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          direccion: address,
          radio_km: parseInt(range),
          criterio_orden: "distancia",
          limite: 50,
          year_simce: 2024,
          grado_simce: "2m",
          peso_rating: 0.4,
          peso_simce: 0.4,
          peso_distancia: 0.2,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      
      // Store the results for the SearchResults page
      sessionStorage.setItem("searchResults", JSON.stringify(data));
      sessionStorage.setItem("searchAddress", address);
      sessionStorage.setItem("searchRange", range);

      // Navigate to results page
      navigate(`/resultados?direccion=${encodeURIComponent(address)}&rango=${range}`);
    } catch (error) {
      console.error("Error calling API:", error);
      toast({
        title: "Error de búsqueda",
        description: "No se pudieron obtener los resultados. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo/Title */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            TuColegio
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            ¿Buscas el primer colegio para tus hijos?
          </p>
          <p className="text-xl text-gray-500 italic mb-8">
            Hazlo fácil con TuColegio
          </p>
        </div>

        {/* Search Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Introduce una dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSearch()}
                disabled={isLoading}
              />
            </div>

            {/* Range Selector */}
            <div className="min-w-[120px]">
              <Select value={range} onValueChange={setRange}>
                <SelectTrigger className="rounded-full border-2 border-gray-200 py-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 km</SelectItem>
                  <SelectItem value="20">20 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="px-8 py-4 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Buscar colegios
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
