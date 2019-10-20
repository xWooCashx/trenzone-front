import {Exercise} from './exercise';

export interface ActivityInterface {
  id: string;
  exercise: Exercise;
  quantity: number;
  series: number;
  unit: string;
  day: number;
}

export class Activity {
  id: string;
  exercise: Exercise;
  quantity: number;
  series: number;
  unit: string;
  day: string;

  constructor(id: string, quantity: number, series: number, unit: string, day: string) {
    this.id = id;
    this.quantity = quantity;
    this.series = series;
    this.unit = unit;
    this.day = day;
  }
}
