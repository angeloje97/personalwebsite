import { ObjectId } from "mongodb";
import userVerified from "../middleware/userVerified";

async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(400).json({
      message: "Bad request, this request only accepts DELETE methods",
    });
    return;
  }

  await userVerified(req, res, async (db) => {
    try {
      const body = JSON.parse(req.body);
      const { projectIds } = body;

      const formattedIds = projectIds.map((id) => ObjectId(id));

      console.log(body);

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
  });
}

export default handler;
