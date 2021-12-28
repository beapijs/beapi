import { tsup as conf } from '../../tsup.config'
import type { Options } from 'tsup'

export const tsup: Options = {
  ...conf,
  // Changes Class Names, No Bueno
  minify: false,
  // We want ES6 for gametest
  target: 'es6',
}
