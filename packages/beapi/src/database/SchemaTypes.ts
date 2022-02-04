import type { Serialized, Deserialized } from '../types'

const StringConstructor = String
const NumberConstructor = Number
const BooleanConstructor = Boolean
const ArrayConstructor = Array
const MapConstructor = Map

export namespace SchemaTypes {
  export class String extends StringConstructor {
    public static serialize(data: string): Serialized {
      return StringConstructor(data)
    }

    public static deserialize(data: string): Deserialized<string> {
      return StringConstructor(data)
    }
  }
  export class Number extends NumberConstructor {
    public static serialize(data: number): Serialized<number> {
      return NumberConstructor(data)
    }

    public static deserialize(data: number): Deserialized<number> {
      return NumberConstructor(data)
    }
  }
  export class Boolean extends BooleanConstructor {
    public static serialize(data: boolean): Serialized<number> {
      return NumberConstructor(data ? 1 : 0)
    }

    public static deserialize(data: number): Deserialized<boolean> {
      return BooleanConstructor(data === 1 ? true : false)
    }
  }
  export class Array extends ArrayConstructor {
    public static serialize(data: any[]): Serialized {
      return StringConstructor(JSON.stringify(data))
    }

    public static deserialize(data: string): Deserialized<any[]> {
      return ArrayConstructor(...(JSON.parse(data) as unknown[]))
    }
  }
  export class Map extends MapConstructor {
    public static serialize(data: Map): Serialized {
      return JSON.stringify(Array.from(data.entries()))
    }

    public static deserialize(data: string): Deserialized<Map> {
      return new MapConstructor(JSON.parse(data) as Iterable<[any, any]>)
    }
  }
}
