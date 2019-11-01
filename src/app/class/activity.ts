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
  day: string;
  quality: number;
  series: number;
  sequence: number;

  constructor(name: string, quantity: number, series: number, unit: string, day: string) {
    this.name = name;
    this.quality = quantity;
    this.series = series;
    this.unit = unit;
    this.day = day;
  }
}
