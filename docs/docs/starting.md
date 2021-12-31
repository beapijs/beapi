---
sidebar_position: 1
title: Getting Started
---

### Overview

BeAPI (an abbreviation for "Bedrock edition API") is a tool that aims for a faster and more reliable development expierence when working with Minecraft Bedrock edition gametests. It currently consists of two major parts:

- `beapi-core`: a core module that provides a handlful of features gametest does not offer at this time. It is also bundled with some cli commands to make development easier.

- `create-beapi`: a module for easily abstracting frameworks to work with when utiling BeAPI.

### Support

With gametest support being [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) supported only we are only really left with two options when it comes to language support.

The supported template presets are:

| Javascript | Typescript |
| ---------- | ---------- |
| vanilla    | vanilla

### Scaffolding Your First Project

> BeAPI requires [Node.js](https://nodejs.org/) version >= 12.0.0

To scaffold your first project you will need to navigate to your Minecraft `development_behavior_packs` folder which is usually located at `C:\Users\{USER}\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_behavior_packs`

Once in the folder you will need to open a terminal and ensure the working directory is set to your `development_behavior_packs`.

Then depending on your package manager you will need to run one of the following commands.

NPM:
```sh
$ npm init beapi@latest
```
Yarn:
```sh
$ yarn create beapi@latest
```

![createProject](./public/createProject.gif)

### Building
Whenever you make a change to your project files, you need to build them so BeAPIs transpiler can make the gametest compatible.

NPM:
```sh
$ npm run build
```
Yarn:
```sh
$ yarn build
```

![buildProject](./public/buildProject.gif)

### Bundling
Once you feel you are ready to publish you pack to the public you may want to bundle it into a `.mcpack` first.

NPM:
```sh
$ npm run bundle
```
Yarn:
```sh
$ yarn bundle
```

![bundleProject](./public/bundleProject.gif)

The `package.json` in your project scaffold will contain a `includes` array. This tells the bundler what it should bundle into the `.mcpack`.

```json
{
  "include": [
    "scripts",
    "manifest.json",
    "animation_controllers",
    "entities",
    "pack_icon.png"
  ]
}
```