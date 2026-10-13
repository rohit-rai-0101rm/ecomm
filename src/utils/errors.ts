import axios from 'axios';

export const OFFLINE_MESSAGE = 'No internet connection';

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return OFFLINE_MESSAGE;
    }
    return `Server error (${error.response.status}). Please try again.`;
  }
  return 'Something went wrong. Please try again.';
}
