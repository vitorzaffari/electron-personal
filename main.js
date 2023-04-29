const {app, BrowserWindow} = require('electron')

function createWindow(){
    const wind = new BrowserWindow({
        width:800,
        height:800,
        webPreferences:{
            nodeIntegration:true
        }
    })


    wind.loadFile('index.html')

    wind.webContents.on('did-finish-load', () => {
        // wind.webContents.reloadIgnoringCache()
        wind.webContents.openDevTools()

    })


    wind.on('closed', () =>{
        wind = null
    })
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow();
        }
    })
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})
