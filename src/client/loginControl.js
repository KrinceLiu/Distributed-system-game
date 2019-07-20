const $ = require("jquery");
const { ipcRenderer } = require('electron');
const remote = require("electron").remote;

const response = remote.require("./udp/udpHelpers.js").response;

const gameBoardUrl = "html/gameBoard.html";


function setUpClient() {
    data = document.getElementById('inputIpToConnect').value.split(':');
    console.log(data);
    j = {HOSTIP: data[0], HOSTPORT: data[1]};
    result = ipcRenderer.sendSync('save-host', JSON.stringify(j));
    loadTheBoard();
}



function createServer() {
    result = ipcRenderer.sendSync('start-server', 'Start server');
    if(result == response.STARTED) {
        console.log("Server started");
        loadTheBoard();
    } else {
        alert(`${result}. Cannot start the server.`);
    }
}

function loadTheBoard() {
    remote.getCurrentWindow().loadFile(gameBoardUrl);
}
