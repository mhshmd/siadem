import React, { PureComponent } from "react";
import { Layout, Menu, Icon } from "antd";
import pathToRegexp from "path-to-regexp";
import styles from "./index.less";
import { urlToList } from "../../util/pathTools";
import Link from '../../components/LinkWithHand'

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

export default class SiderMenu extends PureComponent {
    constructor(props) {
      super(props);
      this.menus = props.menuData;
    }

    conversionPath = (path) => {
      if (path && path.indexOf('http') === 0) {
        return path;
      } else {
        return `/${path || ''}`.replace(/\/+/g, '/');
      }
    };

    getMenuItemPath = (item) => {
      const itemPath = this.conversionPath(item.path);
      const icon = getIcon(item.icon);
      const { target, name } = item;
      // Is it a http link
      if (/^https?:\/\//.test(itemPath)) {
        return (
          <a href={itemPath} target={target}>
            {icon}
            <span>{name}</span>
          </a>
        );
      }
      return (
        <Link
          href={itemPath}
          onClick={
            this.props.isMobile
              ? () => {
                  this.props.onCollapse(true);
                }
              : undefined
          }
        >
          {icon}
          <span>{name}</span>
        </Link>
      );
    };

    getNavMenuItems = (menusData) => {
      if (!menusData) {
        return [];
      }
      return menusData
        .filter(item => item.name && !item.hideInMenu)
        .map((item) => {
          // make dom
          const ItemDom = this.getSubMenuOrItem(item);
          return ItemDom;
        })
        .filter(item => item);
    };

    /**
   * get SubMenu or Item
   */
    getSubMenuOrItem = (item) => {
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {this.getNavMenuItems(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
        );
      }
    };
    
    render() {
      const { Logo, collapsed, onCollapse } = this.props
      // if pathname can't match, use the nearest parent's key
      return (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          onCollapse={onCollapse}
          width={256}
          className={styles.sider}
        >
          <div className={styles.logo} key="logo">
            <Link href="/">
              <Logo />
              <h1>Kepegawaian</h1>
            </Link>
          </div>
          <Menu
            key="Menu"
            theme="dark"
            mode="inline"
            style={{ padding: '16px 0', width: '100%' }}
          >
            {this.getNavMenuItems(this.menus)}
          </Menu>
        </Sider>
      );
    }
}