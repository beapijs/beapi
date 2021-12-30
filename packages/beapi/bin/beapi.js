/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')
const Yargs = require('yargs')
const chalk = require('chalk')

const cwd = process.cwd()
const beapi = fs.readFileSync(path.join(__dirname, '../dist', 'index.mjs'), 'utf8')

const locale = {
  // Categories
  'Commands:': chalk.hex('#9369ff')('Commands:'),
  'Options:': chalk.hex('#9369ff')('Flags:'),
  'Examples:': chalk.hex('#9369ff')('Examples:'),
  'Positionals:': chalk.hex('#9369ff')('Args:'),

  // Values
  boolean: chalk.hex('#3d916a')('boolean'),
  count: chalk.hex('#3d7691')('count'),
  string: chalk.hex('#6a913d')('string'),
  number: chalk.hex('#3d7691')('number'),
  array: chalk.hex('#918a3d')('array'),
  required: chalk.hex('#913d3d')('required'),
  default: chalk.hex('#91643d')('default'),
  'default:': chalk.hex('#91643d')('default:'),
  'choices:': chalk.hex('#3d4891')('choices:'),
  'aliases:': chalk.hex('#913d78')('aliases:'),
  command: chalk.hex('#763d91')('command'),
  deprecated: chalk.grey('deprecated'),

  // Responses
  'Not enough non-option arguments: got %s, need at least %s': {
    one: chalk.hex('#ff6969')('Recieved %s non-option arguments and expected %s...'),
    other: chalk.hex('#ff6969')('Recieved %s non-option arguments and expected %s...'),
  },
  'Too many non-option arguments: got %s, maximum of %s': {
    one: chalk.hex('#ff6969')('Recieved %s non-option arguments and expected %s...'),
    other: chalk.hex('#ff6969')('Recieved %s non-option arguments and expected %s...'),
  },
  'Missing argument value: %s': {
    one: chalk.hex('#ff6969')(`Missing argument value: ${chalk.grey('%s')}`),
    other: chalk.hex('#ff6969')(`Missing argument value: ${chalk.grey('%s')}`),
  },
  'Missing required argument: %s': {
    one: chalk.hex('#ff6969')(`Missing required argument: ${chalk.grey('%s')}`),
    other: chalk.hex('#ff6969')(`Missing required argument: ${chalk.grey('%s')}`),
  },
  'Unknown argument: %s': {
    one: chalk.hex('#ff6969')(`Unknown argument: ${chalk.grey('%s')}`),
    other: chalk.hex('#ff6969')(`Unknown argument: ${chalk.grey('%s')}`),
  },
  'Invalid values:': chalk.hex('#ff6969')('Invalid values:'),
  'Did you mean %s?': chalk.hex('#ff6969')(`Did you mean ${chalk.grey('%s')} ${chalk.hex('#ff6969')('?')}`),
  'deprecated: %s': chalk.hex('#ff6969')(`deprecated: ${chalk.grey('%s')}`),
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
Yargs
  .scriptName('')
  .usage(`${chalk.hex('#698fff')('beapi')} ${chalk.gray('<command>')} ${chalk.grey('[flags]')}`)
  .command('build', chalk.gray('Build BeAPI project for gametest.'),
    (y) => {
      y
        .usage(`${chalk.hex('#698fff')('beapi')} ${chalk.gray('build')} ${chalk.grey('[flags]')}`)
        // .options()
        .help('help', chalk.grey('Help for command build.'))
        .alias('h', 'help')
    },
    (argv) => {
      try {
        build(argv)
      } catch (error) {
        console.error(error)
      }
    }
  )
  .command('bundle', chalk.gray('Bundle built BeAPI project into .mcpack'),
    (y) => {
      y
        .usage(`${chalk.hex('#698fff')('beapi')} ${chalk.gray('bundle')} ${chalk.grey('[flags]')}`)
        // .options()
        .help('help', chalk.grey('Help for command bundle.'))
        .alias('h', 'help')
    },
    (argv) => {
      try {
        bundle(argv)
      } catch (error) {
        console.error(error)
      }
    }
  )
  .help('help', chalk.grey('Show all commands for beapi.'))
  .alias('h', 'help')
  .version(false)
  .strict()
  .demandCommand(1, 1)
  .updateLocale(locale)
  .argv

function build() {
  try {
    const pkg = getPackage()
    if (!pkg.main) throw Error('"package.json" is missing main field')
    if (pkg.main.toLowerCase().endsWith('.ts')) throw Error('Scripts need to be compiled to javascript first!')
    const primaryRoute = pkg.main.split(/\/|\\/).filter(i => i.length > 0)[0]
    const route = path.resolve(cwd, primaryRoute.toLowerCase().endsWith('.js') ? '' : primaryRoute)
    if (fs.existsSync(path.resolve(cwd, 'scripts'))) {
      fs.rmSync(path.resolve(cwd, 'scripts'), { recursive: true })
    }
    copyRecursiveSync(route, path.resolve(cwd, 'scripts'))
    overrideImports(path.resolve(cwd, 'scripts'))
    fs.writeFileSync(path.resolve(cwd, 'scripts', 'BEAPI_CORE_SCRIPT.js'), beapi)
    console.log(chalk.hex('#69ff7f')('Successfully Built 😊'))
  } catch (error) {
    console.error(error)
    throw new Error('Failed to build')
  }
}

function bundle() {
  try {
    const pkg = getPackage()
    if (!pkg.main) throw Error('"package.json" is missing main field')
    if (pkg.main.toLowerCase().endsWith('.ts')) throw Error('Scripts need to be compiled to javascript first!')
    console.log('Command Not Support Yet!')
  } catch (error) {
    console.error(error)
    throw new Error('Failed to bundle')
  }
}

function getPackage() {
  if (fs.existsSync(path.resolve(cwd, 'package.json'))) {
    try {
      return JSON.parse(fs.readFileSync(path.resolve(cwd, 'package.json'), 'utf8'))
    } catch (error) {
      console.error(error)
      throw new Error('Failed to parse "package.json"')
    }
  } else {
    throw new Error('Current directory does not contain a "package.json"')
  }
}

function *walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (!file.name.toLowerCase().includes('node_modules')) {
      if (file.isDirectory()) {
        yield* walkSync(path.join(dir, file.name));
      } else {
        yield path.join(dir, file.name);
      }
    }
  }
}

function getAllFiles(dir) {
  const files = []
  for (const file of walkSync(dir)) {
    files.push(file)
  }

  return files
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName),
        path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

function overrideImports(src) {
  const files = getAllFiles(src)
  for (const file of files) {
    const router = file.replace(cwd, '').split(/\/|\\/).filter(i => i.length > 0)
    router.shift()
    const nest = router.length - 1
    const location = `${nest ? '' : './'}${Array(nest).fill('../').join('')}BEAPI_CORE_SCRIPT.js`
    const contents = fs.readFileSync(file, 'utf8')
    fs.writeFileSync(file, contents.replace(/(\s+|)from()(\s+|)('|`|")beapi-core('|`|")/ig, ` from "${location}"`))
  }
}
