function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold">{task.title}</h2>

      <p className="text-gray-600 mt-2">{task.description}</p>

      <div className="flex justify-between mt-5">
        <div>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {task.priority}
          </span>

          <p className="text-sm text-gray-500 mt-2">
            Status: {task.status}
          </p>

          <p className="text-sm text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        </div>

        <div className="space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
            Edit
            </button>

          <button
            onClick={() => onDelete(task._id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;