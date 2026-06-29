import { useState, useMemo } from "react";
import TaskCard from "./TaskCard";
import LoadingSpinner from "./LoadingSpinner";

function TaskList({ tasks, onDelete, onEdit, onToggleStatus, loading }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  console.log("Tasks:", tasks);
console.log("Is Array:", Array.isArray(tasks));

  const filtered = useMemo(() => {
    let result = Array.isArray(tasks) ? [...tasks] : [];

    // Search by title or description
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
      );
    }

    // Filter by status
    if (filterStatus !== "All") {
      result = result.filter((t) => t.status === filterStatus);
    }

    // Filter by priority
    if (filterPriority !== "All") {
      result = result.filter((t) => t.priority === filterPriority);
    }

    // Sort
    const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 };
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "dueDate":
        result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case "priority":
        result.sort(
          (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
        );
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [tasks, search, filterStatus, filterPriority, sortBy]);

  const hasActiveFilters =
    search.trim() || filterStatus !== "All" || filterPriority !== "All";

  const clearFilters = () => {
    setSearch("");
    setFilterStatus("All");
    setFilterPriority("All");
    setSortBy("newest");
  };

  return (
    <div className="md:col-span-2 space-y-4">
      {/* Controls */}
      <div className="bg-white rounded-xl shadow p-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter + Sort row */}
        <div className="flex flex-wrap gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title (A–Z)</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-500 hover:text-red-700 px-2 py-2 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-xs text-gray-400">
          {filtered.length} of {tasks.length} task
          {tasks.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <EmptyState hasFilters={hasActiveFilters || tasks.length > 0} />
      ) : (
        filtered.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
          />
        ))
      )}
    </div>
  );
}

function EmptyState({ hasFilters }) {
  return (
    <div className="bg-white rounded-xl shadow p-12 text-center">
      <div className="text-5xl mb-4">{hasFilters ? "🔍" : "📋"}</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        {hasFilters ? "No tasks match your filters" : "No tasks yet"}
      </h3>
      <p className="text-gray-400 text-sm">
        {hasFilters
          ? "Try adjusting your search or filter criteria."
          : "Add your first task using the form on the left."}
      </p>
    </div>
  );
}

export default TaskList;
