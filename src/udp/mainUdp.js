const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const remote = require("electron").remote;
const ports = require("./udpHelpers.js").ports;

var hostIP = '127.0.0.1';
var hostPort = `${ports.MAIN}`;


// function drawPoint(evt, x, y, color) {
//     var context = document.getElementById("canvas").getContext("2d");
//     context.strokeStyle = color;
//     if(evt == 'down') {
//         context.beginPath();
// 		context.moveTo(x, y);
//     } else {
//         context.lineTo(x, y);
//         context.stroke();

//     }
// }
function createServer(ip) {
    //console.log(document.getElementById("inputIpToConnect").value);
    socket.on('error', function (err)
    {
        console.log(`socket error:\n${err.stack}`);
        socket.close();
    });

    socket.on('message', function (msg, rinfo)
    {
        console.log(`socket got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        // j = JSON.parse(msg);
        // drawPoint(j.evt, j.x, j.y, j.color, rinfo.address);
    });

    socket.on('listening', function ()
    {
        const address = socket.address();
        console.log(`socket listening ${address.address}:${address.port}`);
    });
    
    socket.bind(hostPort, hostIP);
    
    return JSON.stringify({HOSTIP: hostIP, HOSTPORT: hostPort});
}

function send() {

}
module.exports.createServer = createServer;
module.exports.send = send;


// socket.bind(udpHelpers.ports.MAIN, "207.23.180.222");