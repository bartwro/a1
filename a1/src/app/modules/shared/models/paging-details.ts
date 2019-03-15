// maybe better is to use interface.. verify this later

export class PagingDetails {
  length: number;
  pageSizeOptions: number[];
  selectedPageSize: number;
  currentPage: any;
  numberOfPages: number;
}
