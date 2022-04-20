// Regular import.
import { runCommand, binToString, SafeIds } from '..'
import { DatabaseUtil } from './DatabaseUtil'
import { Document } from './Document'

// Type imports.
import type { Schema } from './Schema'

/**
 * Safe document id generator. No overlaps across instances.
 */
const documentIds = new SafeIds(1, 16439399)

/**
 * BeAPI database modal handler. Modal is the main interaction point
 * for handling documents.
 *
 * Think of it as a folder, the schema tells
 * what each file in the folder will hold and the modal allows you to
 * create, edit, delete, and get the files in the folder.
 */
export class Modal<T extends Record<string, any>> {
  /**
   * Reference to the schematic.
   */
  public readonly schema: Schema<T>
  /**
   * Name of scoreboard to save documents to.
   */
  public readonly scoreboardName: string
  /**
   * Name of modal to store documents under.
   */
  public readonly name: string
  /**
   * Protected storage for docs in memoty
   */
  protected documents = new Map<string, Document<T> & T>()

  /**
   * BeAPI database modal handler. Modal is the main interaction point
   * for handling documents.
   *
   * Think of it as a folder, the schema tells
   * what each file in the folder will hold and the modal allows you to
   * create, edit, delete, and get the files in the folder.
   * @param name Name of modal.
   * @param schema Constructed schematic.
   * @param scoreboardName Name of scoreboard to store documents under.
   */
  public constructor(name: string, schema: Schema<T>, scoreboardName = 'BeAPI__DATABASE') {
    // If not valid scoreboard name throw an error.
    if (!DatabaseUtil.validName(scoreboardName))
      throw Error(`Invalid Scoreboard Name Format: Letters, Numbers, Underscores!`)
    // If scoreboard name is more than 16 characters throw error.
    if (scoreboardName.length > 16) throw Error(`Scoreboard Names May Not Exceed 16 Characters!`)
    // If invalidd modal name throw new error.
    if (!DatabaseUtil.validName(name)) throw Error(`Invalid Model Name Format: Letters, Numbers, Underscores!`)

    // Assign arguments to correct properties.
    this.schema = schema
    this.name = name
    this.scoreboardName = scoreboardName

    // Check if table already exists.
    if (!DatabaseUtil.tableExists(scoreboardName)) {
      // If not attempt to create a new one.
      const result = runCommand(`scoreboard objectives add "${scoreboardName}" dummy`)
      // If error throw it.
      if (result.err) throw new Error(result.statusMessage)
    }

    // Loop through all raw data retrieved from the scoreboard table.
    for (const rawdata of DatabaseUtil.retrieveSerializedData(this.name)) {
      // Attempt to deserialize the data and convert binary to string.
      const data = this.schema.deserialize(binToString(rawdata.bin))
      // Set document in current documents.
      this.documents.set(rawdata.id, new Document(this, rawdata.id, data) as Document<T> & T)

      // If document had old not defined keys on it and needed migration delete from scoreboard
      // and sync the new data.
      if (data.__documentNeedsMigrate__) {
        delete data.__documentNeedsMigrate__
        const _dataRaw = DatabaseUtil.toRaw(rawdata.name, rawdata.id, rawdata.bin)
        runCommand(`scoreboard players reset "${_dataRaw}" "${this.scoreboardName}"`)
        this.sync(rawdata.id)
      }
    }
  }

  /**
   * Get all documents in current modal as an array.
   * @returns
   */
  public asArray(): (Document<T> & T)[] {
    return Array.from(this.documents.values())
  }

  /**
   * Attempt to find a document with some partial data.
   * @param partial Partial data.
   * @returns
   */
  public find(partial: Partial<T>): (Document<T> & T) | undefined {
    const keys = Object.keys(partial).filter((key) => key !== undefined && key !== null)
    return this.asArray().find((item) => keys.every((key) => item.asObject()[key] === partial[key]))
  }

  /**
   * Attempt to find all documents that match given partial data.
   * @param partial Partial data.
   * @returns
   */
  public findAll(partial: Partial<T>): (Document<T> & T)[] {
    const keys = Object.keys(partial).filter((key) => key !== undefined && key !== null)
    return this.asArray().filter((item) => keys.every((key) => item.asObject()[key] === partial[key]))
  }

  /**
   * Write a new document to the modal in database.
   * @param data Schema data to write.
   * @returns
   */
  public write(data: T): Document<T> & T {
    const id = documentIds.generate()
    const document = new Document<T>(this, id, data) as Document<T> & T
    this.documents.set(id, document)

    return document.save()
  }

  /**
   * Write a bulk amount of documents from an array.
   * @param data Schema data array to write.
   * @returns
   */
  public writeBulk(data: T[]): (Document<T> & T)[] {
    const docs: (Document<T> & T)[] = []
    for (const doc of data) {
      this.write(doc)
    }

    return docs
  }

  /**
   * Deletes all documents in the modal.
   *
   * WARNING: this is very dangerous and not reversable!
   */
  public deleteAll(): void {
    for (const document of this.documents.keys()) {
      this.delete(document)
    }
  }

  /**
   * Deletes a document from modal by its id.
   * @param _id Id of the document.
   * @returns
   */
  public delete(_id: string): void {
    const document = this.documents.get(_id)
    if (!document) return
    runCommand(
      `scoreboard players reset "${DatabaseUtil.toRaw(
        this.name,
        _id,
        this.schema.serialize(document.retrieveKnownInternalData()),
      )}" "${this.scoreboardName}"`,
    )
    this.documents.delete(_id)
  }

  /**
   * Syncs a document in memory to persistant storage by its id.
   * `Document.save()` has the same effect.
   * @param _id Id of document to save.
   * @returns
   */
  public sync(_id: string): void {
    const document = this.documents.get(_id)
    if (!document) return
    runCommand(
      `scoreboard players reset "${DatabaseUtil.toRaw(
        this.name,
        _id,
        this.schema.serialize(document.retrieveKnownInternalData()),
      )}" "${this.scoreboardName}"`,
    )
    const update = runCommand(
      `scoreboard players add "${DatabaseUtil.toRaw(this.name, _id, this.schema.serialize(document.asObject()))}" "${
        this.scoreboardName
      }" 0`,
    )
    if (update.err) throw new Error(update.statusMessage)
  }
}

/**
 * Functional way of creating a modal.
 * @param name Name of the modal.
 * @param schema Constructed schematic.
 * @param scoreboardName Name of scorebaord to save under.
 * @returns
 */
export function modal<T extends Record<string, any>>(
  name: string,
  schema: Schema<T>,
  scoreboardName = 'BeAPI__DATABASE',
): Modal<T> {
  return new Modal<T>(name, schema, scoreboardName)
}
