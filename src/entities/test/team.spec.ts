import {PropertyValidationError} from '../../validation';
import {Team} from '../team.entity';
import {Country} from '../country.entity';
import {CountryNameEnum} from "../../enums";

describe('Team', () => {
  let team: Team;

  test('should create correct Team with country Argentina', () => {
    team = new Team(new Country(CountryNameEnum.Argentina));

    expect(team.name).toEqual(CountryNameEnum.Argentina);
    expect(team.name).toEqual('Argentina');
  });

  test('should throw error cause Team is initialised by wrong country', () => {
    try {
      team = new Team(new Country('WrongCountry' as CountryNameEnum));
    } catch (error) {
      expect(error).toBeInstanceOf(PropertyValidationError);
    }
  });
});
