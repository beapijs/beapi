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

  public addButton(text: string, iconPath?: string): ActionForm {
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
