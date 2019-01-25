import React from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Component } from "platform/redux-support"
import { Paper, Typography } from "@material-ui/core"
import { styleUi } from "theme"

class Top extends Component {
  render() {
    return (
      <Paper style={styleUi.paper} elevation={1}>
        <Typography component="p">取り扱い商品名（TOP）作成中</Typography>
      </Paper>
    )
  }
}
export default withRouter(connect(
  Top.mapStateToProps(),
  Top.mapDispatchToProps()
)(Top))
