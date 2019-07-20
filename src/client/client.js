const { ipcRenderer, remote } = require('electron');

// const painter = require("../draw/painter.js");
// console.log(drawUtils);
// const Painter = drawUtils.Painter;
const {Player, Painter, setUpCallBacks} = require("../draw/painter.js");

const response = remote.require("./udp/udpHelpers.js").response;
const ports = remote.require("./udp/udpHelpers.js").ports;
const connection = remote.require("./udp/rendererUdp.js");

const methods = {}
const ip = "localhost";
const defaultPercentage = 0.2;

var mainPainter;
var playersPainters = [];
var users = [];
var mainPlayer;

window.onload = function init() {
    setUpServerCommunication();
    setUpPainters();
};

function setUpServerCommunication() {
    result = ipcRenderer.sendSync('get-state', 'IPC/Socket');
    try {
        j = JSON.parse(result);
        if(j.status == response.SOCKET) {
            connection.createClient(j.HOSTIP, j.HOSTPORT, (msg, rinfo) =>{
                console.log(msg);
            }); // TODO: insert function
            methods.send = conneciton.sendMessage;
        } else {
            methods.send = setUpIPC();
        }
    }
    catch(err) {
        console.log(err.message);
    }
}

function setUpIPC() {
    ipcRenderer.on('update-state', (event, arg) => {
        console.log(arg);
    });
    return ipcRenderer.send;
}


function setUpPainters() {
    var canvas = document.getElementById('canvas');
    mainPainter = new Painter(canvas, defaultPercentage);
    setUpCallBacks(mainPainter,mainPlayer);
}

