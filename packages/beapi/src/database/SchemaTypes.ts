// Type imports.
import type { Serialized, Deserialized } from '..'

// References to global constructors.
const StringConstructor = String
const NumberConstructor = Number
const BooleanConstructor = Boolean
const ArrayConstructor = Array
const MapConstructor = Map

/**
 * Dedicated namespace to organize different schema field types.
 * Namespaces were chosen because they are easy to add on to and look
 * better.
 */
export namespace SchemaTypes {
  /**
   * String database schema type. Acts as a pipeline for
   * serializing and deserializing data.
   */
  export class String extends StringConstructor {
    /**
     * Pipeline for serializing data before stored.
     * @param data Data to serialize.
     * @returns
     */
    public static serialize(data: string): Serialized {
      if (typeof data !== 'string')
        throw Error(
          `Passed "${data}" To Serializer As Type [string] instead found [${typeof data}]! Refusing to continue...`,
        )
      return StringConstructor(data)
    }

    /**
     * Pipeline for deserializing data before used.
     * @param data Data to deserialize.
     * @returns
     */
    public static deserialize(data: string): Deserialized<string> {
      return StringConstructor(data)
    }
  }

  /**
   * Number database schema type. Acts as a pipeline for
   * serializing and deserializing data.
   */
  export class Number extends NumberConstructor {
    /**
     * Pipeline for serializing data before stored.
     * @param data Data to serialize.
     * @returns
     */
    public static serialize(data: number): Serialized<number> {
      if (typeof data !== 'number')
        throw Error(
          `Passed "${data}" To Serializer As Type [number] instead found [${typeof data}]! Refusing to continue...`,
        )
      return NumberConstructor(data)
    }

    /**
     * Pipeline for deserializing data before used.
     * @param data Data to deserialize.
     * @returns
     */
    public static deserialize(data: number): Deserialized<number> {
      return NumberConstructor(data)
    }
  }

  /**
   * Boolean database schema type. Acts as a pipeline for
   * serializing and deserializing data.
   */
  export class Boolean extends BooleanConstructor {
    /**
     * Pipeline for serializing data before stored.
     * @param data Data to serialize.
     * @returns
     */
    public static serialize(data: boolean): Serialized<number> {
      if (typeof data !== 'boolean')
        throw Error(
          `Passed "${data}" To Serializer As Type [boolean] instead found [${typeof data}]! Refusing to continue...`,
        )
      return NumberConstructor(data ? 1 : 0)
    }

    /**
     * Pipeline for deserializing data before used.
     * @param data Data to deserialize.
     * @returns
     */
    public static deserialize(data: number): Deserialized<boolean> {
      return BooleanConstructor(data === 1 ? true : false)
    }
  }

  /**
   * Array database schema type. Acts as a pipeline for
   * serializing and deserializing data.
   */
  export class Array extends ArrayConstructor {
    /**
     * Pipeline for serializing data before stored.
     * @param data Data to serialize.
     * @returns
     */
    public static serialize(data: any[]): Serialized {
      if (!Array.isArray(data))
        throw Error(
          `Passed "${data}" To Serializer As Type [Array] instead found [${typeof data}]! Refusing to continue...`,
        )
      return StringConstructor(JSON.stringify(data))
    }

    /**
     * Pipeline for deserializing data before used.
     * @param data Data to deserialize.
     * @returns
     */
    public static deserialize(data: string): Deserialized<any[]> {
      return ArrayConstructor(...(JSON.parse(data) as unknown[]))
    }
  }

  /**
   * Map database schema type. Acts as a pipeline for
   * serializing and deserializing data.
   */
  export class Map extends MapConstructor {
    /**
     * Pipeline for serializing data before stored.
     * @param data Data to serialize.
     * @returns
     */
    public static serialize(data: Map): Serialized {
      if (!(data instanceof Map) && !((data as any) instanceof MapConstructor))
        throw Error(
          `Passed "${data}" To Serializer As Type [Map] instead found [${typeof data}]! Refusing to continue...`,
        )
      return JSON.stringify(Array.from(data.entries()))
    }

    /**
     * Pipeline for deserializing data before used.
     * @param data Data to deserialize.
     * @returns
     */
    public static deserialize(data: string): Deserialized<Map> {
      return new MapConstructor(JSON.parse(data) as Iterable<[any, any]>)
    }
  }
}
