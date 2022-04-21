import type { CamelToSnakeCase, SnakeToCamelCase } from '..'

/**
 * Convert snake case to camel case.
 * @param input snake input.
 * @returns {string} camel output.
 */
export function snakeCaseToCamelCase<T extends string>(input: CamelToSnakeCase<T>): SnakeToCamelCase<T> {
  return input
    .split('_')
    .reduce(
      (res, word, i) =>
        i === 0 ? word.toLowerCase() : `${res}${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`,
      '',
    ) as SnakeToCamelCase<T>
}

/**
 * Convert camel case to snake case.
 * @param input Camel case input
 * @returns
 */
export function camelCaseToSnakeCase<T extends string>(input: SnakeToCamelCase<T>): CamelToSnakeCase<T> {
  return input
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .join('_')
    .toLowerCase() as CamelToSnakeCase<T>
}
