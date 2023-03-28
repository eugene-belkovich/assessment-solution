import {Country} from '../../entities/country.entity';
import {PropertyValidationError} from '../../errors';
import {CountryNameEnum} from "../../enums";

describe('Country', () => {
  let country: Country;

  test('should create correct country', () => {
    country = new Country(CountryNameEnum.Mexico);

    expect(country.name).toEqual(CountryNameEnum.Mexico);
    expect(country.name).toEqual('Mexico');
  });

  test('should create correct country', () => {
    /* tslint:disable-next-line */
    country = new Country(CountryNameEnum['Mexico']);

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

  test('should throw error cause country is empty', () => {
    try {
      country = new Country('' as CountryNameEnum);
    } catch (error) {
      expect(error).toBeInstanceOf(PropertyValidationError);
    }
  });

  test('should throw error cause country is null', () => {
    try {
      country = new Country(null);
    } catch (error) {
      expect(error).toBeInstanceOf(PropertyValidationError);
    }
  });

  test('should throw error cause country is undefined', () => {
    try {
      country = new Country(undefined);
    } catch (error) {
      expect(error).toBeInstanceOf(PropertyValidationError);
    }
  });
});
