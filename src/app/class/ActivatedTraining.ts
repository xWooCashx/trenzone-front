export interface TrainingDTO {
  id: number;
  name: string;
  description: string;
  username: string;
  tags: string[];
  date: string;
  published: boolean;
  rate: number;
  roles: string[];
  difficulty: string;
  commentsSize: number;
  daysSize: number;
  exercisesSize: number;
  ratesSize: number;
}

export interface ActivatedTraining {
  id: number;
  trainingDTO: TrainingDTO;
  idCopiedTraining: number;
  startDate: string;
  endDate?: any;
  active: boolean;
}
