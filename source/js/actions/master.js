import {ActionCreators} from "platform/react-flux"
import ActionTypes from "constants/master"

class MasterActionCreators extends ActionCreators {
  checkLogin(data) {
    this.dispatch(ActionTypes.CHECK_LOGIN, data)
  }
  login(data) {
    this.dispatch(ActionTypes.LOGIN, data)
  }
  logout() {
    this.dispatch(ActionTypes.LOGOUT)
  }
}
export default new MasterActionCreators()
