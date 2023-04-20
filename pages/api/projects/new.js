import { MongoClient } from "mongodb";
import { database } from "../helper/database";
import userVerified from "../middleware/userVerified";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404).json({
      message: "Bad request. This end point only accepts POST requests",
    });
  }

  await userVerified(req, res, async () => {
    const body = JSON.parse(req.body);
    const project = body.createdProject;

    const client = await MongoClient.connect(database.url);
    try {
      const db = client.db(database.name);

      const collection = db.collection("Projects");
      const newProject = await collection.insertOne(project);

      console.log(newProject);

      client.close();

      console.log(newProject.insertedId);

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
  });
}

export default handler;
