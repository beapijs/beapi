import type { Options } from 'tsup'

export const tsup: Options = {
  // Compilation
  clean: true,
  minify: true,
  dts: false,

  // Module
  target: 'es6',
  format: ['esm'],
  skipNodeModulesBundle: true,

  // Decaration Emission
  sourcemap: true,

  // Entry
  entryPoints: ['src/index.ts'],
}
