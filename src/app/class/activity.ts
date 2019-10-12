import {Exercise} from './exercise';

export class Activity {
  id: string;
  exercise: Exercise;
  quantity: number;
  series: number;
  unit: string;
  day: number;

  constructor(id: string, quantity: number, series: number, unit: string, day: number) {
    this.id = id;
    this.quantity = quantity;
    this.series = series;
    this.unit = unit;
    this.day = day;
  }
}
