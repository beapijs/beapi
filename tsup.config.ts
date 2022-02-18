import type { Options } from 'tsup'

export const tsup: Options = {
  // Compilation
  clean: true,
  minify: true,
  dts: false,

  // Module
  target: 'es2020',
  format: ['esm', 'cjs'],
  skipNodeModulesBundle: true,

  // Decoration Emission
  sourcemap: true,

  // Entry
  entryPoints: ['src/index.ts'],
}
