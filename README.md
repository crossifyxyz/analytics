<div align="center">

<!-- [![license](https://img.shields.io/badge/license-Apache%202-blue)](/LICENSE.md) -->

[![Follow on Twitter](https://img.shields.io/twitter/follow/crossifyxyz.svg?label=follow+CROSSIFY)](https://twitter.com/crossifyxyz)

</div>

# CROSSIFY ANALYTICS - Next.js

The Next.js setup for the CROSSIFY platform.

## Summary

This repository hosts the fullstack code for [CROSSIFY](https://github.com/crossifyxyz). Learn more about CROSSIFY at [https://crossify.xyz](https://crossify.xyz).

## Table of Contents

- [Configuration](#configuration)
- [Quick Start](#quick-start)
- [Contribution](#contribution)

## Configuration

**Recommended Editor**: VsCode. For the best experience, install the Eslint and Prettier extensions.

Start by setting up your environment:

```bash
cp .env.example .env
```

Edit the `/.env` file with the necessary settings:

- `ENV=` (or `development`, `production` according to your needs)
- `SENDGRID_API_KEY=...`
- `MONGO_URI=...`
- `SESSION_SECRET=...`

**GitHub Secrets Configuration**: only for maintainers

For automated processes like CI/CD using GitHub Actions:

1. Navigate to your GitHub repository and access the `Settings` tab.
2. Locate the `Secrets` option in the left sidebar.
3. Use the `New repository secret` button to add new secrets.
4. Specifically, add secrets for `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

## Quick Start

```bash
# Install dependencies
npm i

# Run the development server
npm run dev

# Run the production server
npm run build
npm start
```

## Contribution

If you're looking to contribute, consider forking the repo and making pull requests. Ensure your changes align with project standards and expectations.

---

**Fork the repository**: Click the "Fork" button on the repository page to create a copy of the repository in your own GitHub account.

```bash
git clone https://github.com/your-username/repository-name.git

# Create a new branch: Create a new branch for your changes using the git checkout command.
git checkout -b my-new-branch
```

**Make changes locally**: Make your changes to the codebase. Ensure your changes align with project standards and expectations.

```bash
# Run Build ( as clarified above )

# Locally test using Docker
npm run docker
```

**Commit and push**: Commit your changes and push your branch to your fork on GitHub.

```bash
# Commit and push to your fork
git add .
git commit -m 'chore: exemple commit'
git push origin my-new-branch
```

**Create a pull request**: Go to the original repository page on GitHub and click the "New pull request" button. Select your forked repository and the branch you just pushed to, and click "Create pull request". Add a title and description for your pull request, and click "Create pull request" again to submit it.
