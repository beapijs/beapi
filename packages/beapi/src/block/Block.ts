import type { Client, Location } from '..'
import { BlockType, Permutation } from './'
import { Block as IBlock, BlockInventoryComponent, MinecraftBlockTypes } from 'mojang-minecraft'
import { BlockInventory } from '../inventory'
import type { Dimension, BlockTypes, CamelToSnakeCase } from '../'

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
    return new BlockType(this._client, this._IBlock.type)
  }

  public setType(type: CamelToSnakeCase<BlockTypes> | BlockType): void {
    if (type instanceof BlockType) {
      this._IBlock.setType(type.getIBlockType())
    } else if (type.includes(':')) {
      const namespace = type.split(':')[0]
      const id = type.split(':')[1]
      const blockType = MinecraftBlockTypes.get(`${namespace}:${id}`)
      this._IBlock.setType(blockType)
    } else {
      const blockType = MinecraftBlockTypes.get(`minecraft:${type}`)
      this._IBlock.setType(blockType)
    }
  }

  public getPermutation(): Permutation {
    return new Permutation(this._client, this._IBlock.permutation)
  }

  public setPermutation(permutation: Permutation): void {
    this._IBlock.setPermutation(permutation.getIPermutation())
  }

  public getDimension(): Dimension {
    return this._client.world.getDimension(this._IBlock.dimension)
  }

  public getLocation(): Location {
    const pos = this._IBlock.location

    return {
      x: Math.floor(pos.x),
      y: Math.floor(pos.y),
      z: Math.floor(pos.z),
    }
  }

  public isEmpty(): boolean {
    return this._IBlock.isEmpty
  }

  public isWaterLogged(): boolean {
    return this._IBlock.isWaterlogged
  }

  public getTags(): string[] {
    return this._IBlock.getTags()
  }

  public hasTag(tag: string): boolean {
    return this._IBlock.hasTag(tag)
  }

  // TODO: Make typings
  public getComponent(component: string): any {
    return this._IBlock.getComponent(component)
  }

  // TODO: make has component

  public getInventory(): BlockInventory | undefined {
    if (!this.getComponent('inventory')) return

    return new BlockInventory(this._client, this._IBlock.getComponent('inventory') as BlockInventoryComponent)
  }
}
