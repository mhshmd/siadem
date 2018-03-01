import page from "../../hocs/page";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { initStore } from "../../util/redux/store";
import React, { Component, Fragment } from "react";
import { Card, Row, Col, Tooltip, Table, Icon, Divider } from "antd";
import { setLoading } from "../../util/redux/actions/layoutAction";
import {toReadableDate} from '../../util/utils'

const a = {
    title: 'nip',
    dataIndex: 'nama',
    key: 'name',
    render: text => <a href="#">{text}</a>,
}

class Data extends Component {
  state = {
    columns: [
        {
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama',
            width: 200,
            fixed: 'left'
        },
        {
            title: 'L/P',
            dataIndex: 'jk',
            key: 'jk',
            width: 40
        },
        {
            title: 'NIP',
            children: [
                {
                    title: 'Lama',
                    dataIndex: 'nip',
                    key: 'nip_lama',
                    width: 130,
                    render: nip => (nip.lama)
                },
                {
                    title: 'Baru',
                    dataIndex: 'nip',
                    key: 'nip_baru',
                    width: 150,
                    render: nip => (nip.baru),
                }
            ]
        },
        {
            title: 'Pangkat',
            children: [
                {
                    title: 'Gol',
                    dataIndex: 'pangkat',
                    key: 'pangkat_gol',
                    width: 40,
                    render: pangkat => (pangkat[pangkat.length-1].gol),
                },
                {
                    title: 'TMT',
                    dataIndex: 'pangkat',
                    key: 'pangkat_tmt',
                    width: 110,
                    render: pangkat => (toReadableDate(pangkat[pangkat.length-1].tmt)),
                }
            ]
        },
        {
            title: 'Jabatan',
            children: [
                {
                    title: 'Nama',
                    dataIndex: 'jabatan',
                    key: 'jabatan_nama',
                    width: 150,
                    render: jabatan => (jabatan[jabatan.length-1].nama),
                },
                {
                    title: 'TMT',
                    dataIndex: 'jabatan',
                    key: 'jabatan_tmt',
                    width: 110,
                    render: jabatan => (toReadableDate(jabatan[jabatan.length-1].tmt)),
                }
            ]
        },
        {
            title: 'Masa Kerja',
            children: [
                {
                    title: 'Th',
                    dataIndex: 'masa_kerja',
                    key: 'masa_kerja_th',
                    width: 50,
                    render: masa_kerja => (masa_kerja.tahun),
                },
                {
                    title: 'Bl',
                    dataIndex: 'masa_kerja',
                    key: 'masa_kerja_bl',
                    width: 50,
                    render: masa_kerja => (masa_kerja.bulan),
                }
            ]
        },
        {
            title: 'Latihan Jabatan',
            children: [
                {
                    title: 'Nama',
                    dataIndex: 'latihan_jabatan',
                    key: 'latihan_jabatan_nama',
                    width: 150,
                    render: latihan_jabatan => (latihan_jabatan[latihan_jabatan.length-1].nama),
                },
                {
                    title: 'Tahun',
                    dataIndex: 'latihan_jabatan',
                    key: 'latihan_jabatan_tahun',
                    width: 50,
                    render: latihan_jabatan => (latihan_jabatan[latihan_jabatan.length-1].tahun),
                },
                {
                    title: 'Jml Jam',
                    dataIndex: 'latihan_jabatan',
                    key: 'latihan_jabatan_jumlah_jam',
                    width: 50,
                    render: latihan_jabatan => (latihan_jabatan[latihan_jabatan.length-1].jumlah_jam),
                }
            ]
        },
        {
            title: 'Pendidikan',
            children: [
                {
                    title: 'Nama',
                    dataIndex: 'pendidikan',
                    key: 'pendidikan_nama',
                    width: 150,
                    render: pendidikan => (pendidikan[pendidikan.length-1].nama),
                },
                {
                    title: 'PT',
                    dataIndex: 'pendidikan',
                    key: 'pendidikan_pt',
                    width: 50,
                    render: pendidikan => (pendidikan[pendidikan.length-1].pt),
                },
                {
                    title: 'Lls Th',
                    dataIndex: 'pendidikan',
                    key: 'pendidikan_lulus_tahun',
                    width: 50,
                    render: pendidikan => (pendidikan[pendidikan.length-1].lulus_tahun),
                },
                {
                    title: 'Ijazah',
                    dataIndex: 'pendidikan',
                    key: 'pendidikan_ijazah',
                    width: 50,
                    render: pendidikan => (pendidikan[pendidikan.length-1].ijazah),
                }
            ]
        },
        {
            title: 'Tempat & Tanggal Lahir',
            children: [
                {
                    title: 'Tempat Lahir',
                    dataIndex: 'ttl',
                    key: 'ttl_tempat_lahir',
                    width: 150,
                    render: ttl => (ttl.tempat_lahir),
                },
                {
                    title: 'Tanggal Lahir',
                    dataIndex: 'ttl',
                    key: 'ttl_tgl_lahir',
                    width: 50,
                    render: ttl => (toReadableDate(ttl.tgl_lahir)),
                },
                {
                    title: 'BUP',
                    dataIndex: 'ttl',
                    key: 'ttl_bup',
                    width: 50,
                    render: ttl => (ttl.bup),
                },
                {
                    title: 'Pensiun',
                    dataIndex: 'ttl',
                    key: 'ttl_pensiun',
                    width: 50,
                    render: ttl => (toReadableDate(ttl.pensiun)),
                }
            ]
        },
        {
            title: 'AK',
            dataIndex: 'angka_kredit',
            key: 'ak',
            width: 50,
            render: angka_kredit => (angka_kredit),
        },
        {
            title: 'No Karpeg',
            dataIndex: 'nomor_karpeg',
            key: 'nomor_karpeg',
            width: 50,
            render: nomor_karpeg => (nomor_karpeg),
        },
        {
            title: 'Proyeksi Pangkat/Jabatan',
            dataIndex: 'proyeksi_pangkat_jabatan',
            key: 'proyeksi_pangkat_jabatan',
            width: 50,
            render: proyeksi_pangkat_jabatan => (proyeksi_pangkat_jabatan),
        },
        {
            title: 'Periode KGB',
            dataIndex: 'periode_kgb',
            key: 'periode_kgb',
            width: 50,
            render: periode_kgb => (toReadableDate(periode_kgb)),
        },
        {
            title: 'Dosen',
            children: [
                {
                    title: 'NUPN',
                    dataIndex: 'dosen',
                    key: 'dosen_nupn',
                    width: 150,
                    render: dosen => (dosen.nupn),
                },
                {
                    title: 'NIDN',
                    dataIndex: 'dosen',
                    key: 'dosen_nidn',
                    width: 50,
                    render: dosen => (dosen.nidn),
                },
                {
                    title: 'Sertifikasi',
                    dataIndex: 'dosen',
                    key: 'dosen_sertifikasi',
                    width: 50,
                    render: dosen => (dosen.sertifikasi),
                }
            ]
        },
        {
            title: 'Penghargaan',
            children: [
                {
                    title: 'Jenis Penghargaan',
                    dataIndex: 'penghargaan',
                    key: 'penghargaan_jenis_penghargaan',
                    width: 150,
                    render: penghargaan => (penghargaan[penghargaan.length-1].jenis_penghargaan),
                },
                {
                    title: 'Tahun',
                    dataIndex: 'penghargaan',
                    key: 'penghargaan_tahun',
                    width: 50,
                    render: penghargaan => (penghargaan[penghargaan.length-1].tahun),
                }
            ]
        },
        {
            title: 'Hukuman Disiplin',
            children: [
                {
                    title: 'Jenis Hukuman',
                    dataIndex: 'hukuman_disiplin',
                    key: 'hukuman_disiplin_jenis_hukuman',
                    width: 150,
                    render: hukuman_disiplin => (hukuman_disiplin[hukuman_disiplin.length-1].jenis_hukuman),
                },
                {
                    title: 'TMT',
                    dataIndex: 'hukuman_disiplin',
                    key: 'hukuman_disiplin_tmt',
                    width: 50,
                    render: hukuman_disiplin => (toReadableDate(hukuman_disiplin[hukuman_disiplin.length-1].tmt)),
                }
            ]
        },
        {
            title: 'No Telp',
            dataIndex: 'nomor_telp',
            key: 'nomor_telp',
            width: 50
        },
        {
            title: 'Alamat Lengkap',
            dataIndex: 'alamat_lengkap',
            key: 'alamat_lengkap',
            width: 50
        },
        {
            title: 'Pilihan',
            key: 'operation',
            fixed: 'right',
            width: 50,
            render: () => <a href="#">Ubah</a>,
        }
    ],
    data: [{
        nip: {
            lama: '340058367',
            baru: '199402242018021001'
        },
        nama: 'Muh. Shamad',
        jk: 'L',
        gelar: [{
            depan: '', 
            belakang: 'SST',
            tmt: new Date
        }],
        pangkat: [{
            gol: 'III/a', 
            tmt: new Date
        }],
        jabatan: [{
            nama: 'Staf IPDS', 
            tmt: new Date
        }],
        masa_kerja: {
            tahun: 0, 
            bulan: 0
        },
        latihan_jabatan: [{
            nama: 'PIM IV', 
            tahun: 2017, 
            jumlah_jam: '2 minggu'
        }],
        pendidikan: [{
            nama: 'Komputasi Statistik', 
            pt: 'STIS', 
            lulus_tahun: '2017', 
            ijazah: 'DIV'
        }],
        ttl: {
            tempat_lahir: 'Punggaluku', 
            tgl_lahir: new Date, 
            bup: 58, 
            pensiun: new Date
        },
        angka_kredit: 100,
        nomor_karpeg: 'String',
        proyeksi_pangkat_jabatan: 'III/b',
        periode_kgb: new Date,
        dosen: {
            nupn: '12346546', 
            nidn: '111111111', 
            sertifikasi: '2018'
        },
        penghargaan: [{
            jenis_penghargaan: 'Satyalencana', 
            tahun: 2018
        }],
        hukuman_disiplin: [{
            jenis_hukuman: 'Penundaan KGB', 
            tmt: new Date
        }],
        nomor_telp: '082311897547',
        alamat_lengkap: 'Jl H. Hasbi'
    }]
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.setLoading(false);
    }, 500);
  }

  render() {
    const { loading } = this.props;
    const { columns, data } = this.state;
    return (
      <Fragment>
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <Row gutter={24}>
            <Col
              xl={24}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{ marginBottom: 24 }}
            >
              <Card title="Data Pegawai" bordered={false}>
                <Row>
                  <Col md={24} sm={24} xs={24}>
                    <Table 
                        columns={columns} 
                        dataSource={data} 
                        bordered
                        scroll={{ x: '400%', y: 1500 }}
                        size="small"
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Card>
      </Fragment>
    );
  }
}

const Page = page(props => <Data {...props} />);

const mapDispatchToProps = dispatch => {
  return {
    setLoading: bindActionCreators(setLoading, dispatch)
  };
};

export default withRedux(
  initStore,
  state => ({ loading: state.layout.loading }),
  mapDispatchToProps
)(Page);
