export class ExaustablePromise<T> {
  private readonly p: Promise<T>
  private fulfilled: boolean = false
  private v?: T
  constructor (p: Promise<T>) {
    this.p = p.then((b: T) => {
      this.fulfilled = true
      this.v = b
      return b
    })
  }

  get current (): Promise<T> | T {
    if (this.fulfilled) {
      return this.v as T
    } else {
      return this.p
    }
  }
}
