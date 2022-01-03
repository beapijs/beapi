import type { db } from '../@types/BeAPI.i.js'
import { Database } from './Database.js'
import { executeCommand } from '../command/executeCommand.js'

export function mountByName(name: string): Database | undefined {
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
    return new Database(
      {
        name: name,
        id: undefined,
      },
      false,
    )

  return new Database(
    {
      name: db.database.name,
      id: db.database.id,
    },
    true,
  )
}

export function mountById(id: number): Database | undefined {
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
    return new Database(
      {
        name: '',
        id: id,
      },
      false,
    )

  return new Database(
    {
      name: db.database.name,
      id: db.database.id,
    },
    true,
  )
}
