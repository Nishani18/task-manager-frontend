import { useEffect, useState, useCallback } from "react";
import "./App.css";
import type { FilterType, Task } from "./types/component-types/task.types";
import type {
  ApiTask,
  GetTasksParams,
  PaginationInfo,
} from "./types/api.types";
import { taskApi } from "./api";
import TaskInput from "./components/TaskInput";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import Pagination from "./components/Pagination";
import Toast from "./components/Toast";
import ConfirmModal from "./components/ConfirmModal";

/* Maps API task to frontend Task format */
const mapApiTaskToTask = (apiTask: ApiTask): Task => ({
  id: apiTask._id,
  title: apiTask.title,
  completed: apiTask.status === "completed",
  createdAt: apiTask.createdAt,
  updatedAt: apiTask.updatedAt,
});

/* Toast message with type */
interface ToastState {
  message: string;
  type: "success" | "error" | "info";
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  /* Show toast message */
  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      setToast({ message, type });
    },
    [],
  );

  /* Fetch tasks from API with server-side filtering and pagination */
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);

      const params: GetTasksParams = {
        limit: 10, // Use a small limit to demonstrate pagination
        page: page,
      };

      // Applying server-side filtering
      if (filter !== "all") {
        params.status = filter;
      }

      const response = await taskApi.getTasks(params);

      if (response.success && response.data) {
        setTasks(response.data.map(mapApiTaskToTask));
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch tasks";
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  }, [filter, page, showToast]);

  /* Handle filter change - resets page to 1 */
  const handleFilterChange = (newFilter: FilterType) => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    setPage(1); // Reset to first page on filter change
  };

  /* Handle page change */
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top of list
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Fetch data when filter or page changes */
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /* Add a new task */
  const addTask = async (title: string) => {
    try {
      setSubmitting(true);
      const response = await taskApi.createTask({ title });
      if (response.success && response.data) {
        fetchTasks();
        showToast("Task added successfully", "success");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create task";
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  /* Toggle task completion status*/
  const toggleTaskStatus = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus = task.completed ? "pending" : "completed";

    try {
      setLoadingTaskId(id);
      const response = await taskApi.updateTaskStatus(id, {
        status: newStatus,
      });
      if (response.success && response.data) {
        fetchTasks();
        showToast(`Task marked as ${newStatus}`, "success");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update task";
      showToast(message, "error");
    } finally {
      setLoadingTaskId(null);
    }
  };

  /* Handle delete button click - opens confirmation modal*/
  const handleDeleteClick = (id: string) => {
    setDeleteTaskId(id);
  };

  /* Confirm and execute task deletion*/
  const confirmDelete = async () => {
    if (deleteTaskId === null) return;

    try {
      setDeleteLoading(true);
      const response = await taskApi.deleteTask(deleteTaskId);
      if (response.success) {
        fetchTasks();
        showToast("Task deleted successfully", "success");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete task";
      showToast(message, "error");
    } finally {
      setDeleteLoading(false);
      setDeleteTaskId(null);
    }
  };

  /* Cancel deletion*/
  const cancelDelete = () => {
    setDeleteTaskId(null);
  };

  const taskToDelete = tasks.find((task) => task.id === deleteTaskId);

  return (
    <div className="app">
      <div className="card">
        <h1>Tasks</h1>

        <TaskInput onAddTask={addTask} loading={submitting} />
        <TaskFilter activeFilter={filter} onChange={handleFilterChange} />
        <TaskList
          tasks={tasks}
          loading={loading}
          onToggle={toggleTaskStatus}
          onDelete={handleDeleteClick}
          loadingTaskId={loadingTaskId}
        />

        {pagination && (
          <Pagination
            info={pagination}
            onPageChange={handlePageChange}
            loading={loading}
          />
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ConfirmModal
        isOpen={deleteTaskId !== null}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title || ""}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        loading={deleteLoading}
      />
    </div>
  );
}

export default App;
