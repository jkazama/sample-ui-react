import React from "react"
import {Router} from "react-router"

import {Component} from "platform/react"
import Header from "components/header"

export default class App extends Component {
  render() {
    return(
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}
