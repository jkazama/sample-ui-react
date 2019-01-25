import React from "react"
import { Component } from "platform/react-support"
import Header from "container/header"

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from 'theme'

import Routes from "routes"

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Header />
          {Routes}
        </div>
      </MuiThemeProvider>
    )
  }
}
export default App
