
interface GeocodeResult {
  country: string;
  formattedAddress: string;
}

export const getCountry = async (
  lat: number,
  lng: number
): Promise<GeocodeResult> => {
  const apiKey = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY;
  const response = await fetch(
    `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${lat}&lon=${lng}&format=json`
  );

  const result = await response.json();

  const displayName = result?.display_name;
  if (!displayName || typeof displayName !== "string") {
    return { country: "Unknown", formattedAddress: "Unknown location" };
  }

  const parts = displayName.split(",").map(part => part.trim());
  const country = parts[parts.length - 1];

  return {
    country: country || "Unknown",
    formattedAddress: result.display_name,
  };
};

