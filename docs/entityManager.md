# EntityManager
BeAPI's entity management methods.

# Methods

## addEntity
```ts
addEntity(entity: Entity): void
```
Adds a entity to the manager.
Types: *[Entity](https://github.com/MCBE-Utilities/BeAPI/blob/main/docs/entity.md)*

## removeEntity
```ts
removeEntity(entity: Entity): void
```
Removes a entity to the manager.
Types: *[Entity](https://github.com/MCBE-Utilities/BeAPI/blob/main/docs/entity.md)*

## getEntityByNameTag
```ts
getEntityByNameTag(nameTag: string, entityType: string): Entity
```
Returns the entity by a given nameTag.
Types: *[Entity](https://github.com/MCBE-Utilities/BeAPI/blob/main/docs/entity.md)*

## getEntityByRuntimeId
```ts
getEntityByRuntimeId(runtimeId: number): Entity
```
Returns the entity by a given runtimeId.
Types: *[Entity](https://github.com/MCBE-Utilities/BeAPI/blob/main/docs/entity.md)*

## getEntityByVanill
```ts
getEntityByVanill(vanilla: MCEntity): Entity
```
Returns the entity by a given vanilla gametest object.
Types: *[Entity](https://github.com/MCBE-Utilities/BeAPI/blob/main/docs/entity.md), [MCEntity](https://docs.microsoft.com/en-us/minecraft/creator/scriptapi/mojang-minecraft/entity)*

## getLatestEntity
```ts
getLatestEntity(): Entity
```
Returns recently added entity.
Types: *[Entity](https://github.com/MCBE-Utilities/BeAPI/blob/main/docs/entity.md)*

## getEntityList
```ts
getEntityList(): Map<number, Entity>
```
Returns the entity list as a Map.
Types: *[Entity](https://github.com/MCBE-Utilities/BeAPI/blob/main/docs/entity.md)*