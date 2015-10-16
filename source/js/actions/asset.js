import {ActionCreators} from "platform/react-flux"
import ActionTypes from "constants/asset"

class AssetActionCreators extends ActionCreators {
  findCashInOut() {
    this.dispatch(ActionTypes.FIND_CASH_IN_OUT)
  }
  requestWithdrawal(data) {
    this.dispatch(ActionTypes.REQUEST_WITHDRAWAL, data)
  }
}
export default new AssetActionCreators()
