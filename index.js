const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        // width: 950,
        height: 750
    })

    win.loadFile('chessboard/html/chessboard.html');
    // win.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});