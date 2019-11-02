export class TrainingsSearchResult {
  content: Content[];
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

export class Content {
  id: number;
  name: string;
  description: string;
  username: string;
  tags: string[];
  date: string;
  rate: number;
  roles: string[];
  difficulty: string;
}

export class Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export class Pageable {
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export class Sort2 {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}




