import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import api from "../services/api";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/tasks");
      setTasks(response.data.data);
    } catch (error) {
      toast.error("Failed to load tasks. Please try again.");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      await api.post("/tasks", taskData);
      toast.success("Task created successfully!");
      await fetchTasks();
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create task.";
      toast.error(message);
      throw error; // re-throw so form stays in submitting=false correctly
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      await api.put(`/tasks/${id}`, taskData);
      toast.success("Task updated successfully!");
      setEditingTask(null);
      await fetchTasks();
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update task.";
      toast.error(message);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted.");
      await fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task.");
      console.error(error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
    try {
      await api.put(`/tasks/${id}`, { status: newStatus });
      toast.success(
        newStatus === "Completed" ? "Task completed! 🎉" : "Task reopened."
      );
      await fetchTasks();
    } catch (error) {
      toast.error("Failed to update task status.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">

          <TaskForm
            editingTask={editingTask}
            onTaskCreated={createTask}
            onTaskUpdated={updateTask}
            onCancelEdit={() => setEditingTask(null)}
          />

          <TaskList
            tasks={tasks}
            loading={loading}
            onDelete={deleteTask}
            onEdit={setEditingTask}
            onToggleStatus={toggleStatus}
          />

        </div>
      </main>
    </>
  );
}

export default Home;
