import { auth } from '@/auth';
import TripDetailClient from '@/components/TripDetailClient';
import { prisma } from '@/lib/prisma';

async function TripDetail({ params } : { params: Promise<{tripId: string}> }) {
    const { tripId }= await params;

    const session = await auth();

    if(!session) return <p>Please Sign in</p>

    const trip = await prisma.trip.findFirst({
        where: { id: tripId, userId: session.user?.id },
        include: { locations: true }
    });

    if(!trip) return <p>Trip not found</p>
  return (
    <TripDetailClient trip={trip} />
  )
}

export default TripDetail