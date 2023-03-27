import {ExceptionCodesEnum, PropertyValidationError} from '../validation';
import {validateSync} from 'class-validator';

export abstract class BaseEntity {
  public validate(): void {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new PropertyValidationError(
        `Class ${this.constructor.name}. ${ExceptionCodesEnum.ENTITY_VALIDATION_ERROR}`,
        errors,
      );
    }
  }
}
