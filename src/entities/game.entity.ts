import 'reflect-metadata';
import {Team} from './team.entity';
import {Score} from './score.entity';
import {IsString} from 'class-validator';
import {Type} from 'class-transformer';
import {Country} from './country.entity';
import {BaseEntity} from './base-entity';
import {CountryNameEnum} from "../enums";

export interface IGame {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  totalScore: number;
  startTime: string;
}

export class Game extends BaseEntity implements IGame {
  @Type(() => Team)
  private readonly _homeTeam: Team;

  @Type(() => Team)
  private readonly _awayTeam: Team;

  @Type(() => Score)
  private _score: Score;

  @Type(() => Score)
  private _homeScore: Score;

  @Type(() => Score)
  private _awayScore: Score;

  @IsString()
  private readonly _startTime: string;

  public constructor(homeTeam: string, awayTeam: string) {
    super();
    this._homeTeam = new Team(new Country(CountryNameEnum[homeTeam]));
    this._awayTeam = new Team(new Country(CountryNameEnum[awayTeam]));
    this._homeScore = new Score(0);
    this._awayScore = new Score(0);
    this._startTime = new Date().toLocaleTimeString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    this.validate();
  }

  public get homeTeam(): string {
    return this._homeTeam.name;
  }

  public get awayTeam(): string {
    return this._awayTeam.name;
  }

  public get startTime(): string {
    return this._startTime;
  }

  public get homeScore(): number {
    return this._homeScore.value;
  }

  public get awayScore(): number {
    return this._awayScore.value;
  }

  public get totalScore(): number {
    return this.homeScore + this.awayScore;
  }

  public updateScore(homeScore: number, awayScore: number): void {
    this._homeScore = new Score(homeScore);
    this._awayScore = new Score(awayScore);
  }
}
