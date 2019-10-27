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
  trainingId: string;
  name: string;
  unit: string;
  weekDay: string;
  quality: number;
  series: number;
  sequence: string;

  constructor(id: string, quantity: number, series: number, unit: string, day: string) {
    this.id = id;
    this.quality = quantity;
    this.series = series;
    this.unit = unit;
    this.weekDay = day;
  }
}
