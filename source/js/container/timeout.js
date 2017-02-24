import React from "react"
import { Link } from "react-router"
import { Component } from "platform/react-support"
import { Paper } from "material-ui"
import { styleUi } from "theme"

export default class Timeout extends Component {
  render() {
    return (
      <Paper style={styleUi.paper} zDepth={0}>
        <h4>セッションタイムアウト</h4>
        <div>ログインしていないか一定時間操作がありませんでした。</div>
        <p>
          <Link to="login">ログイン画面へ戻る</Link>
        </p>
      </Paper>
    )
  }
}
