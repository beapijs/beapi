const StringConstructor = String
const NumberConstructor = Number
const BooleanConstructor = Boolean

export namespace CommandTypes {
  export class String extends StringConstructor {
    public static value(): string {
      return 'string'
    }
  }
  export class Number extends NumberConstructor {
    public static value(): string {
      return 'number'
    }
  }
  export class Boolean extends BooleanConstructor {
    public static value(): string {
      return 'boolean'
    }
  }
  export class Player extends StringConstructor {
    public static value(): string {
      return 'player'
    }
  }
}
