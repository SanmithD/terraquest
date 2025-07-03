"use server";

import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import { prisma } from "../prisma";

async function geocodeAddress(address: string) {
    const apiKey = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY; 
    const response = await fetch(`https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0 || data[0].error) {
        throw new Error("No geocoding results found for the provided address.");
    }

    const { lat, lon } = data[0];
    return {
        lat: parseFloat(lat),
        lng: parseFloat(lon)
    };
}


export const addLocation = async(formData: FormData, tripId: string ) => {
    const session = await auth();

    if(!session) throw new Error("Not Authenticated");

    const address = formData.get("address")?.toString();
    if(!address) throw new Error("Missing address");

    const { lat, lng } = await geocodeAddress(address);

    const count = await prisma.location.count({
        where: { tripId }
    });

    await prisma.location.create({
        data: {
            locationTitle: address,
            lat,
            lng,
            tripId,
            order: count,
        }
    });

    redirect(`/trips/${tripId}`)
}