import type { Player } from '../player'
import type { MessageFormResponse } from '../types'
// @ts-ignore TEMP: Until typings are made
import { MessageFormData } from 'mojang-minecraft-ui'

export class MessageForm {
  private readonly player: Player
  private readonly form: any
  public title = 'Unnamed Form'
  public body = ''
  public button1 = 'Yes'
  public button2 = 'No'

  public constructor(player: Player) {
    this.player = player
    this.form = new MessageFormData()
  }

  public send(callback?: (res: MessageFormResponse) => void): void {
    this.form.title(this.title)
    this.form.body(this.body)
    this.form.button1(this.button1)
    this.form.button2(this.button2)
    this.form
      .show(this.player.getIPlayer())
      .then((res: MessageFormResponse) => {
        if (!callback) return

        return callback(res)
      })
      .catch((err: any) => {
        console.error(err)
      })
  }
}
