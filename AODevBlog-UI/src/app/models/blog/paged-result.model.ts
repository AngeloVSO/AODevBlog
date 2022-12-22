export class PagedResult<T> {
  constructor(public items: T[], public totalCount: number) {}
}
