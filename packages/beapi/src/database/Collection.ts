import { runCommand, binToString } from '../utils'
import { Database } from './Database'

export class Collection<K extends string, V> {
  protected database: string
  protected collection: string
  protected data: Record<any, any>
  public constructor(dId: string, cId: string, data: Record<K, V>) {
    this.database = dId
    this.collection = cId
    this.data = data

    // Sync Changes Right Off Bat
    this.save()
  }

  public set(key: K, value: V): this {
    this.data[key] = value
    return this
  }

  public update(key: K, value: Partial<V>, create = false): this {
    if (!this.has(key) && !create) return this
    if (typeof value === 'object') {
      this.set(key, {
        ...this.get(key),
        ...value,
      } as V)
    } else {
      this.set(key, value)
    }

    return this
  }

  public get(key: K): V | undefined {
    return this.data[key]
  }

  public has(key: K): boolean {
    return this.data.hasOwnProperty(key)
  }

  public delete(key: K): this {
    const { [key]: _, ...remaining } = this.data
    this.data = Object(remaining)
    return this
  }

  public clear(): this {
    this.data = {}
    return this
  }

  public entries(): [K, V][] {
    return (Object.keys(this.data) as K[]).map((i) => [i, this.data[i]])
  }

  public keys(): K[] {
    return Object.keys(this.data) as K[]
  }

  public values(): V[] {
    return (Object.keys(this.data) as K[]).map((i) => this.data[i])
  }

  public save(): void {
    const raw = Database.getRawCollectionChunks(this.database, this.collection)
    for (const chunk of raw) {
      const remove = runCommand(
        `scoreboard players reset "${Database.toRaw(
          chunk.id,
          chunk.name,
          JSON.parse(binToString(chunk.bin)) as object,
        )}" ${this.database}`,
      )
      if (remove.err) throw new Error(remove.statusMessage)
    }
    for (const [key, value] of this.entries()) {
      const add = runCommand(
        `scoreboard players add "${Database.toRaw(this.database, this.collection, { [key]: value })}" ${
          this.database
        } 0`,
      )
      if (add.err) throw new Error(add.statusMessage)
    }
  }
}
