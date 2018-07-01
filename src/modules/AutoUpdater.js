/** 
 * Auto Updater  
 *  
 * New releases will be published @ https://github.com/mihirpathak97/audius/releases 
 * and will be automatically downloaded and will be installed
 */ 
 
const {autoUpdater} = require("electron-updater");
/**
 * Update Channel
 * supported channels are 'alpha', 'beta' and 'latest'
 * Refer electron-builder docs
 */
// autoUpdater.channel = 'beta';
autoUpdater.checkForUpdatesAndNotify();

// Done in two lines :)