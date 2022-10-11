import { MongoClient, ObjectId } from "mongodb";
import { database } from "../helper/database";

async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(400).json({
      message: "Bad request, this request only accepts DELETE methods",
    });
    return;
  }

  const client = await MongoClient.connect(database.url);

  try {
    const body = JSON.parse(req.body);
    const { projectIds, sessionId } = body;

    const formattedIds = projectIds.map((id) => ObjectId(id));

    console.log(body);

    const db = client.db("Angelo");
    const collection = db.collection("Projects");

    const response = await collection.deleteMany({
      _id: { $in: formattedIds },
    });

    console.log(response);
    res.status(200).json({ successful: "Successful!", body: response });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ mesage: "Something went wrong", error: error.message });
  }

  client.close();
}

export default handler;
