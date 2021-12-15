# Player
Represents a player within the world, and stored by BeAPI.

# Methods

## getName
```ts
getName(): string
```
Returns the player's name of their Microsoft Account.

## getNameTag
```ts
getNameTag(): string
```
Returns the player's ingame name.

## getVanilla
```ts
getVanilla(): MCPlayer
```
Returns the player's vanilla gametest object.
Types: *[MCPlayer](https://docs.microsoft.com/en-us/minecraft/creator/scriptapi/mojang-minecraft/player)*

## getExecutableName
```ts
getExecutableName(): string
```
Returns the valid name at which a command can be executed on this player.

## setNameTag
```ts
setNameTag(name: string): void
```
Sets the player's ingame name.

## getTags
```ts
getTags(): string[]
```
Returns all of the tags on this player.

## hasTag
```ts
hasTag(tag: string): boolean
```
Returns boolean if the player has a specific tag.

## addTag
```ts
addTag(tag: string): boolean
```
Adds a tag to a player, returns boolean if the player already has the tag.

## removeTag
```ts
removeTag(tag: string): boolean
```
Removes a tag from a player, returns boolean if the player did not already have the tag.

## getLocation
```ts
getLocation(): Location
```
Returns the player's location.
Types: *[Location](https://github.com/MCBE-Utilities/BeAPI/tree/main/docs/types/location.md)*

## sendMessage
```ts
sendMessage(message: string): void
```
Sends a message to this player.

## getInventory
```ts
getInventory(): Inventory
```
Returns the player's inventory.
Types: *[Inventory](https://github.com/MCBE-Utilities/BeAPI/tree/main/docs/types/inventory.md)*

## executeCommand
```ts
executeCommand(command: string): ExecuteCommandResponse
```
Executes a command as the player. Returns the reponse of the command.
Types: *[ExecuteCommandResponse](https://github.com/MCBE-Utilities/BeAPI/tree/main/docs/types/executecommandresponse.md)*

## getScore
```ts
getScore(objective: string): number
```
Returns the score value of this player.

## getHealth
```ts
getHealth(): Health
```
Returns the health components of this player.
Types: *[Health](https://github.com/MCBE-Utilities/BeAPI/tree/main/docs/types/health.md)*
