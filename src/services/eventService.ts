import prisma from "../config/prisma";
import { Event } from "../models/eventModel";

export const createEventService = async (
  eventData: Omit<Event, "id" | "created_at" | "updated_at">
): Promise<Event> => {
  try {
    const event = await prisma.event.create({
      data: {
        ...eventData,
        participant_ids: [],
      },
    });
    return event;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getEventByIdService = async (eventId: string): Promise<Event | null> => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });
    return event;
  } catch (error) {
    console.error("Error getting event:", error);
    throw error;
  }
};

export const deleteEventService = async (eventId: string): Promise<void> => {
  try {
    await prisma.event.delete({
      where: { id: eventId },
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const updateEventService = async (eventId: string, eventData: Partial<Event>): Promise<Event> => {
  try {
    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: eventData,
    });
    return updatedEvent;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const joinEventService = async (eventId: string, userId: string): Promise<Event> => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    if (event.participant_ids.includes(userId)) {
      throw new Error("User already joined this event");
    }

    if (event.participant_ids.length >= event.max_participants) {
      throw new Error("Event is already full");
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        participant_ids: {
          push: userId,
        },
      },
    });

    return updatedEvent;
  } catch (error) {
    console.error("Error joining event:", error);
    throw error;
  }
};

export const getAllEventsService = async () => {
  try {
    return await prisma.event.findMany();
  } catch (error) {
    console.error("Error getting all events:", error);
    throw error;
  }
};

export const leaveEventService = async (eventId: string, userId: string): Promise<Event> => {
  try {
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new Error("Event not found");
    if (!event.participant_ids.includes(userId))
      throw new Error("User is not a participant of this event");

    return await prisma.event.update({
      where: { id: eventId },
      data: { participant_ids: event.participant_ids.filter((id) => id !== userId) },
    });
  } catch (error) {
    console.error("Error leaving event:", error);
    throw error;
  }
};

export const searchEventsByTitleService = async (title: string) => {
  try {
    return await prisma.event.findMany({
      where: { title: { contains: title, mode: "insensitive" } },
    });
  } catch (error) {
    console.error("Error searching events:", error);
    throw error;
  }
};

export const getEventsByOwnerService = async (ownerId: string) => {
  try {
    return await prisma.event.findMany({ where: { owner_id: ownerId } });
  } catch (error) {
    console.error("Error getting events by owner:", error);
    throw error;
  }
};

export const getEventsByTypeService = async (eventType: string) => {
  try {
    return await prisma.event.findMany({
      where: { event_type: eventType },
      orderBy: { created_at: "desc" },
    });
  } catch (error) {
    console.error(`Error getting events by type ${eventType}:`, error);
    throw error;
  }
};
