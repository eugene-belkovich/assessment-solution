import 'reflect-metadata';
import {Type} from 'class-transformer';
import {Country} from './country.entity';
import {BaseEntity} from './base-entity';

export interface ITeam {
  name: string;
}

export class Team extends BaseEntity implements ITeam {
  @Type(() => Country)
  private _country: Country;

  public constructor(country: Country) {
    super();
    this._country = country;
    this.validate();
  }

  public get name(): string {
    return this._country.name.toString();
  }
}
