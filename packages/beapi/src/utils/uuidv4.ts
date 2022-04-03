// Source From: https://dirask.com/posts/JavaScript-UUID-function-in-Vanilla-JS-1X9kgD

/**
 * Generates a random UUID4. This method does not utilize Date,
 * it utilizes random bytes therefore duplicates are possible.
 * But very small chance.
 * @returns {string}
 */
export function genUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8

    return v.toString(16)
  })
}

/**
 * Verifies the uuid given is a valid uuid format.
 * @param {string} uuid UUID to verify.
 * @returns {boolean}
 */
export function verifyUuid(uuid: string): boolean {
  return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(uuid)
}
// <string> [string]
