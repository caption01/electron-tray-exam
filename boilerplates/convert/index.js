const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const _ = require("lodash");

const { app, BrowserWindow, ipcMain, shell } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false,
    },
    height: 600,
    width: 800,
  });

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

ipcMain.on("video:added", (e, videos) => {
  const videoPromises = _.map(videos, (video) => {
    const promise = new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        video.duration = metadata.format.duration;
        video.format = "avi";
        resolve(video);
      });
    });

    return promise;
  });

  Promise.all(videoPromises).then((results) => {
    mainWindow.webContents.send("metadata:complete", results);
  });
});

ipcMain.on("conversion:start", (e, videos) => {
  _.each(videos, (video) => {
    const outputDir = video.path.split(video.name)[0];
    const outputName = video.name.split(".")[0];
    const outputPath = `${outputDir}/${outputName}.${video.format}`;

    ffmpeg(video.path)
      .output(outputPath)
      .on("progress", ({ timemark }) => {
        mainWindow.webContents.send("conversion:progress", { video, timemark });
      })
      .on("end", () =>
        mainWindow.webContents.send("conversion:end", {
          video,
          outputPath,
        })
      )
      .run();
  });
});

ipcMain.on("folder:open", (event, outputPath) => {
  shell.showItemInFolder(outputPath);
});
