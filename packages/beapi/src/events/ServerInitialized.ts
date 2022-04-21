import * as Minecraft from 'mojang-minecraft'
import { world } from 'mojang-minecraft'
import { setProto, Client, PropertyRegistry, PropertyType, DynamicPropertiesDefinition, AbstractEvent } from '..'

// FIXME: TEMP - Mojang keep on top of your typings or hire me at <Nobu : chat@nobu.sh>
export interface WorldInitializeEvent {
  propertyRegistry: PropertyRegistry
}

/**
 * BeAPI ServerInitialized event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class ServerInitialized extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('ServerInitialized')
  public readonly name = 'ServerInitialized'

  // Predefined in AbstractEvent.
  @setProto('worldInitialize')
  public readonly iName = 'worldInitialize'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI ServerInitialized event. Contains the logic
   * for translating Minecraft event data to BeAPI
   * wrapped data.
   * @param client Client referece.
   */
  public constructor(client: Client) {
    super()
    this._client = client
  }

  // Predefined in AbstractEvent.
  public on(): void {
    // If not already registered.
    if (!this._registered) {
      // Subscribe to Minecraft world event with IName
      // And use bound _logic for the callback.
      // @ts-ignore FIXME: TEMP - util Minecraft typings are updated.
      world.events[this.iName].subscribe(this._logic)
      // Set registered to true so this cannot be called
      // Again before off being called.
      this._registered = true
    }
  }

  // Predefined in AbstractEvent.
  public off(): void {
    // If currently registered.
    if (this._registered) {
      // Remove Minecraft event listener on IName
      // With bound _logic callback.
      // @ts-ignore FIXME: TEMP - util Minecraft typings are updated.
      world.events[this.iName].unsubscribe(this._logic)
      // Set registered to false so this cannot be called
      // Again before on being called.
      this._registered = false
    }
  }

  // Predefined in AbstractEvent.
  protected __logic(arg: WorldInitializeEvent): void {
    // Emit the client event.

    // @ts-ignore
    this._client.emit(this.name, {
      registerWorldProperty: (property: PropertyType, id: string, length = 10): void => {
        const dynamic = new (Minecraft as any).DynamicPropertiesDefinition() as DynamicPropertiesDefinition
        switch (property) {
          case 'string':
            dynamic.defineString(id, length)
            return arg.propertyRegistry.registerWorldDynamicProperties(dynamic)
          case 'number':
            dynamic.defineNumber(id)
            return arg.propertyRegistry.registerWorldDynamicProperties(dynamic)
          case 'boolean':
            dynamic.defineBoolean(id)
            return arg.propertyRegistry.registerWorldDynamicProperties(dynamic)
        }
      },
      // TODO: Fix typings once added by mojang
      registerEntityProperty: (entity: any, property: PropertyType, id: string, length = 10): void => {
        const dynamic = new (Minecraft as any).DynamicPropertiesDefinition() as DynamicPropertiesDefinition
        switch (property) {
          case 'string':
            dynamic.defineString(id, length)
            return arg.propertyRegistry.registerEntityTypeDynamicProperties(dynamic, entity)
          case 'number':
            dynamic.defineNumber(id)
            return arg.propertyRegistry.registerEntityTypeDynamicProperties(dynamic, entity)
          case 'boolean':
            dynamic.defineBoolean(id)
            return arg.propertyRegistry.registerEntityTypeDynamicProperties(dynamic, entity)
        }
      },
    })
  }
}
