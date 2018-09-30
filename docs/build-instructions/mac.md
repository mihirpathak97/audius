# Build Instructions For MacOS

**NOTE**: if you do not use `yarn`, just substitute the commands with `npm`.

## Clone the Repository

To get started, get your hands on the latest source code of Audius.

```bash
$ git clone https://github.com/mihirpathak97/audius.git
```

From there, navigate to wherever you cloned the repository and run the bootstrap script to download
important binaries like FFmpeg and rainbow.

```bash
$ cd audius
$ yarn install
$ yarn init-app
```

`init-app` actually downloads the prebuilt binaries for all platforms into the `bin` directory.
If you don't want to do that, just comment out the extra `downloadBinaries()` call inside
`scripts/bootstrap.js`.

## Running in Development Mode

Once you've cloned and bootstrapped your local copy of Audius souce, open up a terminal inside
the folder and run:

```bash
$ yarn electron-dev
```

This starts React in dev mode and also opens up an instance of electron.

## Building

In order to build Audius from source, make sure you meet the following requirments.

* MacOS 10.9 or later
* Node.js 6.x or later
* npm 3.10 or later
* Command line tools for XCode (run `xcode-select --install`)

### Instructions

First, we need to package the React app into a production bundle.

```bash
$ yarn build
```

Then, to package the app for your current build environment, just run

```bash
$ build
```

or

```bash
$ yarn package-mac
```

This invokes `electron-builder` which will package the app into the `dist` directory.
