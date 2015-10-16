import {Component} from "platform/react"
import {CashInOuts} from "stores/asset"
import ActionTypes from "constants/asset"
import ActionCreators from "actions/asset"

// parent
import dom from "templates/asset"

export default class Asset extends Component {
  initState() {
    return {items: [], loading: false}
  }
  initialize() {
    this.watchStore(CashInOuts, () => this.updateState({items: CashInOuts.items}))
    this.search()
  }
  search() {
    this.updateState({loading: true})
    ActionCreators.findCashInOut()
  }
  handleFinish(action) {
    if (action.type === ActionTypes.FIND_CASH_IN_OUT) {
      this.updateState({loading: false})
    } else if (action.type === ActionTypes.REQUEST_WITHDRAWAL) {
      this.search(true)
    }
  }
  render() {
    return dom(this.param({List: AssetWithdrawalList, Crud: AssetWithdrawalCrud}))
  }
}

// list
import domList from "templates/partials/asset-withdrawal-list"

class AssetWithdrawalList extends Component {
  render() {
    return domList(this.param())
  }
}

// crud
import domCrud from "templates/partials/asset-withdrawal-crud"

class AssetWithdrawalCrud extends Component {
  initialize() {
    this.watchStore(CashInOuts)
  }
  handleFinish(action) {
    if (action.type === ActionTypes.REQUEST_WITHDRAWAL) {
      this.refValueClear()
    }
  }
  register() {
    let data = Object.assign({currency: 'JPY'}, this.refValues())
    ActionCreators.requestWithdrawal(data)
  }
  render() {
    return domCrud(this.param())
  }
}
