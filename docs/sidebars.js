/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  gettingStarted: [
    {
      type: 'doc',
      label: 'Getting Started',
      id: 'starting'
    },
    {
      type: 'doc',
      label: 'Examples',
      id: 'examples',
    },
    {
      type: 'category',
      label: 'API',
      collapsed: false,
      items: [
        {
          type: 'doc',
          label: 'executeCommand',
          id: 'api/executeCommand'
        },
        {
          type: 'category',
          label: 'commands',
          collapsed: true,
          items: [
            {
              type: 'doc',
              label: 'enabled',
              id: 'api/commands/enabled'
            },
            {
              type: 'doc',
              label: 'getCommands',
              id: 'api/commands/getCommands'
            },
            {
              type: 'doc',
              label: 'getPrefix',
              id: 'api/commands/getPrefix'
            },
            {
              type: 'doc',
              label: 'registerCommand',
              id: 'api/commands/registerCommand'
            },
            {
              type: 'doc',
              label: 'setPrefix',
              id: 'api/commands/setPrefix'
            },
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'TypeDefs',
      collapsed: true,
      items: [
        {
          type: 'doc',
          label: 'CommandMapOptions',
          id: 'typedefs/commandmapoptions'
        },
        {
          type: 'doc',
          label: 'CommandOptions',
          id: 'typedefs/commandoptions'
        },
        {
          type: 'doc',
          label: 'CommandResponse',
          id: 'typedefs/commandresponse'
        },
        {
          type: 'doc',
          label: 'Dimensions',
          id: 'typedefs/dimensions'
        },
        {
          type: 'doc',
          label: 'Entity',
          id: 'typedefs/entity'
        },
        {
          type: 'doc',
          label: 'ExecuteCommandResponse',
          id: 'typedefs/executecommandresponse'
        },
        {
          type: 'doc',
          label: 'Gamemodes',
          id: 'typedefs/gamemodes'
        },
        {
          type: 'doc',
          label: 'Health',
          id: 'typedefs/health'
        },
        {
          type: 'doc',
          label: 'Location',
          id: 'typedefs/location'
        },
        {
          type: 'doc',
          label: 'Player',
          id: 'typedefs/player'
        },
      ]
    }
    // {
    //   type: 'category',
    //   label: 'Getting Started',
    //   items: [
    //     {
    //       type: 'doc',
    //       id: 'intro'
    //     }
    //   ]
    // }
  ]
};

module.exports = sidebars;
