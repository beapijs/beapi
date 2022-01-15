export function binToString(bin: string): string {
  return bin
    .split(' ')
    .map((char) => {
      return String.fromCharCode(parseInt(char, 2))
    })
    .join('')
}

export function stringToBin(str: string): string {
  return str
    .split('')
    .map((char) => {
      return char.charCodeAt(0).toString(2)
    })
    .join(' ')
}
