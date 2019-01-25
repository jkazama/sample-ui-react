import React from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Component } from "platform/redux-support"
import { Log } from "platform/plain"

import { Paper, TextField, Button } from "@material-ui/core"
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
        <Paper style={styleUiLogin.main}>
          <div>
            <TextField label="ログインID" value={this.state.loginId} onChange={e => this.handleValue(e, 'loginId') } onKeyDown={this.handleEnterKey.bind(this)} />
          </div>
          <div>
            <TextField type="password" label="パスワード" value={this.state.password} onChange={e => this.handleValue(e, 'password') } onKeyDown={this.handleEnterKey.bind(this)} />
          </div>
          <div>
            <Button style={styleUiLogin.loginButton} variant="contained" color="primary" onClick={e => this.login()}>ログイン</Button>
          </div>
        </Paper>
        <Paper style={styleUi.alert.warning}>
          サーバ側（サンプル実装版）の認証モードを有効にした時は sample/sample でログインしてください。
        </Paper>
      </div>
    )
  }
}
export default withRouter(connect(
  Login.mapStateToProps(),
  Login.mapDispatchToProps()
)(Login))
