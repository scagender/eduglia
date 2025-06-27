import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Style, Icon } from "ol/style";
import { defaults as defaultControls } from "ol/control";

interface School {
  id: string;
  name: string;
  location: string; // dirección
  rating: number;
}

interface SearchMapProps {
  address: string;
  schools: School[];
}

interface GeocodingResult {
  direccion: string;
  latitud: number;
  longitud: number;
  encontrado: boolean;
}

const SearchMap = ({ address, schools }: SearchMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const [addressCoords, setAddressCoords] = useState<[number, number] | null>(null);
  const [schoolCoords, setSchoolCoords] = useState<Record<string, [number, number]>>({});

  useEffect(() => {
    const geocode = async (direccion: string): Promise<GeocodingResult | null> => {
      try {
        const res = await fetch(`https://tucolegioapi.onrender.com/api/geocodificar?direccion=${encodeURIComponent(direccion)}`);
        if (!res.ok) throw new Error("Fallo la solicitud");
        const data: GeocodingResult = await res.json();
        return data.encontrado ? data : null;
      } catch (error) {
        console.error("Error geocodificando:", error);
        return null;
      }
    };

    const loadCoordinates = async () => {
      const addressResult = await geocode(address);
      if (addressResult) {
        setAddressCoords([addressResult.longitud, addressResult.latitud]);
      }

      const coords: Record<string, [number, number]> = {};
      for (const school of schools) {
        const result = await geocode(school.location);
        if (result) {
          coords[school.id] = [result.longitud, result.latitud];
        }
      }
      setSchoolCoords(coords);
    };

    loadCoordinates();
  }, [address, schools]);

  useEffect(() => {
    if (!mapRef.current || !addressCoords) return;

    const vectorSource = new VectorSource();

    // Dirección buscada
    const userFeature = new Feature({
      geometry: new Point(fromLonLat(addressCoords)),
    });

    userFeature.setStyle(
      new Style({
        image: new Icon({
          src: "/icons/center-marker.png", // ícono personalizado
          anchor: [0.5, 1],
          scale: 1.3,
        }),
      })
    );
    vectorSource.addFeature(userFeature);

    // Marcadores de colegios
    Object.entries(schoolCoords).forEach(([schoolId, [lon, lat]]) => {
      const schoolFeature = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
        name: schoolId,
      });

      schoolFeature.setStyle(
        new Style({
          image: new Icon({
            src: "/icons/school-marker.png",
            anchor: [0.5, 1],
            scale: 1,
          }),
        })
      );

      vectorSource.addFeature(schoolFeature);
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat(addressCoords),
        zoom: 13,
      }),
      controls: defaultControls(),
    });

    return () => {
      mapInstance.current?.setTarget(null);
    };
  }, [addressCoords, schoolCoords]);

  return (
    <div className="w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default SearchMap;
