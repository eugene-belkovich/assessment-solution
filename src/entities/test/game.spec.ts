import {Game} from '../game.entity';

describe('Game', () => {
  let game: Game;

  test('should create correct Game with initial score 0-0', () => {
    game = new Game('Mexico', 'Canada');
    expect(game.homeTeam).toEqual('Mexico');
    expect(game.awayTeam).toEqual('Canada');
    expect(game.homeScore).toEqual(0);
    expect(game.awayScore).toEqual(0);
    expect(game.totalScore).toEqual(0);
    expect(game.startTime).not.toEqual(null);
    expect(game.startTime).toBeInstanceOf(Date);
  });

  test('should correctly update score and total score', () => {
    fail('Not implemented');
  });

  test('should throw error cause homeTeam is null', () => {
    fail('Not implemented');

  });

  test('should throw error cause awayTeam is null', () => {
    fail('Not implemented');

  });

  test('should throw error cause updateScore get negative number', () => {
    fail('Not implemented');
  });
});
