import {Game} from '../entities/game.entity';

export const sortGamesByTotalAndTimeDesc = (a: Game, b: Game) => {
  if (b.totalScore === a.totalScore) {
    // @ts-ignore
    return b.startTime - a.startTime;
  }
  return b.totalScore - a.totalScore;
};
