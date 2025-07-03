import { auth } from "@/auth";
import { getCountry } from "@/lib/actions/geocode";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await auth();

    if (!session) return new NextResponse("Not Authenticated", { status: 401 });

    const locations = await prisma.location.findMany({
      where: {
        trip: {
          userId: session.user?.id,
        },
      },
      select: {
        locationTitle: true,
        lat: true,
        lng: true,
        trip: {
          select: {
            title: true,
          },
        },
      },
    });

    const transformedLocation = await Promise.all(
      locations.map(async (lac) => {
        const geocodeResult = await getCountry(lac.lat, lac.lng);
        return {
            name: `${lac.trip.title} - ${geocodeResult.formattedAddress} `,
            lat: lac.lat,
            lng: lac.lng,
            country: geocodeResult.country,
        };
      })
    );

    return NextResponse.json(transformedLocation);
  } catch (error) {
    console.log(error);
    return new NextResponse("Server error",{ status: 500 } )
  }
};
