import { MongoClient } from "mongodb";
import { database } from "../helper/database";

export default async function (req, res) {
  if (req.method !== "POST") {
    res.json(404).json({
      message: "Bad request. This end point only accepts POST requests.",
    });
  }

  const client = await MongoClient.connect(database.url);

  const body = JSON.parse(req.body);

  const { newFile: createdFile, sessionId } = body;

  try {
    const db = client.db("Angelo");
    const collection = db.collection("AboutMe");
    const admins = db.collection("Admins");

    const admin = await admins.findOne({ sessionId });

    if (!admin) {
      res.status(401).json({ message: "Invalid Session ID" });
      client.close();
      return;
    }

    const newFile = await collection.insertOne(createdFile);

    res.status(200).json({
      message: "Succesful Request!",
      body: {
        newFile,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }

  client.close();
}
