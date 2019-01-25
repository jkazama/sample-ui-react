import React from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Component } from "platform/redux-support"
import AssetActions from "actions/asset"
import {
  Paper, TextField, Button,
  Table, TableHead, TableBody, TableRow, TableCell,
} from "@material-ui/core"
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
    const errAbsAmount = this.errorText("absAmount")
    return (
      <div>
        <TextField label="出金金額"
          margin='dense'
          value={this.state.absAmount || ""} error={errAbsAmount !== ""}
          helperText={errAbsAmount}
          style={styleUiAsset.absAmountText}
          onChange={e => this.handleValue(e, 'absAmount') }
          onKeyDown={e => this.handleEnterKey(e)} />
        <Button variant="contained" color="primary" style={styleUiAsset.requestWithdrawButton}
          onClick={() => this.requestWithdraw()}>
          出金依頼をする
        </Button>
        <Paper style={styleUiAsset.main}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>依頼日</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>通貨</TableCell>
                <TableCell>金額</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.withdrawalList.map((item, i) =>
              <TableRow key={i}>
                <TableCell style={styleUi.alignCenter}>{item.requestDay}</TableCell>
                <TableCell style={styleUi.alignCenter}>{item.statusType}</TableCell>
                <TableCell style={styleUi.alignCenter}>{item.currency}</TableCell>
                <TableCell style={styleUi.alignRight}>{item.absAmount}</TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}
export default withRouter(connect(
  Asset.mapStateToProps(state => ({
    asset: state.asset
  })),
  Asset.mapDispatchToProps(dispatch => ({
    actionsAsset: new AssetActions(dispatch)
  })),
)(Asset))
