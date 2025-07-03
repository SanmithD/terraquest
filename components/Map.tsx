"use client";

import type { Location } from "@/app/generated/prisma";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MapViewProps {
  itineraries: Location[];
}

export default function Map({ itineraries }: MapViewProps) {
  const [L, setL] =  useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    import("leaflet").then((module) => setL(module));
  }, []);

  if (!L || itineraries.length === 0)
    return <div>No locations to display</div>;

  const locationIqApiKey = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY;

  const createLucideIcon = () => {
    const div = document.createElement("div");
    createRoot(div).render(<MapPin className="text-red-600" size={20} />);
    return L.divIcon({
      html: div,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  };

  const center = {
    lat: itineraries[0].lat,
    lng: itineraries[0].lng,
  };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={6}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.locationiq.com/">LocationIQ</a>'
        url={`https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${locationIqApiKey}`}
        subdomains={["a", "b", "c"]}
      />
      {itineraries.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={createLucideIcon()}
        >
          <Popup>{location.locationTitle}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
