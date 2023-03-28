import {IGame} from '../entities';

export const sortGamesByTotalAndTimeDesc = (a: IGame, b: IGame) => {
  if (b.totalScore === a.totalScore) {
    // @ts-ignore
    return b.startTime - a.startTime;
  }
  return b.totalScore - a.totalScore;
};
