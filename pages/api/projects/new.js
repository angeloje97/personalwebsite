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
  const project = body.createdProject;
  const sessionId = body.sessionId;

  const client = await MongoClient.connect(database.url);
  try {
    const db = client.db(database.name);
    const admins = db.collection("Admins");
    const collection = db.collection("Projects");

    const authenticated = await admins.findOne({ sessionId });

    if (!authenticated) {
      res
        .status(401)
        .json({ message: "Invalid session ID to make this request" });
      client.close();
      return;
    }

    const newProject = await collection.insertOne(project);

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
