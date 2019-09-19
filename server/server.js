const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const EVENTS = require("./events");
const PORT = 8080;

app.use(cors());
server.listen(PORT, () => console.log(`Connected to port ${PORT}!`));

let users = {};

const getActiveUSers = () => {
    let activeUsers = [];

    Object.keys(users).forEach((idx) => {
        const user = users[idx];
        if (user.name && user.lang) {
            activeUsers.push(user)
        }
    });

    return activeUsers;
}

io.on(EVENTS.CONNECTED, socket => {
    users[socket.id] = {
        id: socket.id
    };

    socket.on(EVENTS.DISCONNECTED, () => {
        delete users[socket.id];

        io.sockets.emit(EVENTS.UPDATED_USERS, users)
    });

    socket.on(EVENTS.LOGGED_IN, name => {
        users[socket.id]['name'] = name
    });

    socket.on(EVENTS.CHOSEN_LANG, lang => {
        users[socket.id]['lang'] = lang;

        io.sockets.emit(EVENTS.UPDATED_USERS, getActiveUSers())
    });

    socket.on(EVENTS.SENT_MSG, msg => {
        io.sockets.emit(EVENTS.GOT_MSG, {
            msg: msg,
            original: msg,
            author: users[socket.id]['name'],
            time: new Date().getTime()
        })
    });
});