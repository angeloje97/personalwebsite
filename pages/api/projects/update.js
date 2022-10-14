import { MongoClient, ObjectId } from "mongodb";
import { database } from "../helper/database";

async function handler(req, res) {
  if (req.method !== "PUT") {
    res
      .status(400)
      .json({ message: "Bad request. This end point only accept" });
    return;
  }

  const client = await MongoClient.connect(database.url);

  const body = JSON.parse(req.body);

  try {
    const { updatedProject, sessionId } = body;
    const db = client.db("Angelo");
    const collection = db.collection("Projects");
    const admins = db.collection("Admins");

    const user = await admins.findOne({ sessionId });

    if (!user) {
      res.status(401).json({ message: "Invalid Session ID" });
      return;
    }

    updatedProject._id = ObjectId(updatedProject._id);

    const response = await collection.updateOne(
      { _id: updatedProject._id },
      { $set: { ...updatedProject } }
    );

    res.status(200).json({ message: "Update Succesful!", body: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
  client.close();
}

export default handler;
