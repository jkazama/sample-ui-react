import React from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Component } from "platform/redux-support"
import { Paper, Typography } from "@material-ui/core"
import { styleUi } from "theme"

class Trade extends Component {
  render() {
    return (
      <Paper style={styleUi.paper} elevation={1}>
        <Typography component="p">取引情報作成中</Typography>
      </Paper>
    )
  }
}
export default withRouter(connect(
  Trade.mapStateToProps(),
  Trade.mapDispatchToProps(),
)(Trade))
