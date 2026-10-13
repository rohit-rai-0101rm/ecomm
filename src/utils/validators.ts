export interface LoginErrors {
  username?: string;
  password?: string;
}

export const STATIC_USERNAME = 'test';
export const STATIC_PASSWORD = '123456';
export const MIN_PASSWORD_LENGTH = 6;

export function validateLogin(username: string, password: string): LoginErrors {
  const errors: LoginErrors = {};
  if (!username.trim()) {
    errors.username = 'Username is required';
  }
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  return errors;
}

export function isValidCredentials(username: string, password: string): boolean {
  return username.trim() === STATIC_USERNAME && password === STATIC_PASSWORD;
}
