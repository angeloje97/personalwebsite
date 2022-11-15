import { MongoClient, ObjectId } from "mongodb";
import { database, database } from "../helper/database";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(405).json({
      message:
        "Error, bad request. This end point only accepts request with PUT methods.",
    });
  }

  const client = await MongoClient.connect(database.url);

  const { updatedFile, sessionId } = JSON.parse(req.body);

  try {
    const database = client.db(database.name);

    const aboutMeCollection = database.collection("AboutMe");

    const admins = database.collection("Admins");

    const admin = admins.findOne({ sessionId });

    if (!admin) {
      res.status(401).json({ message: "Invalid Session ID" });
      client.close();
      return;
    }

    const fileId = ObjectId(updatedFile._id);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }

  client.close();
}
