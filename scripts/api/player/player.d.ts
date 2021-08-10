export interface Player {
  name: string
  getVanilla(): vanillaPlayer
  getExecutableName(): string
  getNameTag(): string
  setNameTag(content: string): void
  getTags(): Array<string>
  hasTag(tag: string): boolean
  addTag(tag: string): void
  removeTag(tag: string): void
  executeCommand(tag: string): string
  getScore(object: string): number
  getScores(): Array<{objective: string, displayName: string, value: number}>
  getLocation(): location
  getHealthComponent(): healthComponent
  sendMessage(message: string): void
}

interface vanillaPlayer {
  id: string
  isSneaking: boolean
  location: location
  name: string
  nameTag: string
  velocity: location
  addEffect(effectType: any, duration: number, amplifier: number): void
  getComponent(componentId: components): void
  getComponents(): Array<any>
  getEffect(effectType: any): any
  hasComponent(componentId: string): boolean
  kill(): void
  triggerEvent(eventName: string): void
}

interface location {
  x: number
  y: number
  z: number
}

export interface playerManager {
  players: Map<string, Player>
  getPlayerNames(): Array<string>
  getPlayers(): Map<string, Player>
  getPlayerByName(name: string): Player
  updatePlayer(name: string, player: Player): void
}

type components = (
  "minecraft:lava_movement" |
  "minecraft:breathable" |
  "minecraft:health" |
  "minecraft:movement" |
  "minecraft:rideable" |
  "minecraft:underwater_movement"
)

interface healthComponent {
  current: number
  id: string
  value: number
  resetToDefaultValue(): void
  resetToMaxValue(): void
  resetToMinValue(): void
  setCurrent(value: number): void
}