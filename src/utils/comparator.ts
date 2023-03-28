import {IGame} from '../entities';

export const sortGamesByTotalAndTimeDesc = (a: IGame, b: IGame) => {
  if (b.totalScore === a.totalScore) {
    const date1 = new Date(b.startTime).getTime();
    const date2 = new Date(a.startTime).getTime();
    return date1 - date2;
  }
  return b.totalScore - a.totalScore;
};
