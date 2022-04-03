// Sourced from: https://flaviocopes.com/how-to-list-object-methods-javascript/

/**
 * Lists all methods on an object, helpful for undocumented
 * Minecraft objects added.
 * @param obj Object to destruct.
 * @returns
 */
export const destruct = (obj: object): any[] => {
  const properties = new Set()
  let currentObj = obj
  do {
    Object.getOwnPropertyNames(currentObj).map((item) => properties.add(item))
  } while ((currentObj = Object.getPrototypeOf(currentObj) as object))
  return [...properties.keys()]
}
