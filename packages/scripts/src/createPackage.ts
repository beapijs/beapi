import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { copy } from 'fs-extra';
import cliffJumperJSON from './template/.cliff-jumperrc.json';
import templateJSON from './template/template.package.json';

export async function createPackage(packageName: string, packageDescription?: string) {
	const packageDir = join('packages', packageName);

	// Make directory for package
	await mkdir(packageDir);

	// Create folder structure
	await Promise.all([mkdir(join(packageDir, 'src'))]);

	const templateDir = join('packages', 'scripts', 'src', 'template');

	// Create files
	await writeFile(join(packageDir, 'src', 'index.ts'), `console.log('Hello, from @beapijs/${packageName}');`);
	await writeFile(
		join(packageDir, '.eslintrc.json'),
		await readFile(join(templateDir, 'template.eslintrc.json'), 'utf8'),
	);
	await writeFile(
		join(packageDir, '.lintstagedrc.js'),
		await readFile(join(templateDir, 'template.lintstagedrc.js'), 'utf8'),
	);

	const packageJSON = {
		...templateJSON,
		name: templateJSON.name.replace('{name}', packageName),
		description: packageDescription ?? '',
	};

	// Edit changelog script
	packageJSON.scripts.changelog = packageJSON.scripts.changelog.replace('{name}', packageName);

	// Create package.json
	await writeFile(join(packageDir, `package.json`), JSON.stringify(packageJSON, null, 2));

	// Update cliff.toml
	const cliffTOML = (await readFile(join(templateDir, 'cliff.toml'), 'utf8')).replace('{name}', packageName);

	await writeFile(join(packageDir, 'cliff.toml'), cliffTOML);

	// Update .cliff-jumperrc.json
	const newCliffJumperJSON = { ...cliffJumperJSON, name: packageName, packagePath: `packages/${packageName}` };

	await writeFile(join(packageDir, '.cliff-jumperrc.json'), JSON.stringify(newCliffJumperJSON, null, 2));

	// Copy default files over
	await copy(join('packages', 'scripts', 'src', 'template', 'default'), packageDir);
}
