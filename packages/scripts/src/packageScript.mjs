import { program } from 'commander';
import { createPackage } from '../dist/index.mjs';

program
	.description('A script for creating beapi packages.')
	.argument('<name>', 'The name of the new package.')
	.argument('[description]', 'The description of the new package.');
program.parse();

const [packageName, description] = program.args;

console.log(`Creating package @beapi/${packageName}...`);
await createPackage(packageName, description);
console.log('Done!');
