import { httpClient } from "./httpClient";
import type {
  GetTasksResponse,
  TaskResponse,
  CreateTaskPayload,
  UpdateTaskStatusPayload,
  GetTasksParams,
} from "../types/api.types";

/* ----------- Task API Service -----------*/
export const taskApi = {
  /* Get all tasks with optional filtering and pagination
   * @param params - Optional query parameters for filtering and pagination
   * @returns Promise with tasks data and pagination info
   */
  getTasks: (params?: GetTasksParams): Promise<GetTasksResponse> => {
    return httpClient.get<GetTasksResponse>("", params);
  },

  /**
   * Create a new task
   * @param payload - Task creation data (title, optional status)
   * @returns Promise with created task data
   */
  createTask: (payload: CreateTaskPayload): Promise<TaskResponse> => {
    return httpClient.post<TaskResponse>("", payload);
  },

  /**
   * Update task status
   * @param id - Task ID
   * @param payload - Status update payload
   * @returns Promise with updated task data
   */
  updateTaskStatus: (
    id: string,
    payload: UpdateTaskStatusPayload,
  ): Promise<TaskResponse> => {
    return httpClient.patch<TaskResponse>(`/${id}`, payload);
  },

  /**
   * Delete a task
   * @param id - Task ID
   * @returns Promise with deleted task data
   */
  deleteTask: (id: string): Promise<TaskResponse> => {
    return httpClient.delete<TaskResponse>(`/${id}`);
  },
};

export default taskApi;
