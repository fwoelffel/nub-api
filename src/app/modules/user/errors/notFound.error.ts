export class UserNotFoundError extends Error {
  constructor(userId: number | string) {
    super(`User not found (id: ${userId})`);
    this.name = 'UserNotFoundError';
  }
}