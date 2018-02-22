import withRedux from "next-redux-wrapper";
import { bindActionCreators } from 'redux';
import { initStore } from "../util/redux/store";
import { setUser } from "../util/redux/actions/userAction"
import page from "../hocs/page";
import { Button } from 'antd';

const EntriPOK = ( { user, setUser } ) => {
    return (
        <div>
            <div>POK, {user.uid}</div>
            <Button type="dashed" onClick={()=>setUser(null, true)}>Dashed</Button>
        </div>
    )
}

const POK = page(EntriPOK);

const mapDispatchToProps = dispatch => {
  return {
    setUser: bindActionCreators(setUser, dispatch)
  };
};

export default withRedux(initStore, state=>state, mapDispatchToProps)(POK);
