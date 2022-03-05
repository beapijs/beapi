// We are forced to ignore alot of our linter related warnings
// Due to minecraft not typing their stuff :/

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Player } from '../player'
import type { ModalFormResponse } from '../types'
// @ts-ignore TEMP: Until typings are made
import { ModalFormData } from 'mojang-minecraft-ui'

export class ModalForm {
  private readonly player: Player
  private readonly form: any
  public title = 'Unnamed Form'

  public constructor(player: Player) {
    this.player = player
    this.form = new ModalFormData()
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
    this.form.title(this.title)
    this.form
      .show(this.player.getIPlayer())
      .then((res: ModalFormResponse) => {
        if (!callback) return

        return callback(res)
      })
      .catch((err: any) => {
        console.error(err)
      })
  }
}