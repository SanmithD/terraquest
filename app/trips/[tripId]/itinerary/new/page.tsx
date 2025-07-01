
async function NewLocation({ params } : { params : Promise<{tripId: string}>}) {
    const { tripId } = await params;
  return (
    <div>page</div>
  )
}

export default NewLocation