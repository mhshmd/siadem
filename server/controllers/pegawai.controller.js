const formidable = require("formidable");
const ensurePath = require("../../functions/ensurePath");
const xlsx = require("node-xlsx").default;
const async = require('async')
const act = {};

act.IMPORT_PEGAWAI = (req, res, user, daftar_client_socketIO) => {
  const form = new formidable.IncomingForm();
  const file_path = __dirname + "/../../temporary_file/";

  async.auto({
        parseExcel: (cb)=>{
            form.parse(req, function(err, fields, file) {
              if (err) {
                res.sendStatus(500);
                return;
              }
              const data = xlsx.parse(file_path+'imported_pegawai.xlsx');
              cb(err, data[0].data[0]);
            });
          
            form.on("fileBegin", function(name, file) {
              ensurePath(file_path, () => {
                file.path = file_path + 'imported_pegawai.xlsx';
              });
            });
        },
        refine_data: ['parseExcel', (prev_result, cb)=>{
            cb(null, 'refine_data')
        }]
    }, (err, finish)=>{
        console.log(finish);
        daftar_client_socketIO[user.uid].emit('pegawai/data.getUpladedImportData', finish)
        res.sendStatus(200)
  })
};

module.exports = act;
