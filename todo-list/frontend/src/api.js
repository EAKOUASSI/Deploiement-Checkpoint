const API_BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""; // Vercel utilisera le même domaine

const TASKS_API = `${API_BASE_URL}/api/tasks`;

// Récupérer toutes les tâches
export const getTasks = async () => {
  const res = await fetch(TASKS_API);
  if (!res.ok) throw new Error("Erreur lors du chargement des tâches");
  return res.json();
};

// Créer une nouvelle tâche
export const createTask = async (task) => {
  const res = await fetch(TASKS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, isDone: false })
  });
  if (!res.ok) throw new Error("Erreur lors de la création de la tâche");
  return res.json();
};

// Mettre à jour une tâche
export const updateTask = async (id, updates) => {
  const res = await fetch(`${TASKS_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour de la tâche");
  return res.json();
};

// Supprimer une tâche
export const deleteTask = async (id) => {
  const res = await fetch(`${TASKS_API}/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression de la tâche");
  return res.json();
};
