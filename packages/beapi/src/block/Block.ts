import type { Client, Dimension, Location } from '..'
import type { Block as IBlock, Dimension as IDimension, BlockType } from 'mojang-minecraft'

export class Block {
  protected readonly _client: Client
  protected readonly _IBlock: IBlock

  public constructor(client: Client, IBlock: IBlock) {
    this._client = client
    this._IBlock = IBlock
  }

  public getIBlock(): IBlock {
    return this._IBlock
  }

  public getId(): string {
    return this._IBlock.id
  }

  public getType(): BlockType {
    return this._IBlock.type
  }

  public setType(type: BlockType): void {
    this._IBlock.setType(type)
  }

  public getDimension(): IDimension {
    return this._IBlock.dimension
  }

  public getDimensionName(): Dimension {
    const id = this.getDimension().id.split(':')[1].replace(/_/g, ' ')

    return id as Dimension
  }

  public getLocation(): Location {
    const pos = this._IBlock.location

    return {
      x: Math.floor(pos.x),
      y: Math.floor(pos.y),
      z: Math.floor(pos.z),
    }
  }
}
