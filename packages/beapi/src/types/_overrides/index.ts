// This will contain a multitude of errors
// Alot of conflicts with @types/node.
// Please bear with us
export {}

// @ts-ignore
declare global {
  interface Console {
    // @ts-ignore
    log(message: string, ...optionalParams: string[]): void
    // @ts-ignore
    warn(message: string, ...optionalParams: string[]): void
    // @ts-ignore
    error(message: string, ...optionalParams: string[]): void
    // @ts-ignore
    info(message: string, ...optionalParams: string[]): void
    // @ts-ignore
    debug(message: string, ...optionalParams: string[]): void
    // @ts-ignore
  }
  // @ts-expect-error
  const console: Console
  // @ts-expect-error
  const require: undefined

  // @ts-ignore
  function setTimeout(callback: CallableFunction, tick: number): number
  // @ts-ignore
  function setInterval(callback: CallableFunction, tick: number): number
  // @ts-ignore
  function clearTimeout(id: number): void
  // @ts-ignore
  function clearInterval(id: number): void
}
