/**
 * Object decorator thats sets predefined class properties
 * prototype to the same value.
 * @param value Value to set
 * @returns
 */
export function setProto<T>(value: T) {
  return <K extends string>(target: Record<K, T>, key: K) => {
    target[key] = value
  }
}
