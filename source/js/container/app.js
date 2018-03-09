import React from "react"
import { connect } from "react-redux"
import { Component } from "platform/react-support"
import Header from "container/header"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from 'theme'

import Routes from "routes"

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <Header />
          {Routes}
        </div>
      </MuiThemeProvider>
    )
  }
}
export default App
