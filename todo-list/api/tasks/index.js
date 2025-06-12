import { connectToDatabase } from "@/lib/db";
import Task from "@/models/Task";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const tasks = await Task.find();
      return res.status(200).json(tasks);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Erreur de récupération", error: err.message });
    }
  }

  if (req.method === "POST") {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Titre et description requis" });
    }

    try {
      const newTask = new Task({ title, description, completed: false });
      const saved = await newTask.save();
      return res.status(201).json(saved);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Erreur de création", error: err.message });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}
