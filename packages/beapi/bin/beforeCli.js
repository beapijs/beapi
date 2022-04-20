/* eslint-disable */

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const semver = require('semver')
const updateNotifier = require('update-notifier')
const boxen = require('boxen')

const {
  name,
  version,
  engines: { node: requiredVersion },
} = require('../package.json')

// const beapiPackage = require(path.resolve(process.cwd(), 'package.json'))

/**
 * Notify user if `beapi-core` is out of date.
 *
 * NOTE: this is a 2-step process to avoid cli delay.
 * - 1st run: trigger background job to check releases + store result
 * - 2nd run: display potential update to users
 *
 * cache data is stored in `~/.config/configstore/update-notifier-beapi-core`
 */
function beforeCli() {
  const notifier = updateNotifier({
    pkg: {
      name,
      version,
    },

    updateCheckInterval: 1000 * 10,
  })

  // Hacky way to ensure we check for updates on first run
  // Note: the notification will only happen in the 2nd run
  // See https://github.com/yeoman/update-notifier/issues/209
  try {
    if (
      notifier.config &&
      // @ts-expect-error: internal api
      !notifier.disabled &&
      Date.now() - notifier.config.get('lastUpdateCheck') < 50
    ) {
      notifier.config.set('lastUpdateCheck', 0)
      notifier.check()
    }
  } catch (error) {
    throw error
  }

  /**
   * @param {updateNotifier.UpdateInfo} update
   */
  function ignoreUpdate(update) {
    return false
  }

  const sitePackagesForUpdate = 'beapi-core@latest'

  if (notifier.config && notifier.update && semver.lt(notifier.update.current, notifier.update.latest)) {
    // Because notifier clears cached data after reading it, leading to notifier
    // not consistently displaying the update.
    // See https://github.com/yeoman/update-notifier/issues/209
    notifier.config.set('update', notifier.update)

    if (ignoreUpdate(notifier.update)) return

    const isYarnUsed = fs.existsSync(path.resolve(process.cwd(), 'yarn.lock'))
    const upgradeCommand = isYarnUsed ? `yarn upgrade ${sitePackagesForUpdate}` : `npm i ${sitePackagesForUpdate}`

    /** @type {import('boxen').Options} */
    const boxenOptions = {
      padding: 1,
      margin: 1,
      align: 'center',
      borderColor: '#9369ff',
      borderStyle: 'round',
    }

    const updateMessage = boxen(
      `Update available ${chalk.dim(notifier.update.current)} → ${chalk.green(notifier.update.latest)}

To upgrade BeAPI package(s) with latest version, run the following command:
${chalk.dim(upgradeCommand)}`,
      boxenOptions,
    )

    console.log(updateMessage)
  }

  if (!semver.satisfies(process.version, requiredVersion)) {
    console.error(chalk.red('Minimum Node.js version not met :('))
    console.info(
      chalk.dim(`You are using Node.js number=${process.version}, Requirement: Node.js number=${requiredVersion}.`),
    )
    process.exit(1)
  }
}

module.exports = beforeCli
