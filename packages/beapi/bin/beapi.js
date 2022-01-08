#!/usr/bin/env node

// Requires needed for this specific use case
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
// Typescript Rule
/* eslint-disable @typescript-eslint/no-unsafe-argument */

const {
  YARG_LOCALE,
  readPackage,
  readManifest,
  verifyPackage,
  verifyManifest,
  writeManifest,
  generateNewUuids,
  pkgMainToPath,
  deleteIfExists,
  copyLog,
  getFileName,
  recursiveCopySync,
  buildLog,
  walkDirSync,
  syncModuleMatcher,
  asyncModuleMatcher,
  comLog,
  bundleLog,
} = require('./utils')
const fs = require('fs')
const path = require('path')
const Yargs = require('yargs')
const chalk = require('chalk')
const { zip } = require('zip-a-folder')
const os = require('os')

const cwd = process.cwd()
const scriptRoute = path.resolve(cwd, 'scripts')
const beapi = fs.readFileSync(path.resolve(__dirname, '../dist', 'index.mjs'), 'utf8')

Yargs.scriptName('')
Yargs.usage(`${chalk.hex('#698fff')('beapi')} ${chalk.gray('<command>')} ${chalk.grey('[flags]')}`)
Yargs.help('help', chalk.grey('Show all commands for beapi.'))
Yargs.alias('h', 'help')
Yargs.version(false)
Yargs.strict()
Yargs.demandCommand(1, 1)
Yargs.updateLocale(YARG_LOCALE)

