import { Form, Icon, Input, Button, Checkbox, Row, Col, Alert } from "antd";
import configureProgressBar from "../util/routing";
import Router from "next/router";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from 'redux';
import { initStore } from "../util/redux/store";
import { setUser } from "../util/redux/actions/userAction";
import 'jquery'
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  state = {
    errMsg: null
  }

  onClose = (e) => {
    this.setState({errMsg: null})
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        $.post("/login", data, function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
        });
        // this.props.socket.emit('login.submit', values, ( res_server )=>{
        //   if( res_server.valid_user ){
        //     this.props.setUser(res_server.uid, true)
        //     Router.replace('/')
        //   } else this.setState({errMsg: res_server.errMsg})
        // })
      }
    });
  };

  componentDidMount() {
    configureProgressBar();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errMsg } = this.state;
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col span={6}>
            {errMsg?<Alert message={errMsg} type="error" showIcon closable onClose={this.onClose} />:null}
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
                  />
                )}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapDispatchToProps = dispatch => {
  return {
    setUser: bindActionCreators(setUser, dispatch)
  };
};

export default withRedux(initStore, state=>state, mapDispatchToProps)(WrappedNormalLoginForm);
