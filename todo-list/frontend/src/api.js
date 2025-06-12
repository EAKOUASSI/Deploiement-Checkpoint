const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/tasks" // backend Express local
    : "/api/tasks"; // backend Vercel serverless

// Récupérer toutes les tâches
export const getTasks = async () => {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error("Erreur lors du chargement des tâches");
  return res.json();
};

// Créer une nouvelle tâche
export const createTask = async (task) => {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, isDone: false }) // on force isDone à false à la création
  });
  if (!res.ok) throw new Error("Erreur lors de la création de la tâche");
  return res.json();
};

// Mettre à jour une tâche existante
export const updateTask = async (id, updates) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour de la tâche");
  return res.json();
};

// Supprimer une tâche
export const deleteTask = async (id) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression de la tâche");
  return res.json();
};
