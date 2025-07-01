"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";

export const createTrip = async (formData: FormData) => {
  const session = await auth();

  if (!session || !session.user?.id) throw new Error("Not authenticated");

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const startDateStr = formData.get("start")?.toString();
  const endDateStr = formData.get("end")?.toString();

  if (!title || !description || !startDateStr || !endDateStr) {
    throw new Error("All fields are required");
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  await prisma.trip.create({
    data : {
        title,
        description,
        imageUrl,
        startDate,
        endDate,
        userId: session.user.id,
    }
  });

  redirect("/trips");
};
