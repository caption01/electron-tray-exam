const electron = require("electron");
const { Tray, Menu, app } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    // bind event 'click' into onClick we built.
    this.setToolTip("Timer App");
    this.on("click", this.onClick.bind(this));
    this.on("right-click", this.onRightClick.bind(this));
  }

  onClick(event, bounds) {
    const { x, y } = bounds;

    const { height, width } = this.mainWindow.getBounds();

    this.mainWindow.setBounds({
      x: x - width / 2,
      y: process.platform === "darwin" ? y : y - height,
      height,
      width,
    });

    this.mainWindow.isVisible()
      ? this.mainWindow.hide()
      : this.mainWindow.show();
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
      },
    ]);

    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;
