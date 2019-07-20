const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var clients = {};


server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

  clients[JSON.stringify([rinfo.address, rinfo.port])] = true;
  //use delete clients[client] to remove from the list of clients
});


function broadCastNew() {
    var message = new Buffer(news[Math.floor(Math.random() * news.length)]);

    for (var client in clients) {
        client = JSON.parse(client);
        var port = client[1];
        var address = client[0];
        server.send(message, 0, message.length, port, address);
    }

    console.log("Sent " + message + " to the wire...");
}

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);

  setInterval(broadcastNew, 3000);
});

server.bind(5007);
