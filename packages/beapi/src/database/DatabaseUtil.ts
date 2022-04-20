import { runCommand, stringToBin } from '../utils'
import type { RawData } from '../types'

/**
 * Dedicated namespace for random database utility methods.
 * Namespaces were chosen because they are easy to add on to and look
 * better.
 */
export namespace DatabaseUtil {
  /**
   * Retrieves all serialized data objects as rawdata.
   * @param name Modal name.
   * @returns
   */
  export function retrieveSerializedData(name: string): RawData[] {
    const { statusMessage, err } = runCommand('scoreboard players list')
    if (err) return []
    return (statusMessage.match(/<{\?name=\w+&id=\w+&bin=[01 ]+}>/gi) ?? [])
      .map((i) => DatabaseUtil.fromRaw(i))
      .filter((i) => i.name === name)
  }
  /**
   * Retrieves all objective names.
   * @returns
   */
  export function retrieveObjectiveNames(): string[] {
    const { err, statusMessage } = runCommand('scoreboard objectives list')
    if (err) return []
    return statusMessage.match(/- (\w*):/gi)?.map((i) => i.replace(/- |:/g, '')) ?? []
  }
  /**
   * Checks if an objective exists.
   * @param name Objective name
   * @returns
   */
  export function tableExists(name: string): boolean {
    return DatabaseUtil.retrieveObjectiveNames().includes(name)
  }

  /**
   * Converts raw data into weird xml/url style encoded string we do.
   * @param name Modal name.
   * @param id Document id.
   * @param data Serialized data string.
   * @returns
   */
  export function toRaw(name: string, id: string, data: string): string {
    return `<{?name=${name}&id=${id}&bin=${stringToBin(data)}}>`
  }

  /**
   * Converts weird raw xml/url thing into usable raw data.
   * @param raw Raw xml/url thing.
   * @returns
   */
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

  /**
   * Checks if given name is considered valid by beapi standards.
   * @param name
   * @returns
   */
  export function validName(name: string): boolean {
    return !/\W/.test(name)
  }
}
