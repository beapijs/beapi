// We are forced to ignore alot of our linter related warnings
// Due to minecraft not typing their stuff :/

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import type { Player } from '../player'
import type { ActionFormResponse } from '../types'
// @ts-ignore TEMP: Until typings are made
import { ActionFormData } from 'mojang-minecraft-ui'

export class ActionForm {
  private readonly player: Player
  private readonly form: any
  public title = 'Unnamed Form'
  public body = ''

  public constructor(player: Player) {
    this.player = player
    this.form = new ActionFormData()
  }

  public addButton(text: string, iconPath?: string): this {
    this.form.button(text, iconPath ?? undefined)

    return this
  }

  public send(callback?: (res: ActionFormResponse) => void): void {
    this.form.title(this.title)
    this.form.body(this.body)
    this.form
      .show(this.player.getIPlayer())
      .then((res: ActionFormResponse) => {
        if (!callback) return

        return callback(res)
      })
      .catch((err: any) => {
        console.error(err)
      })
  }
}
