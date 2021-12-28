# Inventory

# Properties

## emptySlotsCount
```ts
read-only emptySlotsCount: number
```

## size
```ts
read-only size: number
```

# Methods

## addItem
```ts
addItem(itemStack: ItemStack): void
```
Adds an Item to the itemstack
Types: *[ItemStack](https://docs.microsoft.com/en-us/minecraft/creator/scriptapi/mojang-minecraft/itemstack)*

## getItem
```ts
getItem(slot: number): ItemStack
```
Returns the itemstack of the given slot.
Types: *[ItemStack](https://docs.microsoft.com/en-us/minecraft/creator/scriptapi/mojang-minecraft/itemstack)*

## setItem
```ts
setItem(slot: number, itemStack: ItemStack): void
```
Sets an the itemstack in a given slot.
Types: *[ItemStack](https://docs.microsoft.com/en-us/minecraft/creator/scriptapi/mojang-minecraft/itemstack)*

## swapItems
```ts
swapItems(slot: number, otherSlot: number, otherContainer: Container): boolean
```
Swaps itemsstacks.
Types: *[Container](https://docs.microsoft.com/en-us/minecraft/creator/scriptapi/mojang-minecraft/container)*

## transferItem
```ts
transferItem(fromSlot: number, toSlot: number, toContainer: Container): boolean
```
Transfer itemsstacks.
Types: *[Container](https://docs.microsoft.com/en-us/minecraft/creator/scriptapi/mojang-minecraft/container)*