import React from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { Component } from "platform/redux-support"
import { Level } from "constants/plain"

import { AppBar, Toolbar, Snackbar, Typography, IconButton, Drawer, MenuItem, Tabs, Tab, Grid } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { color } from "theme"

// メッセージ通知用の Snackbar
class GlobalNotification extends React.Component {
  static muiName = "GlobalNotification"
  static propTypes = {
    message: PropTypes.object.isRequired,
    action: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.message === nextProps.message) {
      return true
    }
    const { message } = nextProps.message
    if (message) {
      this.setState({ open: true })
    }
    return true
  }
  closeNotification() {
    this.setState({open: false})
  }
  render() {
    const { level, message } = this.props.message
    const content = message || ""
    const targetLevel = level ? level : Level.INFO
    let bgc = color.default
    switch (targetLevel) {
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
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={this.state.open}
        onClose={() => this.closeNotification()}
        message={content}
        autoHideDuration={3000}
        ContentProps={{ style: { color: "#fff", backgroundColor: bgc } }}>
      </Snackbar>
    )
  }
}

// ヘッダー
class Header extends Component {
  initState() {
    return {
      globalMenu: false,
      subMenuIndex: 0,
    }
  }
  toggleGlobalMenu() {
    this.mergeState({ globalMenu: !this.state.globalMenu })
  }
  closeGlobalMenu() {
    this.mergeState({ globalMenu: false })
  }
  logout(e) {
    e.preventDefault()
    const { actionsMaster } = this.props
    actionsMaster.logout()
  }
  changeMenu(event, value) {
    const path = ["/top", "/trade", "/asset"]
    this.mergeState({ subMenuIndex: value })
    this.push(path[value])
  }
  render() {
    const { master, actionsMaster } = this.props
    if (master.login.logined) {
      return (
        <div>
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton color="inherit" onClick={this.toggleGlobalMenu.bind(this)}>
                <MenuIcon />
              </IconButton>
              <Typography color="inherit" variant="h6">App</Typography>
              <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                <IconButton color="inherit" onClick={this.logout.bind(this)}>
                  <ExitToAppIcon />
                </IconButton>
              </Grid>
            </Toolbar>
          </AppBar>
          <Drawer
            docked="false"
            open={this.state.globalMenu}
            onClose={this.toggleGlobalMenu.bind(this)}>
            <MenuItem onClick={this.closeGlobalMenu.bind(this)}>Global Menu</MenuItem>
          </Drawer>
          <Tabs value={this.state.subMenuIndex} variant="fullWidth" onChange={this.changeMenu.bind(this)}>
            <Tab label="TOP" />
            <Tab label="取引情報" />
            <Tab label="口座資産" />
          </Tabs>
          <GlobalNotification message={master.message.default.global || {}} action={actionsMaster} />
        </div>
      )
    } else {
      return (
        <div>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography color="inherit" variant="h6">App</Typography>
            </Toolbar>
          </AppBar>
          <GlobalNotification message={master.message.default.global || {}} action={actionsMaster} />
        </div>
      )
    }
  }
}

export default withRouter(connect(
  Header.mapStateToProps(),
  Header.mapDispatchToProps()
)(Header))
