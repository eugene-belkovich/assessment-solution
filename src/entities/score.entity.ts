import {IsInt, IsNumber, Min} from 'class-validator';
import {BaseEntity} from './base-entity';

export interface IScore {
  value: number;
}

export class Score extends BaseEntity implements IScore {
  @IsNumber()
  @IsInt()
  @Min(0, {
    message: 'Score cannot be negative',
  })
  private _value: number = 0;

  public constructor(value: number = 0) {
    super();
    this._value = value;
    this.validate();
  }

  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
  }
}
