const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  Menu,
  nativeTheme,
} = require("electron");
const path = require("path");
const fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

function handleSaveData(event, data) {
  const dadosExistentes = JSON.parse(fs.readFileSync("src/data/data.json"));
  dadosExistentes.tracker.push(data);

  fs.writeFile("src/data/data.json", JSON.stringify(dadosExistentes), (err) => {
    if (err) throw err;
    console.log("Item adicionado");
  });
}

function handleRemoveData(event, data) {
  const dadosExistentes = JSON.parse(fs.readFileSync("src/data/data.json"));
  const idToDelete = dadosExistentes.tracker.findIndex(
    (item) => item.id == data
  );
  console.log("index encontrado", idToDelete);

  if (idToDelete !== -1) {
    console.log("achou");

    dadosExistentes.tracker.splice(idToDelete, 1);
  } else {
    console.log("n achou");
  }

  fs.writeFile("src/data/data.json", JSON.stringify(dadosExistentes), (err) => {
    if (err) throw err;
    console.log("Item Deletado");
  });
}
function handleEditData(event, data){
  const dadosExistentes = JSON.parse(fs.readFileSync("src/data/data.json"));
  console.log("This is the data passed: ", data)
  const itemtoEdit = dadosExistentes.tracker.findIndex(
    
    (item) => item.id == data.id
  );
  console.log("index encontrado", itemtoEdit);
  if (itemtoEdit !== -1) {
    console.log("achou");
    dadosExistentes.tracker[itemtoEdit].itemNome = data.itemNome;
    dadosExistentes.tracker[itemtoEdit].itemData = data.itemData;
    console.log("Item editado");

  } else {
    console.log("n achou");
  }

  fs.writeFile("src/data/data.json", JSON.stringify(dadosExistentes), (err) => {
    if (err) throw err;
    console.log("Salvo");
  });
}


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#2f3241",
      symbolColor: "#74b1be",
      height: 30,
    },
    width: 500,
    minWidth:500,
    maxWidth:500,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      // enableRemoteModule:false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  fs.readFile("src/data/data.json", (err, data) => {
    if (err) throw err;
    const retrievedData = JSON.parse(data);
    mainWindow.webContents.send("retrievedData", retrievedData);
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  ipcMain.on("saveDataToDisk", handleSaveData);
  ipcMain.on("editData", handleEditData);

  ipcMain.on("removeData", handleRemoveData);

  ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
      console.log("Native theme dark colors changed to light");
    } else {
      nativeTheme.themeSource = "dark";
      console.log("Native theme light changed to dark");
    }
    return nativeTheme.shouldUseDarkColors;
  });

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
