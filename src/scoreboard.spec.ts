import {IScoreboard, Scoreboard} from './scoreboard';
import {ScoreboardRepository} from './repository/scoreboard-in-memory.repository';
import {CountryNameEnum, RepositoryErrorMessagesEnum} from "./enums";
import {Game} from "./entities/game.entity";
import {ScoreboardRepositoryError} from "./errors";

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
    test('should call repository.addGame with a new game', () => {
      const homeTeam = CountryNameEnum.Spain;
      const awayTeam = CountryNameEnum.Germany;

      const game = new Game(homeTeam, awayTeam);

      scoreboard.startNewGame(homeTeam, awayTeam);
      expect(mockRepository.addGame).toHaveBeenCalledWith(game);
    });

    test('should propagate error when repository.addGame throws error', () => {
      const homeTeam = CountryNameEnum.Spain;
      const awayTeam = CountryNameEnum.Germany;

      const game = new Game(homeTeam, awayTeam);

      const error = new ScoreboardRepositoryError(RepositoryErrorMessagesEnum.GAME_IS_NULL);

      mockRepository.addGame.mockImplementationOnce(() => {
        throw error;
      });

      expect(() => scoreboard.startNewGame(homeTeam, awayTeam)).toThrow(error);
      expect(mockRepository.addGame).toHaveBeenCalledWith(game);
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
