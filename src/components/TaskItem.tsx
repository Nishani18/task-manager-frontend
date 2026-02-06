import type { TaskItemProps } from "../types/component-types/task.types";
import "../App.css";

const TaskItem = ({
  task,
  onToggle,
  onDelete,
  loading = false,
}: TaskItemProps) => {
  return (
    <li className={`task-item ${loading ? "task-item-loading" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          disabled={loading}
        />
        <span className={task.completed ? "completed" : ""}>{task.title}</span>
      </label>
      <button
        className="ghost"
        onClick={() => onDelete(task.id)}
        disabled={loading}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
