import { MongoClient } from "mongodb";
import { database } from "../helper/database";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(404).json({
      message: "Bad request. This end point only accepts POST requests",
    });
    return;
  }
  const body = JSON.parse(req.body);

  console.log(body);
  const client = await MongoClient.connect(database.url);
  try {
    const db = client.db("Angelo");
    const collection = db.collection("Projects");

    const newProject = await collection.insertOne(body);

    console.log(newProject);

    client.close();

    res.status(200).json({
      message: "Succesfuly created a new project!",
      body: { newProject },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
  client.close();
}

export default handler;
