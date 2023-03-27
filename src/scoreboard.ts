import {Type} from 'class-transformer';
import {ScoreboardInMemoryRepository, ScoreboardRepository} from './repository/scoreboard-in-memory.repository';
import {Game} from "./entities/game.entity";
import {sortGamesByTotalAndTimeDesc} from "./utils/comparator";
import {lineFormatter} from "./utils/line-formatter";

export interface IScoreboard {
  startNewGame(homeTeam: string, awayTeam: string): void;
  finishGame(homeTeam: string, awayTeam: string): void;
  updateScore(homeTeam: string, awayTeam: string, homeScore: number, awayScore: number): void;
  getGamesSummary(): string;
}

export class Scoreboard implements IScoreboard {
  @Type(() => ScoreboardInMemoryRepository)
  private _repository: ScoreboardRepository;

  public constructor(repository?: ScoreboardRepository) {
    this._repository = repository || new ScoreboardInMemoryRepository();
  }

  public startNewGame(homeTeam: string, awayTeam: string): void {
    this._repository.addGame(new Game(homeTeam, awayTeam));
  }

  public finishGame(homeTeam: string, awayTeam: string): void {
    this._repository.deleteGame(homeTeam, awayTeam);
  }

  public updateScore(homeTeam: string, awayTeam: string, homeScore: number, awayScore: number): void {
    const game: Game = this._repository.findOneGame(homeTeam, awayTeam);
    game.updateScore(homeScore, awayScore);
    this._repository.updateGame(game);
  }

  public getGamesSummary(): string {
    return this._repository
        .findAllGames()
        .sort(sortGamesByTotalAndTimeDesc)
        .map((game: Game, index: number) => lineFormatter(index + 1, game))
        .join('\n');
  }
}