// Build Command
Yargs.command(
  'build',
  chalk.gray('Build BeAPI project for gametest.'),
  (y) => {
    y.usage(`${chalk.hex('#698fff')('beapi')} ${chalk.gray('build')} ${chalk.grey('[flags]')}`)
    y.help('help', chalk.grey('Help for command build.'))
    y.alias('h', 'help')
  },
  (argv) => {
    try {
      build(argv)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  },
)
function build() {
  const startTime = Date.now()

  // Read project descriptor files
  const package = readPackage(cwd)
  const manifest = readManifest(cwd)

  // Verify project descriptor files
  verifyPackage(package)
  verifyManifest(manifest)

  // Update manifest UUIDs if needed
  writeManifest(cwd, generateNewUuids(manifest))

  // Parse package main field and retrieve source code folder routes
  const sourceCode = pkgMainToPath(package.main)
  const sourceCodeRoute = path.resolve(cwd, sourceCode)

  // Delete scripts folder recursively if exists
  // Prevents possible issues with files being left over
  deleteIfExists(scriptRoute)

  // Recursively copy all files from built source to scripts folder
  copyLog(`Recursively copying "${getFileName(sourceCodeRoute)}" to "${getFileName(scriptRoute)}"`)
  recursiveCopySync(sourceCodeRoute, scriptRoute)

  // Copies all modules
  copyModules(package)

  // Creates two regexs, one for matching synchronous imports
  // one for matching asynchronous imports. It then loops through
  // All copied files and updates modules to reference BeAPIs main
  // Script as a relative file.
  buildLog(`Attempting module transfers in "${getFileName(scriptRoute)}"`)
  const syncMatcher = syncModuleMatcher('beapi-core')
  const asyncMatcher = asyncModuleMatcher('beapi-core')
  for (const file of walkDirSync(scriptRoute)) {
    const router = path
      .relative(file, scriptRoute)
      .substring(3)
      .replace(/\\|\\\\/g, '/')
    const module = `${router.length ? '' : '.'}${router}/BEAPI_CORE_SCRIPT.js`
    const contents = fs.readFileSync(file, 'utf-8')
    fs.writeFileSync(
      file,
      contents.replace(syncMatcher, `from '${module}'`).replace(asyncMatcher, `import('${module}')`),
    )
    buildLog(`Wrote module transfers to "${path.relative(scriptRoute, file)}"`)
  }

  // Links all beapi-modules
  linkModules(package)

  // Creates new file in script dir with BeAPI dist
  buildLog(`Creating BEAPI_CORE_SCRIPT in "${getFileName(scriptRoute)}"`)
  fs.writeFileSync(path.resolve(scriptRoute, 'BEAPI_CORE_SCRIPT.js'), beapi)

  // Done 😊
  comLog(`Successfully Built ${chalk.grey(`in ${Date.now() - startTime}ms 😊`)}`)
}

function copyModules(package) {
  // Removes and creates the modules folder
  copyLog(`Recursively copying all modules to "${getFileName(scriptRoute)}"`)
  deleteIfExists(path.resolve(`${scriptRoute}/beapi_modules`))
  fs.mkdirSync(path.resolve(`${scriptRoute}/beapi_modules`))
  for (const dep of Object.keys(package.dependencies)) {
    const modulePath = path.resolve(`${cwd}/node_modules/${dep}`)
    const modulePackage = readPackage(modulePath)
    if (!modulePackage.beapiModule) continue
    recursiveCopySync(
      path.resolve(`${modulePath}/${modulePackage.main.split('/')[0]}`),
      path.resolve(`${scriptRoute}/beapi_modules/${dep}`),
    )
  }
}

function linkModules(package) {
  for (const dep of Object.keys(package.dependencies)) {
    const modulePath = path.resolve(`${cwd}/node_modules/${dep}`)
    const modulePackage = readPackage(modulePath)
    if (!modulePackage.beapiModule) continue
    const syncMatcher = syncModuleMatcher(dep)
    const asyncMatcher = asyncModuleMatcher(dep)
    for (const file of walkDirSync(scriptRoute)) {
      const router = path
        .relative(file, scriptRoute)
        .substring(3)
        .replace(/\\|\\\\/g, '/')
      const module = `${router.length ? '' : '.'}${router}/beapi_modules/${dep}/${package.main.split('/')[1]}`
      const contents = fs.readFileSync(file, 'utf-8')
      fs.writeFileSync(
        file,
        contents.replace(syncMatcher, `from '${module}'`).replace(asyncMatcher, `import('${module}')`),
      )
      buildLog(`Linked module "${dep}" to "${path.relative(scriptRoute, file)}"`)
    }
  }
}

// Bundle Command
Yargs.command(
  'bundle',
  chalk.gray('Bundle built BeAPI project into .mcpack'),
  (y) => {
    y.usage(`${chalk.hex('#698fff')('beapi')} ${chalk.gray('bundle')} ${chalk.grey('[flags]')}`)
    y.help('help', chalk.grey('Help for command bundle.'))
    y.alias('h', 'help')
  },
  (argv) => {
    bundle(argv).catch((err) => {
      console.error(err)
      process.exit(1)
    })
  },
)
async function bundle() {
  // Ensure project is built
  build()

  const startTime = Date.now()

  // Read project descriptor files
  const package = readPackage(cwd)
  const manifest = readManifest(cwd)

  if (!package?.include?.length) throw Error('No files to bundle')

  // Verify project descriptor files
  verifyPackage(package)
  verifyManifest(manifest)

  // Create temporary directory
  const temp = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`)
  bundleLog(`Created temporary directory ${temp}`)

  // Get included files
  const includedFiles = Array.isArray(package.include) ? package.include : []
  bundleLog(`Found ${includedFiles.length} items to be included in "package.json"`)

  // Loop through included files and add to temp dir
  for (const file of includedFiles) {
    recursiveCopySync(path.resolve(cwd, file), path.resolve(temp, getFileName(file)))
    bundleLog(`Copied ${file}`)
  }

  // Create zip
  bundleLog(`Creating mcpack archive`)
  await zip(temp, path.resolve(cwd, 'bundled-beapi-project.mcpack'))

  // Remove temp dir
  bundleLog(`Cleanup`)
  fs.rmSync(temp, { recursive: true })

  comLog(`Successfully Bundled ${chalk.grey(`in ${Date.now() - startTime}ms 😊`)}`)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
Yargs.argv
