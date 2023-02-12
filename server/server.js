const express = require("express");
const path = require("path");
const aws = require("aws-sdk");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
require("dotenv").config();

aws.config.region = process.env.AWS_REGION;
aws.config.credentials = new aws.Credentials(
  process.env.AWS_ACCES_KEY_ID,
  process.env.AWS_SECRET_ACCESS_KEY
);

const EVENTS = require("./events");
const PORT = 8080;
const translateService = new aws.Translate();

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "..", "index.html"));
});

server.listen(PORT, () => console.log(`Connected to port ${PORT}!`));

let users = new Map();

const getActiveUsers = () => {
  let activeUsers = [];

  users.forEach((user) => {
    if (user.name && user.lang) {
      activeUsers.push(user);
    }
  });

  return activeUsers;
};

const getTranslation = async (msg, destLang, sourceLang) => {
  const params = {
    Text: msg,
    SourceLanguageCode: sourceLang,
    TargetLanguageCode: destLang,
  };

  const tranlatedMsg = await translateService
    .translateText(params, (err, data) => {
      return data;
    })
    .promise();

  return tranlatedMsg;
};

io.on(EVENTS.CONNECTED, (socket) => {
  users.set(socket.id, {
    id: socket.id,
  });

  socket.on(EVENTS.DISCONNECTED, () => {
    users.delete(socket.id);

    io.sockets.emit(EVENTS.UPDATED_USERS, getActiveUsers());
  });

  socket.on(EVENTS.LOGGED_IN, (name) => {
    users.set(socket.id, {
      ...users.get(socket.id),
      name: name,
    });

    io.sockets.emit(EVENTS.UPDATED_USERS, getActiveUsers());
  });

  socket.on(EVENTS.CHOSEN_LANG, (lang) => {
    users.set(socket.id, {
      ...users.get(socket.id),
      lang: lang,
    });

    io.sockets.emit(EVENTS.UPDATED_USERS, getActiveUsers());
  });

  socket.on(EVENTS.SENT_MSG, (msg) => {
    const msgTime = new Date().getTime();
    const currentUser = users.get(socket.id);
    const activeUsers = getActiveUsers();
    const translations = new Map();

    translations.set(currentUser.lang.key, msg);

    activeUsers.map(async (activeUser) => {
      let translatedText;

      if (translations.has(activeUser.lang.key)) {
        translatedText = translations.get(activeUser.lang.key);
      } else {
        const translatedMsg = await getTranslation(
          msg,
          activeUser.lang.key,
          currentUser.lang.key
        );
        translatedText = translatedMsg.TranslatedText;
      }

      io.to(`${activeUser.id}`).emit(EVENTS.GOT_MSG, {
        msg: translatedText ? translatedText : msg,
        original: msg,
        author: currentUser.name,
        lang: currentUser.lang,
        time: msgTime,
      });
      translations.set(activeUser.lang.key, translatedText);
    });
  });
});
