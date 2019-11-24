import {Author} from './author';
import {Exercise} from './exercise';
import {Activity} from './activity';

export class Training {
  id: string;
  name: string;
  description: string;
  activities: Activity[];
  username: string;
  date: Date;
  published: boolean;
  difficulty: string;
  tags: string[];
  roles: string[];
  rate: number;
  ratesSize: number;
}
