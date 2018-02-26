import React, { PureComponent } from "react";
import { Layout, Menu, Icon } from "antd";
import pathToRegexp from "path-to-regexp";
import styles from "./index.less";
import { urlToList } from "../../util/pathTools";

const { Sider } = Layout;
const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === "string" && icon.indexOf("http") === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === "string") {
    return <Icon type={icon} />;
  }
  return icon;
};

export const getMeunMatcheys = (flatMenuKeys, path) => {
  return flatMenuKeys.filter(item => {
    return pathToRegexp(item).test(path);
  });
};

// <SiderMenu
//     logo={logo}
//     // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
//     // If you do not have the Authorized parameter
//     // you will be forced to jump to the 403 interface without permission
//     Authorized={Authorized}
//     menuData={getMenuData()}
//     collapsed={collapsed}
//     location={location}
//     isMobile={this.state.isMobile}
//     onCollapse={this.handleMenuCollapse}
// />
export default class SiderMenu extends PureComponent {
    constructor(props) {
      super(props);
      this.menus = props.menuData;
      this.flatMenuKeys = this.getFlatMenuKeys(props.menuData);
      this.state = {
        openKeys: this.getDefaultCollapsedSubMenus(props),
      };
    }
}
