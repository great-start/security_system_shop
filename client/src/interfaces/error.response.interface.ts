export interface ErrorsResponse {
  error: string;
  message: [Record<string, any>];
  statusCode: number;
}
