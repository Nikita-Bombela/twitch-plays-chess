const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        // width: 450,
        width: 850,
        height: 550
    })

    win.loadFile('chessboard/html/chessboard.html');
    win.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});