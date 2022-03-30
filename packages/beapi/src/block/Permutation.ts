import type { Client } from '..'
import type { BlockPermutation as IPermutation, IBlockProperty } from 'mojang-minecraft'
import { BlockType } from './'

export class Permutation {
  protected readonly _client: Client
  protected readonly _IPermutation: IPermutation

  public constructor(client: Client, IPermutation: IPermutation) {
    this._client = client
    this._IPermutation = IPermutation
  }

  public getIPermutation(): IPermutation {
    return this._IPermutation
  }

  public getType(): BlockType {
    return new BlockType(this._client, this._IPermutation.type)
  }

  public getTags(): string[] {
    return this._IPermutation.getTags()
  }

  public hasTag(tag: string): boolean {
    return this._IPermutation.hasTag(tag)
  }

  public getProperties(): IBlockProperty[] {
    return this._IPermutation.getAllProperties()
  }

  public hasProperty(property: string): boolean {
    const check = this.getProperties().find((x) => x.name === property)
    if (!check) return false

    return true
  }

  public getProperty(property: string): IBlockProperty {
    return this._IPermutation.getProperty(property)
  }

  public clone(): Permutation {
    return new Permutation(this._client, this._IPermutation.clone())
  }
}
