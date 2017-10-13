var electronInstaller = require('electron-winstaller');
resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: 'C:/Users/Mihir/Documents/Projects/Audius/builds/packages/Audius-win32-x64',
    outputDirectory: 'C:/Users/Mihir/Documents/Projects/Audius/builds/installer',
    iconUrl: 'C:/Users/Mihir/Documents/Projects/Audius/assets/audius_inverted_icon.ico',
    setupIcon: 'C:/Users/Mihir/Documents/Projects/Audius/assets/audius_inverted_icon.ico',
    authors: 'Mihir Pathak',
    exe: 'Audius.exe',
    noMsi: true,
    setupExe: 'Audius-0.3.23-x64-setup.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
