import { PureComponent } from "react";
import DocumentTitle from "react-document-title";
import { ContainerQuery } from "react-container-query";
import classNames from "classnames";
import { enquireScreen } from "enquire-js";
import { Layout, Menu, Breadcrumb, Icon, Button, Avatar, Row, Col } from "antd";
import SiderMenu from "../../components/SiderMenu";
import GlobalHeader from "../../components/GlobalHeader";
import configureProgressBar from "../../util/routing";
import Router from "next/router";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { setDefaultOpenKeys } from "../../util/redux/actions/layoutAction";
import LinkWithHand from "../../components/LinkWithHand"
import { setUser } from "../../util/redux/actions/userAction";
import { setSidebarCollapsed } from "../../util/redux/actions/layoutAction"
import { getMenuData } from "../../common/menu";
import NotFound from "../../pages/404";
import Logo from '../../static/logo.svg';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const query = {
  "screen-xs": {
    maxWidth: 575
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199
  },
  "screen-xl": {
    minWidth: 1200
  }
};

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

export default ComposedComponent => {
  class BasicLayout extends PureComponent {
    state = {
      isMobile
    };
  
    componentDidMount() {
      enquireScreen((mobile) => {
        this.setState({
          isMobile: mobile
        });
      });
      configureProgressBar();
    }

    handleMenuCollapse = (collapsed) => {
      this.props.setSidebarCollapsed(collapsed)
    }

    render() {
      const {
        collapsed, url
      } = this.props;
      const layout = (
        <Layout>
          <SiderMenu
            Logo={Logo}
            collapsed={collapsed}
            onCollapse={this.handleMenuCollapse}
            menuData={getMenuData()}
            isMobile={this.state.isMobile}
            location={url}
          />
          <Layout>
            <Header style={{ padding: 0 }}>
              <GlobalHeader
                Logo={Logo}
                collapsed={collapsed}
                isMobile={this.state.isMobile}
                onCollapse={this.handleMenuCollapse}
                currentUser={{name: 'Rifka Rahman Hakim'}}
              />
              <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                <ComposedComponent {...this.props} />
              </Content>
            </Header>
          </Layout>
        </Layout>
      );
  
      return (
        <DocumentTitle title="Politeknik Statistika STIS">
          <ContainerQuery query={query}>
            {params => <div className={classNames(params)}>{layout}</div>}
          </ContainerQuery>
        </DocumentTitle>
      );
    }
  }

  const mapStateToProps = ({ layout }) => {
    return {
      collapsed: layout.menuCollapsed,
      loading: layout.loading
    }    
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      setDefaultOpenKeys: bindActionCreators(setDefaultOpenKeys, dispatch),
      setUser: bindActionCreators(setUser, dispatch),
      setSidebarCollapsed: bindActionCreators(setSidebarCollapsed, dispatch)
    }
  }

  return connect(mapStateToProps, mapDispatchToProps )(BasicLayout);
}