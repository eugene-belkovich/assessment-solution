import {Game} from '../entities/game.entity';

export const lineFormatter = (index: number, game: Game): string =>
  `${index}. ${game.homeTeam} ${game.homeScore} - ${game.awayTeam} ${game.awayScore}`;
