"use client";

import { addLocation } from "@/lib/actions/add-location";
import { useTransition } from "react";
import { Button } from "./ui/Button";


function NewLocationTrip({ tripId }: { tripId: string }) {
    const [isPending, startTransition] = useTransition();
  return (
    <div className="min-h-[calc(100vh-8rem)] flex justify-center items-center bg-gray-50 " >
        <div className="w-full max-w-md mx-auto  " >
            <div className="bg-white p-8 shadow-lg rounded-lg " >
                <h1 className="text-3xl font-black text-center mb-6" >Add New Location</h1>
                <form action={( formData: FormData ) => {
                    startTransition(()=>{
                        addLocation(formData, tripId)
                    })
                }} className="space-y-6" >
                    <div className="block text-sm font-medium text-gray-700 mb-2"  >
                        <label>Address</label>
                        <input type="text" name="address" placeholder="Address.." required  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-0 focus:ring-2 focus:ring-blue-500 " />
                    </div>
                    <Button type="submit" className="w-full" >{ isPending ? "Adding..." : "Add Location" } </Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default NewLocationTrip