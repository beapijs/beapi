import { runCommand, stringToBin } from '../utils'
import type { RawData } from '../types'

export namespace DatabaseUtil {
  export function retrieveSerializedData(name: string): RawData[] {
    const { statusMessage, err } = runCommand('scoreboard players list')
    if (err) return []
    return (statusMessage.match(/<{\?name=\w+&id=\w+&bin=[01 ]+}>/gi) ?? [])
      .map((i) => DatabaseUtil.fromRaw(i))
      .filter((i) => i.name === name)
  }
  export function retrieveObjectiveNames(): string[] {
    const { err, statusMessage } = runCommand('scoreboard objectives list')
    if (err) return []
    return statusMessage.match(/- (\w*):/gi)?.map((i) => i.replace(/- |:/g, '')) ?? []
  }
  export function tableExists(name: string): boolean {
    return DatabaseUtil.retrieveObjectiveNames().includes(name)
  }
  export function toRaw(name: string, id: string, data: string): string {
    return `<{?name=${name}&id=${id}&bin=${stringToBin(data)}}>`
  }
  export function fromRaw(raw: string): RawData {
    if (!/<{\?name=\w+&id=\w+&bin=[01 ]+}>/gi.test(raw)) {
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
    const bin = mapped.get('bin')!.trim()
    return {
      id,
      name,
      bin,
    }
  }
  export function validName(name: string): boolean {
    return !/\W/.test(name)
  }
}
