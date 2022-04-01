import type { Client } from '..'
import type { BlockType as IBlockType, BlockPermutation } from 'mojang-minecraft'

export class BlockType {
  protected readonly _client: Client
  protected readonly _IBlockType: IBlockType

  public constructor(client: Client, IBlockType: IBlockType) {
    this._client = client
    this._IBlockType = IBlockType
  }

  public getIBlockType(): IBlockType {
    return this._IBlockType
  }

  public getId(): string {
    return this._IBlockType.id
  }

  public canBeWaterLogged(): boolean {
    return this._IBlockType.canBeWaterlogged
  }

  public createPermutation(): BlockPermutation {
    return this._IBlockType.createDefaultBlockPermutation()
  }
}
