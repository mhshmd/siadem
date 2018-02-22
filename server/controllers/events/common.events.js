const User = require('../../models/User.model')
const crypto = require('crypto')

module.exports = (client) => {
    client.on('login.submit', (data, cb_client)=>{
        console.log(data);
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
    })
}