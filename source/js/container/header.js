import React from "react"
import { connect } from "react-redux"
import { Component } from "platform/redux-support"
import { Log } from "platform/plain"
import { Level } from "constants/plain"

import { AppBar, Drawer, IconMenu, IconButton, MenuItem, Tabs, Tab, Snackbar } from 'material-ui'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { color, styleUiHeader } from "theme"

// 画面右上のサブメニュー
class HeaderSubMenu extends React.Component {
  static muiName = "HeaderSubMenu"
  static propTypes = {
    logout: React.PropTypes.func.isRequired,
  }
  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="ログアウト"
          style={styleUiHeader.subMenu.menuItem}
          onTouchTap={this.props.logout}/>
      </IconMenu>
    )
  }
}

// メッセージ通知用の Snackbar
class GlobalNotification extends React.Component {
  static muiName = "GlobalNotification"
  static propTypes = {
    message: React.PropTypes.object.isRequired,
  }
  render() {
    const {level, message} = this.props.message
    const open = message ? true : false
    const content = message || ""
    const targetLevel = level ? level : Level.INFO
    let bgc = color.default
    switch(targetLevel) {
      case Level.INFO:
        bgc = color.info
        break
      case Level.WARN:
        bgc = color.warning
        break
      case Level.ERROR:
        bgc = color.error
        break
    }
    return (
      <Snackbar
        open={open}
        message={content}
        autoHideDuration={3000}
        bodyStyle={{backgroundColor: bgc}}
        contentStyle={{color: '#fff', backgroundColor: bgc}} />
    )
  }
}

// ヘッダー
class Header extends Component {
  initState() {
    return {
      globalMenu: false,
    }
  }
  toggleGlobalMenu() {
    this.mergeState({globalMenu: !this.state.globalMenu})
  }
  closeGlobalMenu() {
    this.mergeState({globalMenu: false})
  }
  logout(e) {
    e.preventDefault()
    const { actionsMaster } = this.props
    actionsMaster.logout()
  }
  render() {
    const { master } = this.props
    if (master.login.logined) {
      return (
        <div>
          <AppBar title="App"
            titleStyle={{fontSize: 18}}
            onLeftIconButtonTouchTap={this.toggleGlobalMenu.bind(this)}
            iconElementRight={<HeaderSubMenu logout={this.logout.bind(this)} />}
            iconStyleRight={{marginRight: 0}}
            zDepth={0} />
          <Drawer
            docked={false}
            open={this.state.globalMenu}
            onRequestChange={this.toggleGlobalMenu.bind(this)}>
            <MenuItem onTouchTap={this.closeGlobalMenu.bind(this)}>Global Menu</MenuItem>
          </Drawer>
          <Tabs>
            <Tab label="TOP" onActive={tab => this.push("top")} />
            <Tab label="取引情報" onActive={tab => this.push("trade")} />
            <Tab label="口座資産" onActive={tab => this.push("asset")} />
          </Tabs>
          <GlobalNotification message={master.message.default.global || {}} />
        </div>
      )
    } else {
      return (
        <div>
          <AppBar title="App" showMenuIconButton={false} />
          <GlobalNotification message={master.message.default.global || {}} />
        </div>
      )
    }
  }
}

export default connect(
  Header.mapStateToProps(),
  Header.mapDispatchToProps()
)(Header)
