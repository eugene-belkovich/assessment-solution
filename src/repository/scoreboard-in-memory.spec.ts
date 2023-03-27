import {ScoreboardInMemoryRepository} from './scoreboard-in-memory.repository';
import {Game} from '../entities/game.entity';
import {ScoreboardRepositoryError} from '../validation';

describe('ScoreboardInMemoryRepository', () => {
  let repository: ScoreboardInMemoryRepository;

  beforeEach(() => {
    repository = new ScoreboardInMemoryRepository();
  });

  describe('addGame', () => {
    test('should added game', () => {
      const game = new Game('Mexico', 'Canada');
      repository.addGame(game);
      const expected = repository.findGame('Mexico', 'Canada');
      expect(expected).toEqual(game);
      expect(expected.startTime).toEqual(game.startTime);
      expect(expected.homeTeam).toEqual(game.homeTeam);
      expect(expected.awayTeam).toEqual(game.awayTeam);
      expect(expected.homeScore).toEqual(game.homeScore);
      expect(expected.awayScore).toEqual(game.awayScore);
      expect(expected.totalScore).toEqual(game.totalScore);
    });

    test('should throw error because game already exists', () => {
      const game = new Game('Mexico', 'Canada');
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
      fail('Not implemented');
    });

    test('should delete game only if exist', () => {
      fail('Not implemented');
    });
  });

  describe('updateGame', () => {
    test('should update game', () => {
      fail('Not implemented');
    });

    test('should update game only if exist', () => {
      fail('Not implemented');
    });
  });

  describe('findAllGames', () => {
    test('should return 0 games by default', () => {
      expect(repository.findAllGames()).toEqual([]);
      expect(repository.findAllGames().length).toEqual(0);
    });

    test('should return all games', () => {
      const game = new Game('Mexico', 'Canada');
      repository.addGame(game);
      const game2 = new Game('Spain', 'Brazil');
      repository.addGame(game2);
      expect(repository.findAllGames()[0]).toEqual(game);
      expect(repository.findAllGames()[1]).toEqual(game2);
      expect(repository.findAllGames().length).toEqual(2);
    });
  });
});
