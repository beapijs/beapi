// Sourced from: https://flaviocopes.com/how-to-list-object-methods-javascript/

export const destruct = (obj: object): any[] => {
  const properties = new Set()
  let currentObj = obj
  do {
    Object.getOwnPropertyNames(currentObj).map((item) => properties.add(item))
  } while ((currentObj = Object.getPrototypeOf(currentObj) as object))
  return [...properties.keys()]
}
