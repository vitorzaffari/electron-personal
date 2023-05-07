const { contextBridge, ipcRenderer } = require("electron");



// contextBridge.exposeInMainWorld("dataManipulationAPI", {
//   send: (channel, data) => {
//     ipcRenderer.send(channel, data);
//   },
//   receive: (channel, func) => {
//     ipcRenderer.on(channel, (event, ...args) => {
//       func(...args);
//     });
//   },
// });
let retrievedData = null

ipcRenderer.on("retrievedData", (event, data) => {
  // window.dataManipulationAPI.send("retrievedData", retrievedData);
  retrievedData = data;
});

contextBridge.exposeInMainWorld("teste", {
  getRetrievedData: () => {return retrievedData}
})

// window.getRetrievedData = () => {
//   return retrievedData;
// }

contextBridge.exposeInMainWorld("bridge", {
  sendData: (data) => {
    ipcRenderer.send("saveDataToDisk", data);
    console.log(data);
  },
});

// window.api = {
//   send: (channel, data) => {
//     ipcRenderer.send(channel, data);
//   },
//   receive: (channel, func) => {
//     ipcRenderer.on(channel, (event, ...args) =>{
//       func(...args)
//     })
//   }
// }
























contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title) => ipcRenderer.send("set-title", title),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  onUpdateCounter: (callback) => ipcRenderer.on("update-counter", callback),
});

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
});

contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
  system: () => ipcRenderer.invoke("dark-mode:system"),
});
