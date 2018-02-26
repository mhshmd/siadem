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
io.use((client, next) => {
  // console.log(client.handshake.cookies);
  return next();
});

const commonEvents = require("./server/controllers/events/common.events");
io.on("connection", function(client) {
  commonEvents(client);
});

const User = require("./server/models/User.model");
const crypto = require("crypto");

nextApp
  .prepare()
  .then(() => {
    app.get("/logout", (req, res) => {
      res.clearCookie("uid");
      nextApp.render(req, res, '/login', {})
    });
    app.post("/login", (req, res) => {
      User.findOne(
        {
          username: req.body.username,
          password: crypto.createHmac("sha256", req.body.password).digest("hex")
        },
        "_id",
        (err, res_user_id) => {
          if (!err) {
            if (res_user_id !== null) {
              res.cookie("uid", res_user_id._id);
              res.send({ isValid: true, uid: res_user_id._id });
            } else {
              res.send({
                isValid: false,
                errMsg: "Maaf, username atau password Anda salah."
              });
            }
          } else {
            console.log(err);
            res.send({
              isValid: false,
              errMsg: "Maaf, server dalam gangguan."
            });
          }
        }
      );
    });

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
