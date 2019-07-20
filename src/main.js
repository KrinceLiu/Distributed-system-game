const electron = require('electron');
const url = require('url');
const path = require('path');
const serverSocket = require("./udp/mainUdp.js");
const response = require("./udp/udpHelpers.js").response;
const Server = require("./server/server.js");


const {ipcMain ,app, BrowserWindow} = electron;

var win;
var win2;
var hostInfo;
var server;

function createWindow()
{
    win = new BrowserWindow({ width: 800, height: 600, title:"Host" });
    win.loadFile("html/mainMenu.html");
    win.webContents.openDevTools();

    win2 = new BrowserWindow({ width: 800, height: 600, title:"Client" });
    win2.loadFile("html/mainMenu.html");
    win2.webContents.openDevTools();
    console.log("loaded");
        // win2.webContents.openDevTools();
    // serverSocket.createServer();

    // win2 = new BrowserWindow({ width: 800, height: 600, title:"rendererSocket" });
    
    // win2.loadFile("html/mainMenu.html");

    // win3 = new BrowserWindow({ width: 800, height: 600, title:"rendererSocket" });
    
    // win3.loadFile("html/mainMenu.html");
    // win3.webContents.openDevTools();

    win.on("closed", () => win = null);
    win2.on("closed", () => win = null);
    // win3.on("closed", () => win = null);
}

function setUpSockets() {

}

function initialize() {
    createWindow();
    ipcMain.on('start-server', (event, arg) => {
        try {
            hostInfo = serverSocket.createServer();
            console.log(hostInfo);
            var j = JSON.parse(hostInfo);
            server = new Server(j.HOSTIP, j.HOSTPORT, serverSocket.send);
            event.returnValue = response.STARTED;
        } catch(err){
            console.log(err.message);
            event.returnValue = err.message;
        }
    });
    ipcMain.on('save-host', (event, arg) => {
        hostInfo = JSON.parse(arg);
        event.returnValue = response.SAVED;
        console.log(hostInfo);
    });
    ipcMain.on('get-state', (event, arg) => {
        console.log(hostInfo);
        event.returnValue = hostInfo;
    });
    
    ipcMain.on('get-update', (event, arg) => {
        // send state back
    });

}




app.on('ready', initialize);  

app.on("window-all-closed", function () 
{
    // From electron guide:
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin')
    {
        app.quit();
    }
})

app.on("activate", function ()
{
    // From electron guide:
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null)
    {
        createWindow();
    }
})