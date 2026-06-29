import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import api from "../services/api";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
        const createTask = async (taskData) => {
      try {
        await api.post("/tasks", taskData);
        fetchTasks();
        } catch (error) {
          console.error(error);
        }
      };
      
      const updateTask = async (id, taskData) => {
  try {
    await api.put(`/tasks/${id}`, taskData);

    setEditingTask(null);

    fetchTasks();
  } catch (error) {
    console.error(error);
  }
};

      const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };
  
  const editTask = (task) => {
  setEditingTask(task);
};
  
  useEffect(() => {
    fetchTasks();
  },
  []);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">

          <TaskForm
            editingTask={editingTask}
            onTaskCreated={createTask}
            onTaskUpdated={updateTask}
          />

          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onEdit={editTask}
            onUpdate={updateTask}
          />

        </div>
      </main>
    </>
  );
}

export default Home;