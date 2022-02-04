export class SafeIds {
  protected epoch: number
  protected unique: number
  protected prev: number = Date.now()
  protected inc = 0
  public constructor(unique: number, epoch = 0) {
    this.epoch = epoch
    this.unique = unique
  }

  public generate(): string {
    const now = Date.now()
    if (now === this.prev) {
      this.inc += 1
    } else {
      this.inc = 0
    }
    this.prev = now

    return `${Math.abs(now - this.epoch)}_${this.inc}_${this.unique}`
  }
}
