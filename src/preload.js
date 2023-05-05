const { contextBridge, ipcRenderer } = require("electron");


// contextBridge.exposeInMainWorld('electronAPI', {
//     openFile: () => ipcRenderer.invoke('dialog:openFile')
//   })


contextBridge.exposeInMainWorld(
  "electronAPI",
  {
    setTitle: (title) => ipcRenderer.send("set-title", title),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback)
  },

);

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
})
    // we can also expose variables, not just functions
// contextBridge.exposeInMainWorld("electronAPI", {
//   openFile: () => ipcRenderer.invoke("dialog:openFile"),
// });
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
