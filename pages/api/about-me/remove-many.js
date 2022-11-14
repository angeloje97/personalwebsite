import { MongoClient, ObjectId } from "mongodb";
import { database } from "../helper/database";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).json({
      message:
        "Error 404 bad request, this end point only accepts DELETE methods",
    });
    return;
  }

  const client = await MongoClient.connect(database.url);
  const { sessionId, fileIds } = JSON.parse(req.body);

  try {
    const db = client.db("Angelo");

    const admins = db.collection("Admins");

    const user = await admins.findOne({ sessionId });

    if (!user) {
      res.status(401).json({ message: "Session ID is invalid" });
      client.close();
      return;
    }

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

  client.close();
}
