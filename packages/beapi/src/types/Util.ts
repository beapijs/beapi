/**
 * Awaitable is a type helper for types that
 * can be async but dont need to be.
 */
export type Awaitable<T> = T | PromiseLike<T>
