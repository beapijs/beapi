// Requires needed for this specific use case
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const { v4 } = require('uuid-1345')

const YARG_LOCALE = {
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

/**
 * Parse package.json for directory
 * @param {string} src
 * @returns
 */
function readPackage(src) {
  const route = path.resolve(src, 'package.json')
  if (fs.existsSync(route)) {
    try {
      return JSON.parse(fs.readFileSync(route, 'utf8'))
    } catch (error) {
      throw Error('Failed to parse "package.json". Invalid syntax?')
    }
  } else {
    throw Error('Directory does not contain a "package.json"')
  }
}

/**
 * Parse manifest.json for directory
 * @param {string} src
 * @returns
 */
function readManifest(src) {
  const route = path.resolve(src, 'manifest.json')
  if (fs.existsSync(route)) {
    try {
      return JSON.parse(fs.readFileSync(route, 'utf8'))
    } catch (error) {
      throw Error('Failed to parse "manifest.json". Invalid syntax?')
    }
  } else {
    throw Error('Directory does not contain a "manifest.json"')
  }
}

/**
 * Write manifest.json for directory
 * @param {string} src
 * @param {JSON} content
 * @returns
 */
function writeManifest(src, content) {
  const route = path.resolve(src, 'manifest.json')
  if (fs.existsSync(route)) {
    try {
      return fs.writeFileSync(route, JSON.stringify(content, undefined, 2))
    } catch (error) {
      throw Error('Failed to wrote to "manifest.json"')
    }
  } else {
    throw Error('Directory does not contain a "manifest.json"')
  }
}

/**
 * Walk all files in a directory, ignores node_modules
 * @param {string} dir
 */
function* walkDirSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true })
  for (const file of files) {
    if (!file.name.toLowerCase().includes('node_modules')) {
      if (file.isDirectory()) {
        yield* walkDirSync(path.join(dir, file.name))
      } else {
        yield path.join(dir, file.name)
      }
    }
  }
}

/**
 * Recursively copy a directory
 * @param {string} src
 * @param {string} dest
 */
function recursiveCopySync(src, dest) {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats.isDirectory()
  if (isDirectory) {
    fs.mkdirSync(dest)
    fs.readdirSync(src).forEach((childItemName) => {
      recursiveCopySync(path.join(src, childItemName), path.join(dest, childItemName))
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

/**
 * Create a RegExp to match a specific module import
 * @param {string} name
 * @returns {RegExp}
 */
function syncModuleMatcher(name) {
  return new RegExp(`from()(\s+|)('|\`|")${name}('|\`|")`, 'gi')
}

/**
 * Create a RegExp to match a specific module import
 * @param {string} name
 * @returns {RegExp}
 */
function asyncModuleMatcher(name) {
  return new RegExp(`import(\s+|)\((\s+|)('|\`|")${name}('|\`|")(\s+|)\)`, 'gi')
}

/**
 * Verify manifest
 * @param {any} m
 */
function verifyManifest(m) {
  if (!m?.header?.uuid || !m?.modules[0]?.uuid) throw Error('Invalid manifiest, failed to discover UUID fields')

  return true
}

/**
 * Verify package
 * @param {any} p
 */
function verifyPackage(p) {
  if (!p.main) throw Error('"package.json" is missing main field')
  if (p.main.toLowerCase().endsWith('.ts')) throw Error('Scripts need to be compiled to javascript first')
  if (!p.include || !p.include.length)
    warnLog(`"package.json" has no include parameter, bundler will not include extra files!`)

  return true
}

/**
 * Generate new uuids in manifest
 * @param {any} m
 * @param {boolean} onlyIfNotPresent
 * @returns {JSON}
 */
function generateNewUuids(m, onlyIfNotPresent = true) {
  const uuid1 = m.header.uuid
  const uuid2 = m.modules[0].uuid
  if (onlyIfNotPresent) {
    if (uuid1.includes('UUID1')) m.header.uuid = v4()
    if (uuid2.includes('UUID2')) m.modules[0].uuid = v4()
  } else {
    m.header.uuid = v4()
    m.modules[0].uuid = v4()
  }

  return m
}

/**
 * Deconstructs package main field to find starting directory
 * @param {string} m
 * @returns {string}
 */
function pkgMainToPath(m) {
  const primaryRoute = m.split(/\/|\\|\\\\/).filter((i) => i.length > 0)[0]

  return primaryRoute.toLowerCase().endsWith('.js') ? '' : primaryRoute
}

/**
 * Delete if exists
 * @param {string} path
 */
function deleteIfExists(path) {
  if (fs.existsSync(path)) {
    fs.rmSync(path, { recursive: true })
  }
}

/**
 * Create Warn Log
 * @param {string} msg
 */
function warnLog(msg) {
  console.log(`${chalk.yellow.bold(`WARN`)} ${msg}`)
}
/**
 * Create Copy Log
 * @param {string} msg
 */
function copyLog(msg) {
  console.log(`${chalk.blue.bold(`COPY`)} ${msg}`)
}
/**
 * Create Build Log
 * @param {string} msg
 */
function buildLog(msg) {
  console.log(`${chalk.magenta.bold(`BUILD`)} ${msg}`)
}
/**
 * Create Completion Log
 * @param {string} msg
 */
function comLog(msg) {
  console.log()
  console.log(`${chalk.green(msg)}`)
  console.log()
}

/**
 * Returns file or folder name
 * @param {string} r
 * @returns {string}
 */
function getFileName(r) {
  const split = r.split(/\/|\\|\\\\/)
  return split[split.length - 1]
}

module.exports = {
  YARG_LOCALE,
  readPackage,
  readManifest,
  writeManifest,
  walkDirSync,
  recursiveCopySync,
  syncModuleMatcher,
  asyncModuleMatcher,
  verifyManifest,
  verifyPackage,
  generateNewUuids,
  pkgMainToPath,
  deleteIfExists,
  copyLog,
  buildLog,
  warnLog,
  comLog,
  getFileName,
}
