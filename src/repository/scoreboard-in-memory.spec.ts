import {ScoreboardInMemoryRepository} from './scoreboard-in-memory.repository';
import {Game} from '../entities/game.entity';
import {ScoreboardRepositoryError} from '../errors';
import {CountryNameEnum} from '../enums';

describe('ScoreboardInMemoryRepository', () => {
  let repository: ScoreboardInMemoryRepository;

  beforeEach(() => {
    repository = new ScoreboardInMemoryRepository();
  });

  describe('addGame', () => {
    test('should added game', () => {
      const game = new Game(CountryNameEnum.Mexico, CountryNameEnum.Canada);
      repository.addGame(game);
      const expected = repository.findOneGame(CountryNameEnum.Mexico, CountryNameEnum.Canada);
      expect(expected).toEqual(game);
      expect(expected.startTime).toEqual(game.startTime);
      expect(expected.homeTeam).toEqual(game.homeTeam);
      expect(expected.awayTeam).toEqual(game.awayTeam);
      expect(expected.homeScore).toEqual(game.homeScore);
      expect(expected.awayScore).toEqual(game.awayScore);
      expect(expected.totalScore).toEqual(game.totalScore);
    });

    test('should throw error because game already exists', () => {
      const game = new Game(CountryNameEnum.Mexico, CountryNameEnum.Canada);
      repository.addGame(game);
      try {
        repository.addGame(game);
      } catch (error) {
        expect(error).toBeInstanceOf(ScoreboardRepositoryError);
      }
    });

    test('should throw error cause empty game', () => {
      try {
        repository.addGame(null);
      } catch (error) {
        expect(error).toBeInstanceOf(ScoreboardRepositoryError);
      }
    });
  });

  describe('deleteGame', () => {
    test('should deleted game', () => {
      const game = new Game(CountryNameEnum.Mexico, CountryNameEnum.Canada);
      repository.addGame(game);
      repository.deleteGame(CountryNameEnum.Mexico, CountryNameEnum.Canada);
      const expected = repository.findGame(CountryNameEnum.Mexico, CountryNameEnum.Canada);
      expect(expected).toEqual(undefined);
    });

    test('should delete game only if exist', () => {
      try {
        repository.deleteGame(CountryNameEnum.Mexico, CountryNameEnum.Canada);
      } catch (error) {
        expect(error).toBeInstanceOf(ScoreboardRepositoryError);
      }
    });
  });

  describe('updateGame', () => {
    test('should update game', () => {
      const game = new Game(CountryNameEnum.Mexico, CountryNameEnum.Canada);
      repository.addGame(game);
      game.updateScore(1, 0);
      repository.updateGame(game);
      const expected = repository.findOneGame(CountryNameEnum.Mexico, CountryNameEnum.Canada);
      expect(expected.homeScore).toEqual(1);
      expect(expected.totalScore).toEqual(1);
    });

    test('should update game only if exist', () => {
      try {
        const game = new Game(CountryNameEnum.Mexico, CountryNameEnum.Canada);
        repository.addGame(game);
        const game2 = new Game(CountryNameEnum.Spain, CountryNameEnum.Brazil);
        repository.updateGame(game2);
      } catch (error) {
        expect(error).toBeInstanceOf(ScoreboardRepositoryError);
      }
    });
  });

  describe('findAllGames', () => {
    test('should return 0 games by default', () => {
      expect(repository.findAllGames()).toEqual([]);
      expect(repository.findAllGames().length).toEqual(0);
    });

    test('should return all games', () => {
      const game = new Game(CountryNameEnum.Mexico, CountryNameEnum.Canada);
      repository.addGame(game);
      const game2 = new Game(CountryNameEnum.Spain, CountryNameEnum.Brazil);
      repository.addGame(game2);
      expect(repository.findAllGames()[0]).toEqual(game);
      expect(repository.findAllGames()[1]).toEqual(game2);
      expect(repository.findAllGames().length).toEqual(2);
    });
  });
});
