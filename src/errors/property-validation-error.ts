export class PropertyValidationError extends Error {
  public readonly errors = [];

  public constructor(message: string, errors?: any) {
    super();
    this.name = this.constructor?.name;
    this.message = `${message} ${this.prepareExceptionMessage()}`;

    if (errors.length > 0) {
      errors.forEach((error) => {
        this.errors.push({
          property: error.property,
          message: error.constraints ? Object.values(error.constraints) : [],
        });
      });
    }
  }

  private prepareExceptionMessage(): string {
    return `Errors: ${this.errors}`;
  }
}
