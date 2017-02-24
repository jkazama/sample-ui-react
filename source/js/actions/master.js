import { Log } from "platform/plain"
import { Level } from "constants/plain.js"
import { ActionsSupport } from "platform/redux-action-support"
import api from "api/master.js"
import types from "constants/master"

export default class MasterActions extends ActionsSupport {
  constructor(dispatch) {
    super(dispatch)
  }

  checkLogin(success = v => {}, failure = e => {}) {
    api.loginStatus(v => {
      this.dispatch({type: types.LOGINED, payload: {}})
      success(v)
    }, e => {
      if (e.response) {
        if (e.status === 403) {
          Log.debug("サーバ側のログイン状態が確認できないためログアウトします")
          this.dispatch({type: types.LOGOUT, payload: {}})
          this.push("login")
          return
        }
      }
      this.handleFailure(e)
      failure(e)
    })
  }

  login(data, success) {
    api.login(data, v => {
      Log.debug("ログインに成功しました")
      api.loginAccount(account => {
        this.dispatch({type: types.LOGINED, payload: account})
        success(account)
      })
    }, e => {
      switch (e.status) {
        case 400:
          this.emitError("IDまたはパスワードに誤りがあります", [], Level.WARN)
          break
        default:
          this.emitError("要求処理に失敗しました")
      }
    })
  }
  
  logout() {
    api.logout()
    Log.debug("ログアウトに成功しました")
    this.clearMessage()
    this.dispatch({type: types.LOGOUT, payload: {}})
    this.push("login")
  }
}
