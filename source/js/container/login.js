import React from "react"
import { connect } from "react-redux"
import { Component } from "platform/redux-support"
import { Log } from "platform/plain"

import { Paper, TextField, RaisedButton } from "material-ui"
import { styleUi, styleUiLogin } from "theme"

class Login extends Component {
  initialize() {
    // nothing
  }
  componentWillMount() {
    // nothing
  }
  initState() {
    return {
      loginId: "",
      password: "",
    }
  }
  login() {
    const { actionsMaster } = this.props
    Log.debug(this.state.loginId)
    actionsMaster.login(
      {loginId: this.state.loginId, password: this.state.password},
      v => this.push("/top")
    )
  }
  handleEnterKey(e) {
    if (e.key === 'Enter') {
      this.login()
    }
  }
  render() {
    return (
      <div>
        <Paper style={styleUiLogin.main} zDepth={0}>
          <div>
            <TextField floatingLabelText="ログインID" value={this.state.loginId} onChange={e => this.handleValue(e, 'loginId') } onKeyDown={this.handleEnterKey.bind(this)} />
          </div>
          <div>
            <TextField type="password" floatingLabelText="パスワード" value={this.state.password} onChange={e => this.handleValue(e, 'password') } onKeyDown={this.handleEnterKey.bind(this)} />
          </div>
          <div>
            <RaisedButton label="ログイン" primary={true} style={styleUiLogin.loginButton}
              onClick={this.login.bind(this)} />
          </div>
        </Paper>
        <Paper style={styleUi.alert.warning} zDepth={1}>
          サーバ側（サンプル実装版）の認証モードを有効にした時は sample/sample でログインしてください。
        </Paper>
      </div>
    )
  }
}

export default connect(
  Login.mapStateToProps(),
  Login.mapDispatchToProps()
)(Login)
