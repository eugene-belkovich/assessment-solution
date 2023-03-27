export class ScoreboardRepositoryError extends Error {
  public constructor(message: string) {
    super();
    this.message = message;
  }
}
