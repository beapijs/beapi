// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BeAPI',
  tagline: 'Minecraft gametest made easy',
  url: 'https://beapijs.github.io',
  baseUrl: '/beapi/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'beapijs',
  projectName: 'BeAPI',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/beapijs/beapi/tree/docs/',
          versions: {
            current: {
              label: "Beta 🚧",
              path: "beta",
              banner: 'unreleased',
              badge: false
            },
            '2.2.x': {
              label: "v2.2.x",
              // path: "/",
              banner: 'none',
              badge: false
            }
          }
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl:
            // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
        disableSwitch: true,
      },
      navbar: {
        title: 'BeAPI',
        logo: {
          alt: 'BeAPI',
          src: 'img/logo.svg'
        },
        items: [
          {
            type: 'doc',
            docId: 'starting',
            position: 'left',
            label: 'Guide'
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left'
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            // dropdownItemsAfter: [
            //   {
            //     to: '/versions',
            //     label: 'All versions'
            //   }
            // ],
            dropdownActiveClassDisabled: true,
          },
          {
            href: 'https://github.com/beapijs/beapi',
            label: 'GitHub',
            position: 'right',
          }
        ]
      },
      footer: {
        // style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/starting',
              },
            ]
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/5kBtEheGEf',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/beapijs/',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/beapi',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Repo',
                href: 'https://github.com/beapijs/beapi',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BeAPI.js`
      },
      prism: {
        theme: darkCodeTheme,
      },
    }),
};

module.exports = config;
