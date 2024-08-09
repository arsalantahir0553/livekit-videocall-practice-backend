// livekitService.js
import { AccessToken, RoomServiceClient } from "livekit-server-sdk";
import dotenv from "dotenv";

dotenv.config();

const serverUrl = process.env.LIVEKIT_SERVER_URL || "http://localhost:7880";
const apiKey = process.env.LIVEKIT_API_KEY || "devkey";
const apiSecret = process.env.LIVEKIT_API_SECRET || "secret";

const roomService = new RoomServiceClient(serverUrl, apiKey, apiSecret);

const createToken = async (identity, roomName) => {
  const at = new AccessToken("devkey", "secret", {
    identity: identity,
    ttl: 6000, // 10 minutes in seconds
  });
  at.addGrant({ roomJoin: true, room: roomName });

  return await at.toJwt();
};

export { createToken, roomService };
