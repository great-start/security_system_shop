export interface ErrorsResponse {
  error: string;
  message: [Record<string, any>] | Record<string, any> | string;
  statusCode: number;
}
