import React from "react"
import { connect } from "react-redux"
import { Component } from "platform/redux-support"
import AssetActions from "actions/asset"
import {
  Paper, TextField, RaisedButton,
  Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn,
} from "material-ui"
import { styleUi, styleUiAsset } from "theme"

class Asset extends Component {
  initState() {
    return {
      withdrawalList: [],
      absAmount: null,
    }
  }
  componentDidMount() {
    this.search()
  }
  search() {
    const { actionsAsset } = this.props
    actionsAsset.findUnprocessedOut(list =>
      this.mergeState({withdrawalList: list}))
  }
  requestWithdraw() {
    const { actionsAsset } = this.props
    actionsAsset.requestWithdrawal({currency: "JPY", absAmount: this.state.absAmount}, id => {
      this.clearState()
      this.search()
    })
  }
  handleEnterKey(e) {
    if (e.key === 'Enter') {
      this.requestWithdraw()
    }
  }
  render() {
    return (
      <div>
        <TextField floatingLabelText="出金金額"
          value={this.state.absAmount || ""} errorText={this.errorText("absAmount")}
          style={styleUiAsset.absAmountText}
          onChange={e => this.handleValue(e, 'absAmount') }
          onKeyDown={this.handleEnterKey.bind(this)} />
        <RaisedButton label="出金依頼をする"
          primary={true} style={styleUiAsset.requestWithdrawButton}
          onClick={this.requestWithdraw.bind(this)} />
        <Paper style={styleUiAsset.main} zDepth={1}>
          <Table selectable={false} height={styleUiAsset.table.height}>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>依頼日</TableHeaderColumn>
                <TableHeaderColumn>ステータス</TableHeaderColumn>
                <TableHeaderColumn>通貨</TableHeaderColumn>
                <TableHeaderColumn>金額</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.state.withdrawalList.map((item, i) =>
                <TableRow key={i}>
                  <TableRowColumn style={styleUi.alignCenter}>{item.requestDay}</TableRowColumn>
                  <TableRowColumn style={styleUi.alignCenter}>{item.statusType}</TableRowColumn>
                  <TableRowColumn style={styleUi.alignCenter}>{item.currency}</TableRowColumn>
                  <TableRowColumn style={styleUi.alignRight}>{item.absAmount}</TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}
export default connect(
  Asset.mapStateToProps(state => ({
    asset: state.reducer.asset
  })),
  Asset.mapDispatchToProps(dispatch => ({
    actionsAsset: new AssetActions(dispatch)
  })),
)(Asset)
