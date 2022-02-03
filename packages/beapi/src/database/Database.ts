import { runCommand, binToString, stringToBin } from '../utils'
import type { RawCollection } from '../types'
import { Collection } from './Collection'
export class Database {
  protected id: string
  protected collections = new Map<string, Collection<any, any>>()
  public constructor(id: string) {
    // Verify Name
    if (!Database.validName(id)) throw new Error('Database Names Can Only Contain: Letters, Numbers, and Underscores!')
    // Create if not exists
    if (!Database.dbExists(id)) {
      const result = runCommand(`scoreboard objectives add ${id} dummy`)
      if (result.err) throw new Error(result.statusMessage)
    }
    // Initialize Properties
    this.id = id

    // Load All Collections For This DB
    this.collections = new Map(
      Database.getRawCollectionNames().map((name) => {
        const chunks = Database.getRawCollectionChunks(id, name)
        const data: object = chunks
          .map(({ bin }) => JSON.parse(binToString(bin) || '{}'))
          .reduce(
            (obj, item) => ({
              ...obj,
              ...item,
            }),
            {},
          )

        return [name, new Collection(id, name, data)]
      }),
    )
  }

  public static toRaw(id: string, name: string, data: object): string {
    return `<{?id=${id}&name=${name}&bin=0 ${stringToBin(JSON.stringify(data))}}>`
  }

  public static parseRaw(raw: string): RawCollection {
    if (!/<{\?id=\w+&name=\w+&bin=[01 ]+}>/gi.test(raw)) {
      throw new Error(`Not a valid collection! ${raw}`)
    }
    const mapped = new Map(
      raw
        .replace(/<{\?|}>/g, '')
        .split('&')
        .map((i) => i.split('=')) as [string, string][],
    )
    const id = mapped.get('id')!
    const name = mapped.get('name')!
    const bin = mapped.get('bin')!.substring(1).trim()
    return {
      id,
      name,
      bin,
    }
  }

  public static getRawObjectives(): string[] {
    const { err, statusMessage } = runCommand('scoreboard objectives list')
    if (err) return []
    return statusMessage.match(/- (\w*):/gi)?.map((i) => i.replace(/- |:/g, '')) ?? []
  }

  public static getRawPlayers(): Map<string, RawCollection> {
    const { statusMessage, err } = runCommand('scoreboard players list')
    if (err) return new Map()
    const collections =
      statusMessage
        .match(/<{\?id=\w+&name=\w+&bin=[01 ]+}>/gi)
        ?.map((i) => Database.parseRaw(i))
        .map((i, index) => [index, i]) ?? []
    return new Map(collections as [string, RawCollection][])
  }

  public static getRawCollections(id: string): RawCollection[] {
    return Array.from(Database.getRawPlayers().values()).filter((i) => i.id === id)
  }

  public static getRawCollectionNames(): string[] {
    return Array.from(new Set(Array.from(Database.getRawPlayers().values()).map((i) => i.name)))
  }

  public static getRawCollectionChunks(id: string, name: string): RawCollection[] {
    return Array.from(Database.getRawPlayers().values()).filter((i) => i.id === id && i.name === name)
  }

  public static dbExists(id: string): boolean {
    return this.getRawObjectives().includes(id)
  }

  public static objExists(id: string, name: string): boolean {
    return Array.from(Database.getRawPlayers().values())
      .filter((i) => i.id === id)
      .map((i) => i.name)
      .includes(name)
  }

  public static validName(name: string): boolean {
    return !/\W/.test(name)
  }

  public mount<K extends string, V>(name: string): Collection<K, V> {
    if (!Database.validName(name))
      throw new Error('Collection Names Can Only Contain: Letters, Numbers, and Underscores!')
    if (this.collections.has(name)) return this.collections.get(name)!
    // const add = runCommand(`scoreboard players add "${Database.toRaw(this.id, name, {})}" ${this.id} 0`)
    // if (add.err) throw new Error(add.statusMessage)
    const collection = new Collection<K, V>(this.id, name, {} as Record<K, V>)
    this.collections.set(name, collection)
    return collection
  }

  public syncChanges(): void {
    this.collections.forEach((i) => {
      i.save()
    })
  }
}
