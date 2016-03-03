import {Component} from "platform/react"

export default class Timeout extends Component {
  render() {
    const Link = ReactRouter.Link
    return (
      <div className="col-xs-6 col-xs-offset-3">
        <div className="panel panel-default">
          <div className="panel-heading">セッションタイムアウト</div>
          <div className="panel-body">
            <div className="alert alert-warning">ログインしていないか一定時間操作がありませんでした。</div>
          </div>
          <div className="panel-footer">
            <Link className="btn btn-block btn-default" to="login">ログイン画面へ戻る</Link>
          </div>
        </div>
      </div>
    )
  }
}
