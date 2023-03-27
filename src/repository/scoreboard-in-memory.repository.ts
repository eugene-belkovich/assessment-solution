import {Game} from '../entities/game.entity';
import {Optional} from "../utils";

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

  public addGame(game: Game): void {
    console.log('addGame');
  }

  public deleteGame(homeTeam: string, awayTeam: string): void {
    console.log('deleteGame');
  }

  public updateGame(game: Game): void {
    console.log('updateGame');
  }

  public findAllGames(): Game[] {
    return [];
  }

  public findGame(homeTeam: string, awayTeam: string): Optional<Game> {
    return undefined;
  }
}
