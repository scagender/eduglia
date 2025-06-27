
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
import { MapPin } from "lucide-react";

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
    console.log("Intento")
    if (!mapRef.current || !addressCoords) return;
    console.log("Pasa")
    // Limpiar mapa existente
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setTarget(undefined);
    }

    // Crear capas
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Crear el mapa
    const map = new Map({
      target: mapRef.current,
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: fromLonLat([addressCoords.lon, addressCoords.lat]),
        zoom: 13,
      }),
    });

    mapInstanceRef.current = map;

    // Agregar marcador de la dirección buscada (rojo)
    const addressFeature = new Feature({
      geometry: new Point(fromLonLat([addressCoords.lon, addressCoords.lat])),
      name: address,
      type: 'address',
    });

    addressFeature.setStyle(new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>
            <circle cx="12" cy="10" r="3" fill="white"/>
          </svg>
        `),
        scale: 1.5,
      }),
      text: new Text({
        text: 'Tu ubicación',
        offsetY: -35,
        fill: new Fill({ color: '#000' }),
        stroke: new Stroke({ color: '#fff', width: 2 }),
        font: '12px Arial',
      }),
    }));

    vectorSource.addFeature(addressFeature);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
      }
    };
  }, [addressCoords, address]);

  // Agregar marcadores de colegios
  useEffect(() => {
    if (!mapInstanceRef.current || schoolCoords.length === 0) return;

    const map = mapInstanceRef.current;
    const vectorLayer = map.getLayers().getArray().find(layer => layer instanceof VectorLayer) as VectorLayer<VectorSource>;
    const vectorSource = vectorLayer.getSource();

    // Limpiar marcadores de colegios existentes
    const features = vectorSource.getFeatures();
    const schoolFeatures = features.filter(feature => feature.get('type') !== 'address');
    schoolFeatures.forEach(feature => vectorSource.removeFeature(feature));

    // Agregar nuevos marcadores de colegios (azules)
    schoolCoords.forEach(school => {
      const schoolFeature = new Feature({
        geometry: new Point(fromLonLat([school.lon, school.lat])),
        name: school.name,
        type: 'school',
        id: school.id,
      });

      schoolFeature.setStyle(new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#3b82f6" stroke="#2563eb" stroke-width="2"/>
              <circle cx="12" cy="10" r="3" fill="white"/>
            </svg>
          `),
          scale: 1,
        }),
        text: new Text({
          text: school.name.length > 20 ? school.name.substring(0, 20) + '...' : school.name,
          offsetY: -25,
          fill: new Fill({ color: '#000' }),
          stroke: new Stroke({ color: '#fff', width: 2 }),
          font: '10px Arial',
        }),
      }));

      vectorSource.addFeature(schoolFeature);
    });

    // Ajustar vista para mostrar todos los marcadores
    if (addressCoords && schoolCoords.length > 0) {
      const allCoords = [
        [addressCoords.lon, addressCoords.lat],
        ...schoolCoords.map(school => [school.lon, school.lat])
      ];
      
      const extent = vectorSource.getExtent();
      map.getView().fit(extent, { padding: [50, 50, 50, 50] });
    }
  }, [schoolCoords, addressCoords]);

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