# Build Instructions For Windows

**NOTE**: if you do not use `yarn`, just substitute the commands with `npm`.

## Clone the Repository

To get started, get your hands on the latest source code of Audius.

```bash
C:\> git clone https://github.com/mihirpathak97/audius.git
```

From there, navigate to wherever you cloned the repository and run the bootstrap script to download
important binaries like FFmpeg and rainbow.

```bash
C:\> cd audius
C:\> yarn install
C:\> yarn init-app
```

`init-app` actually downloads the prebuilt binaries for all platforms into the `bin` directory.
If you don't want to do that, just comment out the extra `downloadBinaries()` call inside 
`scripts/bootstrap.js`.

## Running in Development Mode

Once you've cloned and bootstrapped your local copy of Audius souce, open up a terminal inside
the folder and run: 

```bash
C:\> yarn electron-dev
```

This starts React in dev mode and also opens up an instance of electron.

## Building

In order to build Audius from source, make sure you meet the following requirments.

* Node.js 6.9.4 or later
* Visual C++ Build Tools 2015 (easy way to setup is install `windows-build-tools` from npm)

### Instructions

First, we need to package the React app into a production bundle.

```bash
C:\> yarn build
```

Then, to package the app for your current build environment, just run

```bash
C:\> build
```

or 

```bash
C:\> yarn package-win
```

This invokes `electron-builder` which will package the app into the `dist` directory.
