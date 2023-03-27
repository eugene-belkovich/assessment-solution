import {Game} from '../entities/game.entity';

export const sortGamesByTotalDesc = (a: Game, b: Game) => b.totalScore - a.totalScore;
