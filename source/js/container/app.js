import React from "react"
import { connect } from "react-redux"
import { Component } from "platform/react-support"
import Header from "container/header"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from 'theme'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <Header />
          {this.props.children}
        </div>
        
      </MuiThemeProvider>
    )
  }
}
export default App
