const { contextBridge, ipcRenderer } = require("electron");



let retrievedData = null

ipcRenderer.on("retrievedData", (event, data) => {
  // window.dataManipulationAPI.send("retrievedData", retrievedData);
  retrievedData = data;
});

contextBridge.exposeInMainWorld("getData", {
  getRetrievedData: () => {return retrievedData}
})

contextBridge.exposeInMainWorld("bridge", {
  sendData: (data) => {
    ipcRenderer.send("saveDataToDisk", data);
    // console.log(data);
  },
});









contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
});
