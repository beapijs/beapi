import {
  Database,
  getAllDatabases,
} from './Database.js'
import {
  mountById,
  mountByName,
} from './Mount.js'

const db = {
  Database,
  getAllDatabases,
  mountById,
  mountByName,
}

export {
  db,
}
