import type { TaskListProps } from "../types/component-types/task.types";
import TaskItem from "./TaskItem";
import "../App.css";

const TaskList = ({
  tasks,
  loading,
  onToggle,
  onDelete,
  loadingTaskId = null,
}: TaskListProps) => {
  if (loading) return <p className="state">Loading tasks...</p>;

  if (tasks.length === 0) return <p className="state">No tasks found.</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          loading={loadingTaskId === task.id}
        />
      ))}
    </ul>
  );
};

export default TaskList;
