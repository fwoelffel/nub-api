export class UserNotFoundError extends Error {
  constructor() {
    super(`Invalid credentials`);
    this.name = 'UnauthorizedError';
  }
}