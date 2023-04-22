import { MongoClient, ObjectId } from "mongodb";
import { database } from "../helper/database";
import userVerified from "../middleware/userVerified";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).json({
      message:
        "Error 404 bad request, this end point only accepts DELETE methods",
    });
    return;
  }

  const { fileIds } = JSON.parse(req.body);

  await userVerified(req, res, async (db) => {
    try {
      const formattedIds = fileIds.map((id) => ObjectId(id));

      const collection = db.collection("AboutMe");

      const response = await collection.deleteMany({
        _id: { $in: formattedIds },
      });

      res.status(200).json({ message: "Successful!", body: response });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  });
}
