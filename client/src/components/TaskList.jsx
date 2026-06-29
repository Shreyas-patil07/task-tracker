import TaskCard from "./TaskCard";

function TaskList({ tasks, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;