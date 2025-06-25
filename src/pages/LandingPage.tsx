import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [address, setAddress] = useState("");
  const [range, setRange] = useState("10");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (address.trim()) {
      navigate(`/resultados?direccion=${encodeURIComponent(address)}&rango=${range}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo/Title */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Eduglia
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            ¿Buscas el primer colegio para tus hijos?
          </p>
          <p className="text-xl text-gray-500 italic mb-8">
            Hazlo fácil con Eduglia
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
                placeholder="Explora colegios cerca de ti"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
          >
            <Search className="w-5 h-5 mr-2" />
            Buscar colegios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
