import page from "../../hocs/page";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { initStore } from "../../util/redux/store";
import React, { Component, Fragment } from "react";
import { Card, Row, Col, Tooltip, Table, Icon, Divider, Modal, Button, Upload, message } from "antd";
import { setLoading } from "../../util/redux/actions/layoutAction";
import { addEvent } from "../../util/redux/actions/socketAction";
import {toReadableDate} from '../../util/utils';
const Dragger = Upload.Dragger;

const a = {
    title: 'nip',
    dataIndex: 'nama',
    key: 'name',
    render: text => <a href="#">{text}</a>,
}

class Data extends Component {
  state = {
    editModalVisible: false,
    importPegawaiModalVisible: false,
    editModalTitle: '',
    columns: [
        {
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama',
            render: (nama, record) => {
                const gelar = record.gelar[record.gelar.length-1];
                return gelar?( 
                    (gelar.depan?(gelar.depan+'. '):'')
                    + nama
                    + (gelar.belakang?(', '+gelar.belakang):'')
                 ):nama; 
            },
            width: 200,
            fixed: 'left'
        },
        {
            title: 'L/P',
            dataIndex: 'jk',
            key: 'jk'
        },
        {
            title: 'NIP',
            children: [
                {
                    title: 'Lama',
                    dataIndex: 'nip',
                    key: 'nip_lama',
                    render: nip => (nip.lama)
                },
                {
                    title: 'Baru',
                    dataIndex: 'nip',
                    key: 'nip_baru',
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
                    render: pangkat => (pangkat[pangkat.length-1].gol),
                },
                {
                    title: 'TMT',
                    dataIndex: 'pangkat',
                    key: 'pangkat_tmt',
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
                    render: jabatan => (jabatan[jabatan.length-1].nama),
                },
                {
                    title: 'TMT',
                    dataIndex: 'jabatan',
                    key: 'jabatan_tmt',
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
                    render: masa_kerja => (masa_kerja.tahun),
                },
                {
                    title: 'Bl',
                    dataIndex: 'masa_kerja',
                    key: 'masa_kerja_bl',
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
                    render: latihan_jabatan => (latihan_jabatan[latihan_jabatan.length-1].nama),
                },
                {
                    title: 'Tahun',
                    dataIndex: 'latihan_jabatan',
                    key: 'latihan_jabatan_tahun',
                    render: latihan_jabatan => (latihan_jabatan[latihan_jabatan.length-1].tahun),
                },
                {
                    title: 'Jml Jam',
                    dataIndex: 'latihan_jabatan',
                    key: 'latihan_jabatan_jumlah_jam',
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
                    render: pendidikan => (pendidikan[pendidikan.length-1].nama),
                },
                {
                    title: 'PT',
                    dataIndex: 'pendidikan',
                    key: 'pendidikan_pt',
                    render: pendidikan => (pendidikan[pendidikan.length-1].pt),
                },
                {
                    title: 'Lls Th',
                    dataIndex: 'pendidikan',
                    key: 'pendidikan_lulus_tahun',
                    render: pendidikan => (pendidikan[pendidikan.length-1].lulus_tahun),
                },
                {
                    title: 'Ijazah',
                    dataIndex: 'pendidikan',
                    key: 'pendidikan_ijazah',
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
                    render: ttl => (ttl.tempat_lahir),
                },
                {
                    title: 'Tanggal Lahir',
                    dataIndex: 'ttl',
                    key: 'ttl_tgl_lahir',
                    render: ttl => (toReadableDate(ttl.tgl_lahir)),
                },
                {
                    title: 'BUP',
                    dataIndex: 'ttl',
                    key: 'ttl_bup',
                    render: ttl => (ttl.bup),
                },
                {
                    title: 'Pensiun',
                    dataIndex: 'ttl',
                    key: 'ttl_pensiun',
                    render: ttl => (toReadableDate(ttl.pensiun)),
                }
            ]
        },
        {
            title: 'AK',
            dataIndex: 'angka_kredit',
            key: 'ak',
            render: angka_kredit => (angka_kredit),
        },
        {
            title: 'No Karpeg',
            dataIndex: 'nomor_karpeg',
            key: 'nomor_karpeg',
            render: nomor_karpeg => (nomor_karpeg),
        },
        {
            title: 'Proyeksi Pangkat/Jabatan',
            dataIndex: 'proyeksi_pangkat_jabatan',
            key: 'proyeksi_pangkat_jabatan',
            render: proyeksi_pangkat_jabatan => (proyeksi_pangkat_jabatan),
        },
        {
            title: 'Periode KGB',
            dataIndex: 'periode_kgb',
            key: 'periode_kgb',
            render: periode_kgb => (toReadableDate(periode_kgb)),
        },
        {
            title: 'Dosen',
            children: [
                {
                    title: 'NUPN',
                    dataIndex: 'dosen',
                    key: 'dosen_nupn',
                    render: dosen => (dosen.nupn),
                },
                {
                    title: 'NIDN',
                    dataIndex: 'dosen',
                    key: 'dosen_nidn',
                    render: dosen => (dosen.nidn),
                },
                {
                    title: 'Sertifikasi',
                    dataIndex: 'dosen',
                    key: 'dosen_sertifikasi',
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
                    render: penghargaan => (penghargaan[penghargaan.length-1].jenis_penghargaan),
                },
                {
                    title: 'Tahun',
                    dataIndex: 'penghargaan',
                    key: 'penghargaan_tahun',
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
                    render: hukuman_disiplin => (hukuman_disiplin[hukuman_disiplin.length-1].jenis_hukuman),
                },
                {
                    title: 'TMT',
                    dataIndex: 'hukuman_disiplin',
                    key: 'hukuman_disiplin_tmt',
                    render: hukuman_disiplin => (toReadableDate(hukuman_disiplin[hukuman_disiplin.length-1].tmt)),
                }
            ]
        },
        {
            title: 'No Telp',
            dataIndex: 'nomor_telp',
            key: 'nomor_telp',
        },
        {
            title: 'Alamat Lengkap',
            dataIndex: 'alamat_lengkap',
            key: 'alamat_lengkap',
        },
        {
            title: 'Pilihan',
            key: 'operation',
            fixed: 'right',
            width: 65,
            render: (operation, record) => <a href="#" onClick={()=>{this.setEditModalVisible(true, record)}}>Ubah</a>,
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

  setEditModalVisible = (editModalVisible, row)=>{
      this.setState({
        editModalVisible: !this.state.editModalVisible,
        editModalTitle: row?row.nama:this.state.editModalTitle
      })
  }

  setImportPegawaiModalVisible = (importPegawaiModalVisible, row)=>{
      this.setState({
        importPegawaiModalVisible: !this.state.importPegawaiModalVisible
      })
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.setLoading(false);
    }, 500);
    this.props.addEvent('pegawai/data.getUpladedImportData', (data)=>{
        console.log(data);
    })
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
                        scroll={{ x: '300%' }}
                        size="small"
                    />
                    <Modal
                        title={this.state.editModalTitle}
                        wrapClassName="vertical-center-modal"
                        visible={this.state.editModalVisible}
                        onOk={() => this.setEditModalVisible(false)}
                        onCancel={() => this.setEditModalVisible(false)}
                        >
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                    </Modal>
                  </Col>
                </Row>
                <Row>
                    <Col md={24} sm={24} xs={24}>
                        <Button type="dashed" title="Import data pegawai" onClick={this.setImportPegawaiModalVisible}>Import</Button>
                        <Modal
                            title="Import data pegawai"
                            wrapClassName="vertical-center-modal"
                            visible={this.state.importPegawaiModalVisible}
                            onOk={() => this.setImportPegawaiModalVisible(false)}
                            onCancel={() => this.setImportPegawaiModalVisible(false)}
                            >
                            <Dragger
                                action="/pegawai/import_data_pegawai"
                                name="data_pegawai"
                                multiple={false}
                                onChange={(info) => {
                                    console.log(info);
                                }}
                                accept='.xlsx,.xls'
                            >
                                <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload (Excel file)</p>
                            </Dragger>
                        </Modal>
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
    setLoading: bindActionCreators(setLoading, dispatch),
    addEvent: bindActionCreators(addEvent, dispatch)
  };
};

export default withRedux(
  initStore,
  state => ({ 
    loading: state.layout.loading,
    socket: state.socket
   }),
  mapDispatchToProps
)(Page);
