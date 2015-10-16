import {Component} from "platform/react"
import dom from "templates/top"

export default class Top extends Component {
  render() {
    return dom(this.param())
  }
}
