# Publishing to The Hyve GitHub NPM Registry (Public)

This guide explains how to publish the `@thehyve/data-metrics-plugin` package to The Hyve's GitHub NPM registry as a public package.

## Prerequisites

- You must have a GitHub account with permission to publish to the `thehyve` organization.
- You need a GitHub Personal Access Token (PAT) with `write:packages` and `repo` scopes.
- Ensure your package version in `package.json` is updated according to semantic versioning.

## 1. Configure `.npmrc`

Create or update a `.npmrc` file in your project root (or home directory):

```ini
@thehyve:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

Replace `YOUR_GITHUB_PAT` with your GitHub Personal Access Token.

> **Important:** Add `.npmrc` to your `.gitignore` to avoid leaking your PAT.


## 2. Publish the package

Run the following command in the package directory:

```sh
npm publish
```

If successful, your package will be published to The Hyve's GitHub npm registry.

## 3. Set the package as public on GitHub

After publishing, you may need to set the package visibility to public using the GitHub web interface:

1. Go to https://github.com/orgs/thehyve/packages (or your organization's Packages page).
2. Click on the `@thehyve/data-metrics-plugin` package.
3. Click on "Package settings" (gear icon or settings tab).
4. Under "Danger Zone" or "Visibility", set the package visibility to **Public**.
5. Confirm your choice if prompted.

This ensures the package is accessible to everyone, not just your organization.

---

**Note:** This file is for internal documentation and should NOT be included in the published package.
