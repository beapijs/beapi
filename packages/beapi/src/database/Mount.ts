import type { db } from '../@types/BeAPI.i.js'
import { Database } from './Database.js'
import { executeCommand } from '../command/executeCommand.js'

export function mountByName(name: string): Database {
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

export function mountById(id: number): Database {
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
        name: (Math.random() + 1).toString(36).substring(2),
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
