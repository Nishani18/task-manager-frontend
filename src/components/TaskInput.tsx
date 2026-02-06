import { useState } from "react";
import type { TaskInputProps } from "../types/component-types/task.types";
import "../App.css";

const TaskInput = ({ onAddTask, loading = false }: TaskInputProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || loading) return;
    onAddTask(title.trim());
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        className="input-field"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        disabled={loading}
      />
      <button type="submit" disabled={loading || !title.trim()}>
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default TaskInput;
