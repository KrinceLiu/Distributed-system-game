const dgram = require("dgram");

const MAIN = 16540;
const ports = {
    MAIN: 16540,
    LOCAL_1: MAIN + 1,
    LOCAL_2: MAIN + 2,
    LOCAL_3: MAIN + 3,
    LOCAL_4: MAIN + 4,
};

const response = {
    STARTED: 1,
    FAIL: 2,
    SOCKET: 3,
    SAVED: 4
};

const header = {
    SIZE: 7,
    TIMESTAMP_SIZE: 6,
    ID_SIZE: 1
};

var helpers = {
    ports,
    header,
    response
}

module.exports = helpers;