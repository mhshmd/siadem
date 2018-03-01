var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PegawaiSchema = new Schema({
    nip: {
        lama: String,
        baru: String
    },
    nama: String,
    jk: String,
    gelar: [{
        depan: String, 
        belakang: String, tmt: Date
    }],
    pangkat: [{
        gol: String, 
        tmt: Date
    }],
    jabatan: [{
        nama: String, 
        tmt: Date
    }],
    masa_kerja: {
        tahun: Number, 
        bulan: Number
    },
    latihan_jabatan: [{
        nama: String, 
        tahun: Number, 
        jumlah_jam: String
    }],
    pendidikan: [{
        nama: String, 
        pt: String, 
        lulus_tahun: Number, 
        ijazah: String
    }],
    ttl: {
        tempat_lahir: String, 
        tgl_lahir: Date, 
        bup: Number, 
        pensiun: Date
    },
    angka_kredit: Number,
    nomor_karpeg: String,
    proyeksi_pangkat_jabatan: String,
    periode_kgb: Date,
    dosen: {
        nupn: String, 
        nidn: String, 
        sertifikasi: Number
    },
    penghargaan: [{
        jenis_penghargaan: String, 
        tahun: Number
    }],
    hukuman_disiplin: [{
        jenis_hukuman: String, 
        tmt: Date
    }],
    nomor_telp: String,
    alamat_lengkap: String
}, { collection: 'siadm_pegawai' });

module.exports = mongoose.model('Pegawai', PegawaiSchema);