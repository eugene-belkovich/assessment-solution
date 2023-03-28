import {Game} from '../../entities/game.entity';
import {PropertyValidationError} from '../../errors';
import {CountryNameEnum} from '../../enums';

describe('Game', () => {
  let game: Game;

  test('should create correct Game with initial score 0-0', () => {
    game = new Game(CountryNameEnum.Mexico, CountryNameEnum.Canada);
    expect(game.homeTeam).toEqual(CountryNameEnum.Mexico);
    expect(game.awayTeam).toEqual(CountryNameEnum.Canada);
    expect(game.homeScore).toEqual(0);
    expect(game.awayScore).toEqual(0);
    expect(game.totalScore).toEqual(0);
    expect(game.startTime).not.toEqual(null);
    expect(typeof game.startTime).toBe('object');
  });

  test('should correctly update score and total score', () => {
    game = new Game(CountryNameEnum.Mexico, CountryNameEnum.Canada);
    expect(game.homeTeam).toEqual(CountryNameEnum.Mexico);
    expect(game.awayTeam).toEqual(CountryNameEnum.Canada);
    expect(game.homeScore).toEqual(0);
    expect(game.awayScore).toEqual(0);
    expect(game.totalScore).toEqual(0);
    game.updateScore(3, 3);
    expect(game.homeScore).toEqual(3);
    expect(game.awayScore).toEqual(3);
    expect(game.totalScore).toEqual(6);
    game.updateScore(2, 2);
    expect(game.homeScore).toEqual(2);
    expect(game.awayScore).toEqual(2);
    expect(game.totalScore).toEqual(4);
    game.updateScore(0, 0);
    expect(game.homeScore).toEqual(0);
    expect(game.awayScore).toEqual(0);
    expect(game.totalScore).toEqual(0);
  });

  test('should throw error cause homeTeam is null', () => {
    try {
      game = new Game(null, CountryNameEnum.Canada);
    } catch (error) {
      expect(error).toBeInstanceOf(PropertyValidationError);
    }
  });

  test('should throw error cause awayTeam is null', () => {
    try {
      game = new Game(CountryNameEnum.Canada, null);
    } catch (error) {
      expect(error).toBeInstanceOf(PropertyValidationError);
    }
  });

  test('should throw error cause updateScore get negative number', () => {
    try {
      game = new Game(CountryNameEnum.Mexico, CountryNameEnum.Canada);
      game.updateScore(-1, 0);
    } catch (error) {
      expect(error).toBeInstanceOf(PropertyValidationError);
    }

    try {
      game = new Game(CountryNameEnum.Mexico, CountryNameEnum.Canada);
      game.updateScore(0, -1);
    } catch (error) {
      expect(error).toBeInstanceOf(PropertyValidationError);
    }
  });
});
