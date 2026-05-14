export abstract class BaseEntity<TId = number> {
  protected constructor(
    protected readonly _id: TId
  ) {}

  get id(): TId {
    return this._id;
  }
}
