import { Request, Response } from "express";
import {
  getProfileService,
  updateProfileService,
  followStatusCheck,
} from "../services/profileService";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { user_id, ...profileData } = req.body;
    const updatedProfile = await updateProfileService(user_id, profileData);

    res
      .status(200)
      .json({ message: "Profile updated successfully", data: updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  try {
    const user = await getProfileService(uuid);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const followStatus = async (req: Request, res: Response) => {
  try {
    const { myID, uuid } = req.body;
    const followStatus = await followStatusCheck(myID, uuid);
    res
      .status(200)
      .json({ message: "followStatus check successfully", data: followStatus });
  } catch (error) {
    console.error("Error check followStatus", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
