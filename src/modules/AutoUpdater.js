/** 
 * Auto Updater  
 *  
 * New releases will be published @ https://github.com/mihirpathak97/audius/releases 
 * and will be automatically downloaded and will be installed
 */ 
 
const {autoUpdater} = require("electron-updater"); 
autoUpdater.checkForUpdatesAndNotify();

// Done in two lines :)