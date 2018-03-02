const act = {};
const User = require("../models/User.model");
const crypto = require("crypto");

act.SUBMIT_LOGIN = (req, res, user, redisClient) => {
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
          if (redisClient) {
            redisClient.hmset(res_user_id._id.toString(), [
              "uid",
              res_user_id._id.toString(),
              "username",
              req.body.username,
              "tahun_anggaran",
              req.body.tahun_anggaran || new Date().getFullYear()
            ]);
          }
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
};

act.LOGOUT = (req, res, nextApp, redisClient) => {
    if(req.cookies.uid){
      redisClient.del(req.cookies.uid)
    }
    res.clearCookie("uid");
    nextApp.render(req, res, '/login', {})
}

module.exports = act;
