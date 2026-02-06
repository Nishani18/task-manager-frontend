// ----------- Task Types ----------

// ----------- Task -----------
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type FilterType = "all" | "completed" | "pending";

// ---------- Task Props ----------
export interface TaskInputProps {
  onAddTask: (title: string) => void;
  loading?: boolean;
}

// ---------- Task Filter Props ----------
export interface TaskFilterProps {
  activeFilter: FilterType;
  onChange: (filter: FilterType) => void;
}

// ----------- Task Item Props ----------
export interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

// ---------- Task List Props -----------
export interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  loadingTaskId?: string | null;
}

// -------- Toast props -----------
export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

// -------- Confirm Modal Props -----------
export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}
