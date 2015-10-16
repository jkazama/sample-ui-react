import {Component} from "platform/react"
import dom from "templates/trade"

export default class Trade extends Component {
  render() {
    return dom(this.param())
  }
}
