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
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const addressIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

const schoolIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

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
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [addressCoords, setAddressCoords] = useState<L.LatLng | null>(null);
  const [schoolCoords, setSchoolCoords] = useState<
    Array<{ id: string; name: string; coords: L.LatLng }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const geocode = async (direccion: string): Promise<GeocodingResponse | null> => {
      try {
        const response = await fetch(
          `https://tucolegioapi.onrender.com/api/geocodificar?direccion=${encodeURIComponent(
            direccion
          )}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data: GeocodingResponse = await response.json();
        return data.encontrado ? data : null;
      } catch (err) {
        console.error("Error geocoding:", direccion, err);
        return null;
      }
    };

    const fetchCoords = async () => {
      const addressRes = await geocode(address);
      if (addressRes) setAddressCoords(L.latLng(addressRes.latitud, addressRes.longitud));

      const coords: Array<{ id: string; name: string; coords: L.LatLng }> = [];
      for (const s of schools.slice(0, 10)) {
        const res = await geocode(s.location);
        if (res) {
          coords.push({ id: s.id, name: s.name, coords: L.latLng(res.latitud, res.longitud) });
        }
      }
      setSchoolCoords(coords);
      setLoading(false);
    };

    fetchCoords();
  }, [address, schools]);

  useEffect(() => {
    if (!mapRef.current || loading) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([-33.4489, -70.6693], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    const markers: L.Marker[] = [];

    if (addressCoords) {
      markers.push(L.marker(addressCoords, { icon: addressIcon }).bindPopup("Tu ubicación").addTo(map));
    }

    schoolCoords.forEach((s) => {
      markers.push(L.marker(s.coords, { icon: schoolIcon }).bindPopup(s.name).addTo(map));
    });

    if (markers.length > 0) {
      const group = new L.FeatureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.2));
    }
  }, [addressCoords, schoolCoords, loading]);


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
      <div ref={mapRef} className="w-full h-full z-0" />
      
      {/* Leyenda */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 text-sm z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Tu ubicación</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Colegios ({schoolCoords.length})</span>
        </div>
      </div>

      {/* Información del mapa */}
      <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
        Mapa • {schoolCoords.length} colegios ubicados
      </div>
    </div>
  );
};

export default SearchMap;