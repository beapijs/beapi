/**
 * Converts binary string to utf-8 string.
 * @param bin Raw binary string.
 * @returns
 */
export function binToString(bin: string): string {
  return bin
    .split(' ')
    .map((char) => String.fromCharCode(parseInt(char, 2)))
    .join('')
}

/**
 * Converts utf-8 text to raw binary string.
 * @param str utf-8 text.
 * @returns
 */
export function stringToBin(str: string): string {
  return str
    .split('')
    .map((char) => char.charCodeAt(0).toString(2))
    .join(' ')
}
