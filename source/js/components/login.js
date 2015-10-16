import {Component} from "platform/react"
import {Logins} from "stores/master"
import ActionCreators from "actions/master"

// parent
import dom from "templates/login"

export default class Login extends Component {
  initialize() {
    this.watchStore(Logins)
  }
  login() {
    ActionCreators.login(this.refValues())
  }
  render() {
    return dom(this.param())
  }
}
