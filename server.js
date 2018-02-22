//server init
const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
if(dev){
  const dev_script = require('./server/controllers/dev')()
}

//storage init
const redis = require('redis')
let redisClient = redis.createClient();
redisClient.on('connect', ()=>{
	console.log('Redis connected.');
})

const url = 'mongodb://127.0.0.1:27017/simamov';
const mongoose = require('mongoose');
mongoose.connect(url);

//server Misc
const session = require("express-session")({
  resave: false,
  saveUninitialized: true,
  secret: "ID==&&%^&A&SHBJSAsjhbJGhUGkbKiUvii^%^#$%^&98G8UIugg=="
});
const sharedsession = require("express-socket.io-session");

// socket and server instance
const app = express();
const server = require("http").Server(app)
const io = require("socket.io")(server);
const redis_adapter = require('socket.io-redis');
io.adapter(redis_adapter({ host: 'localhost', port: 6379 }));

app.use(session);
io.use(
  sharedsession(session, {
    autoSave: true
  })
);
io.use((client, next) => {
  console.log(client.handshake.cookies);
  return next();
});

const commonEvents = require('./server/controllers/events/common.events')
io.on('connection', function (client) {
  console.log("someone connected.");
  commonEvents(client)
});

nextApp
  .prepare()
  .then(() => {
    app.post('/login', (req, res) => {
      console.log(req.body);
      return;
      User.findOne({username: data.username, password: crypto.createHmac('sha256', data.password).digest('hex')}, '_id', (err, res_user_id)=>{
          console.log(err, res_user_id);
          if(!err){
              if(res_user_id !== null) {
                  console.log(res_user_id);
                  client.handshake.cookies.uid = res_user_id._id;
                  cb_client({valid_user: true, uid: res_user_id._id})
              } else{
                  cb_client({valid_user: false, errMsg: 'Maaf, username atau password Anda salah.'})
              }
          } else{
              console.log(err);
              cb_client({valid_user: false, errMsg: 'Maaf, kami dalam gangguan.'})
          }
      })
      const actualPage = '/'
      const queryParams = { id: 123 }
      nextApp.render(req, res, actualPage, queryParams)
    })

    app.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(80, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
