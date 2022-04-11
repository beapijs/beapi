/**
 * Convert snake case to camel case.
 * @param input snake input.
 * @returns {string} camel output.
 */
export function snakeCaseToCamelCase(input: string): string {
  return input
    .split('_')
    .reduce(
      (res, word, i) =>
        i === 0 ? word.toLowerCase() : `${res}${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`,
      '',
    )
}
