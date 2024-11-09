import { Request, Response } from "express";
import { getCurrentAvatarId, getUserItemsService, updateCurrentAvatarService } from "../services/avatarService";

export const getUserItems = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;
    const items = await getUserItemsService(uuid);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const getCurrentAvatar = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;
    const currentAvatarId = await getCurrentAvatarId(uuid);
    res.status(200).json(currentAvatarId);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
}

export const updateCurrentAvatar = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;
    const { avatarId } = req.body;
    await updateCurrentAvatarService(uuid, avatarId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
