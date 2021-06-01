class NotFoundError extends Error {
  public status = 404;

  public statusText = 'Not found';

  public code = 'NOT_FOUND';

  constructor(message: string) {
    super(`${message} not found.`);
    this.name = 'NotFoundError';
  }
}

class HikeNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Hike with id ${id}`);
    this.name = 'HikeNotFoundError';
  }
}

export { HikeNotFoundError, NotFoundError };
