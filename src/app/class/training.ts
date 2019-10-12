import {Author} from './author';
import {Exercise} from './exercise';
import {Activity} from './activity';

export class Training {
  id: string;
  name: string;
  description: string;
  activities: Activity[];
  author: Author;
  createDate: Date;
  type: string;
}
