import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  joinEvent,
  updateEvent,
  getAllEvents,
  leaveEvent,
  searchEventsByTitle,
  getEventsByOwner,
} from "../controllers/eventController";

const router = Router();

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/search", searchEventsByTitle);
router.get("/owner/:ownerId", getEventsByOwner);
router.get("/:id", getEventById);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);
router.post("/:id/join", joinEvent);
router.post("/:id/leave", leaveEvent);

export default router;
