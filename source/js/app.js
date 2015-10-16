// React Router
let RouteHandler = ReactRouter.RouteHandler

import {Component} from "platform/react"
import Header from "components/header"

export default class App extends Component {
  render() {
    return(
      <div>
        <Header />
        <RouteHandler/>
      </div>
    )
  }
}
