import type { SocketManager } from '../SocketManager.js'

export class GetRequests {
  private readonly _socket: SocketManager
  public requestName = 'GetRequests'
  public parameters = 'returns {request: String, params: String}[]'

  public constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet: Record<string, any>) => {
      if (packet.event !== 'GetRequests') return

      const requests = []
      for (const [requestname, request] of this._socket.getSocketRequests()) {
        requests.push({
          request: requestname,
          params: request.parameters,
        })
      }

      return this._socket.sendMessage({
        berp: {
          event: 'GetRequests',
          message: 'Sending all know socket requests.',
          data: requests,
          requestId: packet.requestId,
        },
      })
    })
  }
}
