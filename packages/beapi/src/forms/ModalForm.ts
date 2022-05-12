import type { Client } from '../client'
import type { Player } from '../player'
import type { ModalFormResponse } from '../types'
// @ts-ignore FIXME: Once typings are made
import { ModalFormData } from 'mojang-minecraft-ui'

/**
 * Creates a new ModalForm.
 */
export class ModalForm {
  private readonly player: Player
  protected readonly _client: Client
  protected readonly form: any
  protected callback: ((res: ModalFormResponse) => void) | undefined
  protected canceled = false

  /**
   * Creates a new ModalForm.
   * @param {Player} player The player to recieve the form.
   * @param {Client} client The registered client to handle the form.
   */
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

  /**
   * Sets the title of the form.
   * @param {string} title Form title.
   * @returns Form instance.
   */
  public setTitle(title: string): ModalForm {
    this.form.title(title)

    return this
  }

  /**
   * Adds a text input box to the form.
   * @param {string} label The label of the input box.
   * @param {string} placeHolderText Text to be displayed as a background behind the input box.
   * @param {string} defaultValue Optinal default text to be already inputed in the input box.
   * @returns Form instance.
   */
  public addInput(label: string, placeHolderText: string, defaultValue?: string): ModalForm {
    this.form.textField(label, placeHolderText, defaultValue ?? '')

    return this
  }

  /**
   * Adds a dropdown menu to the form.
   * @param {string} label The label of the dropdown menu.
   * @param {string[]} options The array of strings to be displayed in the dropdown menu.
   * @param {number} defaultValueIndex Optional default selected string.
   * @returns Form instance.
   */
  public addDropdown(label: string, options: string[], defaultValueIndex?: number): ModalForm {
    this.form.dropdown(label, options, defaultValueIndex ?? 0)

    return this
  }

  /**
   * Adds a number slidder to the form.
   * @param {string} label The label of the number slidder.
   * @param {number} minimumValue Minimum value that can be selected.
   * @param {number} maximumValue Maximum value that can be selected.
   * @param {number} valueStep Amount of values that go up or down when slidden.
   * @param {number} defaultValue Optional default number value.
   * @returns Form instance.
   */
  public addSlider(
    label: string,
    minimumValue: number,
    maximumValue: number,
    valueStep: number,
    defaultValue?: number,
  ): ModalForm {
    this.form.slider(label, minimumValue, maximumValue, valueStep, defaultValue ?? 0)

    return this
  }

  /**
   * Adds a toggle switch to the form.
   * @param {string} label Label of the toggle switch.
   * @param {boolean} defaultValue Default value if the switch should be already toggled.
   * @returns Form instance.
   */
  public addToggle(label: string, defaultValue?: boolean): ModalForm {
    this.form.toggle(label, defaultValue ?? false)

    return this
  }

  /**
   * Adds a icon image to the form.
   * @WARNING This method appears to do nothing at the moment.
   * @param {string} iconPath Path to the texture file.
   * @returns Form instance.
   */
  public addIcon(iconPath: string): ModalForm {
    this.form.icon(iconPath)

    return this
  }

  /**
   * Sends the form to the player.
   * @param {(result: ModalFormResponse) => void} callback The response of the form.
   * @returns
   */
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

  /**
   * Private method for handling the form event.
   * @param callback
   */
  private result(callback: (data: ModalFormResponse) => void): void {
    this.callback = callback
  }
}
