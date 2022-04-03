/**
 * Server command response data.
 */
export interface ServerCommandResponse<T = any> {
  /**
   * Message response from server.
   */
  statusMessage: string
  /**
   * Data associated with the response.
   */
  data: T | undefined | null
  /**
   * Response is an error?
   */
  err: boolean
}
