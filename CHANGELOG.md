# Changelog
All notable changes to this project will be documented in this file.

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

## [PRE 1.0.0-pre-alpha]
### Pre-release commits includes the following
- Ejected from CRA
- Add react-router for routing
- Add material-ui for GUI
- Add basic components [About, Home, Settings and Query]
