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
