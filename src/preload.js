const { contextBridge, ipcRenderer } = require("electron");
const uuid = require('uuid');
contextBridge.exposeInMainWorld("uuid", uuid)


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
  removeData: (data) => {
    ipcRenderer.send("removeData", data);
    console.log(data);
  },
  editData: (data) => {
    ipcRenderer.send("editData", data)
    console.log(data);
    
  }
});









contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
});
