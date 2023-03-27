import {IScoreboard, Scoreboard} from './scoreboard';
import {ScoreboardRepository} from './repository/scoreboard-in-memory.repository';

describe('Scoreboard', () => {
  let scoreboard: IScoreboard;
  let mockRepository: jest.Mocked<ScoreboardRepository>;

  beforeEach(() => {
    mockRepository = {
      addGame: jest.fn(),
      deleteGame: jest.fn(),
      findGame: jest.fn(),
      updateGame: jest.fn(),
      findAllGames: jest.fn(),
    } as jest.Mocked<ScoreboardRepository>;

    scoreboard = new Scoreboard(mockRepository);
  });

  describe('startNewGame', () => {
    test('should start new game and call repository.addGame', () => {
      fail('Not implemented');
    });
  });

  describe('finishGame', () => {
    test('should finish game and call repository.deleteGame', () => {
      fail('Not implemented');
    });
  });

  describe('updateScore', () => {
    test('should update game score and call repository.updateGame', () => {
      fail('Not implemented');
    });
  });

  describe('getGamesSummary', () => {
    test('should return game summary and call repository.findAllGames', () => {
      fail('Not implemented');
    });
  });
});
