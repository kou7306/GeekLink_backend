// src/controllers/eventController.ts

import { Request, Response } from "express";
import {
  createEventService,
  getAllEventsService,
  deleteEventService,
  joinEventService,
} from "../services/eventService";
import { Event } from "../models/eventModel";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events: Event[] = await getAllEventsService();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events", details: error });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event: Event = req.body;
    const newEvent = await createEventService(event);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: "Error creating event", details: error });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { owner_id } = req.body;
    await deleteEventService(id, owner_id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting event", details: error });
  }
};

export const joinEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { user_id } = req.body;
    const updatedEvent: Event = await joinEventService(eventId, user_id);
    res.status(200).json(updatedEvent);
  } catch (error: any) {
    if (error.message === "This event is already full") {
      res.status(400).json({ error: "This event is already full" });
    } else {
      res.status(500).json({ error: "Error joining event", details: error.message });
    }
  }
};
