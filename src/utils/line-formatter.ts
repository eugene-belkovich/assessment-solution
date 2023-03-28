import {IGame} from '../entities';

export const lineFormatter = (index: number, game: IGame): string =>
  `${index}. ${game.homeTeam} ${game.homeScore} - ${game.awayTeam} ${game.awayScore}`;
