const formidable = require('formidable');
const act = {}

act.IMPORT_PEGAWAI = (req, res)=>{
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, file){
        if(err){
            res.sendStatus(500);
            return;
        }
    });

    form.on('fileBegin', function (name, file){
        file.path = __dirname+'/../../temporary_file/'+file.name;
    })

    res.sendStatus(200)
}

module.exports = act