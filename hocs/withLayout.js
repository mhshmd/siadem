import { Component, PropTypes } from "react";
import { Layout, Menu, Breadcrumb, Icon, Button, Avatar, Row, Col } from "antd";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import configureProgressBar from "../util/routing";
import Router from "next/router";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { setDefaultOpenKeys } from "../util/redux/actions/layoutAction";
import LinkWithHand from "../components/LinkWithHand"

export default ComposedComponent => {
  class WithLayout extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: false
      };
    }

    componentDidMount() {
      configureProgressBar();
    }

    onCollapse = collapsed => {
      this.setState({ collapsed });
    };

    render() {
      const { url, layout, setDefaultOpenKeys, user } = this.props;
      return (
        <Layout>
          <Header className="header">
            <Row type="flex" justify="space-between">
              <Col>
                <LinkWithHand href='/'><span style={{ color: "white" }}>SiAdem</span></LinkWithHand>
              </Col>
              <Col>
                {user.user_id?<Avatar>{user.user_id}</Avatar>:<LinkWithHand href='/login'><Button>Login</Button></LinkWithHand>}
              </Col>
            </Row>
          </Header>
          <Content style={{ padding: "0 0" }}>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
              >
                <Menu
                  defaultSelectedKeys={[url.asPath]}
                  defaultOpenKeys={[layout.defaultOpenKeys]}
                  mode="inline"
                  style={{ height: "100%" }}
                  onClick={({key, keyPath})=>{
                    setDefaultOpenKeys(keyPath[keyPath.length-1])
                  }}
                >
                  <Menu.Item key="/">
                    <LinkWithHand href='/'>
                      <Icon type="pie-chart" />
                      <span>Dashboard</span>
                    </LinkWithHand>
                  </Menu.Item>
                  <SubMenu
                    key="penganggaran"
                    title={
                      <span>
                        <Icon type="calculator" />
                        <span>Modul Penganggaran</span>
                      </span>
                    }
                  >
                    <Menu.Item key="/pok">
                      <LinkWithHand href='/pok'>
                        POK
                      </LinkWithHand>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="surat"
                    title={
                      <span>
                        <Icon type="form" />
                        <span>Modul Persuratan</span>
                      </span>
                    }
                  >
                    <Menu.Item key="spd">SPD</Menu.Item>
                    <Menu.Item key="s_transport">Surat Transportasi</Menu.Item>
                    <Menu.Item key="sk">SK</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="honor"
                    title={
                      <span>
                        <Icon type="credit-card" />
                        <span>Modul Honor</span>
                      </span>
                    }
                  >
                    <Menu.Item key="hondos">Honor Dosen</Menu.Item>
                    <Menu.Item key="hontransport">Honor Transportasi</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout>
                <Content style={{ margin: "0 16px" }}>
                  <ComposedComponent {...this.props} />
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Sistem Informasi Administrasi ©{new Date().getFullYear()}{" "}
                  Politeknik Statistika STIS
                </Footer>
              </Layout>
            </Layout>
          </Content>
        </Layout>
      );
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      setDefaultOpenKeys: bindActionCreators(setDefaultOpenKeys, dispatch)
    }
  }

  return connect(state => state, mapDispatchToProps )(WithLayout);
}