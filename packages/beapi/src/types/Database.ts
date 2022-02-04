export type Serialized<T = string> = T
export type Deserialized<T> = T

export interface RawData {
  name: string
  id: string
  bin: string
}
