export class User {
  username: string;
  password: string;
  email: string;
  name: string;
  lastName: string;
  id: number;
  age: number;
  height: number;
  weight: number;
  trainerDetails: TrainerDetails;
}

export interface TrainerDetails {
  id: number;
  description: string;
  phoneNumber: string;
  job: string;
  city: string;
}
