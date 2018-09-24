# Changelog
All notable changes to this project will be documented in this file.

## [1.5.0] - 2018-08-19
** NOTE - ** This is the final release for 1.x.x. I will shortly begin work on 2.x :grin:

This branch may or may not recieve bug fixes. Feel free to fork the repo and make changes

### Changed
- Updated node packages
  - electron - 2.0.7 -> 2.0.10

## [1.5.0-beta1] - 2018-08-19
### Added
- Logging! Now it's easier to debug the application
  - Log files location is platform dependent

### Changed
- Updated node packages
  - electron - 2.0.2 -> 2.0.7
  - electron-updater - 2.21.10 -> 3.1.1
  - And more!

## [1.4.2] - 2018-08-18
### Fixed
- Uncaught error while fetching access token in main process

## [1.4.1] - 2018-08-01
### Fixed
- Refresh Spotify token on-demand

## [1.4.0] - 2018-07-01
### Changed
- Display upto 10 search results

### Fixed
- "Go back" re-renders current view

## [1.3.0-beta1] - 2018-06-26
### Changed
- rainbow is no longer experimental!
- Default download format for OSX is m4a
- rainbow is enabled by default

## [1.3.0-beta1] - 2018-06-26
### Added
- [Experimental] Rainbow can now embed tags in M4A files too!

### Changed
- rainbow now uses positional arguments

## [1.3.0-alpha2] - 2018-06-24
### Added
- [Experimental] Added rainbow for all platforms
- Added toggle switch in Settigns to embed metadata

### Changed
- Changed the way the app compiles external binaries

### Removed
- All built in binaries inside the repository

## [1.3.0-alpha1] - 2018-06-23
### Added
- [Experimental] Added rainbow for embedding ID3 in win32

### Changed
- Lint ES6 code

## [1.2.1] - 2018-06-22
### Changed
- Remove unused dependencies [lesser app size]
- NSIS installer will not ask for elevated permissions

## [1.2.0] - 2018-06-22
### Changed
- include files for electron-builder

## [1.2.0-beta1] - 2018-06-22
### Changed
- New Layout!
- Cleaner, Leaner code
- Re-organize entire app structure for efficiency

### Fixed
- FFmpeg path issues in production

## [1.1.0] - 2018-06-20
### Added
- Auto Update is now fully functional

## [1.0.2] - 2018-06-19
### Changed
- Use proper JSX syntax
- Query - remove useless code
- Modified build scripts

## [1.0.1] - 2018-06-15
### Added
- electron-log for logging

### Changed
- Cleanup unnecessary build code
- Temporarily drop auto-updater support
- Clean up Terms and About

## [1.0.0] - 2018-06-08
### Added
- FFmpeg binary for all platforms
- Added ability to modify settings

### Changed
- Debian package specific config
- Settings - use table layout
- Default download location is `$HOME/Misic`
- electron-builder publish config

### Fixed
- Fix FFMPEG_PATH related issues for all platforms
- Fix Query onSubmit
- Fix FFmpeg binary permission issues in OsX and Linux

## [1.0.0-beta3] - 2018-06-06
### Added
- Add custom dialog box to display messages and errors
- Customize build script
- **Drop 32-bit support entirely**

### Changed
- New dialog box layout
- Make DialogBox as a separate React component
- YouTube and Spotify links are disabled
- Removed useless console log calls

### Fixed
- TrackContainer - dialog opens on render()
- YTDownload - return on error
- QueryField - fixed invalid view error
- QueryField - disable toggleError on change
- QueryField - set dialog open to false
- TrackContainer, Query - dialog will not open after first trigger

## [1.0.0-beta2] - 2018-06-05
### Added
- Custom script to build in CI

### Changed
- Travis - use a more complex build config

### Fixed
- FFMPEG_PATH in non-windows platforms
  - **NOTE** - Linux and OSX users need to manually install FFmpeg and set to PATH

## [1.0.0-beta1] - 2018-06-05
### Changed
- Remove unused packages [reduces build size]

### Fixed
- Build failure because of condition require in fluent-ffmpeg

## [1.0.0-alpha3] - 2018-06-05
### Added
- Custom README
- Travis CI configuration [Supports multi-platform build!]
- Added image assets

### Changed
- Final build files will not have ${platform}

### Fixed
- Menu stays open when miniWindow is triggered

## [1.0.0-alpha2] - 2018-06-04
### Added
- Module YTDownload for downloading in MP3
- YTDownload - add progress listener
- YTDownload - multi-format download (mp3 and m4a)
- Settings - basic settings functionalities

### Changed
- TrackContainer - implement YTDownload
- TrackContainer - migrate to React.Component
- YTDownload - use filter options to grab 'auidioonly'
- YTDownload - change from downloadMp3 to download() for multi-format support
- TrackContainer - use CircularProgress and disable button while downloading
- webpack - set target to 'node' to enbale nodejs functionalities that do not work in browser mode
- YTDownload - request output format from persistent conf
- YTDownload - get Spotify metadata from props

### Fixed
- YTDownload - fix improper module export
- TrackContainer - fix CircularProgress on error
- Fix class names in About and Terms

## [1.0.0-alpha1] - 2018-06-03
### Added
- Terms - add terms of use
- About - add basic content

## [1.0.0-pre-alpha] - 2018-06-02
### Added
- Module YTCore - streaming audio from YouTube
- Module YTSearch - uses YouTube's V3 API to search for songs
- Module SpotifyWebApi - uses Spotify's Web API for requesting metadata
- FFmpeg 4.0 binary for win32 systems [macOS and linux users must install it as a dependency]
- Audius icons for all platforms, courtesy of @turnerboy
- Added react-fortawesome for icon support
- electron-builder config for packaging the app
- TopAppBar - add handlers for both menu items and window navigation
- Query - add custom result container (first VideoContainer then TrackContainer)
- App - custom scrollbar
- VideoContainer - add onClick handler to play audio

### Changed
- Use seperate build directory (react-compiled) for react's production builds
- TopAppBar - go back to per-view render mode
- TopAppBar - add "go back" in Search
- TopAppBar - move to font-awesome for window handler icons
- TopAppBar - clean up menu items a bit
- Query - Display query
- electron.js - use YTCore instead of youtube-audio-stream
- YTSearch - crunch results before returning
- YTSearch - use YouTube's API options for filtering results
- electron.js - use electron-settings to set Spotify access_token to be persistent
- TrackContainer - pass some track details as props
- electron-builder - move FFmpeg directory to extraResources
- package.json - add important fields (author, productName, description and more) and remove unused packages

### Fixed
-  QueryField - wrong URL passed while invoking new BrowserWindow
- electron.js - fix URL path
- Query - fix displaying encoded URI as title
- Query - use decodeURI() before passing to search()
- App - set correct FFMPEG_PATH
- webpack - fix production level transpiling issues (UglifyJS cannot properly transpile ES6)
- App - fix module not found error in main
