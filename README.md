Messier-61 <sup>![Node Version Badge is Missing][node version badge]</sup>
==========

<div align="center">
<img src="https://raw.githubusercontent.com/QubitPi/Messier-61/master/docs/static/img/logo.svg" width="200px" />
</div>

[![npm registry][npm registry]](https://www.npmjs.com/package/messier-61)
[![Prettier][Prettier badge]](https://prettier.io/)
[![License Badge][license badge]](https://www.apache.org/licenses/LICENSE-2.0)
[![GitHub Workflow Status][release status]](https://github.com/QubitPi/messier-61/actions/workflows/release.yml)
![GitHub last commit (master)](https://img.shields.io/github/last-commit/QubitPi/messier-61/master?logo=github&style=for-the-badge)

> _Messier-61_ is named after the [supermassive black hole "Messier-61"][Messier-61 Wikipedia]. In the world of Physics,
> it's the "entry" of interstellar travelling that eventually takes people to a fresh set of world-view of galaxies

We've been intrigued by this question of whether we can evolve or develop an external brain, a brain that through data,
can give us seamless access and easy access to meta information or information that may exists somewhere that may be
relevant to help us make the right decision about anything.

Project Structure
-----------------

As a mono-repo, Messier-61 sub-projects of re-usable packages.

### Development

Using Messier-61 Node 16 and for dependencies we use yarn (`npm install -g yarn`). To install dependencies:

```shell
yarn install
```

### Testing overview

Messier-61 has both unit and end to end tests running automatically on every pull request. To run the tests locally:

`yarn test-unit` runs a linter and then our unit tests.

`yarn test-e2e` runs our Cypress end to end tests in the easiest, slowest way. Running them with this command requires
docker installed and that nothing else runs on ports 7687 and 8080.

Feedback & Contributing
-----------------------

Found a bug or some other problem with Messier-61? Please [**open an issue**][issue link]. Have an idea for a new
feature? You're welcome to leave suggestions and ideas there as well.

Contributions welcome! More information in our [CONTRIBUTING.md](CONTRIBUTING.md).

### Contributors

<a href="https://github.com/QubitPi/Messier-61/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=QubitPi/Messier-61" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

License
-------

The use and distribution terms for [Messier-61][Messier-61 documentation] are covered by the
[Apache License, Version 2.0][Apache License, Version 2.0].

[Apache License, Version 2.0]: http://www.apache.org/licenses/LICENSE-2.0.html

[issue link]: https://github.com/QubitPi/Messier-61

[license badge]: https://img.shields.io/badge/Apache%202.0-F25910.svg?style=for-the-badge&logo=Apache&logoColor=white

[Messier-61 documentation]: https://QubitPi.github.io/Messier-61/
[Messier-61 Wikipedia]: https://en.wikipedia.org/wiki/Messier_61

[node version badge]: https://img.shields.io/node/v/messier-61?logo=Node.js&logoColor=white&style=for-the-badge
[npm registry]: https://img.shields.io/npm/v/messier-61?logo=npm&style=for-the-badge

[Prettier badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge&logo=Prettier

[release status]: https://img.shields.io/github/actions/workflow/status/QubitPi/messier-61/release.yml?branch=master&logo=github&style=for-the-badge
