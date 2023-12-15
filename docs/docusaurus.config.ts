// Copyright 2023 Paion Data. All rights reserved.
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: "Nexus Graph",
  tagline: "A Machine-Learning-Backed Knowledge Management Tool",
  favicon: "img/favicon.ico",

  url: "https://paion-data.github.io/",
  baseUrl: "/nexusgraph",
  organizationName: "paion-data",
  projectName: "nexusgraph",

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ["en", "zh-cn"],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: "https://github.com/paion-data/nexusgraph/tree/master/docs/",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/paion-data/nexusgraph/tree/master/docs/",
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: "nexusgraph",
      logo: {
        alt: "nexusgraph Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "localeDropdown",
          position: "left",
        },
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Documentations",
        },
        {
          href: "https://paion-data.github.io/nexusgraph/api",
          label: "API",
          position: "left",
        },
        {
          href: "https://github.com/paion-data/nexusgraph",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
                label: "Documentation",
                to: "/docs/intro",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/paion-data/nexusgraph",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Paion Data. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
