import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const task = new Task({ title, description, completed: false });
    await task.save();
    return res.status(201).json(task);
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}
