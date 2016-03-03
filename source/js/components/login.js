import {Component} from "platform/react"
import {Message, Text} from "platform/react-ui"
import {Logins} from "stores/master"
import ActionCreators from "actions/master"

export default class Login extends Component {
  initialize() {
    this.watchStore(Logins)
  }
  login() {
    ActionCreators.login(this.refValues())
  }
  render() {
    return (
      <div className="container">
        <div className="col-xs-6 col-xs-offset-3">
          <div className="panel panel-default l-panel-login">
            <div className="panel-heading">ログインフォーム</div>
            <div className="panel-body">
              <Message message={this.state.message} />
              <Text ref="loginId" id="loginId" placeholder="ログインID" row="true" />
              <Text ref="password" id="password" placeholder="パスワード" />
            </div>
            <div className="panel-footer">
              <button className="btn btn-block btn-primary" onClick={this.login.bind(this)}>
                <i className="fa fa-fw fa-lg fa-sign-in" /> 　ログイン
              </button>
            </div>
          </div>
          <div className="alert alert-warning">
            サーバ側（サンプル実装版）の認証モードを有効にした時は sample/sample でログインしてください。
          </div>
        </div>
      </div>
    )
  }
}
