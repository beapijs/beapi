// FIXME: We are forced to ignore alot of our linter related warnings
// Due to minecraft not typing their stuff :/
// TODO: Make this better later

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Player, Client, ModalFormResponse } from '..'
// @ts-ignore FIXME: Once typings are made
import { ModalFormData } from 'mojang-minecraft-ui'

export class ModalForm {
  private readonly player: Player
  protected readonly _client: Client
  protected readonly form: any
  protected callback: ((res: ModalFormResponse) => void) | undefined
  protected canceled = false
  public title = 'Unnamed Form'

  public constructor(player: Player, client: Client) {
    this.player = player
    this._client = client
    this.form = new ModalFormData()
    this._client.emit('ModalFormCreated', {
      player: this.player,
      form: this,
      result: this.result.bind(this),
      cancel: () => {
        this.canceled = true
      },
    })
  }

  public addInput(label: string, placeHolderText: string, defaultValue?: string): this {
    this.form.textField(label, placeHolderText, defaultValue ?? '')

    return this
  }

  public addDropdown(label: string, options: string[], defaultValueIndex?: number): this {
    this.form.dropdown(label, options, defaultValueIndex ?? 0)

    return this
  }

  public addSlider(
    label: string,
    minimumValue: number,
    maximumValue: number,
    valueStep: number,
    defaultValue?: number,
  ): this {
    this.form.slider(label, minimumValue, maximumValue, valueStep, defaultValue ?? 0)

    return this
  }

  public addToggle(label: string, defaultValue?: boolean): this {
    this.form.toggle(label, defaultValue ?? false)

    return this
  }

  public addIcon(iconPath: string): this {
    this.form.icon(iconPath)

    return this
  }

  public send(callback?: (res: ModalFormResponse) => void): void {
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
    this.form
      .show(this.player.getIPlayer())
      .then((res: ModalFormResponse) => {
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

  private result(callback: (data: ModalFormResponse) => void): void {
    this.callback = callback
  }
}
