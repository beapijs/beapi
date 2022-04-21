// FIXME: We are forced to ignore alot of our linter related warnings
// Due to minecraft not typing their stuff :/
// TODO: Make this better later

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import type { Player, Client, MessageFormResponse } from '..'
// @ts-ignore FIXME: Once typings are made
import { MessageFormData } from 'mojang-minecraft-ui'

export class MessageForm {
  protected readonly player: Player
  protected readonly _client: Client
  protected readonly form: any
  protected callback: ((res: MessageFormResponse) => void) | undefined
  protected canceled = false
  public title = 'Unnamed Form'
  public body = ''
  public button1 = 'Yes'
  public button2 = 'No'

  public constructor(player: Player, client: Client) {
    this.player = player
    this._client = client
    this.form = new MessageFormData()
    this._client.emit('MessageFormCreated', {
      player: this.player,
      form: this,
      result: this.result.bind(this),
      cancel: () => {
        this.canceled = true
      },
    })
  }

  public send(callback?: (res: MessageFormResponse) => void): void {
    if (this.canceled) {
      if (this.callback) {
        this.callback({
          isCanceled: true,
        })
      }
      if (!callback) return

      return callback({
        isCanceled: true,
      })
    }
    this.form.title(this.title)
    this.form.body(this.body)
    this.form.button1(this.button1)
    this.form.button2(this.button2)
    this.form
      .show(this.player.getIPlayer())
      .then((res: MessageFormResponse) => {
        if (!callback) return
        if (this.callback) {
          this.callback(res)
        }

        return callback(res)
      })
      .catch((err: any) => {
        console.error(err)
      })
  }

  private result(callback: (data: MessageFormResponse) => void): void {
    this.callback = callback
  }
}
