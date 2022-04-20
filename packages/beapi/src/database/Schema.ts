// Regular imports.
import { entries } from '../utils'

// Type imports.
import { SchemaTypes } from './SchemaTypes'
import type { Deserialized, Serialized } from '../types'

// Static array of schema type classes.
const schemaTypes: typeof SchemaTypes[keyof typeof SchemaTypes][] = []
for (const key in SchemaTypes) {
  if (key) schemaTypes.push(SchemaTypes[key as keyof typeof SchemaTypes])
}

/**
 * BeAPI database schematic builder. Used to create a schematic
 * for the data objects will be holding in the database documents.
 */
export class Schema<T extends Record<string, any>> {
  /**
   * Object schematic definition.
   */
  public readonly definition: Record<keyof T, typeof SchemaTypes[keyof typeof SchemaTypes]>

  /**
   * BeAPI database schematic builder. Used to create a schematic
   * for the data objects will be holding in the database documents.
   * @param definition Object schematic definition.
   */
  public constructor(definition: Record<keyof T, typeof SchemaTypes[keyof typeof SchemaTypes]>) {
    for (const key of Object.keys(definition)) {
      const Type = definition[key]
      if (!schemaTypes.includes(Type)) throw new Error(`Invalid schema type for "${key}" on schema!`)
    }

    this.definition = definition
  }

  /**
   * Serializes object with schematic pipeline to final storage state.
   * @param data Object schematic to serialize before storage.
   * @returns
   */
  public serialize(data: Deserialized<T>): Serialized {
    // For each key on the definition iterate.
    for (const key of Object.keys(this.definition)) {
      // If given data to serialize does not contain key from definition.
      // Throw new error.
      // TODO: redo database to make all fields optional by default
      if (data[key] === undefined || data[key] === null)
        throw Error(`Attempted To Serialize Data That Is Missing Required Property "${key}". Refusing to continue...`)
    }

    // Return serialized object JSON string.
    return JSON.stringify(
      // Get all entries in the given data as a 2d array.
      entries<Deserialized<T>>(data)
        // Map each key and value. Serialzing the value of each
        // key with the pipeline. This will also functionally
        // convert the 2d array to a { [key]: serialized_value }[]
        .map(([key, value]) => {
          // Get type with key from definition.
          const Type = this.definition[key]

          // Temporary until below.
          if (!Type) throw Error(`Invalid Object Property "${key}", Not In Schematic. Refusing to continue...`)

          // TODO
          // If not defined in schema just ignore.
          // This should not affect anything anywhere because
          // there are checks in place in Modal.contructor to
          // ensure rawdata with not defined fields is rewritten
          // without those fields
          // if (!Type) return {}

          // TODO: make sure type is a valid command type.

          // Return key and value.
          return { [key]: Type.serialize(value as never) }
        })
        // Reduce the array of object into one object.
        .reduce(
          (obj, item) => ({
            ...obj,
            ...item,
          }),
          {},
        ),
    )
  }

  /**
   * Deserializes stored data by passing it through the schematic pipeline
   * to undo any serialization done before storage.
   * @param raw Raw string data.
   * @returns
   */
  public deserialize(raw: Serialized): Deserialized<T> {
    // Get all entries in the given data as a 2d array.
    return (
      entries<Deserialized<T>>(JSON.parse(raw) as Deserialized<T>)
        // Map each key and value. Deserialzing the value of each
        // key with the pipeline. This will also functionally
        // convert the 2d array to a { [key]: deserialized_value }[]
        .map(([key, value]) => {
          const Type = this.definition[key]

          // Temporary until below.
          if (!Type) throw Error(`Invalid Object Property "${key}", Not In Schematic. Refusing to continue...`)

          // TODO: if no type then we have an extra field that needs to be migrated
          // We will want to add `__documentNeedsMigrate__` header to tell modal
          // when filling all the persistant data to remove the uneeded fields and
          // override the last document.

          // Return key and value.
          return { [key]: Type.deserialize(value as never) }
        })
        // Reduce the array of object into one object.
        .reduce(
          (obj, item) => ({
            ...obj,
            ...item,
          }),
          {},
        ) as T
    )
  }
}

/**
 * Functional way of creating a schema.
 * @param definition Object schematic definition.
 * @returns
 */
export function schema<T extends Record<string, any>>(
  definition: Record<keyof T, typeof SchemaTypes[keyof typeof SchemaTypes]>,
): Schema<T> {
  return new Schema<T>(definition)
}
