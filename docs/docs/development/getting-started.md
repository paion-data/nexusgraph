---
sidebar_position: 1
title: Getting Started
---

Before committing your code, please run the following checks locally in order to give ourselves better confidence that
the code will pass the automated checks online:

1. Prettier our code:

   ```bash
   npx prettier --write .
   ```

2. Check code style using ESLint:

   ```bash
   npx eslint .
   ```

   :::caution

   ESLint currently does not run on documentation source codes, i.e. `/docs`

   :::

3. Run all tests

   ```bash
   npm test
   ```

Available Scripts
-----------------

### `npm start`

<!-- markdown-link-check-disable -->
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
<!-- markdown-link-check-enable -->

The page will reload if you make edits. You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. See the section about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the
build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

Learn More
----------

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Troubleshooting
---------------

### Docusaurus Relative Linking is Treated False-Negative by CI Markdown Link check

CI check for Markdown link (`markdown-link-check`) is turned on and it's not smart enough to detect relative linking by
Docusaurus. The workaround is to disable the link check at the relevant line. For example:

```markdown
<!-- markdown-link-check-disable -->
known. Additionally, this process makes it easy to implement a [blue-green deployment](continuous-delivery) or
<!-- markdown-link-check-enable -->
```

[onchange]: https://www.npmjs.com/package/onchange
