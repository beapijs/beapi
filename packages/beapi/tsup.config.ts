import { tsup as conf } from '../../tsup.config'
import type { Options } from 'tsup'

export const tsup: Options = {
  ...conf,
  // We only need esm
  format: ['esm'],
  // We want ES6 for gametest
  target: 'es6',
}
