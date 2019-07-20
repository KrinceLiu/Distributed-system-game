class Container {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
    }
}


class Server {
    constructor(hostIP, hostPort, send) {
        this.clients = []
        this.host = new Container(hostIP, hostPort);
        this.send = send;
    }

    addClient(ip, port) {
        this.clients.push(new Container(ip, port));
    }


    getClients() {
        j = {}
        this.clients.forEach((client) => {
            j.client.ip = client.port;
        });
        return JSON.stringify(j);
    }


}
module.exports = Server;
