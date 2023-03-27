import {Optional} from '../utils';
import {Game} from '../entities/game.entity';
import {ScoreboardRepositoryError} from '../errors';
import {RepositoryErrorMessagesEnum} from '../enums';

export interface ScoreboardRepository {
  addGame(game: Game): void;
  deleteGame(homeTeam: string, awayTeam: string): void;
  updateGame(game: Game): void;
  findGame(homeTeam: string, awayTeam: string): Optional<Game>;
  findAllGames(): Game[];
}

export class ScoreboardInMemoryRepository implements ScoreboardRepository {
  private _backend: Map<string, Game>;

  public constructor() {
    this._backend = new Map<string, Game>();
  }

  private getKey(homeTeam: string, awayTeam: string): string {
    return `${homeTeam} - ${awayTeam}`;
  }

  public addGame(game: Game): void {
    if (!game) {
      throw new ScoreboardRepositoryError(RepositoryErrorMessagesEnum.GAME_IS_NULL);
    }

    const foundGame: Game = this.findGame(game.homeTeam, game.awayTeam);
    if (foundGame) {
      throw new ScoreboardRepositoryError(RepositoryErrorMessagesEnum.GAME_ALREADY_EXISTS);
    }

    this._backend.set(this.getKey(game.homeTeam, game.awayTeam), game);
  }

  public deleteGame(homeTeam: string, awayTeam: string): void {
    const game: Game = this.findGame(homeTeam, awayTeam);

    if (!game) {
      throw new ScoreboardRepositoryError(
        `${RepositoryErrorMessagesEnum.GAME_IS_NOT_EXISTS}${this.getKey(homeTeam, awayTeam)}`,
      );
    }

    this._backend.delete(this.getKey(homeTeam, awayTeam));
  }

  public updateGame(game: Game): void {
    const gameId: string = this.getKey(game.homeTeam, game.awayTeam);
    const foundGame: Game = this.findGame(game.homeTeam, game.awayTeam);

    if (!foundGame) {
      throw new ScoreboardRepositoryError(
        `${RepositoryErrorMessagesEnum.GAME_IS_NOT_EXISTS}${this.getKey(game.homeTeam, game.awayTeam)}`,
      );
    }

    this._backend.set(gameId, game);
  }

  public findGame(homeTeam: string, awayTeam: string): Optional<Game> {
    return this._backend.get(this.getKey(homeTeam, awayTeam));
  }

  public findAllGames(): Game[] {
    return Array.from(this._backend.values());
  }
}
