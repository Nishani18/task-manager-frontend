import { useEffect } from "react";
import type { ToastProps } from "../types/component-types/task.types";
import "../App.css";

const Toast = ({ message, type = "success", onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastClassName = () => {
    const baseClass = "toast";
    switch (type) {
      case "error":
        return `${baseClass} toast-error`;
      case "info":
        return `${baseClass} toast-info`;
      case "success":
      default:
        return `${baseClass} toast-success`;
    }
  };

  return (
    <div className={getToastClassName()}>
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;
