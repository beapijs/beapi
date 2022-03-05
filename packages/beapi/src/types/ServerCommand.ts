export interface ServerCommandResponse<T = any> {
  statusMessage: string
  data: T | undefined | null
  err: boolean
}
