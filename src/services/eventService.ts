// src/services/eventService.ts

import prisma from "../config/prisma";
import { Event } from "../models/eventModel";

export const getAllEventsService = async () => {
  return await prisma.event.findMany();
};

export const createEventService = async (data: Event): Promise<Event> => {
  return await prisma.event.create({
    data,
  });
};

export const deleteEventService = async (id: string, ownerId: string) => {
  return await prisma.event.deleteMany({
    where: {
      id,
      owner_id: ownerId,
    },
  });
};

export const joinEventService = async (eventId: string, userId: string) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.participant_ids.length >= event.max_participants) {
    throw new Error("This event is already full");
  }

  return await prisma.event.update({
    where: { id: eventId },
    data: {
      participant_ids: {
        push: userId,
      },
    },
  });
};
