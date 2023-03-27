import {CountryNameEnum} from '../enums/country.enum';
import {IsEnum} from 'class-validator';
import {BaseEntity} from './base-entity';

export interface ICountry {
  name: CountryNameEnum;
}

export class Country extends BaseEntity implements ICountry {
  @IsEnum(CountryNameEnum, {
    message: 'Country name is not supported',
  })
  private _name: CountryNameEnum;

  public constructor(name: CountryNameEnum) {
    super();
    this.name = name;
    this.validate();
  }

  public get name(): CountryNameEnum {
    return this._name;
  }

  public set name(name: CountryNameEnum) {
    this._name = name;
  }
}
