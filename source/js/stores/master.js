import {Store} from "platform/react-flux"
import {Level} from "constants/plain"
import ActionTypes from "constants/master"

class LoginStore extends Store {
  action(action) {
    switch(action.type) {
      case ActionTypes.CHECK_LOGIN:
        return this.checkLogin()
      case ActionTypes.LOGIN:
        return this.login(action.data)
      case ActionTypes.LOGOUT:
        return this.logout()
    }
  }
  checkLogin() {
    this.apiPost("/account/loginStatus", {}, () => {
      this.emitFinish(ActionTypes.CHECK_LOGIN, {logined: true})
    }, (xhr) => {
      this.emitFinish(ActionTypes.CHECK_LOGIN, {logined: false})
    })
  }
  login(data) {
    this.apiPost("/login", data, () => {
      this.emitFinish(ActionTypes.LOGIN)
    }, (xhr) => {
      this.emitError("ログインできませんでした。ID/パスワードに誤りが無いか確認してください。", [], Level.WARN)
    })
  }
  logout() {
    this.apiPost("/logout", {}, () => {
      this.emitFinish(ActionTypes.LOGOUT)
    })
  }
}
export var Logins = new LoginStore()
