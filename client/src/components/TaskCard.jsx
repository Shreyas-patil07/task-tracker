const PRIORITY_STYLES = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const STATUS_STYLES = {
  Pending: "bg-orange-100 text-orange-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

function TaskCard({ task, onDelete, onEdit, onToggleStatus }) {
  const isOverdue =
    task.status === "Pending" &&
    new Date(task.dueDate) < new Date(new Date().toDateString());

  return (
    <div
      className={`bg-white rounded-xl shadow p-5 border-l-4 ${
        task.status === "Completed"
          ? "border-emerald-400 opacity-75"
          : isOverdue
          ? "border-red-400"
          : "border-blue-400"
      }`}
    >
      {/* Title + status badge */}
      <div className="flex items-start justify-between gap-2">
        <h2
          className={`text-lg font-semibold leading-snug ${
            task.status === "Completed" ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h2>
        <span
          className={`shrink-0 text-xs font-medium px-2 py-1 rounded-full ${
            STATUS_STYLES[task.status]
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap gap-2 mt-4 items-center">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            PRIORITY_STYLES[task.priority]
          }`}
        >
          {task.priority} Priority
        </span>

        <span
          className={`text-xs ${
            isOverdue ? "text-red-500 font-medium" : "text-gray-500"
          }`}
        >
          {isOverdue ? "⚠ Overdue · " : "Due: "}
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => onToggleStatus(task._id, task.status)}
          className={`text-sm px-3 py-1.5 rounded font-medium transition-colors ${
            task.status === "Pending"
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {task.status === "Pending" ? "✓ Complete" : "↩ Reopen"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded font-medium transition-colors"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
