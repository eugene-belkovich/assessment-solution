import {Country} from '../country.entity';
import {CountryNameEnum} from '../../enums/country.enum';
import {PropertyValidationError} from '../../validation';

describe('Country', () => {
  let country: Country;

  test('should create correct country', () => {
    country = new Country(CountryNameEnum.Mexico);

    expect(country.name).toEqual(CountryNameEnum.Mexico);
    expect(country.name).toEqual('Mexico');
  });

  test('should throw error cause country not exist', () => {
    try {
      country = new Country('WrongCountry' as CountryNameEnum);
    } catch (error) {
      expect(error).toBeInstanceOf(PropertyValidationError);
    }
  });
});
