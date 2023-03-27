import {Optional} from '../utils';
import {Game} from '../entities/game.entity';
import {ScoreboardRepositoryError} from "../validation";

export interface ScoreboardRepository {
  addGame(game: Game): void;
  deleteGame(homeTeam: string, awayTeam: string): void;
  updateGame(game: Game): void;
  findGame(homeTeam: string, awayTeam: string): Optional<Game>;
  findAllGames(): Game[];
}

export const GAME_IS_NULL: string = 'Game cannot be null';
export const GAME_ALREADY_EXISTS: string = 'Game already exists';

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
      throw new ScoreboardRepositoryError(GAME_IS_NULL);
    }

    const foundGame: Game = this.findGame(game.homeTeam, game.awayTeam);
    if (foundGame) {
      throw new ScoreboardRepositoryError(GAME_ALREADY_EXISTS);
    }

    this._backend.set(this.getKey(game.homeTeam, game.awayTeam), game);
  }

  public deleteGame(homeTeam: string, awayTeam: string): void {
    console.log('deleteGame');
  }

  public updateGame(game: Game): void {
    console.log('updateGame');
  }

  public findGame(homeTeam: string, awayTeam: string): Optional<Game> {
    return this._backend.get(this.getKey(homeTeam, awayTeam));
  }

  public findAllGames(): Game[] {
    return Array.from(this._backend.values());
  }
}
