class emitter {
  constructor() {
    this.listeners = []
    this.runtimeID = 0
  }
  /**
   * Adds a listener to a specified event.
   * @param {string} event - Event to listen for.
   * @param {Function} callback - Callback function.
   * @param {boolean} once
   */
  addListener(event, callback, once) {
    this.runtimeID++
    this.listeners.push({
      eventName: event,
      runtimeID: this.runtimeID,
      callback,
      once,
    })
  }
  /**
   * Removes a listener from a specified event.
   * @param {string} event - Event to remove a listener for.
   */
  removeListener(event) {
    this.listeners.splice(this.listeners.findIndex(x => x.eventName === event), 1)
  }
  /**
   * Removes all listeners.
   */
  removeAllListeners() {
    this.listeners = []
  }
  /**
   * 
   * @returns {Array<{eventName: string, callback, once}>}
   */
  getListeners() {
    return this.listeners
  }
  /**
   * Listens for event until listener is removed.
   * @param {string} event - Events to listen for
   * @param {Function} callback - Callback function.
   */
  on(event, callback) {
    this.addListener(event, callback, false)
  }
  /**
   * Fires only once.
   * @param {string} event - Event to listen for.
   * @param {Function} callback - Callback function.
   */
  once(event, callback) {
    this.addListener(event, callback, true)
  }
  /**
   * Emits an event with it data.
   * @param {string} event - Event to emit.
   * @param  {...any} data - Data the event emits.
   * @returns 
   */
  emit(event, data) {
    // For some reason doing a for loop breaks when running multiple events... Not sure why.
    this.listeners.forEach((listener) => {
      if (listener.eventName != event) return
      listener.callback(data)
      if (listener.once) return this.removeListener(listener.eventName)
    })
  }
}

export {
  emitter,
}
