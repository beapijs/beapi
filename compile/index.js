/* eslint-disable @typescript-eslint/no-var-requires */
const childProcess = require("child_process")
const fs = require("fs")
const path = require("path")
const copydir = require('copy-dir')
const template = require('./template/manifest.json')
const { v4 } = require("uuid-1345")
const { zip } = require('zip-a-folder')

function update() {
  console.log('[INFO] Installing packages...')

  return new Promise((res) => {
    childProcess.exec("npm i", {
      cwd: process.cwd(),
    }, (err, out, s) => {
      if (err) {
        console.log('[ERROR] Failed to install packages.', out, s)

        return res(false)
      } else {
        console.log('[INFO] Installation complete...')

        return res(true)
      }
    })
  })
}

function build() {
  console.log('[INFO] Building package...')

  return new Promise((res) => {
    childProcess.exec("npm run build", {
      cwd: process.cwd(),
    }, (err, out, s) => {
      if (err) {
        console.log('[ERROR] Failed to build package.', out, s)

        return res(false)
      } else {
        console.log('[INFO] Build complete...')

        return res(true)
      }
    })
  })
}

function copyFiles() {
  console.log('[INFO] Copying files...')

  return new Promise(async (res) => {
    if (!fs.existsSync(path.resolve(process.cwd() + "/output"))) fs.mkdirSync(path.resolve(process.cwd() + "/output"))
    if (!fs.existsSync(path.resolve(process.cwd() + "/output/temp")))fs.mkdirSync(path.resolve(process.cwd() + "/output/temp"))
    if (!fs.existsSync(path.resolve(process.cwd() + "/output/temp/BeAPI")))fs.mkdirSync(path.resolve(process.cwd() + "/output/temp/BeAPI"))
    if (!fs.existsSync(path.resolve(process.cwd() + "/output/temp/BeAPI/scripts")))fs.mkdirSync(path.resolve(process.cwd() + "/output/temp/BeAPI/scripts"))
    copydir(path.resolve(process.cwd() + "/scripts"), path.resolve(process.cwd() + "/output/temp/BeAPI/scripts"), {
      utimes: true,
      mode: true,
      cover: true,
    }, async () => {
      const raw = JSON.stringify(template)
      await fs.writeFileSync(path.resolve(process.cwd() + "/output/temp/BeAPI/manifest.json"), `${    raw.replace("|NAME|", "§l§9BeAPI").replace(/\|DESC\|/g, `Advanced API Wrapper for GameTests. Compiled on ${new Date().toLocaleTimeString()} ${new Date().toDateString()}`)
        .replace("|UUID1|", v4())
        .replace("|UUID2|", v4())}`)
      console.log('[INFO] Copy complete...')
  
      return res(true)
    })
  })
}

function zipFolder() {
  console.log('[INFO] Zipping folder...')

  return new Promise(async (res) => {
    await zip(path.resolve(process.cwd() + "/output/temp"), path.resolve(process.cwd() + "/output/BeAPI.mcpack"))
    fs.rmdirSync(path.resolve(process.cwd() + "/output/temp"), {
      recursive: true,
    })

    return res(true)
  })
}

async function start() {
  await update()
  await build()
  await copyFiles()
  await zipFolder()
}

start()
