import type { Modal } from './Modal'

// @ts-expect-error: We Augment Data In
export class Document<T extends Record<string, any>> implements T {
  protected readonly __model__: Modal<T>
  protected readonly __id__: string
  protected __knownData__: T
  public constructor(model: Modal<T>, _id: string, data: T) {
    this.__id__ = _id
    this.__model__ = model
    this.__knownData__ = data
    Object.assign(this, data)
  }

  public retrieveKnownInternalData(): T {
    return this.__knownData__
  }

  public asObject(): T {
    // @ts-expect-error: We Augment Data In
    return Object.keys(this.__model__.schema.definition)
      .map((key: keyof T) => ({ [key]: (this as T)[key] }))
      .reduce(
        (obj, item) => ({
          ...obj,
          ...item,
        }),
        {},
      )
  }

  public getId(): string {
    return this.__id__
  }

  public delete(): void {
    this.__model__.delete(this.__id__)
  }

  public save(): this {
    this.__model__.sync(this.__id__)
    this.__knownData__ = this.asObject()
    return this
  }
}
