import { Request, Response } from "express";
import {
  createEventService,
  getEventByIdService,
  deleteEventService,
  updateEventService,
  joinEventService,
  getAllEventsService,
  leaveEventService,
  searchEventsByTitleService,
  getEventsByOwnerService,
  getEventsByTypeService,
} from "../services/eventService";
import { Event } from "../models/eventModel";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const eventData: Omit<Event, "id" | "created_at" | "updated_at"> = req.body;
    const newEvent = await createEventService(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error in createEvent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const event = await getEventByIdService(eventId);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    console.error("Error in getEventById:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const event = await getEventByIdService(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    await deleteEventService(eventId);
    res.status(204).send();
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const eventData: Partial<Event> = req.body;
    const updatedEvent = await updateEventService(eventId, eventData);
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error in updateEvent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const joinEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const userId = req.body.userId;
    const updatedEvent = await joinEventService(eventId, userId);
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error in joinEvent:", error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await getAllEventsService();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error in getAllEvents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const leaveEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const userId = req.body.userId;
    const updatedEvent = await leaveEventService(eventId, userId);
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error in leaveEvent:", error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const searchEventsByTitle = async (req: Request, res: Response) => {
  try {
    const title = req.query.title as string;
    const events = await searchEventsByTitleService(title);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error in searchEventsByTitle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEventsByOwner = async (req: Request, res: Response) => {
  try {
    const ownerId = req.params.ownerId;
    const events = await getEventsByOwnerService(ownerId);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error in getEventsByOwner:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEventsByType = async (req: Request, res: Response) => {
  try {
    const eventType = req.params.type.toUpperCase();
    if (eventType !== "EVENT" && eventType !== "HACKATHON") {
      return res.status(400).json({ error: "Invalid event type. Must be 'EVENT' or 'HACKATHON'." });
    }
    const events = await getEventsByTypeService(eventType);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error in getEventsByType:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
