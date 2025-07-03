import NewLocationTrip from "@/components/NewLocationTrip";

async function NewLocation({ params } : { params : Promise<{tripId: string}>}) {
    const { tripId } = await params;
  return (
    <NewLocationTrip tripId={tripId}/>
  )
}

export default NewLocation