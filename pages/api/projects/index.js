import { MongoClient } from "mongodb";
import { database } from "../helper/database";
import userVerified from "../middleware/userVerified";

async function handler(req, res) {
  try {
    const client = await MongoClient.connect(database.url);

    const db = client.db(database.name);

    const collection = db.collection("Projects");

    const projects = await collection.find({}).toArray();

    res.status(200).json({
      success: "success!",
      body: {
        projects,
      },
    });

    client.close();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

export default handler;
