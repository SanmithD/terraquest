"use client";

import { Location } from "@/app/generated/prisma";
import { reorderItinerary } from "@/lib/actions/reorder-itinerary";
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useId, useState } from "react";

interface MapProps{
    locations: Location[];
    tripId: string
}

function SortableItem({item} : { item: Location }) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });



    return (
        <div ref={setNodeRef}
        { ...attributes }
        { ...listeners }
        style={{ transform : CSS.Transform.toString(transform) , transition }}
         className="p-4 border rounded-md flex justify-between items-center hover:shadow transition-shadow " >
            <div>
                <h4 className="font-medium text-gray-800 " >{item.locationTitle}</h4>
                <p className="text-gray-500 text-sm truncate max-w-xs " >{`Latitude: ${item.lat}, Longitude: ${item.lng} `} </p>
            </div>
            <div className="text-sm text-gray-600" >
                Day { item.order }
            </div>
        </div>
    )
}

function SortableItinerary({ locations, tripId} : MapProps) {
    const id = useId();

    const [localLocation, setLocalLocation] = useState(locations);

    const handleDragEnd = async(event: DragEndEvent) =>{
        const { active, over } = event;

        if(active.id !== over?.id ){
            const oldIndex = localLocation.findIndex((item) => item.id === active.id );
            const newIndex = localLocation.findIndex((item) => item.id === over!.id );
            
            const newLocationsOrder = arrayMove(localLocation, oldIndex, newIndex).map((item, index) => ({ ...item, order : index }))
            setLocalLocation(newLocationsOrder);

            await reorderItinerary(tripId, newLocationsOrder.map((item) => item.id ));
        }
    }

  return (
    <DndContext id={id} collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
        <SortableContext strategy={verticalListSortingStrategy} items={localLocation.map((loc) => loc.id)} >
            <div className="space-y-4" >
                { localLocation.map((item, key) => (
                    <SortableItem key={key} item={item}/>
                )) }
            </div>
        </SortableContext>
    </DndContext>
  )
}

export default SortableItinerary