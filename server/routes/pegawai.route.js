const pegawai_controller = require('../controllers/pegawai.controller')
const getLoggedUser = require('../../functions/getLoggedUser')

module.exports = (app, redisClient = null, nextApp = null, daftar_client_socketIO = null) => {
    app.post("/pegawai/import_data_pegawai", (req, res) => {
        getLoggedUser( redisClient, req.cookies.uid, ( loggedUser ) => {
            if(!loggedUser){
                res.sendStatus(403)
                return;
            }
            pegawai_controller.IMPORT_PEGAWAI(req, res, loggedUser, daftar_client_socketIO);
        })
    })
}