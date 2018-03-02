const pegawai_controller = require('../controllers/pegawai.controller')

module.exports = (app) => {
    app.post("/pegawai/import_data_pegawai", (req, res) => {
        pegawai_controller.IMPORT_PEGAWAI(req, res);
    })
}