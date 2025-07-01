"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { createTrip } from "@/lib/actions/create-trip";
import { UploadButton } from "@/lib/upload-thing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";

function NewTrip() {
    const [isPending, startTransition] = useTransition();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
  return (
    <div className="max-w-lg mx-auto mt-10 ">
      <Card>
        <CardHeader>New Trip</CardHeader>
        <CardContent>
          <form action={(formData: FormData) => {
            if(imageUrl){
                formData.append('imageUrl',imageUrl);
            }
            startTransition(()=>{
                createTrip(formData);
            });
          } } className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" >
                    Title
                </label>
              <input
                type="text"
                required
                name="title"
                placeholder="Goa trip..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                )}
              />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" >
                    Description
                </label>
              <textarea
                name="description"
                required
                placeholder="Trip description"
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4" > 
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" >
                    Start Date
                </label>
              <input
                type="date"
                name="start"
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                )}
              />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" >
                    End Date
                </label>
              <input
                type="date"
                name="end"
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                )}
              />
            </div>
            </div>
            <div>
                <label>
                    Trip Image
                </label>
                { imageUrl && (
                    <Image src={imageUrl} className="w-full mb-4 rounded-md max-h-48 object-cover" width={300} height={100} alt="trip image"/>
                ) }
            <UploadButton endpoint="imageUploader" onClientUploadComplete={(res) => {
                if(res && res[0].ufsUrl){
                    setImageUrl(res[0].ufsUrl);
                }
            }} 
            onUploadError={(error: Error) => {
                console.log("upload error", error);
            }}
            />
            </div>

            <Button type="submit" disabled={isPending} className="w-full" >{isPending ? "Creating..." : "Create Trip"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewTrip;
