import { auth } from "@/auth";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function TripsPage() {
  const session = await auth();

  const trips = await prisma.trip.findMany({
    where: { userId: session?.user?.id },
  });

  const sortTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const upcomingTrips = sortTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );

  if (!session)
    return (
      <p
        className="h-screen
     flex justify-center items-center text-2xl font-bold text-gray-700 "
      >
        Please Sign In.{" "}
      </p>
    );

  return (
    <div className="space-y-6 container mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href="/trips/new">
          <Button>New Trip</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl" >Welcome back, {session.user?.name} </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {trips.length === 0
              ? "Start planning your first trip"
              : `You have ${trips.length} ${
                  trips.length === 1 ? "trip" : "has"
                } planned. ${
                  upcomingTrips.length > 0
                    ? `${upcomingTrips.length} upcoming.`
                    : ""
                } `}
          </p>
        </CardContent>
        </Card>

        <div className="p-4" >
          <h2 className="text-xl font-semibold mb-4 ">Your Recent Trips</h2>
          {trips.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8" >
                <h3 className="text-xl font-medium  mb-2" >No trips yet.</h3>
                <p className="text-center mb-4 max-w-md" >Start planning</p>
                <Link href="/trips/new">
                  <Button>Create Trip</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" >
                { sortTrips.slice(0,6).map((trip, key) => (
                    <Link href={`/trips/${trip.id}`} key={key} >
                        <Card className="h-full hover:shadow-md transition-shadow " >
                            <CardHeader>
                                <CardTitle className="line-clamp-1" >{trip.title} </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm line-clamp-2 mb-2" >{trip.description} </p>
                                <div className="text-sm font-semibold text-gray-600" >{ new Date(trip.startDate).toLocaleDateString() } - { new Date(trip.endDate).toLocaleDateString() } </div>
                            </CardContent>
                        </Card>
                    </Link>
                )) }
            </div>
          )}
        </div>
    </div>
  );
}

export default TripsPage;
