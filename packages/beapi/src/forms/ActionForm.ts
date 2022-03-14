// We are forced to ignore alot of our linter related warnings
// Due to minecraft not typing their stuff :/

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import type { Client } from '../client'
import type { Player } from '../player'
import type { ActionFormResponse } from '../types'
// @ts-ignore TEMP: Until typings are made
import { ActionFormData } from 'mojang-minecraft-ui'

export class ActionForm {
  protected readonly player: Player
  protected readonly _client: Client
  protected readonly form: any
  protected callback: ((res: ActionFormResponse) => void) | undefined
  protected canceled = false
  public title = 'Unnamed Form'
  public body = ''

  public constructor(player: Player, client: Client) {
    this.player = player
    this._client = client
    this.form = new ActionFormData()
    this._client.emit('ActionFormCreated', {
      player: this.player,
      form: this,
      result: this.result.bind(this),
      cancel: () => {
        this.canceled = true
      },
    })
  }

  public addButton(text: string, iconPath?: string): this {
    this.form.button(text, iconPath ?? undefined)

    return this
  }

  public send(callback?: (res: ActionFormResponse) => void): void {
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
    this.form
      .show(this.player.getIPlayer())
      .then((res: ActionFormResponse) => {
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

  private result(callback: (data: ActionFormResponse) => void): void {
    this.callback = callback
  }
}
