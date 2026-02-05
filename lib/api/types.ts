export type ApiError = {
  status: number; // HttpStatus
  message: string;
  subErrors?: string[];
};

export type ApiResponse<T> = {
  timestamp: string; // already formatted by backend
  data: T;
  error: ApiError | null;
};
