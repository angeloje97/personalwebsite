import { MongoClient, ObjectId } from "mongodb";
import { database } from "../helper/database";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(405).json({
      message:
        "Error, bad request. This end point only accepts request with PUT methods.",
    });
  }

  const client = await MongoClient.connect(database.url);

  const { updatedFile, sessionId } = JSON.parse(req.body);

  try {
    const db = client.db(database.name);

    const admins = db.collection("Admins");
    const aboutMeCollection = db.collection("AboutMe");

    const admin = await admins.findOne({ sessionId });

    if (!admin) {
      res.status(401).json({ message: "Invalid Session ID" });
      client.close();
      return;
    }

    updatedFile._id = ObjectId(updatedFile._id);
    // const aboutMeCollection = database.collection("AboutMe");

    const response = await aboutMeCollection.updateOne(
      { _id: updatedFile._id },
      {
        $set: { ...updatedFile },
      }
    );

    res.status(200).json({ message: "Update successful!", body: response });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }

  client.close();
}
