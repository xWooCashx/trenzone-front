export interface TrainersSearchResult {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  sort: Sort;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export interface Content {
  id: number;
  name: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
  height: number;
  weight: number;
  trainerDetails: TrainerDetails | null;
}

export interface TrainerDetails {
  id: number;
  description: string;
  phoneNumber: string;
  job: string;
  city: string;
}

export interface Pageable {
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
