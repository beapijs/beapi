// Type imports.
import type { Modal } from '..'

/**
 * BeAPI database document. Document is the main interaction point
 * for interacting with a specfic piece of stored data.
 *
 * Think of this as a file inside a folder. The folder or rather `Modal`
 * holds a lot of these which all contain the same keys but most likely
 * different values.
 */
// @ts-expect-error: We Augment Data In
export class Document<T extends Record<string, any>> implements T {
  /**
   * Protected reference to model.
   */
  protected readonly __model__: Modal<T>
  /**
   * Protected reference to the docs id.
   */
  protected readonly __id__: string
  /**
   * Protected reference to the documents knownData.
   */
  protected __knownData__: T

  /**
   * BeAPI database document. Document is the main interaction point
   * for interacting with a specfic piece of stored data.
   *
   * Think of this as a file inside a folder. The folder or rather `Modal`
   * holds a lot of these which all contain the same keys but most likely
   * different values.
   * @param model Documents modal handler.
   * @param _id Identifier of the document.
   * @param data Data document holds.
   */
  public constructor(model: Modal<T>, _id: string, data: T) {
    this.__id__ = _id
    this.__model__ = model
    this.__knownData__ = data
    Object.assign(this, data)
  }

  /**
   * Retrieves an immutable copy of the data
   * Minecraft internally remembers since the
   * last save.
   * @returns
   */
  public retrieveKnownInternalData(): T {
    return Object.freeze(this.__knownData__)
  }

  /**
   * Returns the current document as an object containing the schema properties.
   * @returns
   */
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

  /**
   * Returns a new reference of the documents identifier.
   * @returns
   */
  public getId(): string {
    return String(this.__id__)
  }

  /**
   * Deletes the document from database.
   */
  public delete(): void {
    this.__model__.delete(this.__id__)
  }

  /**
   * Saves the document to the database. Should be used anytime after you mutate
   * the augmented properties on this object.
   * @returns
   */
  public save(): this {
    this.__model__.sync(this.__id__)
    this.__knownData__ = this.asObject()
    return this
  }
}
