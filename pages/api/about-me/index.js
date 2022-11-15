import { MongoClient } from "mongodb";
import { database } from "../helper/database";

async function handler(req, res) {
  const client = await MongoClient.connect(database.url);

  try {
    const db = client.db(database.name);
    const collection = db.collection("AboutMe");

    const aboutMeFiles = await collection.find({}).toArray();

    res
      .status(200)
      .json({ message: "Success!", body: { files: aboutMeFiles } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }

  client.close();
}

export default handler;
