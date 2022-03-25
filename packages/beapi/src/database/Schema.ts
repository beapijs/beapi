import type { SchemaTypes } from './SchemaTypes'
import { entries } from '../utils'
import type { Deserialized, Serialized } from '../types'

export class Schema<T extends Record<string, any>> {
  public readonly definition: Record<keyof T, typeof SchemaTypes[keyof typeof SchemaTypes]>
  public constructor(definition: Record<keyof T, typeof SchemaTypes[keyof typeof SchemaTypes]>) {
    // Be sure to verify assignments here...
    this.definition = definition
  }

  public serialize(data: Deserialized<T>): Serialized {
    for (const key of Object.keys(this.definition)) {
      if (data[key] === undefined || data[key] === null)
        throw Error(`Attempted To Serialize Data That Is Missing Required Property "${key}". Refusing to continue...`)
    }

    return JSON.stringify(
      entries<Deserialized<T>>(data)
        .map(([key, value]) => {
          const Type = this.definition[key]
          if (!Type) throw Error(`Invalid Object Property "${key}", Not In Schematic. Refusing to continue...`)

          return { [key]: Type.serialize(value as never) }
        })
        .reduce(
          (obj, item) => ({
            ...obj,
            ...item,
          }),
          {},
        ),
    )
  }

  public deserialize(raw: Serialized): Deserialized<T> {
    return entries<Deserialized<T>>(JSON.parse(raw) as Deserialized<T>)
      .map(([key, value]) => {
        const Type = this.definition[key]
        if (!Type) throw Error(`Invalid Object Property "${key}", Not In Schematic. Refusing to continue...`)

        return { [key]: Type.deserialize(value as never) }
      })
      .reduce(
        (obj, item) => ({
          ...obj,
          ...item,
        }),
        {},
      ) as T
  }
}
export function schema<T extends Record<string, any>>(
  definition: Record<keyof T, typeof SchemaTypes[keyof typeof SchemaTypes]>,
): Schema<T> {
  return new Schema<T>(definition)
}
