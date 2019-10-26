export interface TrainingsSearchResult {
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

export interface Content {
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

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort2 {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}




