/**
 * Serialized data representation.
 */
export type Serialized<T = string> = T
/**
 * Deserialized data representation.
 */
export type Deserialized<T> = T

/**
 * Raw data object.
 */
export interface RawData {
  /**
   * Collection name.
   */
  name: string
  /**
   * Document id.
   */
  id: string
  /**
   * Bin dump data.
   */
  bin: string
}
