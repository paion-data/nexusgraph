---
sidebar_position: 2
title: CI/CD
---

Testing
-------

1. Code style check

   - YAML lint
   - Markdown lint
   - Markdown link check

2. Build and test nexusgraph

   - The build process checks code style again using [Prettier][Prettier]
   - The process also runs static code anslysis using [ESLint][ESLint]

     :::caution

     ESLint currently does not run on documentation source codes, i.e. `/docs`

     :::

   - The tests are run using `npm test` in Jest framework

3. Test Build nexusgraph Documentation

Release Process
---------------

### nexusgraph

1. [Comprehensively test](#testing)
2. Fetch the tags from the adjusted remote
3. Get the last tag on the working branch
4. Build (`.github/upversion.py`) and push the new tag as the new release version.
5. Bump nexusgraph version the new release version
6. Push nexusgraph to [NPM registry][nexusgraph npm repo]
7. Publish [documentation](#nexusgraph-documentation) to GitHub Pages

### nexusgraph Documentation

[GitHub Actions][GitHub Actions] allow us to automate, customize, and execute our software development workflows right
in our repository. This also applies to our documentations.

nexusgraph documentation source resides in the master branch under [docs/][Documentation source root] directory

The CI/CD for documentation achieves 2 goals:

1. When a new pull request is made to `master`, there's an action that ensures the site builds successfully, without
   actually deploying. This GitHub workflow job is called `test-doc-build`.
2. When a pull request is merged to the `master` branch, it will be built and deployed to the `gh-pages` branch. After
   that, the new build output will be served on the GitHub Pages site. This job is `deploy-documentation` called deploy.

:::info

The documentation build is a 2-step process:

1. A regular [Docusaurus `build`][Docusaurus Build] command that generates the static doc HTML of
   [documentation site][documentation]
2. An execution of TypeDoc Node API that generates the [nexusgraph API documentation][API documentation]

The output of both of the 2 steps above will be picked up and pushed to GitHub Pages for serving.

:::

:::caution

The TypeDoc would require each package to have their dependencies installed locally in order for the TypeDoc execution
to succeed. This means we must `cd` into each packages under [packages][[nexusgraph packages source] and execute
`npm install`. This has been reflected in our CI/CD scripts. See
"Install nexusgraph dependencies so that TypeDoc process source files properly" step of our
[testing script][nexusgraph test CI script]

In general, package source code dependencies (i.e. any dependencies required by packages under `packages`) are not to be
added to doc dependences (i.e. `doc/package.json`).

:::

Troubleshooting
---------------

### Error: Docker pull failed with exit code 1

We found that one of our CI/CD jobs broken itself without any code change on nexusgraph side:

![Error loading github-upstream-issue.png](./img/github-upstream-issue.png)

In most cases this is not a nexusgraph issue, but an [upstream service][GitHub Packages] downtime issue. The best of
what we can do is focusing on other priorities and come back later after the upstream fixes the issue.

### Code Style Check Error

![Error loading code-style-check-error.png](./img/code-style-check-error.png)

nexusgraph uses [Prettier][Prettier] as code style checker. The error above indicates that Prettier found some styling
issues. To fix those, simply run the following command at the root of nexusgraph project and re-push the code:

```bash
npx prettier --write .
```

:::info

Alternatively, we can have Prettier watch for changes from the command line by using our integrated
[onchange][onchange]:

```bash
npm run prettier-watch
```

:::

[Documentation]: https://paion-data.github.io/nexusgraph/
[Documentation on API]: https://paion-data.github.io/nexusgraph/api
[Documentation source root]: https://github.com/paion-data/nexusgraph/tree/master/docs
[Docusaurus Build]: https://docusaurus.io/docs/cli#docusaurus-build-sitedir

[ESLint]: https://eslint.org/

[GitHub Actions]: https://docusaurus.io/docs/deployment#deploying-to-github-pages
[GitHub Packages]: https://github.com/features/packages

[nexusgraph npm repo]: https://www.npmjs.com/package/@paiondata/nexusgraph
[nexusgraph packages source]: https://github.com/paion-data/nexusgraph/tree/master/packages
[nexusgraph test CI script]: https://github.com/paion-data/nexusgraph/blob/master/.github/workflows/ci-cd.yml

[Prettier]: https://prettier.io/
