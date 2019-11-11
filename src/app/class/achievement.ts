export interface Achievement {
  id: number;
  exerciseName: string;
  sequence: number;
  unit: string;
  activeTrainingId: number;
  trainingName: string;
  previousValue: number;
  progressValue: number;
  date: string;
}
