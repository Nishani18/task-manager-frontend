import type {
  FilterType,
  TaskFilterProps,
} from "../types/component-types/task.types";
import "../App.css";

const TaskFilter = ({ activeFilter, onChange }: TaskFilterProps) => {
  return (
    <div className="filters">
      {(["all", "completed", "pending"] as FilterType[]).map((filter) => (
        <button
          key={filter}
          className={activeFilter === filter ? "active" : ""}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
export default TaskFilter;
