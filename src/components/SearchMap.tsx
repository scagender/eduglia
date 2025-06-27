import { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Style, Icon, Text, Fill, Stroke } from "ol/style";

interface School {
  id: string;
  name: string;
  location: string;
  rating: number;
  latitude?: number;
  longitude?: number;
}

interface SearchMapProps {
  address: string;
  schools: School[];
}

interface GeocodingResponse {
  direccion: string;
  latitud: number;
  longitud: number;
  encontrado: boolean;
}

const SearchMap = ({ address, schools }: SearchMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [addressCoords, setAddressCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [schoolCoords, setSchoolCoords] = useState<Array<{ id: string; name: string; lat: number; lon: number }>>([]);
  const [loading, setLoading] = useState(true);
  const vectorSourceRef = useRef<VectorSource | null>(null);

  // Geocodificar la dirección buscada
  useEffect(() => {
    const geocodeAddress = async () => {
      try {
          const response = await fetch(`https://tucolegioapi.onrender.com/api/geocodificar?direccion=${encodeURIComponent(address)}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }
        });
        const data: GeocodingResponse = await response.json();
        
        
        if (data.encontrado) {
          setAddressCoords({ lat: data.latitud, lon: data.longitud });
        }
      } catch (error) {
        console.error("Error geocoding address:", error);
      }
    };

    if (address) {
      geocodeAddress();
    }
  }, [address]);

  // Geocodificar las direcciones de los colegios
  useEffect(() => {
    const geocodeSchools = async () => {
      const coords = [];
      
      for (const school of schools.slice(0, 10)) { // Limitar a 10 colegios para no saturar
        try {
            const response = await fetch(`https://tucolegioapi.onrender.com/api/geocodificar?direccion=${encodeURIComponent(school.location)}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }
          });
          const data: GeocodingResponse = await response.json();
          
          if (data.encontrado) {
            coords.push({
              id: school.id,
              name: school.name,
              lat: data.latitud,
              lon: data.longitud
            });
          }
        } catch (error) {
          console.error(`Error geocoding school ${school.name}:`, error);
        }
      }
      
      setSchoolCoords(coords);
      setLoading(false);
    };

    if (schools.length > 0) {
      geocodeSchools();
    }
  }, [schools]);

  // Inicializar el mapa
useEffect(() => {
    if (!mapRef.current) return;

    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const initialCenter = fromLonLat([-70.6693, -33.4489]); // Santiago por defecto
    const initialZoom = 12;

    const map = new Map({
      target: mapRef.current,
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: initialCenter,
        zoom: initialZoom,
      }),
    });

    mapInstanceRef.current = map;

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  // Actualizar marcadores (address + schools) y centrar vista cuando cambian coords
  useEffect(() => {
    if (!mapRef.current) return;
    
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() })
      ],
      view: new View({
        center: fromLonLat([-70.6693, -33.4489]),
        zoom: 12
      })
    });
    
    mapInstanceRef.current = map;
    
    return () => map.setTarget(undefined);
  }, []);

  if (loading) {
    return (
      <div className="h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 text-sm">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Leyenda */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 text-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Tu ubicación</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Colegios ({schoolCoords.length})</span>
        </div>
      </div>

      {/* Controles de zoom */}
      <div className="absolute top-4 right-4 bg-white rounded shadow-md">
        <button 
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
          onClick={() => {
            const view = mapInstanceRef.current?.getView();
            if (view) {
              view.setZoom((view.getZoom() || 13) + 1);
            }
          }}
        >
          +
        </button>
        <div className="border-t border-gray-200"></div>
        <button 
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
          onClick={() => {
            const view = mapInstanceRef.current?.getView();
            if (view) {
              view.setZoom((view.getZoom() || 13) - 1);
            }
          }}
        >
          -
        </button>
      </div>

      {/* Información del mapa */}
      <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
        Mapa • {schoolCoords.length} colegios ubicados
      </div>
    </div>
  );
};

export default SearchMap;