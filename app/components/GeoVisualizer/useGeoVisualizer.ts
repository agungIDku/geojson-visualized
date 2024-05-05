import { useRef, useEffect } from "react";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { useGeoStore } from "@/app/store/geo";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

function useGeoVisualizer() {
  const mapRef = useRef<L.Map | null>(null);
  const { data, clearData } = useGeoStore();

  useEffect(() => {
    if (!mapRef.current && data) {
      mapRef.current = L.map("visualizer").setView([0, 0], 2);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    if (data && mapRef.current) {
      const map = mapRef.current;
      const geojsonLayer = L.geoJSON(data, {
        onEachFeature: (feature, layer) => {
          layer.bindPopup(feature.properties.name);
        },
      }).addTo(map);
      map.fitBounds(geojsonLayer.getBounds());
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [data]);

  return { clearData };
}

export default useGeoVisualizer;
