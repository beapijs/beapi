export interface ModalFormResponse {
  readonly formValues: any[]
  readonly isCanceled: boolean
}

export interface MessageFormResponse {
  readonly selection: number
  readonly isCanceled: boolean
}

export interface ActionFormResponse {
  readonly selection: number
  readonly isCanceled: boolean
}
