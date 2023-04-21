import { ObjectId } from "mongodb";
import userVerified from "../middleware/userVerified";

async function handler(req, res) {
  if (req.method !== "PUT") {
    res
      .status(400)
      .json({ message: "Bad request. This end point only accept" });
    return;
  }

  const body = JSON.parse(req.body);
  await userVerified(req, res, async (db) => {
    try {
      const { updatedProject } = body;
      const collection = db.collection("Projects");
      const admins = db.collection("Admins");

      const user = await admins.findOne({ sessionId });

      if (!user) {
        res.status(401).json({ message: "Invalid Session ID" });
        return;
      }

      updatedProject._id = ObjectId(updatedProject._id);

      const response = await collection.updateOne(
        { _id: updatedProject._id },
        { $set: { ...updatedProject } }
      );

      res.status(200).json({ message: "Update Succesful!", body: response });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  });
}

export default handler;
