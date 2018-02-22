import withRedux from "next-redux-wrapper";
import { bindActionCreators } from 'redux';
import { initStore } from "../util/redux/store";
import { setUser } from "../util/redux/actions/userAction"
import page from "../hocs/page";
import { Button } from 'antd';

const Dashboard = ( { user, setUser } ) => {
    return (
        <div>
            <div>Selamat Datang, {user.uid}</div>
            <Button type="dashed" onClick={()=>setUser('Shamad', true)}>Dashed</Button>
        </div>
    )
}

const Index = page(Dashboard);

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => {
  return {
    setUser: bindActionCreators(setUser, dispatch)
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index);
