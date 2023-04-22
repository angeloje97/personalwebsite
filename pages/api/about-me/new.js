import { MongoClient } from "mongodb";
import { database } from "../helper/database";
import userVerified from "../middleware/userVerified";

export default async function (req, res) {
  if (req.method !== "POST") {
    res.json(404).json({
      message: "Bad request. This end point only accepts POST requests.",
    });
  }

  const body = JSON.parse(req.body);
  const { newFile: createdFile } = body;
  await userVerified(req, res, async (db) => {
    try {
      const collection = db.collection("AboutMe");

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
  });
}
