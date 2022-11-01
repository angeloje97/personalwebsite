import { MongoClient } from "mongodb";
import { database } from "../helper/database";

export default async function (req, res) {
  if (req.method !== "POST") {
    res.json(404).json({
      message: "Bad request. This end point only accepts POST requests.",
    });
  }

  const client = await MongoClient.connect(database.url);

  try {
    const db = client.db("Angelo");
    const collection = db.collection("AboutMe");
  } catch (error) {}

  client.close();
}
