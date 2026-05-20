"use client";

import { useEffect, useRef } from "react";

export default function ContactMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapRef.current || leafletMapRef.current) return;

      const L = (await import("leaflet")).default;
      await import("leaflet-routing-machine");

      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const officeLocation: [number, number] = [5.8945, 5.6767];

      const map = L.map(mapRef.current).setView(officeLocation, 14);
      leafletMapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; OpenStreetMap contributors &copy; CARTO',
        }
      ).addTo(map);

      L.marker(officeLocation).addTo(map);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];

          L.Routing.control({
            waypoints: [
              L.latLng(userLocation[0], userLocation[1]),
              L.latLng(officeLocation[0], officeLocation[1]),
            ],
            routeWhileDragging: false,
            show: false,
          }).addTo(map);
        });
      }
    }

    initMap();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      isMounted = false;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-[450px] rounded-brand shadow-brand"
    />
  );
}
