export class PaginationInput {
  constructor(args?: { page?: number; take?: number; skip?: number }) {
    if (!args) {
      return;
    }
    const { page, take, skip } = args;
    if (page && take) {
      this.page = page;
      this.take = take;
    } else if (take && skip) {
      if (skip !== 0 && skip % take !== 0) {
        throw new Error('skip must be a multiple of take');
      }
      this.take = take;
      this.page = skip / take + 1;
    } else {
      this.page = page ?? 1;
      this.take = take ?? 20;
    }
  }
  page: number;
  take: number;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  static getSkip(page: number, take: number): number {
    return (page - 1) * take;
  }
}

export class PaginatedOutput<T> {
  constructor(data: T[], total: number, paginatedInput: PaginationInput) {
    this.total = total;
    this.data = data;
    this.take = paginatedInput.take;
    this.page = paginatedInput.page;
    this.totalPages = Math.ceil(total / paginatedInput.take);
  }
  take: number;
  page: number;
  totalPages: number;
  total: number;
  data: T[];
}
