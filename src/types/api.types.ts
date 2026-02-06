// ----------- API Response Types ----------

/* Base API response structure */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/* Task data from API (matches backend model) */
export interface ApiTask {
  _id: string;
  title: string;
  status: "pending" | "completed";
  createdAt: string;
  updatedAt: string;
}

/* Pagination info from API */
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalTasks: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/* Response for getTasks endpoint */
export interface GetTasksResponse extends ApiResponse<ApiTask[]> {
  count: number;
  pagination: PaginationInfo;
}

/* Response for single task operations */
export interface TaskResponse extends ApiResponse<ApiTask> {}

/* Request payload for creating a task */
export interface CreateTaskPayload {
  title: string;
  status?: "pending" | "completed";
}

/* Request payload for updating task status */
export interface UpdateTaskStatusPayload {
  status: "pending" | "completed";
}

/* Query params for getTasks */
export interface GetTasksParams {
  [key: string]: string | number | undefined;
  status?: "pending" | "completed";
  page?: number;
  limit?: number;
}

/* Custom API error class for frontend */
export class ApiError extends Error {
  public statusCode: number;
  public originalError?: unknown;

  constructor(message: string, statusCode: number, originalError?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.originalError = originalError;
  }

  static fromResponse(response: Response, message?: string): ApiError {
    return new ApiError(
      message || `Request failed with status ${response.status}`,
      response.status,
    );
  }

  static networkError(error: unknown): ApiError {
    return new ApiError(
      "Network error. Please check your connection.",
      0,
      error,
    );
  }
}
