import { MongoClient } from "mongodb";
import { database } from "./helper/database";
import { randomString } from "./helper/stringHelper";

async function handler(req, res) {
  if (req.method !== "PUT") {
    res
      .status(404)
      .json("Bad request, this end point only accepts PUT requests");
    return;
  }

  const body = JSON.parse(req.body);

  const { username, password } = body;

  try {
    const client = await MongoClient.connect(database.url);
    const db = client.db(database.name);

    const collection = db.collection("Admins");

    const user = await collection.findOne({
      username: username.toLowerCase(),
      password,
    });

    const newSessionId = randomString(50);

    if (!user) {
      res.status(401).json({ message: "Username and password does not match" });
      return;
    }

    const sessionLifeTime = new Date(new Date().getTime() + 1440 * 1000);

    await collection.updateOne(
      { _id: user._id },
      { $set: { sessionId: newSessionId, sessionLifeTime } }
    );

    client.close();

    res.status(200).json({
      successful: "Successful!",
      body: { username: user.alias, sessionId: newSessionId, sessionLifeTime },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

export default handler;
