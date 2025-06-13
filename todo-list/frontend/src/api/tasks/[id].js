import { connectToDatabase } from "@/lib/db";
import Task from "@/models/Task";

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
      return res.status(200).json(task);
    }

    if (req.method === "PUT") {
      const { title, description, completed } = req.body;
      const updated = await Task.findByIdAndUpdate(
        id,
        { title, description, completed },
        { new: true, runValidators: true }
      );
      if (!updated)
        return res.status(404).json({ message: "Tâche non trouvée" });
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const deleted = await Task.findByIdAndDelete(id);
      if (!deleted)
        return res.status(404).json({ message: "Tâche non trouvée" });
      return res.status(200).json({ message: "Tâche supprimée avec succès" });
    }

    return res.status(405).json({ message: "Méthode non autorisée" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
}
