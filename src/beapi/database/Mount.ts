import {
  db,
} from '../../types/BeAPI.i.js'
import {
  Database,
} from './Database.js'
import {
  executeCommand,
} from '../command/executeCommand.js'

export function mountByName(name: string): Database {
  const c = executeCommand("scoreboard players list").statusMessage.split("\n")
  const tables: db[] = []
  for (const t of c) {
    if (!t.startsWith("{'database':{'name':")) continue
    for (const db of t.replace(/'/g, '"').split(", ")) {
      tables.push(JSON.parse(db))
    }
  }
  const db = tables.find((x) => x.database.name === name)
  
  return new Database({
    name: db.database.name,
    id: db.database.id,
  }, true)
}

export function mountById(id: number): Database {
  const c = executeCommand("scoreboard players list").statusMessage.split("\n")
  const tables: db[] = []
  for (const t of c) {
    if (!t.startsWith("{'database':{'name':")) continue
    for (const db of t.replace(/'/g, '"').split(", ")) {
      tables.push(JSON.parse(db))
    }
  }
  const db = tables.find((x) => x.database.id === id)
  
  return new Database({
    name: db.database.name,
    id: db.database.id,
  }, true)
}
