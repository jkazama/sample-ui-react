import React from "react"

import {Log} from "platform/plain"
import {Component} from "platform/react"
import {Logins} from "stores/master"
import ActionTypes from "constants/master"
import ActionCreators from "actions/master"

const Link = Component.routerLink()

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
    if (this.state.logined) {
      return (
        <nav className="navbar navbar-default navbar-static-top l-nav-header">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">App</a>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="top">"取扱い商品名 (TOP)"</Link></li>
            <li><Link to="trade">取引情報</Link></li>
            <li><Link to="asset">口座資産</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a className="dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                 ○○ 様 
                <span className="caret" />
              </a>
              <ul className="dropdown-menu" role="menu">
                <li>
                  <a href="#">
                    <i className="fa fa-fw fa-user" />  アカウント情報
                  </a>
                </li>
                <li className="divider" />
                <li>
                  <a href="#" onClick={this.logout.bind(this)}>
                    <i className="fa fa-fw fa-sign-out" />  ログアウト
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      )
    } else {
      return (
        <nav className="navbar navbar-default navbar-static-top">
          <div className="navbar-header">
            <div className="navbar-brand">App</div>
          </div>
        </nav>
      )
    }
  }
}
