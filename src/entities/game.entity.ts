import 'reflect-metadata';
import {Team} from './team.entity';
import {Score} from './score.entity';
import {IsDate} from 'class-validator';
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
  startTime: Date;
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

  @IsDate()
  private readonly _startTime: Date;

  public constructor(homeTeam: string, awayTeam: string) {
    super();
    this._homeTeam = new Team(new Country(CountryNameEnum[homeTeam]));
    this._awayTeam = new Team(new Country(CountryNameEnum[awayTeam]));
    this._homeScore = new Score(0);
    this._awayScore = new Score(0);
    this._startTime = new Date();
    this.validate();
  }

  public get homeTeam(): string {
    return this._homeTeam.name;
  }

  public get awayTeam(): string {
    return this._awayTeam.name;
  }

  public get startTime(): Date {
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
