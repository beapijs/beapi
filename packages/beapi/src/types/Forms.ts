// TODO: Add generics to modal responses for typings
// TODO: Add type turnary so isCanceled extends false selection is not optional

/**
 * Modal response from form.
 */
export interface ModalFormResponse {
  /**
   * Values in order.
   */
  readonly formValues?: any[]
  /**
   * Form was canceled?
   */
  readonly isCanceled: boolean
}

/**
 * Message response from form.
 */
export interface MessageFormResponse {
  /**
   * Selected value.
   */
  readonly selection?: number
  /**
   * Form was canceled?
   */
  readonly isCanceled: boolean
}

/**
 * Action response from form.
 */
export interface ActionFormResponse {
  /**
   * Selected value.
   */
  readonly selection?: number
  /**
   * Form was canceled?
   */
  readonly isCanceled: boolean
}
