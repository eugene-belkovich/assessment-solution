# Notes
- I implemented the scoreboard as a library, so it can be used in any application.
- I tried keep focus on TDD and use red/green/refactor approach and implement each function one by one.
- I used SOLID, DRY, KISS principles
- I tried to decompose objects and keep them as simple as possible. 
- I decided to use "class-transformer" and "class-validator" to validate the input data and not write my own validation code.
- I implemented general in-memory store solution ScoreboardInMemoryRepository for keeping state

# Ideas
Possible improvements:
- handle same homeTeam and awayTeam
- add endTime
- add the game time management logic
- add isSecondHalf flag for game
- get score based on isSecondHalf
- swap teams if isSecondHalf
- add status for game
```ts
  export enum GameStatusEnum {
      NOT_STARTED = 'NOT_STARTED',
      IN_PROGRESS = 'IN_PROGRESS',
      FINISHED = 'FINISHED',
  }
```
- add different stages of game
```ts
  export enum GameExtraTimeTypeEnum {
      PENALTIES = 'PENALTIES',
      EXTRA_TIME = 'EXTRA_TIME',
      DEFAULT_TIME = 'DEFAULT_TIME',
  }
```
- add different stages for game
```ts
export enum GameStageEnum {
    FIRST_HALF = 'FIRST_HALF',
    SECOND_HALF = 'SECOND_HALF',
    BREAK = 'BREAK',
    ADDITIONAL_TIME = 'ADDITIONAL_TIME',
    FIRST_ADDITIONAL_HALF = 'FIRST_ADDITIONAL_HALF',
    SECOND_ADDITIONAL_HALF = 'SECOND_ADDITIONAL_HALF',
    PENALTIES = 'PENALTIES',
}
```
- add different extra time options of game
```ts
  export enum GameExtraTimeTypeEnum {
      PENALTIES = 'PENALTIES',
      EXTRA_TIME = 'EXTRA_TIME',
      DEFAULT_TIME = 'DEFAULT_TIME',
  }
```


