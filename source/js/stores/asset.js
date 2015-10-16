import {Store} from "platform/react-flux"
import ActionTypes from "constants/asset"

class CashInOutStore extends Store {
  action(action) {
    switch(action.type) {
      case ActionTypes.FIND_CASH_IN_OUT:
        return this.findCashInOut()
      case ActionTypes.REQUEST_WITHDRAWAL:
        return this.requestWithdrawal(action.data)
    }
  }
  findCashInOut() {
    this.apiGet("/asset/cio/unprocessedOut/", {}, (items) => {
      this.update(items)
      this.emitFinish(ActionTypes.FIND_CASH_IN_OUT)
    })
  }
  requestWithdrawal(data) {
    this.apiPost("/asset/cio/withdraw/", data, () => {
      this.emitFinish(ActionTypes.REQUEST_WITHDRAWAL)
      this.emitMessage("依頼を受け付けました")
    })
  }
}
export var CashInOuts = new CashInOutStore()
