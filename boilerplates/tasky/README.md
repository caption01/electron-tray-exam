### Getting started

`npm install`

Start dev server:

`npm start`

In a new terminal window:

`npm run electron`

### Citeria

- setting window for tray

```js
new BrowserWindow({
  frame: false,
  resizable: false,
  show: false,
});
```

- tray configuration

```js
// on/off window
tray.on("click", () => {
  mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
});

// set text after icon
tray.setTitle();

// set hover title
tray.setToolTip("Timer App");

// open menu on right click
const menuConfig = Menu.buildFromTemplate([
  {
    label: "Quit",
    click: () => {
      app.quit();
    },
  },
]);

tray.popUpContextMenu(menuConfig);
```

- bounds of electron

Osx

```js
  x -> x - (width / 2)
  y -> y
```

Window

```js
  x -> x - (width / 2)
  y -> y - (hight)
```

- setting chormium background work

```js
webPreferences: {
        nodeIntegration: true,
        backgroundThrottling: false, // diable chormium thrott our app to background when not focus
      }
```
