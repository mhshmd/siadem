//server init
const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
if (dev) {
  const dev_script = require("./server/controllers/dev")();
}

//storage init
const redis = require("redis");
let redisClient = redis.createClient();
redisClient.on("connect", () => {
  console.log("Redis connected.");
});

const url = "mongodb://127.0.0.1:27017/simamov";
const mongoose = require("mongoose");
mongoose.connect(url);

//server Misc
const session = require("express-session")({
  resave: false,
  saveUninitialized: true,
  secret: "ID==&&%^&A&SHBJSAsjhbJGhUGkbKiUvii^%^#$%^&98G8UIugg=="
});
const sharedsession = require("express-socket.io-session");

//modul cookie parser utk mengatur cookie
const cookieParser = require("cookie-parser");

//modul body parser utk mengatur POST request
const bodyParser = require("body-parser");

// socket and server instance
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const redis_adapter = require("socket.io-redis");
io.adapter(redis_adapter({ host: "localhost", port: 6379 }));

app.use(session);
app.use(cookieParser("ID==&&%^&A&SHBJSAsjhbJGhUGkbKiUvii^%^#$%^&98G8UIugg=="));
app.use(bodyParser.urlencoded({ extended: true }));
io.use(
  sharedsession(session, {
    autoSave: true
  })
);
const daftar_client_socketIO = {}
const daftar_hapus_client_schedule = {}
const schedule = require('node-schedule')
const moment = require('moment')
io.use((client, next) => {
  if(client.handshake.cookies.uid){
    daftar_client_socketIO[client.handshake.cookies.uid] = client;
    daftar_hapus_client_schedule[client.handshake.cookies.uid] = schedule.scheduleJob(moment().add(1, 'd').format(), ()=>{
      daftar_hapus_client_schedule[client.handshake.cookies.uid]&&daftar_hapus_client_schedule[client.handshake.cookies.uid].cancel();
      delete daftar_client_socketIO[client.handshake.cookies.uid];
    })
  }
  return next();
});

const commonEvents = require("./server/controllers/events/common.events");
io.on("connection", function(client) {
  commonEvents(client);
});

nextApp
  .prepare()
  .then(() => {
    const getLoggedUser = require('./functions/getLoggedUser')
    app.use((req, res, next)=>{
      if(/^\/(_next|static|login|logout)/.test(req.url)){
        return next()
      } else {
        getLoggedUser( redisClient, req.cookies.uid, ( loggedUser ) => {
          if(loggedUser) return next()
            else {
              nextApp.render(req, res, '/login', {redirect: req.url, errMsg: 'Anda harus login.'})
            }
        })
      }
    })

    require('./server/routes/user.route')(app, redisClient, nextApp, daftar_client_socketIO)

    require('./server/routes/pegawai.route')(app, redisClient, nextApp, daftar_client_socketIO)

    app.get("*", (req, res) => {
      if(req.cookies.uid){
        return handle(req, res);
      } else{
        nextApp.render(req, res, '/login', {})
      }
    });

    server.listen(80, err => {
      if (err) throw err;
      console.log("> Ready gaes on http://localhost");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
