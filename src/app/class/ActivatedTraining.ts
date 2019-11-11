import {Pageable, Sort2} from './TrainingsSearchResult';

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

export interface ActiveTrainings {
  content: ActivatedTraining[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  sort: Sort2;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}
