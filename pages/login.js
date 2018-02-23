import { Form, Icon, Input, Button, Checkbox, Row, Col, Alert } from "antd";
import configureProgressBar from "../util/routing";
import Router from "next/router";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { initStore } from "../util/redux/store";
import { setUser } from "../util/redux/actions/userAction";
import $ from "jquery";
import DocumentTitle from 'react-document-title';
import styles from './style/login.less';
import Logo from '../static/logo.svg';
import LinkWithHand from "../components/LinkWithHand"
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  state = {
    errMsg: null
  };

  onClose = e => {
    this.setState({ errMsg: null });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        $.post("/login", values, (data, status) => {
          if (data.isValid) {
            this.props.setUser(data.uid, true);
            Router.replace("/");
          } else {
            this.setState({ errMsg: data.errMsg });
          }
        });
      }
    });
  };

  componentDidMount() {
    configureProgressBar();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errMsg } = this.state;
    const { uid } = this.props;

    if (uid) {
      Router.replace("/");
      return null;
    }
    return (
      <DocumentTitle title='Login'>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <LinkWithHand href="/">
                  <Logo className={styles.logo} alt='logo' />
                  <span className={styles.title}>Bagian Umum</span>
                </LinkWithHand>
              </div>
              <div className={styles.desc}>Politeknik Statistika STIS</div>
            </div>
            <Row type="flex" justify="center" align="middle">
              <Col span={6}>
                {errMsg ? (
                  <Alert
                    message={errMsg}
                    type="error"
                    showIcon
                    closable
                    onClose={this.onClose}
                  />
                ) : null}
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {getFieldDecorator("username", {
                      rules: [
                        { required: true, message: "Please input your username!" }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                        }
                        placeholder="Username"
                        autoComplete="off"
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator("password", {
                      rules: [
                        { required: true, message: "Please input your Password!" }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                        }
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      size='large'
                      className={styles.submit}
                    >
                      Log in
                    </Button>
                  </FormItem>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = ({ user }) => ({ uid: user.uid });

const mapDispatchToProps = dispatch => {
  return {
    setUser: bindActionCreators(setUser, dispatch)
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  WrappedNormalLoginForm
);