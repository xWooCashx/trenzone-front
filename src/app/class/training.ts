import {Author} from './author';
import {Exercise} from './exercise';

export class Training {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  author: Author;
  date: Date;
}
