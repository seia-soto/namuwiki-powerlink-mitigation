# namuwiki-powerlink-mitigation

Mitigate powerlink ads from NamuWiki.

## table of contents

- [install](#install)
- [features](#features)
- [development](#development)

---

# install

To install this userscript, please use the following link:

```
https://github.com/seia-soto/namuwiki-powerlink-mitigation/raw/master/dist/bundle.user.js
```

If you want to verify the script content, you can download the MD5 hash of the script from the following link:

```
https://github.com/seia-soto/namuwiki-powerlink-mitigation/raw/master/dist/checksum
```

# features

- dev
  - watches file changes
  - deploys via local http server
  - generates local checksum
- ci
  - detects if development resources exists
  - verifies sent checksum

# development

If you're interested in, please setup Node.JS v16 or higher for development environment.
That's all!

## recommended environment

> All things are optional!
> Only you need is Node.JS on your system.

I suggest you a better environment to enhance your productivity:

- pnpm, install via `npm i -g pnpm`

## scripts

I prepared some scripts to help your development.

### `build`

If you want to build the script for production, you can use `pnpm build`

This'll
  1) build files
  2) generate checksum

### `dev`

If you want to test out your script, you can use `pnpm dev`.

This'll
  1) watch changes and build it automatically
  2) create new http server on port `9090`
  3) use alternative file paths

If you set `DEBUG=1` or use `dev` command, you'll get different paths for output files.
Refer the `scripts/build.js`, or:

> Note that all ins are optional!

- ins
  - `dist/header.js` -> `dist/header.dev.js`

- outs
  - `dist/bundle.js` -> `dist/bundle.dev.js`
  - `dist/bundle.user.js` -> `dist/bundle.user.dev.js`
  - `dist/checksum` -> `dist/checksum.dev`

### `test`

If you want to verify the generated checksum, you can use `pnpm test`.
In local environment, `CI=1` is *not* specified to avoid detecting development resources.

If you're going to use different ci instead of GitHub Actions (preset), please use `CI=1 npm run test` to include all tests ready for ci.

## cycle

Here's the development cycle for faster in-memory opt-in of your brain.

1. run `pnpm i` to install deps.
2. run `pnpm dev` to launch local http server on port `9090`.
3. open browser and find for `bundle.dev.user.js` or `http://localhost:9090/bundle.dev.user.js` to install on your userscript manager.
4. give some changes under `src` folder.
5. run `pnpm build` before commit.

### upgrading the version of script

Ready to publish a new version?
Here's the list of files you'll need to change:

- `package.json`, update `version`
- `dist/header.js`, update `@version`

### upgrading node version

If you interested in upgrading the Node.JS version, please make sure you're using LTS release first.
Here's the list of files you'll need to change:

- `.nvmrc`, update codename of new release
- `package.json`, update `engines.node`
- `.github/workflows`, update `jobs.post-check.steps[1].with.node-version`

That's all!

### changing folder names

If you don't like `src` and `dist` for folder names, you can easily change it.
Here's the list of files you'll need to change:

- `scripts/build.js`, update `sourceRoot` and `sourceDist` variable
- Move some files under `src` and `dist`
