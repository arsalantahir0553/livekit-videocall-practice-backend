// livekitRoutes.js
import express from "express";
import { createToken, roomService } from "./livekitService.js";

const router = express.Router();

router.post("/token", async (req, res) => {
  const { identity, roomName } = req.body;
  if (!roomName || !identity) {
    return res
      .status(400)
      .json({ error: "Room name and identity are required" });
  }

  const token = await createToken(identity, roomName);
  res.json({ token });
});

// Route to create a room
router.post("/create-room", async (req, res) => {
  const { roomName } = req.body;

  if (!roomName) {
    return res.status(400).json({ error: "Room name is required" });
  }

  try {
    const room = await roomService.createRoom(roomName);
    res.json({ room });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create room", details: error.message });
  }
});

export default router;
