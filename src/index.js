const { app, BrowserWindow, ipcMain, dialog, Menu, nativeTheme} = require("electron");
const path = require("path");
const fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

// function handleSetTitle(event, title) {
//   const webContents = event.sender;
//   const win = BrowserWindow.fromWebContents(webContents);
//   win.setTitle(title);
// }

// async function handleFileOpen() {
//   const { canceled, filePaths } = await dialog.showOpenDialog();
//   if (canceled) {
//   } else {
//     return filePaths[0];
//   }
// }

function handleSaveData(event, data){
  const dadosExistentes = JSON.parse(fs.readFileSync('data/data.json')) 
  dadosExistentes.tracker.push(data)
  fs.writeFile('data/data.json', JSON.stringify(dadosExistentes), (err) => {
    if(err) throw err;
    console.log("Item adicionado");
  });
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


  fs.readFile('data/data.json', (err, data) => {
    if (err) throw err;
    const retrievedData = JSON.parse(data)
    mainWindow.webContents.send('retrievedData', retrievedData)
  });


  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  ipcMain.on("saveDataToDisk", handleSaveData);
  



  // ipcMain.on("set-title", handleSetTitle);
  ipcMain.handle('dark-mode:toggle', ()=> {
    if(nativeTheme.shouldUseDarkColors){
      nativeTheme.themeSource = 'light';
      console.log("Native theme dark colors changed to light");
    } else {
      nativeTheme.themeSource = 'dark';
      console.log("Native theme light changed to dark");
    } return nativeTheme.shouldUseDarkColors;
  })


  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});










app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
