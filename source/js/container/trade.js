import React from "react"
import { connect } from "react-redux"
import { Component } from "platform/redux-support"
import { Paper } from "material-ui"
import { styleUi } from "theme"

class Trade extends Component {
  render() {
    return (
      <Paper style={styleUi.paper} zDepth={0}>
        <div>取引情報作成中</div>
      </Paper>
    )
  }
}
export default connect(
  Trade.mapStateToProps(),
  Trade.mapDispatchToProps(),
)(Trade)
