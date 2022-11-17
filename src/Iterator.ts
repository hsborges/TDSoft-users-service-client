import fetch from "axios";

/**
 * Classe responsável pela implementação do padrão iterator.
 */
export class Iterator<T> implements AsyncIterableIterator<T[]> {
  private page: number = 0;
  private done: boolean = false;

  constructor(private endpoint: string, private itemsPerPage: number = 10) {}

  [Symbol.asyncIterator](): AsyncIterableIterator<T[]> {
    return this;
  }

  async next(...args: [] | [undefined]): Promise<IteratorResult<T[], any>> {
    if (this.done) return { done: true, value: undefined };

    const { data } = await fetch(this.endpoint, {
      responseType: "json",
      params: {
        page: Number((this.page += 1)).toString(),
        limit: Number(this.itemsPerPage).toString(),
      },
    });

    if (data.length === 0) {
      this.done = true;
      return { done: true, value: undefined };
    }

    return { done: false, value: data };
  }
}
