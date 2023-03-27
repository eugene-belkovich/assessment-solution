import {Score} from '../score.entity';
import {PropertyValidationError} from '../../validation';

describe('Score', () => {
  let score: Score;

  test('should create correct Score with value 0', () => {
    score = new Score(0);

    expect(score.value).toEqual(0);
  });

  test('should create correct Score with value 999999', () => {
    score = new Score(999999);

    expect(score.value).toEqual(999999);
  });

  test('should throw error cause Score is negative', () => {
    try {
      score = new Score(-1);
    } catch (error) {
      expect(error).toBeInstanceOf(PropertyValidationError);
    }
  });

  test('should throw error cause Score is float', () => {
    try {
      score = new Score(1.1);
    } catch (error) {
      expect(error).toBeInstanceOf(PropertyValidationError);
    }
  });
});
