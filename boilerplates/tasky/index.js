const path = require("path");
const electron = require("electron");

const TimerTray = require("./app/timer_tray");
const MainWindow = require("./app/main_window");

const { app, ipcMain } = electron;

let mainWindow;
let tray;

const iconName =
  process.platform === "win32" ? "windows-icon@2x.png" : "iconTemplate.png";
const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

app.on("ready", () => {
  app.dock.hide();

  mainWindow = new MainWindow();
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on("update-timer", (event, timeLeft) => {
  tray.setTitle(timeLeft);
});
