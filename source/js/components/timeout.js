import {Component} from "platform/react"

import dom from "templates/timeout"

export default class Timeout extends Component {
  render() {
    return dom(this.param())
  }
}
