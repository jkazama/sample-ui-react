import {Component} from "platform/react"
import {Message, Text, Label} from "platform/react-ui"
import {CashInOuts} from "stores/asset"
import ActionTypes from "constants/asset"
import ActionCreators from "actions/asset"

const Link = ReactRouter.Link

// parent
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
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default l-panel-mock l-panel-asset-info">
              <div className="panel-heading">
                <i className="fa fa-fw fa-info-circle" />  資産残高
              </div>
              <div className="panel-body"></div>
            </div>
          </div>
          <div className="col-md-8">
            <ul className="nav nav-tabs">
              <li><a href="#deposit" data-toggle="tab">入金</a></li>
              <li className="active"><a href="#withdrawal" data-toggle="tab">出金依頼</a></li>
              <li><a href="#cashflow" data-toggle="tab">入出金一覧</a></li>
            </ul>
            <div className="tab-content">
              <div id="deposit" className="tab-pane">TBD</div>
              <div id="withdrawal" className="tab-pane active">
                <Message message={this.state.message} />
                <AssetWithdrawalCrud message={this.state.message} />
                <AssetWithdrawalList items={this.state.items} message={this.state.message} />
              </div>
              <div id="cashflow" className="tab-pane">TBD</div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default l-panel-mock"><div className="panel-body"></div></div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default l-panel-mock"><div className="panel-body"></div></div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default l-panel-mock"><div className="panel-body"></div></div>
          </div>
        </div>
      </div>
    )
  }
}

// list
class AssetWithdrawalList extends Component {
  render() {
    return (
      <div className="l-withdrawal-list">
        <div className="row">
          <div className="col-md-12">
            <div className="l-list-body l-scrollable">
              <ul className="list-group">
                <li className="list-group-item l-list-wait-row l-center">
                  <i className="fa fa-spin fa-spinner" />
                </li>
                {this.props.items.map((item, i) => { return (
                  <li className="list-group-item clearfix" key={item.id}>
                    <Label className="l-item l-item-day" type="day" value={item.requestDay} />
                    <div className="l-item l-item-type">
                      <div className="label label-default">{item.statusType}</div>
                    </div>
                    <Label className="l-item l-item-currency" value={item.currency} />
                    <Label className="l-item l-item-amount pull-right" type="amount" value={item.absAmount} />
                  </li>
                )})}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// crud
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
    return (
      <div className="l-withdrawal-crud">
        <div className="row l-row">
          <div className="col-md-4">
            <Text ref="absAmount" id="absAmount" placeholder="出金金額" suffix="円" message={this.props.message} />
          </div>
          <div className="col-md-2">
            <button className="btn btn-default btn-block" onClick={this.register.bind(this)}>依頼する</button>
          </div>
        </div>
        <div className="row l-row">
          <div className="col-md-12">
            <div className="alert alert-warning">出金依頼に関わる注記文言を記載。動作確認用サンプルなので導線なり重複依頼はルーズに。</div>
          </div>
        </div>
      </div>
    )
  }
}
