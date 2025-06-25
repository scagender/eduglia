
import { MapPin } from "lucide-react";

interface School {
  id: string;
  name: string;
  location: string;
  rating: number;
}

interface SearchMapProps {
  address: string;
  schools: School[];
}

const SearchMap = ({ address, schools }: SearchMapProps) => {
  return (
    <div className="h-full bg-gray-100 relative overflow-hidden">
      {/* Map placeholder with visual elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#94a3b8" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Streets simulation */}
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-300 opacity-60"></div>
        <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-300 opacity-60"></div>
        <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-gray-300 opacity-60"></div>
        <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-gray-300 opacity-60"></div>

        {/* Center marker (searched address) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-red-500 rounded-full p-2 shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap">
            {address}
          </div>
        </div>

        {/* School markers */}
        {schools.map((school, index) => {
          const positions = [
            { top: '35%', left: '40%' },
            { top: '60%', left: '25%' },
            { top: '30%', left: '70%' },
            { top: '70%', left: '65%' }
          ];
          const position = positions[index] || positions[0];

          return (
            <div 
              key={school.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: position.top, left: position.left }}
            >
              <div className="bg-blue-600 rounded-full p-2 shadow-lg hover:bg-blue-700 cursor-pointer transition-colors">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap max-w-32 truncate">
                {school.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Map controls */}
      <div className="absolute top-4 right-4 bg-white rounded shadow-md">
        <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100">+</button>
        <div className="border-t border-gray-200"></div>
        <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100">-</button>
      </div>

      {/* Map attribution */}
      <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
        Vista previa del mapa
      </div>
    </div>
  );
};

export default SearchMap;
