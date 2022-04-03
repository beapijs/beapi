/**
 * Gets all entries on an object.
 * @param data Object to use.
 * @returns
 */
export function entries<K extends Record<string, any> = Record<string, any>>(data: K): [keyof K, K[keyof K]][] {
  return Object.keys(data).map((i: keyof K) => [i, data[i]])
}
