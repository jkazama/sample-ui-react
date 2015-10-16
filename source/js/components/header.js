// Header
import {Log} from "platform/plain"
import {Component} from "platform/react"
import {Logins} from "stores/master"
import ActionTypes from "constants/master"
import ActionCreators from "actions/master"

import domHeader from "templates/header"
import domHeaderSimple from "templates/header-simple"

export default class Header extends Component {
  initialize() {
    this.watchStore(Logins)
    this.checkLogin()
  }
  initState() {
    return {logined: false}
  }
  handleFinish(action) {
    switch (action.type) {
      case ActionTypes.CHECK_LOGIN:
        this.updateState({logined: action.data.logined})
        if (action.data.logined) {
          this.forward("asset")
        } else {
          this.forward("timeout")
        }
        return
      case ActionTypes.LOGIN:
        this.updateState({logined: true})      
        Log.info("ログインしました")
        this.forward("asset")
        return
      case ActionTypes.LOGOUT:
        Log.info("ログアウトに成功しました")
        return
    }
  }
  checkLogin() {
    ActionCreators.checkLogin()
  }
  logout(e) {
    e.preventDefault()
    this.updateState({logined: false})
    this.forward("login")
    ActionCreators.logout()
  }
  render() {
    return this.state.logined ? domHeader(this.param()) : domHeaderSimple()
  }
}
