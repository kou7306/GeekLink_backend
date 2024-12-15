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
  getEventsByType,
  searchEventsByKeyword,
} from "../controllers/eventController";

const router = Router();

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/search", searchEventsByTitle);
router.get("/search/:keyword", searchEventsByKeyword);
router.get("/owner/:ownerId", getEventsByOwner);
router.get("/:id", getEventById);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);
router.post("/:id/join", joinEvent);
router.post("/:id/leave", leaveEvent);
router.get("/type/:type", getEventsByType);

export default router;
