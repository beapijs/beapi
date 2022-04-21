// Regular imports.
import {
  BlockType,
  Permutation,
  BlockInventory,
  BlockComponents,
  Client,
  Location,
  Dimension,
  BlockTypes,
  CamelToSnakeCase,
} from '..'
import { Block as IBlock, BlockInventoryComponent, MinecraftBlockTypes } from 'mojang-minecraft'

/**
 * BeAPI wrapper object for Minecraft IBlock. Adds a bunch of
 * abstracted methods to mutate and access props on block easier.
 */
export class Block {
  /**
   * Protected circular client reference.
   */
  protected readonly _client: Client
  /**
   * Protected IBlock reference to wrap.
   */
  protected readonly _IBlock: IBlock

  /**
   * BeAPI wrapper object for Minecraft IBlock. Adds a bunch of
   * abstracted methods to mutate and access props on block easier.
   * @param client Client reference.
   * @param IBlock IBlock to wrap.
   */
  public constructor(client: Client, IBlock: IBlock) {
    this._client = client
    this._IBlock = IBlock
  }

  /**
   * Gets Minecraf IBlock thats being wrapped.
   * @returns
   */
  public getIBlock(): IBlock {
    return this._IBlock
  }

  /**
   * Gets the blocks identifier.
   * @returns
   */
  public getId(): string {
    return this._IBlock.id
  }

  /**
   * Gets the wrapped Minecraft blocktype.
   * @returns
   */
  public getType(): BlockType {
    return new BlockType(this._client, this._IBlock.type)
  }

  /**
   * Sets a wrapped Minecraft blocktype.
   * @param type Wrapped blocktype.
   */
  public setType(type: CamelToSnakeCase<BlockTypes> | BlockType): void {
    // If block type.
    if (type instanceof BlockType) {
      // Set type to block type.
      this._IBlock.setType(type.getIBlockType())
      // Else namespaced string.
    } else {
      const blockType = MinecraftBlockTypes[type as BlockTypes]
      this._IBlock.setType(blockType)
    }
  }

  /**
   * Gets the blocks permutation.
   * @returns
   */
  public getPermutation(): Permutation {
    return new Permutation(this._client, this._IBlock.permutation)
  }

  /**
   * Sets the block permutation.
   * @param permutation Block permutation to apply.
   */
  public setPermutation(permutation: Permutation): void {
    this._IBlock.setPermutation(permutation.getIPermutation())
  }

  /**
   * Gets the block dimension.
   * @returns
   */
  public getDimension(): Dimension {
    return this._client.world.getDimension(this._IBlock.dimension)
  }

  /**
   * Gets the blocks location.
   * @returns
   */
  public getLocation(): Location {
    const pos = this._IBlock.location

    return {
      x: Math.floor(pos.x),
      y: Math.floor(pos.y),
      z: Math.floor(pos.z),
    }
  }

  /**
   * Gets precise location (decimals)
   * @returns
   */
  public getPreciseLocation(): Location {
    const pos = this._IBlock.location

    return {
      x: pos.x,
      y: pos.y,
      z: pos.z,
    }
  }

  /**
   * Checks if the block is empty.
   * @returns
   */
  public isEmpty(): boolean {
    return this._IBlock.isEmpty
  }

  /**
   * Checks if there is water in the block.
   * @returns
   */
  public isWaterLogged(): boolean {
    return this._IBlock.isWaterlogged
  }

  /**
   * Gets the blocks tags.
   * @returns
   */
  public getTags(): string[] {
    return this._IBlock.getTags()
  }

  /**
   * Checks if the block has a specific tag.
   * @param tag Tag to check.
   * @returns
   */
  public hasTag(tag: string): boolean {
    return this._IBlock.hasTag(tag)
  }

  /**
   * Gets a specific component from the block.
   * @param component Component to get.
   * @returns
   */
  public getComponent<K extends keyof BlockComponents>(component: K): BlockComponents[K] {
    return this._IBlock.getComponent(component)
  }

  /**
   * Checks if the block has a specific component.
   * @param component Component to check.
   * @returns
   */
  public hasComponent<K extends keyof BlockComponents>(component: K): boolean {
    if (this.getComponent(component) === null) return false

    return true
  }

  /**
   * Attempts to get the block inventory.
   * @returns can be `undefined`
   */
  public getInventory(): BlockInventory | undefined {
    if (!this.getComponent('inventory')) return

    return new BlockInventory(this._client, this._IBlock.getComponent('inventory') as BlockInventoryComponent)
  }
}
