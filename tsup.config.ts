import type { Format, Options } from 'tsup';
import { defineConfig } from 'tsup';

export function createTsupConfig({
	entry = ['src/index.ts'],
	external = [],
	noExternal = [],
	platform = 'node' as 'browser' | 'neutral' | 'node',
	format = ['esm', 'cjs'] as Format[],
	target = 'es2022' as NonNullable<Options['target']>,
	skipNodeModulesBundle = true,
	clean = true,
	// https://github.com/egoist/tsup/issues?q=the+injected
	// shims = true,
	minify = false,
	splitting = false,
	keepNames = true,
	dts = true,
	sourcemap = true,
	esbuildPlugins = [],
} = {}) {
	return defineConfig({
		entry,
		external,
		noExternal,
		platform,
		format,
		skipNodeModulesBundle,
		target,
		clean,
		// shims,
		minify,
		splitting,
		keepNames,
		dts,
		sourcemap,
		esbuildPlugins,
	});
}
