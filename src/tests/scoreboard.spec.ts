import {IScoreboard, Scoreboard} from '../scoreboard';
import {CountryNameEnum, RepositoryErrorMessagesEnum} from '../enums';
import {Game} from '../entities';
import {ScoreboardRepositoryError} from '../errors';
import {IScoreboardRepository} from '../repository';

describe('Scoreboard', () => {
  let scoreboard: IScoreboard;
  let mockRepository: jest.Mocked<IScoreboardRepository>;

  beforeEach(() => {
    mockRepository = {
      addGame: jest.fn(),
      deleteGame: jest.fn(),
      findOneGame: jest.fn(),
      findGame: jest.fn(),
      updateGame: jest.fn(),
      findAllGames: jest.fn(),
    } as jest.Mocked<IScoreboardRepository>;

    scoreboard = new Scoreboard(mockRepository);
  });

  describe('startNewGame', () => {
    test('should call repository.addGame with a new game', () => {
      const homeTeam = CountryNameEnum.Spain;
      const awayTeam = CountryNameEnum.Germany;

      scoreboard.startNewGame(homeTeam, awayTeam);
      expect(mockRepository.addGame).toHaveBeenCalledTimes(1);
    });

    test('should propagate error when repository.addGame throws error', () => {
      const homeTeam = CountryNameEnum.Spain;
      const awayTeam = CountryNameEnum.Germany;

      const error = new ScoreboardRepositoryError(RepositoryErrorMessagesEnum.GAME_IS_NULL);

      mockRepository.addGame.mockImplementationOnce(() => {
        throw error;
      });

      expect(() => scoreboard.startNewGame(homeTeam, awayTeam)).toThrow(error);
      expect(mockRepository.addGame).toHaveBeenCalledTimes(1);
    });
  });

  describe('finishGame', () => {
    test('should call repository.deleteGame with home and away teams', () => {
      const homeTeam = CountryNameEnum.Spain;
      const awayTeam = CountryNameEnum.Germany;

      scoreboard.finishGame(homeTeam, awayTeam);

      expect(mockRepository.deleteGame).toHaveBeenCalledWith(homeTeam, awayTeam);
    });

    test('should propagate error when repository.deleteGame throws error', () => {
      const homeTeam = CountryNameEnum.Spain;
      const awayTeam = CountryNameEnum.Germany;

      const errorMessage = `The game with key "${homeTeam} - ${awayTeam}" is not not stored in database`;
      const error = new ScoreboardRepositoryError(errorMessage);

      mockRepository.deleteGame.mockImplementationOnce(() => {
        throw error;
      });

      expect(() => scoreboard.finishGame(homeTeam, awayTeam)).toThrow(error);
      expect(mockRepository.deleteGame).toHaveBeenCalledWith(homeTeam, awayTeam);
    });
  });

  describe('finishGame', () => {
    test('should call repository.deleteGame with home and away teams', () => {
      const homeTeam = CountryNameEnum.Spain;
      const awayTeam = CountryNameEnum.Germany;

      scoreboard.finishGame(homeTeam, awayTeam);

      expect(mockRepository.deleteGame).toHaveBeenCalledWith(homeTeam, awayTeam);
    });

    test('should propagate error when repository.deleteGame throws error', () => {
      const homeTeam = CountryNameEnum.Spain;
      const awayTeam = CountryNameEnum.Germany;

      const errorMessage = `The game with key "${homeTeam} - ${awayTeam}" is not not stored in database`;
      const error = new ScoreboardRepositoryError(errorMessage);

      mockRepository.deleteGame.mockImplementationOnce(() => {
        throw error;
      });

      expect(() => scoreboard.finishGame(homeTeam, awayTeam)).toThrow(error);
      expect(mockRepository.deleteGame).toHaveBeenCalledWith(homeTeam, awayTeam);
    });
  });

  describe('getGamesSummary', () => {
    it('should call repository.findAllGames and return the games summary', () => {
      const homeTeam1 = CountryNameEnum.Spain;
      const awayTeam1 = CountryNameEnum.Germany;

      const homeTeam2 = CountryNameEnum.Argentina;
      const awayTeam2 = CountryNameEnum.Brazil;

      const game1 = new Game(homeTeam1, awayTeam1);
      game1.updateScore(1, 2);
      const game2 = new Game(homeTeam2, awayTeam2);
      game2.updateScore(3, 3);

      mockRepository.findAllGames.mockReturnValue([game1, game2]);

      const summary = scoreboard.getGamesSummary();

      expect(mockRepository.findAllGames).toHaveBeenCalled();
      expect(summary).toEqual(
        expect.stringContaining(`1. Argentina 3 - Brazil 3
2. Spain 1 - Germany 2`),
      );
    });
  });
});
