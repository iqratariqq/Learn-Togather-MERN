import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("missing stream api key or secret");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const streamUpsertUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    return userData;
  } catch (error) {
    console.log("error in streamupsertclient", error);
    throw new Error("error in streamupsertclient", error);
  }
};

export const generateStreamToken = async (req,res) => {
  try {
    const userIdstr = req.userId.toString();
    const token = streamClient.createToken(userIdstr);
 res.status(200).json(token);
  } catch (error) {
    console.error("error in generate Stream Token", error);
  }
};
