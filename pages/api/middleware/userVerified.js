import { database } from "../helper/database";
import { MongoClient } from "mongodb";

const userVerified = async (req, res, action) => {
  const client = await MongoClient.connect(database.url);
  const body = JSON.parse(req.body);
  const sessionId = body.sessionId;

  try {
    const db = client.db(database.name);
    const admins = db.collection("Admins");
    const authenticated = await admins.findOne({ sessionId });
    console.log(authenticated);
    if (!authenticated) {
      client.close();
      return res.status(401).json({
        message: "Invalid session ID to make this request.",
      });
    }

    await action(db);
  } catch (error) {
    client.close();
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }

  client.close();
};

export default userVerified;
