"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Loader, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

export interface TransformedLocation {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [visitedCounty, setVisitedCountry] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`/api/trips`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid data format");
        
        setLocations(data);
        const countries = new Set<string>(
          data.map((loc: TransformedLocation) => loc.country)
        );
        setVisitedCountry(countries);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-500 ">
      <div className="container mx-auto px-4 py-12 ">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center text-4xl font-bold mb-12 ">
            Your Travel Journey
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start ">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden  ">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 ">
                  See where you&apos;ve been
                </h2>
                <div className="h-[600px] w-full relative ">
                  {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                      <Loader className="h-12 w-12 animate-spin text-blue-500" />
                    </div>
                  ) : (
                    <div className="h-full w-full flex justify-center items-center " >
                      <Globe
                        ref={globeRef}
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                        backgroundColor="rgba(0,0,0,0)"
                        pointColor={() => "red"}
                        pointLabel="name"
                        pointsData={locations}
                        pointRadius={0.5}
                        pointAltitude={0.1}
                        pointsMerge={true}
                        width={800}
                        height={600}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader className="font-bold text-2xl" >Countries Visited</CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                      <Loader className="h-12 w-12 animate-spin text-blue-500" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <p className="text-sm mb-4 text-blue-800">
                          You&apos;ve visited{" "}
                          <span className="font-bold">
                            {visitedCounty.size}{" "}
                          </span>{" "} countries.
                        </p>
                        <div className=" space-y-2 pr-2 max-h-[500px] overflow-y-auto" >
                        {Array.from(visitedCounty).map((country) => (
                          <div
                            key={country}
                            className="bg-gray-100 hover:bg-gray-300 transition-colors flex items-center gap-2  px-2 py-1 rounded-md text-sm"
                          >
                           <MapPin className="h-4 w-4 text-red-500" /><span className="font-medium" >{country}</span> 
                          </div>
                        ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobePage;
