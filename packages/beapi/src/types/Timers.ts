export interface Timer {
  cb: CallableFunction
  tick: number
  og?: number
}
