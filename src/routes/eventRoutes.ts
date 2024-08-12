// src/routes/eventRoutes.ts

import { Router } from "express";
import { getAllEvents, createEvent, deleteEvent, joinEvent } from "../controllers/eventController";

const router = Router();

router.get("/get", getAllEvents);
router.post("/create", createEvent);
router.delete("/delete/:id", deleteEvent);
router.post("/join/:eventId", joinEvent);

export default router;
