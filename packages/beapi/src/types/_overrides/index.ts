// This will contain a multitude of errors
// Alot of conflicts with @types/node.
// Please bear with us
export {}

declare global {
  interface Console {
    log(message: string, ...optionalParams: string[]): void
    warn(message: string, ...optionalParams: string[]): void
    error(message: string, ...optionalParams: string[]): void
    info(message: string, ...optionalParams: string[]): void
    debug(message: string, ...optionalParams: string[]): void
  }
  // @ts-expect-error
  const console: Console
  // @ts-expect-error
  const require: undefined

  function setTimeout(callback: CallableFunction, tick: number): number
  function setInterval(callback: CallableFunction, tick: number): number
  function clearTimeout(id: number): void
  function clearInterval(id: number): void
}
