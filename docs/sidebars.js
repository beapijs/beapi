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
          label: 'between',
          id: 'api/between'
        },
        {
          type: 'doc',
          label: 'clearInterval',
          id: 'api/clearinterval'
        },
        {
          type: 'doc',
          label: 'clearTimeout',
          id: 'api/cleartimeout'
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
        },
        {
          type: 'category',
          label: 'db',
          collapsed: true,
          items: [
            {
              type: 'doc',
              label: 'Database',
              id: 'api/db/database'
            },
            {
              type: 'doc',
              label: 'getAllDatabases',
              id: 'api/db/getalldatabases'
            },
            {
              type: 'doc',
              label: 'mountById',
              id: 'api/db/mountbyid'
            },
            {
              type: 'doc',
              label: 'mountByName',
              id: 'api/db/mountbyname'
            },
          ]
        },
        {
          type: 'category',
          label: 'events',
          collapsed: true,
          items: [
            {
              type: 'doc',
              label: 'addListener',
              id: 'api/events/addlistener'
            },
            {
              type: 'doc',
              label: 'cancelChat',
              id: 'api/events/cancelchat'
            },
            {
              type: 'doc',
              label: 'emit',
              id: 'api/events/emit'
            },
            {
              type: 'doc',
              label: 'getEvents',
              id: 'api/events/getevents'
            },
            {
              type: 'doc',
              label: 'getListeners',
              id: 'api/events/getlisteners'
            },
            {
              type: 'doc',
              label: 'loadEvents',
              id: 'api/events/loadevents'
            },
            {
              type: 'doc',
              label: 'on',
              id: 'api/events/on'
            },
            {
              type: 'doc',
              label: 'once',
              id: 'api/events/once'
            },
            {
              type: 'doc',
              label: 'removeAllListeners',
              id: 'api/events/removealllisteners'
            },
            {
              type: 'doc',
              label: 'removeListener',
              id: 'api/events/removelistener'
            },
          ]
        },
        {
          type: 'doc',
          label: 'Entity',
          id: 'api/entity'
        },
        {
          type: 'doc',
          label: 'executeCommand',
          id: 'api/executeCommand'
        },
        {
          type: 'doc',
          label: 'Player',
          id: 'api/player'
        },
        {
          type: 'doc',
          label: 'setInterval',
          id: 'api/setinterval'
        },
        {
          type: 'doc',
          label: 'setTimeout',
          id: 'api/settimeout'
        },
        {
          type: 'doc',
          label: 'uuidv4',
          id: 'api/uuidv4'
        },
      ]
    },
    {
      type: 'category',
      label: 'TypeDefs',
      collapsed: true,
      items: [
        {
          type: 'doc',
          label: 'BeAPI Events',
          id: 'typedefs/beapievents'
        },
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
          label: 'DbOptions',
          id: 'typedefs/dboptions'
        },
        {
          type: 'doc',
          label: 'Dimensions',
          id: 'typedefs/dimensions'
        },
        {
          type: 'doc',
          label: 'Entry',
          id: 'typedefs/entry'
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
          label: 'Interval',
          id: 'typedefs/interval'
        },
        {
          type: 'doc',
          label: 'Listener',
          id: 'typedefs/listener'
        },
        {
          type: 'doc',
          label: 'Location',
          id: 'typedefs/location'
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
