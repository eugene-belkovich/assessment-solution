import {LiveFootballWorldCupScoreboard} from '../live-football-world-cup-scoreboard';
import {CountryNameEnum} from '../enums';
import {delay} from "../utils";



describe('LiveFootballWorldCupScoreboard', () => {
  let scoreboard: LiveFootballWorldCupScoreboard;

  beforeEach(() => {
    scoreboard = new LiveFootballWorldCupScoreboard();
  });

  test('should added games', () => {
    expect(scoreboard.getGamesSummary()).toEqual('');

    scoreboard.startNewGame(CountryNameEnum.Mexico, CountryNameEnum.Canada);
    scoreboard.startNewGame(CountryNameEnum.Spain, CountryNameEnum.Brazil);
    scoreboard.updateScore(CountryNameEnum.Spain, CountryNameEnum.Brazil, 1, 0);
    expect(scoreboard.getGamesSummary()).toEqual(`1. Spain 1 - Brazil 0\n2. Mexico 0 - Canada 0`);
  });

  test('should finish game', () => {
    expect(scoreboard.getGamesSummary()).toEqual('');

    scoreboard.startNewGame(CountryNameEnum.Mexico, CountryNameEnum.Canada);
    scoreboard.finishGame(CountryNameEnum.Mexico, CountryNameEnum.Canada);
    expect(scoreboard.getGamesSummary()).toEqual('');
  });

  test('should update game', () => {
    scoreboard.startNewGame(CountryNameEnum.Mexico, CountryNameEnum.Canada);
    expect(scoreboard.getGamesSummary()).toEqual(`1. Mexico 0 - Canada 0`);
    scoreboard.updateScore(CountryNameEnum.Mexico, CountryNameEnum.Canada, 1, 0);
    expect(scoreboard.getGamesSummary()).toEqual(`1. Mexico 1 - Canada 0`);
  });

  test('should return summary based on total score and most recently added game', async () => {
    scoreboard.startNewGame(CountryNameEnum.Mexico, CountryNameEnum.Canada);
    await delay(30)
    scoreboard.startNewGame(CountryNameEnum.Spain, CountryNameEnum.Brazil);
    await delay(30)
    scoreboard.startNewGame(CountryNameEnum.Argentina, CountryNameEnum.Germany);
    await delay(30)

    expect(scoreboard.getGamesSummary()).toEqual(
        `1. Argentina 0 - Germany 0\n2. Spain 0 - Brazil 0\n3. Mexico 0 - Canada 0`,
    );

    scoreboard.updateScore(CountryNameEnum.Argentina, CountryNameEnum.Germany, 2, 2);
    expect(scoreboard.getGamesSummary()).toEqual(
        `1. Argentina 2 - Germany 2\n2. Spain 0 - Brazil 0\n3. Mexico 0 - Canada 0`,
    );

    scoreboard.updateScore(CountryNameEnum.Spain, CountryNameEnum.Brazil, 3, 3);
    expect(scoreboard.getGamesSummary()).toEqual(
        `1. Spain 3 - Brazil 3\n2. Argentina 2 - Germany 2\n3. Mexico 0 - Canada 0`,
    );
  });

  test('main test for task', async () => {
    scoreboard.startNewGame(CountryNameEnum.Mexico, CountryNameEnum.Canada)
    await delay(10);
    scoreboard.startNewGame(CountryNameEnum.Spain, CountryNameEnum.Brazil)
    await delay(10);
    scoreboard.startNewGame(CountryNameEnum.Germany, CountryNameEnum.France)
    await delay(10);
    scoreboard.startNewGame(CountryNameEnum.Uruguay, CountryNameEnum.Italy)
    await delay(10);
    scoreboard.startNewGame(CountryNameEnum.Argentina, CountryNameEnum.Australia)
    expect(scoreboard.getGamesSummary()).toEqual(
        `1. Argentina 0 - Australia 0\n2. Uruguay 0 - Italy 0\n3. Germany 0 - France 0\n4. Spain 0 - Brazil 0\n5. Mexico 0 - Canada 0`,
    );

    scoreboard.updateScore(CountryNameEnum.Mexico, CountryNameEnum.Canada, 0, 5);
    scoreboard.updateScore(CountryNameEnum.Spain, CountryNameEnum.Brazil, 10, 2);
    scoreboard.updateScore(CountryNameEnum.Germany, CountryNameEnum.France, 2, 2);
    scoreboard.updateScore(CountryNameEnum.Uruguay, CountryNameEnum.Italy, 6, 6);
    scoreboard.updateScore(CountryNameEnum.Argentina, CountryNameEnum.Australia, 3, 1);
    expect(scoreboard.getGamesSummary()).toEqual(
        `1. Uruguay 6 - Italy 6\n2. Spain 10 - Brazil 2\n3. Mexico 0 - Canada 5\n4. Argentina 3 - Australia 1\n5. Germany 2 - France 2`,
    );
  });
});
