import { push } from 'react-router-redux'
import { Log } from "platform/plain"
import { Component as ReactSupportComponent } from "platform/react-support"
import { Level } from 'constants/plain'
import MasterActions from "actions/master"
import types from "constants/master"

// Redux 向けのコンポーネント拡張です。
// Redux 関連の拡張機能を提供します。
export class Component extends ReactSupportComponent {
  initialize() {
    this.checkLogin()
  }
  componentWillMount() {
    this.clearMessage()
  }
  dispatch(v) {
    if (this.props.dispatch) {
      this.props.dispatch(v)
    } else {
      Log.warn("props に dispatch の登録がおこなわれていません")
    }
  }
  push(path) {
    this.dispatch(push(path))
  }
  clearMessage() {
    const { actionsMaster, master } = this.props
    actionsMaster.emitMessage(null)
  }
  errorText(field) {
    const { columns } = this.props.master.message.default
    if (columns && 0 < columns.length) {
      let column = Array.from(columns).find(v => v.key === field)
      console.log(column)
      if (column && column.values && 0 < column.values.length) {
        return column.values[0]
      }
    }
    return ""
  }
  // check login status
  checkLogin() {
    const { dispatch, actionsMaster, master } = this.props
    if (!dispatch || !actionsMaster || !master) {
      Log.warn("事前に mapStateToProps / mapDispatchToProps を connect してください")
      return
    }
    const logined = (master ? master.login.logined : false)
    actionsMaster.checkLogin(v => {}, (err) => {
      Log.debug('ログイン情報を確認できませんでしたので自動的にログアウトします')
      // 事前ログイン状態に応じて表示ページを変更
      logined ? this.push('timeout') : this.push('login')
    })
  }
  static mapStateToProps(mapper = state => ({})) {
    return state => {
      return Object.assign({
        master: state.reducer.master,
        router: state.router,
      }, mapper(state))
    }
  }
  static mapDispatchToProps(mapper = dispatch => ({})) {
    return dispatch => {
      return Object.assign({
        dispatch: dispatch,
        actionsMaster: new MasterActions(dispatch),
      }, mapper(dispatch))
    }
  }
}
