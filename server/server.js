const app = require('express')();
const cors = require('cors');
const aws = require('aws-sdk');
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('dotenv').config()

aws.config.region = process.env.AWS_REGION;
aws.config.credentials = new aws.Credentials(process.env.AWS_ACCES_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY);

const EVENTS = require("./events");
const PORT = 8080;
const translateService = new aws.Translate();

app.use(cors());
server.listen(PORT, () => console.log(`Connected to port ${PORT}!`));

let users = {};

const getActiveUsers = () => {
    let activeUsers = [];

    Object.keys(users).forEach((idx) => {
        const user = users[idx];
        if (user.name && user.lang) {
            activeUsers.push(user)
        }
    });

    return activeUsers;
}

const getLangs = (activeUsers) => {
    let langs = new Set();

    activeUsers.forEach( (activeUser) => {
        langs.add(activeUser.lang)
    })

    return langs
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
        users[socket.id]['lang'] = lang

        io.sockets.emit(EVENTS.UPDATED_USERS, getActiveUsers())
    });

    socket.on(EVENTS.SENT_MSG, (msg) => {
        const msgTime = new Date().getTime()

        io.sockets.emit(EVENTS.GOT_MSG, {
            msg: msg,
            original: msg,
            author: users[socket.id]['name'],
            lang: users[socket.id]['lang'],
            time: msgTime
        })

        const activeUsers = getActiveUsers()

        activeUsers.map((activeUser) => {
            io.to(`${activeUser.id}`).emit(EVENTS.GOT_MSG, {
                msg: msg,
                original: msg,
                author: users[socket.id]['name'],
                lang: users[socket.id]['lang'],
                time: msgTime
            });
        })
    });
});