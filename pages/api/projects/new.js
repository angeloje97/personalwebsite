import userVerified from "../middleware/userVerified";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404).json({
      message: "Bad request. This end point only accepts POST requests",
    });
  }

  await userVerified(req, res, async (db) => {
    const body = JSON.parse(req.body);
    const project = body.createdProject;

    try {
      const collection = db.collection("Projects");
      const newProject = await collection.insertOne(project);

      console.log(newProject);

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
  });
}

export default handler;
