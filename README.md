# FastUI

![Node Version Badge]
[![GitHub Workflow Status]][GitHub Workflow URL]
[![Apache License Badge]][Apache License, Version 2.0]

**FastUI** is a TypeScript React+Webpack web app template that lets us spin up frontend project quickly through
[GitHub templates]. One can think of it as the monorepo version of Facebooks's [Create React App] but with intense focus
and improvements on software CI/CD, such as automated testing. At the end of the day, FastUI helps organization
to improve the velocity and quality of their teams' work.

> [!NOTE]
>
> Unlike Create React App's [eject mechanism](https://create-react-app.dev/docs/available-scripts#npm-run-eject), FastUI gives developer **total control of every aspect of frontend
> development**; all configs are surfaced and directly tunable, such as Jest Babel configs, without "ejecting" or
> dependence on external config library.

## ✨ Features

- Start of the art project manager [![Yarn 2](https://img.shields.io/badge/Yarn%202-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)](https://yarnpkg.com/)
- Fully automated CI/CD [![GH Action](https://img.shields.io/badge/GitHub%20Action-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)

  - Code style checks

    - React & TypeScript [![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/) [![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)](https://prettier.io/)
    - YAML & Markdown

  - Fully automated tests coming out of the box

    - Unit & End-to-End Tests [![Jest](https://img.shields.io/badge/Jest%20Unit%20Tests-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jest.qubitpi.org/) [![Cypress](https://img.shields.io/badge/Cypress%20E2E-69D3A7?style=for-the-badge&logo=cypress&logoColor=white)](https://cypress.qubitpi.org)
    - Performance Tests [![Lighthouse](https://img.shields.io/badge/Lighthouse-F44B21?style=for-the-badge&logo=lighthouse&logoColor=white)](https://developer.chrome.com/docs/lighthouse/overview)

      ![](https://github.com/QubitPi/fast-ui/blob/master/docs/docs/img/lighthouse-report-example.png?raw=true)

    - UI Snapshot Tests [![Covered by Argos Visual Testing](https://argos-ci.com/badge-large.svg)](https://app.argos-ci.com/qubitpi/fast-ui/reference)

      ![](https://github.com/QubitPi/fast-ui/blob/master/docs/docs/img/argos-example.png?raw=true)

- Modern application monitoring [![sentry.io](https://img.shields.io/badge/sentry.io-362D59.svg?style=for-the-badge&logo=sentry&logoColor=white)](https://paion-data.sentry.io/issues/?project=4508702863589376)
- Auto-generated documentations [![TypeDoc](https://img.shields.io/badge/TypeDoc-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://fastui.qubitpi.org/api/)
- Modern state management template supporting arbitrarily complex React component wiring
  [![Redux Badge](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white&style=for-the-badge)](https://react-redux.qubitpi.org/)

## License

The use and distribution terms for [FastUI]() are covered by the [Apache License, Version 2.0]

[Apache License Badge]: https://img.shields.io/badge/Apache%202.0-F25910.svg?style=for-the-badge&logo=Apache&logoColor=white
[Apache License, Version 2.0]: https://www.apache.org/licenses/LICENSE-2.0
[Create React App]: https://create-react-app.dev/
[GitHub templates]: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository#about-template-repositories
[GitHub Workflow Status]: https://img.shields.io/github/actions/workflow/status/QubitPi/fast-ui/ci-cd.yaml?branch=master&logo=github&style=for-the-badge
[GitHub Workflow URL]: https://github.com/QubitPi/fast-ui/actions/workflows/ci-cd.yaml
[Node Version Badge]: https://img.shields.io/badge/NODE-18-339933?logo=Node.js&logoColor=white&labelColor=66cc33&style=for-the-badge
