const electron = require("electron");

const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor() {
    super({
      webPreferences: {
        nodeIntegration: true,
        backgroundThrottling: false, // diable chormium thrott our app to background when not focus
      },
      width: 300,
      height: 500,
      frame: false,
      resizable: false,
      show: false,
    });

    this.on("blur", this.onBlur.bind(this));
  }

  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
