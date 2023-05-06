const { app, BrowserWindow, ipcMain, dialog, Menu, nativeTheme} = require("electron");
const path = require("path");
const fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

function handleSetTitle(event, title) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (canceled) {
  } else {
    return filePaths[0];
  }
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // nodeIntegration: false,
      contextIsolation: true,
      // enableRemoteModule:false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send("update-counter", 1),
          label: "Increment",
        },
        {
          click: () => mainWindow.webContents.send("update-counter", -1),
          label: "Decrement",
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
  ipcMain.handle("ping", () => "pong");
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  ipcMain.on("set-title", handleSetTitle);
  ipcMain.handle('dark-mode:toggle', ()=> {
    if(nativeTheme.shouldUseDarkColors){
      nativeTheme.themeSource = 'light';
      console.log("Native theme dark colors changed to light");
    } else {
      nativeTheme.themeSource = 'dark';
      console.log("Native theme light changed to dark");
    } return nativeTheme.shouldUseDarkColors;
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system';
  })
  ipcMain.handle("dialog:openFile", handleFileOpen);
  ipcMain.on("counter-value", (_event, value) => {
    console.log(value);
  });
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
