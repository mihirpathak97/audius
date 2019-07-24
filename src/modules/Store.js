const electron = require('electron') || window.require('electron');
const Conf = require('conf');

class Store extends Conf {
	constructor() {
		let options = {
      configName: 'userConfig',
      cwd: (electron.app || electron.remote.app).getPath('userData')
		};
		super(options);
	}
}

module.exports = new Store();