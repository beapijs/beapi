import { runCommand, binToString, SafeIds } from '..'
import { DatabaseUtil } from './DatabaseUtil'
import { Document } from './Document'
import type { Schema } from './Schema'

const documentIds = new SafeIds(1, 16439399)

export class Modal<T extends Record<string, any>> {
  public readonly schema: Schema<T>
  public readonly scoreboardName: string
  public readonly name: string
  protected documents = new Map<string, Document<T> & T>()
  public constructor(name: string, schema: Schema<T>, scoreboardName = 'BeAPI__DATABASE') {
    if (!DatabaseUtil.validName(scoreboardName))
      throw Error(`Invalid Scoreboard Name Format: Letters, Numbers, Underscores!`)
    if (scoreboardName.length > 16) throw Error(`Scoreboard Names May Not Exceed 16 Characters!`)
    if (!DatabaseUtil.validName(name)) throw Error(`Invalid Model Name Format: Letters, Numbers, Underscores!`)
    this.schema = schema
    this.name = name
    this.scoreboardName = scoreboardName

    if (!DatabaseUtil.tableExists(scoreboardName)) {
      const result = runCommand(`scoreboard objectives add "${scoreboardName}" dummy`)
      if (result.err) throw new Error(result.statusMessage)
    }

    for (const rawdata of DatabaseUtil.retrieveSerializedData(this.name)) {
      const data = this.schema.deserialize(binToString(rawdata.bin))
      this.documents.set(rawdata.id, new Document(this, rawdata.id, data) as Document<T> & T)
    }
  }

  public asArray(): (Document<T> & T)[] {
    return Array.from(this.documents.values())
  }

  public find(partial: Partial<T>): (Document<T> & T) | undefined {
    const keys = Object.keys(partial).filter((key) => key !== undefined && key !== null)
    return this.asArray().find((item) => keys.every((key) => item.asObject()[key] === partial[key]))
  }

  public findAll(partial: Partial<T>): (Document<T> & T)[] {
    const keys = Object.keys(partial).filter((key) => key !== undefined && key !== null)
    return this.asArray().filter((item) => keys.every((key) => item.asObject()[key] === partial[key]))
  }

  public write(data: T): Document<T> & T {
    const id = documentIds.generate()
    const document = new Document<T>(this, id, data) as Document<T> & T
    this.documents.set(id, document)

    return document.save()
  }

  public writeBulk(data: T[]): (Document<T> & T)[] {
    const docs: (Document<T> & T)[] = []
    for (const doc of data) {
      const id = documentIds.generate()
      const document = new Document<T>(this, id, doc) as Document<T> & T
      this.documents.set(id, document)
      docs.push(document.save())
    }

    return docs
  }

  public deleteAll(): void {
    for (const document of this.documents.keys()) {
      this.delete(document)
    }
  }

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

  public sync(_id: string): void {
    const document = this.documents.get(_id)
    if (!document) return
    this.delete(_id)
    const update = runCommand(
      `scoreboard players add "${DatabaseUtil.toRaw(this.name, _id, this.schema.serialize(document.asObject()))}" "${
        this.scoreboardName
      }" 0`,
    )
    if (update.err) throw new Error(update.statusMessage)
  }
}
export function modal<T extends Record<string, any>>(
  name: string,
  schema: Schema<T>,
  scoreboardName = 'BeAPI__DATABASE',
): Modal<T> {
  return new Modal<T>(name, schema, scoreboardName)
}
