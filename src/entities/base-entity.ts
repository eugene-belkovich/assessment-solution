import {PropertyValidationError} from '../errors';
import {validateSync} from 'class-validator';

const ENTITY_VALIDATION_ERROR = 'Entity errors error.';

export abstract class BaseEntity {
  public validate(): void {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new PropertyValidationError(`Class ${this.constructor.name}. ${ENTITY_VALIDATION_ERROR}`, errors);
    }
  }
}
