import type { Client } from '../client'
import type { Player } from '../player'
import type { ActionFormResponse } from '../types'
// @ts-ignore FIXME: Once typings are made
import { ActionFormData } from 'mojang-minecraft-ui'

/**
 * Creates a new ActionForm.
 */
export class ActionForm {
  protected readonly player: Player
  protected readonly client: Client
  protected readonly form: any
  protected callback: ((res: ActionFormResponse) => void) | undefined
  protected canceled = false

  /**
   * Creates a new ActionForm.
   * @param {Player} player The player to recieve the form.
   * @param {Client} client The registered client to handle the form.
   */
  public constructor(player: Player, client: Client) {
    this.player = player
    this.client = client
    this.form = new ActionFormData()
    this.client.emit('ActionFormCreated', {
      player: this.player,
      form: this,
      result: this.result.bind(this),
      cancel: () => {
        this.canceled = true
      },
    })
  }

  /**
   * Sets the title of the form.
   * @param {string} title Form title.
   * @returns Form instance.
   */
  public setTitle(title: string): ActionForm {
    this.form.title(title)

    return this
  }

  /**
   * Sets the body of the form.
   * @param {string} body Form body.
   * @returns Form instance.
   */
  public setBody(body: string): ActionForm {
    this.form.body(body)

    return this
  }

  /**
   * Adds a button to the form.
   * @param {string} label The label on the button.
   * @param {string} icon The optional icon to display with the button.
   * @returns Form instance.
   */
  public addButton(label: string, icon?: string): ActionForm {
    this.form.button(label, icon ?? undefined)

    return this
  }

  /**
   * Sends the form to the player.
   * @param {(result: ActionFormResponse) => void} callback The response of the form.
   * @returns
   */
  public send(callback?: (result: ActionFormResponse) => void): void {
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

  /**
   * Private method for handling the form event.
   * @param callback
   */
  private result(callback: (data: ActionFormResponse) => void): void {
    this.callback = callback
  }
}
