import type { db, entry, DbOptions } from '../@types/BeAPI.i.js'
import { executeCommand } from '../command/executeCommand.js'

export class Database {
  public mountByName(name: string): Collection {
    const c: string = executeCommand('scoreboard players list').statusMessage.split('\n')
    const tables: db[] = []
    for (const t of c) {
      if (!t.includes("{'database':{'name':")) continue
      for (const db of t.replace(/'/g, '"').split(', ')) {
        if (!db.includes('{"database":{"name":')) continue
        tables.push(JSON.parse(db) as db)
      }
    }
    const db = tables.find((x) => x.database.name === name)
    if (!db)
      return new Collection(
        {
          name: name,
        },
        false,
      )

    return new Collection(
      {
        name: db.database.name,
        id: db.database.id,
      },
      true,
    )
  }

  public mountById(id: number): Collection {
    const c: string = executeCommand('scoreboard players list').statusMessage.split('\n')
    const tables: db[] = []
    for (const t of c) {
      if (!t.includes("{'database':{'name':")) continue
      for (const db of t.replace(/'/g, '"').split(', ')) {
        if (!db.includes('{"database":{"name":')) continue
        tables.push(JSON.parse(db) as db)
      }
    }
    const db = tables.find((x) => x.database.id === id)
    if (!db)
      return new Collection(
        {
          name: (Math.random() + 1).toString(36).substring(2),
          id: id,
        },
        false,
      )

    return new Collection(
      {
        name: db.database.name,
        id: db.database.id,
      },
      true,
    )
  }
}

export class Collection {
  public readonly name: string
  public readonly id: number

  public constructor(options: DbOptions, mount = false) {
    this.name = options.name
    this.id = options.id ?? Math.round(Math.random() * 100000)
    if (!mount) {
      executeCommand('scoreboard objectives add "database" dummy')
      executeCommand(`scoreboard players set "${this._generateJSON()}" "database" ${this.id}`)
    }
  }

  private _generateJSON(): string {
    const json = {
      database: {
        name: this.name,
        id: this.id,
        entries: [] as any,
      },
    }

    return JSON.stringify(json).replace(/"/g, "\\'")
  }

  private _getDbAsString(): string {
    const c: string = executeCommand('scoreboard players list').statusMessage.split('\n')
    const tables: db[] = []
    for (const t of c) {
      if (!t.includes("{'database':{'name':")) continue
      for (const db of t.replace(/'/g, '"').split(', ')) {
        if (!db.includes('{"database":{"name":')) continue
        tables.push(JSON.parse(db) as db)
      }
    }

    return JSON.stringify(tables.find((x) => x.database.id === this.id))
  }

  private _updateDb(newDb: db): void {
    executeCommand(`scoreboard players reset "${this._getDbAsString().replace(/"/g, "\\'")}" database`)
    executeCommand(`scoreboard players set "${JSON.stringify(newDb).replace(/"/g, "\\'")}" "database" ${this.id}`)
  }

  public getEntries(): Map<string, entry> {
    const c: string = executeCommand('scoreboard players list').statusMessage.split('\n')
    const tables: db[] = []
    for (const t of c) {
      if (!t.includes("{'database':{'name':")) continue
      for (const db of t.replace(/'/g, '"').split(', ')) {
        if (!db.includes('{"database":{"name":')) continue
        tables.push(JSON.parse(db) as db)
      }
    }
    const entries = new Map<string, entry>()
    const _entries = tables.find((x) => x.database.id === this.id)?.database.entries ?? []
    for (const e of _entries) {
      if (!e.name) continue
      entries.set(e.name, e)
    }

    return entries
  }

  public addEntry(entry: entry): void {
    const dbJson: db = JSON.parse(this._getDbAsString())
    dbJson.database.entries.push(entry)

    return this._updateDb(dbJson)
  }

  public removeEntry(name: string): void {
    const dbJson: db = JSON.parse(this._getDbAsString())
    const res = dbJson.database.entries.filter((x) => x.name !== name)
    dbJson.database.entries = res

    return this._updateDb(dbJson)
  }
}
