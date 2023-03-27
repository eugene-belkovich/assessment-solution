import 'reflect-metadata';
import {IsString, IsNumber, IsDate} from 'class-validator';

export interface IGame {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  totalScore: number;
  startTime: Date;
}

export class Game implements IGame {
  @IsString()
  private readonly _homeTeam: string;

  @IsString()
  private readonly _awayTeam: string;

  @IsNumber()
  private _score: number;

  @IsNumber()
  private _homeScore: number;

  @IsNumber()
  private _awayScore: number;

  @IsDate()
  private readonly _startTime: Date;

  public constructor(homeTeam: string, awayTeam: string) {
    this._homeTeam = homeTeam;
    this._awayTeam = awayTeam;
    this._homeScore = 0;
    this._awayScore = 0;
    this._startTime = new Date();
  }

  public get homeTeam(): string {
    return this._homeTeam;
  }

  public get awayTeam(): string {
    return this._awayTeam;
  }

  public get startTime(): Date {
    return this._startTime;
  }

  public get homeScore(): number {
    return this._homeScore;
  }

  public get awayScore(): number {
    return this._awayScore;
  }

  public get totalScore(): number {
    return this.homeScore + this.awayScore;
  }

  public updateScore(homeScore: number, awayScore: number): void {
    this._homeScore = homeScore;
    this._awayScore = awayScore;
  }
}
