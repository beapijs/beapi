# CommandManager
BeAPI's command management methods.

# Methods

## registerCommand
```ts
registerCommand(options: CommandOptions, callback: (data: CommandResponse) => void): void
```
Registers a command to BeAPI's commandHandler.
Types: *[CommandOptions](https://github.com/MCBE-Utilities/BeAPI/tree/main/docs/types/commandoptions.md), [CommandResponse](https://github.com/MCBE-Utilities/BeAPI/tree/main/docs/types/commandresponse.md)*

## getCommands
```ts
getCommands(): Map<string, CommandMapOptions>
```
Returns a list of all registered commands.
Types: *[CommandMapOptions](https://github.com/MCBE-Utilities/BeAPI/tree/main/docs/types/commandmapoptions.md)*

## getPrefix
```ts
getPrefix(): string
```
Returns the current command handlers prefix.

## setPrefix
```ts
setPrefix(prefix: string): void
```
Sets the command handlers prefix.