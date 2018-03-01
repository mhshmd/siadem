import page from "../../hocs/page";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from 'redux';
import { initStore } from "../../util/redux/store";

const Data = page(()=>(<div>Tabel Data Pegawai</div>))

export default withRedux(initStore, null, null)(Data);