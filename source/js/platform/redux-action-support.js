import { Log } from "platform/plain"
import { Level } from 'constants/plain'
import types from "constants/master"
import { push } from 'connected-react-router'

// Actions の基底クラスです。
// 共通処理の他、各 Action 処理から dispatch への簡易なアクセス手段を提供します。
export class ActionsSupport {
  constructor(dispatch) {
    this.dispatch = dispatch
  }
  push(path) {
    Log.info("Forward to " + path)
    this.dispatch(push(path))
  }
  clearMessage() {
    this.emitMessage(null)
  }
  emitMessage(globalMessage, columnMessages = [], level = Level.INFO, key = 'default') {
    if (globalMessage) {
      Log.debug(globalMessage)
    }
    this.dispatch({type: types.UPDATE_MESSAGE, payload: {
      key: key, message: globalMessage, level: level, columns: columnMessages}
    })
  }
  emitError(globalMessage, columnMessages = [], level = Level.ERROR, key = 'default') {
    this.emitMessage(globalMessage, columnMessages, level, key)
  }
  // handle failure and dispatch
  parseApiError(error) {
    let xhr = error.response.xhr
    let errs = JSON.parse(xhr.responseText)
    let parsed = {global: null, columns: []}
    Object.keys(errs).forEach((err) => {
      if (err) parsed.columns.push({key: err, values: errs[err]})
      else parsed.global = errs[err]
    })
    return parsed
  }
  handleFailure(error, key = "default") {
    if (error.response) {
      switch (error.status) {
        case 200:
          return this.emitError("要求処理は成功しましたが、戻り値の解析に失敗しました", [], Level.ERROR, key)
        case 400:
          let parsed = this.parseApiError(error)
          this.emitError(
            parsed.global ? parsed.global : "入力情報を確認してください", parsed.columns, Level.WARN, key)
          break
        case 401:
          this.emitError("機能実行権限がありません", [], Level.WARN, key)
          break
        case 403:
          this.emitError("機能実行権限がありません", [], Level.WARN, key)
          break
        default:
          this.emitError("要求処理に失敗しました", [], Level.ERROR, key)
      }
    } else {
      this.emitError("要求処理に失敗しました。サーバ側に問題が発生した可能性があります。", [], Level.ERROR, key)
    }
  }
}
